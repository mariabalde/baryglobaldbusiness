import { useContext } from "react";
import { EcommerceContext } from "@/lib/ecommerce-context";

export function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error("useEcommerce must be used inside EcommerceProvider");
  }
  return context;
}
