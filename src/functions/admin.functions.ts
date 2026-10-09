import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import {
  adminLoginSchema,
  createProductSchema,
  setProductActiveSchema,
  updateProductSchema,
  updateOrderStatusSchema,
  updateStockSchema,
} from "@/lib/storefront-schemas";
import {
  clearAdminSession,
  getAdminSession,
  issueAdminSession,
  requireAdmin,
  verifyAdminPassword,
} from "./auth.server";

export const getAdminDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getAdminSession();
  if (!session) return { authenticated: false as const, orders: [], products: [], categories: [] };
  const [{ db }, { categories, orders, products }] = await Promise.all([
    import("@/db/client"),
    import("@/db/schema"),
  ]);
  const [orderRows, productRows, categoryRows] = await Promise.all([
    db.select().from(orders).orderBy(desc(orders.createdAt)).limit(50),
    db.select().from(products).orderBy(products.name),
    db.select().from(categories).orderBy(categories.sortOrder),
  ]);
  return {
    authenticated: true as const,
    email: session.email,
    orders: orderRows,
    products: productRows,
    categories: categoryRows,
  };
});

export const loginAdmin = createServerFn({ method: "POST" })
  .validator(adminLoginSchema)
  .handler(async ({ data }) => {
    const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const valid =
      data.email.toLowerCase() === expectedEmail && (await verifyAdminPassword(data.password));
    if (!valid) throw new Error("Identifiants invalides");
    await issueAdminSession(data.email.toLowerCase());
    return { ok: true };
  });

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const createProduct = createServerFn({ method: "POST" })
  .validator(createProductSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const [{ db }, { inventoryMovements, products }] = await Promise.all([
      import("@/db/client"),
      import("@/db/schema"),
    ]);
    const slugBase = slugify(data.name);
    if (!slugBase) throw new Error("Le nom du produit ne permet pas de créer une URL valide");
    const slug = `${slugBase}-${crypto.randomUUID().slice(0, 8)}`;
    const [product] = await db
      .insert(products)
      .values({
        ...data,
        slug,
        legacyId: `admin-${crypto.randomUUID()}`,
        reviews: 0,
        rating: "5",
        isActive: true,
      })
      .returning();
    if (data.stock > 0) {
      await db.insert(inventoryMovements).values({
        productId: product.id,
        delta: data.stock,
        type: "restock",
        note: "Stock initial à la création du produit",
      });
    }
    return { ok: true };
  });

export const updateProduct = createServerFn({ method: "POST" })
  .validator(updateProductSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const [{ db }, { inventoryMovements, products }] = await Promise.all([
      import("@/db/client"),
      import("@/db/schema"),
    ]);
    const { id, ...values } = data;
    await db.transaction(async (tx) => {
      const existing = await tx.query.products.findFirst({
        where: eq(products.id, id),
        columns: { stock: true },
      });
      if (!existing) throw new Error("Produit introuvable");
      await tx
        .update(products)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(products.id, id));
      const delta = data.stock - existing.stock;
      if (delta !== 0) {
        await tx.insert(inventoryMovements).values({
          productId: id,
          delta,
          type: delta > 0 ? "restock" : "adjustment",
          note: "Modification depuis la fiche produit",
        });
      }
    });
    return { ok: true };
  });

export const setProductActive = createServerFn({ method: "POST" })
  .validator(setProductActiveSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const [{ db }, { products }] = await Promise.all([import("@/db/client"), import("@/db/schema")]);
    const [updated] = await db
      .update(products)
      .set({ isActive: data.isActive, updatedAt: new Date() })
      .where(eq(products.id, data.id))
      .returning({ id: products.id });
    if (!updated) throw new Error("Produit introuvable");
    return { ok: true };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  clearAdminSession();
  return { ok: true };
});

export const updateOrderStatus = createServerFn({ method: "POST" })
  .validator(updateOrderStatusSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const [{ db }, { inventoryMovements, orderItems, orders, products }] = await Promise.all([
      import("@/db/client"),
      import("@/db/schema"),
    ]);
    await db.transaction(async (tx) => {
      const order = await tx.query.orders.findFirst({ where: eq(orders.id, data.orderId) });
      if (!order) throw new Error("Commande introuvable");
      if (order.status === data.status) return;
      const allowed: Record<string, string[]> = {
        pending: ["confirmed", "cancelled"],
        confirmed: ["preparing", "cancelled"],
        preparing: ["ready", "cancelled"],
        ready: ["delivered", "cancelled"],
        delivered: [],
        cancelled: [],
      };
      if (!allowed[order.status].includes(data.status))
        throw new Error("Transition de statut non autorisée");
      const items = await tx.select().from(orderItems).where(eq(orderItems.orderId, order.id));
      if (data.status === "confirmed") {
        for (const item of items) {
          if (!item.productId) throw new Error("Produit de commande invalide");
          const [updated] = await tx
            .update(products)
            .set({ stock: sql`${products.stock} - ${item.quantity}`, updatedAt: new Date() })
            .where(and(eq(products.id, item.productId), gte(products.stock, item.quantity)))
            .returning({ id: products.id });
          if (!updated) throw new Error("Stock insuffisant pour confirmer cette commande");
          await tx.insert(inventoryMovements).values({
            productId: item.productId,
            orderId: order.id,
            delta: -item.quantity,
            type: "sale",
            note: `Commande ${order.orderNumber}`,
          });
        }
      }
      if (data.status === "cancelled" && order.status !== "pending") {
        for (const item of items) {
          if (!item.productId) continue;
          await tx
            .update(products)
            .set({ stock: sql`${products.stock} + ${item.quantity}`, updatedAt: new Date() })
            .where(eq(products.id, item.productId));
          await tx.insert(inventoryMovements).values({
            productId: item.productId,
            orderId: order.id,
            delta: item.quantity,
            type: "cancellation",
            note: `Annulation ${order.orderNumber}`,
          });
        }
      }
      await tx
        .update(orders)
        .set({ status: data.status, updatedAt: new Date() })
        .where(eq(orders.id, order.id));
    });
    return { ok: true };
  });

export const adjustStock = createServerFn({ method: "POST" })
  .validator(updateStockSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const [{ db }, { inventoryMovements, products }] = await Promise.all([
      import("@/db/client"),
      import("@/db/schema"),
    ]);
    const [updated] = await db
      .update(products)
      .set({ stock: sql`${products.stock} + ${data.delta}`, updatedAt: new Date() })
      .where(and(eq(products.id, data.productId), gte(products.stock, -data.delta)))
      .returning({ id: products.id });
    if (!updated) throw new Error("Le stock ne peut pas devenir négatif");
    await db.insert(inventoryMovements).values({
      productId: data.productId,
      delta: data.delta,
      type: data.delta > 0 ? "restock" : "adjustment",
      note: data.note || "Ajustement depuis le back-office",
    });
    return { ok: true };
  });
