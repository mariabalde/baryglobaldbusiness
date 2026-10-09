import { z } from "zod";

export const cartLineSchema = z.object({
  productId: z.string().min(1).max(100),
  quantity: z.number().int().min(1).max(20),
});

export const orderInputSchema = z.object({
  idempotencyKey: z.string().uuid(),
  customer: z.object({
    name: z.string().trim().min(2).max(100),
    phone: z.string().trim().min(7).max(30),
    address: z.string().trim().max(200),
    deliveryMode: z.enum(["livraison", "retrait"]),
    note: z.string().trim().max(500).optional(),
  }),
  items: z.array(cartLineSchema).min(1).max(30),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(12).max(500),
});

export const updateOrderStatusSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum(["confirmed", "preparing", "ready", "delivered", "cancelled"]),
});

export const updateStockSchema = z.object({
  productId: z.string().uuid(),
  delta: z
    .number()
    .int()
    .min(-1000)
    .max(1000)
    .refine((value) => value !== 0),
  note: z.string().trim().max(250).optional(),
});

const productInputSchema = z.object({
  name: z.string().trim().min(2).max(160),
  categorySlug: z.string().trim().min(1).max(100),
  price: z.number().int().min(0).max(100_000_000),
  oldPrice: z.number().int().min(0).max(100_000_000).nullable(),
  stock: z.number().int().min(0).max(100_000),
  imageUrl: z.string().trim().min(1).max(2_000),
  badge: z.enum(["Neuf", "Occasion", "Best-seller", "Promo", "Pack"]).nullable(),
  warranty: z.string().trim().min(1).max(100),
  condition: z.enum(["Neuf", "Occasion garantie", "Pack"]),
  description: z.string().trim().min(10).max(2_000),
  specs: z.array(z.string().trim().min(1).max(200)).max(30),
});

export const createProductSchema = productInputSchema;

export const updateProductSchema = productInputSchema.extend({
  id: z.string().uuid(),
});

export const setProductActiveSchema = z.object({
  id: z.string().uuid(),
  isActive: z.boolean(),
});
