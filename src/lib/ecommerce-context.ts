import { createContext } from "react";
import type { Product } from "./catalog";
import type { Category } from "./catalog";

export type CartLine = {
  productId: string;
  quantity: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

export type OrderCustomer = {
  name: string;
  phone: string;
  address: string;
  deliveryMode: "livraison" | "retrait";
  note?: string;
};

export type EcommerceContextValue = {
  products: Product[];
  categories: Category[];
  cartLines: CartLine[];
  cartItems: CartItem[];
  favoriteIds: string[];
  cartCount: number;
  favoritesCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  buildWhatsAppOrderUrl: (customer: OrderCustomer, orderNumber?: string) => string;
};

export const EcommerceContext = createContext<EcommerceContextValue | null>(null);
