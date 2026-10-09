import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { contact, formatPrice, type Category, type Product } from "./catalog";
import {
  EcommerceContext,
  type CartLine,
  type EcommerceContextValue,
  type OrderCustomer,
} from "./ecommerce-context";

export type { OrderCustomer } from "./ecommerce-context";

const CART_KEY = "bgb_cart_v1";
const FAVORITES_KEY = "bgb_favorites_v1";

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function EcommerceProvider({
  children,
  products,
  categories,
}: {
  children: ReactNode;
  products: Product[];
  categories: Category[];
}) {
  const [cartLines, setCartLines] = useState<CartLine[]>(() =>
    readStorage<CartLine[]>(CART_KEY, []),
  );
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    readStorage<string[]>(FAVORITES_KEY, []),
  );

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cartLines));
  }, [cartLines]);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const cartItems = useMemo(
    () =>
      cartLines
        .map((line) => {
          const product = products.find((item) => item.id === line.productId);
          if (!product) return null;
          const quantity = Math.min(line.quantity, product.stock);
          return { product, quantity, lineTotal: product.price * quantity };
        })
        .filter((item): item is CartItem => Boolean(item)),
    [cartLines, products],
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favoriteIds.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      toast.error("Produit indisponible", {
        description: "Ce produit est actuellement en rupture de stock.",
      });
      return;
    }

    setCartLines((current) => {
      const existing = current.find((line) => line.productId === product.id);
      const currentQuantity = existing?.quantity ?? 0;
      const nextQuantity = Math.min(currentQuantity + quantity, product.stock);

      if (existing) {
        return current.map((line) =>
          line.productId === product.id ? { ...line, quantity: nextQuantity } : line,
        );
      }

      return [...current, { productId: product.id, quantity: Math.min(quantity, product.stock) }];
    });

    toast.success("Ajouté au panier", {
      description: product.name,
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const nextQuantity = Math.max(0, Math.min(quantity, product.stock));
    setCartLines((current) =>
      nextQuantity === 0
        ? current.filter((line) => line.productId !== productId)
        : current.map((line) =>
            line.productId === productId ? { ...line, quantity: nextQuantity } : line,
          ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCartLines((current) => current.filter((line) => line.productId !== productId));
  };

  const clearCart = () => setCartLines([]);

  const toggleFavorite = (product: Product) => {
    setFavoriteIds((current) => {
      const exists = current.includes(product.id);
      toast.success(exists ? "Retiré des favoris" : "Ajouté aux favoris", {
        description: product.name,
      });
      return exists ? current.filter((id) => id !== product.id) : [...current, product.id];
    });
  };

  const isFavorite = (productId: string) => favoriteIds.includes(productId);

  const buildWhatsAppOrderUrl = (customer: OrderCustomer, orderNumber?: string) => {
    const lines = cartItems
      .map((item) => `- ${item.product.name} x${item.quantity}: ${formatPrice(item.lineTotal)}`)
      .join("\n");

    const message = [
      "Bonjour Barry Global Business, je veux confirmer cette commande:",
      orderNumber ? `Référence: ${orderNumber}` : null,
      "",
      lines,
      "",
      `Total: ${formatPrice(cartTotal)}`,
      "Disponibilité et livraison à confirmer par la boutique.",
      `Nom: ${customer.name}`,
      `Téléphone: ${customer.phone}`,
      `Mode: ${customer.deliveryMode === "livraison" ? "Livraison" : "Retrait en boutique"}`,
      customer.deliveryMode === "livraison" ? `Adresse: ${customer.address}` : null,
      customer.note ? `Note: ${customer.note}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const value: EcommerceContextValue = {
    products,
    categories,
    cartLines,
    cartItems,
    favoriteIds,
    cartCount,
    favoritesCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleFavorite,
    isFavorite,
    buildWhatsAppOrderUrl,
  };

  return <EcommerceContext.Provider value={value}>{children}</EcommerceContext.Provider>;
}
