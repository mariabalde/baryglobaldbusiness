import { createServerFn } from "@tanstack/react-start";
import { eq, inArray } from "drizzle-orm";
import { orderInputSchema } from "@/lib/storefront-schemas";

function orderNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `BGB-${date}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export const createOrder = createServerFn({ method: "POST" })
  .validator(orderInputSchema)
  .handler(async ({ data }) => {
    const [{ db }, { orderItems, orders, products }] = await Promise.all([
      import("@/db/client"),
      import("@/db/schema"),
    ]);
    const existing = await db.query.orders.findFirst({
      where: eq(orders.idempotencyKey, data.idempotencyKey),
      columns: { orderNumber: true },
    });
    if (existing) return { orderNumber: existing.orderNumber, duplicate: true };

    const requested = new Map<string, number>();
    data.items.forEach((item) =>
      requested.set(item.productId, (requested.get(item.productId) ?? 0) + item.quantity),
    );
    const productRows = await db
      .select()
      .from(products)
      .where(inArray(products.legacyId, [...requested.keys()]));
    if (productRows.length !== requested.size)
      throw new Error("Un produit de votre panier n'est plus disponible.");

    const lines = productRows.map((product) => {
      const quantity = requested.get(product.legacyId) ?? 0;
      if (!product.isActive || product.stock < quantity) {
        throw new Error(`${product.name} n'est plus disponible dans la quantité demandée.`);
      }
      return { product, quantity, lineTotal: product.price * quantity };
    });
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const number = orderNumber();

    const created = await db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          orderNumber: number,
          customerName: data.customer.name,
          customerPhone: data.customer.phone,
          customerAddress:
            data.customer.deliveryMode === "livraison" ? data.customer.address : null,
          deliveryMode: data.customer.deliveryMode,
          note: data.customer.note || null,
          subtotal,
          total: subtotal,
          idempotencyKey: data.idempotencyKey,
        })
        .returning({ id: orders.id, orderNumber: orders.orderNumber });
      if (!order) throw new Error("La commande n'a pas pu être créée.");
      await tx.insert(orderItems).values(
        lines.map(({ product, quantity, lineTotal }) => ({
          orderId: order.id,
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          unitPrice: product.price,
          quantity,
          lineTotal,
        })),
      );
      return order;
    });
    return { orderNumber: created.orderNumber, duplicate: false };
  });
