import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  check,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const productBadgeEnum = pgEnum("product_badge", [
  "Neuf",
  "Occasion",
  "Best-seller",
  "Promo",
  "Pack",
]);

export const productConditionEnum = pgEnum("product_condition", [
  "Neuf",
  "Occasion garantie",
  "Pack",
]);

export const deliveryModeEnum = pgEnum("delivery_mode", ["livraison", "retrait"]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
]);

export const inventoryMovementTypeEnum = pgEnum("inventory_movement_type", [
  "restock",
  "sale",
  "adjustment",
  "cancellation",
]);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    icon: text("icon").notNull(),
    imageUrl: text("image_url").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [],
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    legacyId: text("legacy_id").notNull(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    categorySlug: text("category_slug")
      .notNull()
      .references(() => categories.slug, { onUpdate: "cascade" }),
    price: integer("price").notNull(),
    oldPrice: integer("old_price"),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("5"),
    reviews: integer("reviews").notNull().default(0),
    stock: integer("stock").notNull().default(0),
    imageUrl: text("image_url").notNull(),
    badge: productBadgeEnum("badge"),
    warranty: text("warranty").notNull(),
    condition: productConditionEnum("condition").notNull(),
    description: text("description").notNull(),
    specs: jsonb("specs").$type<string[]>().notNull().default([]),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("products_slug_idx").on(table.slug),
    uniqueIndex("products_legacy_id_idx").on(table.legacyId),
  ],
);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderNumber: text("order_number").notNull(),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerAddress: text("customer_address"),
    deliveryMode: deliveryModeEnum("delivery_mode").notNull(),
    note: text("note"),
    status: orderStatusEnum("status").notNull().default("pending"),
    subtotal: integer("subtotal").notNull().default(0),
    deliveryFee: integer("delivery_fee"),
    total: integer("total").notNull().default(0),
    whatsappMessage: text("whatsapp_message"),
    idempotencyKey: text("idempotency_key"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("orders_order_number_idx").on(table.orderNumber),
    uniqueIndex("orders_idempotency_key_idx").on(table.idempotencyKey),
  ],
);

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
  productSlug: text("product_slug").notNull(),
  productName: text("product_name").notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
  lineTotal: integer("line_total").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const inventoryMovements = pgTable(
  "inventory_movements",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "restrict" }),
    orderId: uuid("order_id").references(() => orders.id, { onDelete: "set null" }),
    delta: integer("delta").notNull(),
    type: inventoryMovementTypeEnum("type").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check("inventory_movements_delta_not_zero", sql`${table.delta} <> 0`)],
);

export type CategoryRow = typeof categories.$inferSelect;
export type ProductRow = typeof products.$inferSelect;
export type OrderRow = typeof orders.$inferSelect;
export type OrderItemRow = typeof orderItems.$inferSelect;
export type InventoryMovementRow = typeof inventoryMovements.$inferSelect;
