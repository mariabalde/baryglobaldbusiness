import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useEcommerce } from "@/hooks/use-ecommerce";
import { formatPrice, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`Note ${value} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < value ? "fill-primary text-primary" : "text-muted-foreground/30",
          )}
        />
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, isFavorite, toggleFavorite } = useEcommerce();
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const favorite = isFavorite(product.id);

  return (
    <article className="group surface-luxe hover-lift flex flex-col overflow-hidden rounded-lg">
      <Link
        to="/produits/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="size-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {product.badge ? (
            <span className="rounded-md bg-[var(--ink)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              {product.badge}
            </span>
          ) : (
            <span />
          )}
          {discount > 0 && (
            <span className="rounded-md bg-secondary px-2.5 py-1 text-[10px] font-bold text-foreground">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <Stars value={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews} avis)</span>
        </div>
        <h3 className="text-base leading-snug font-semibold">{product.name}</h3>
        <div className="flex items-baseline gap-3">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {product.stock > 0 ? (
            <span className="text-[var(--success)]">
              Stock boutique indiqué — à confirmer sur WhatsApp
            </span>
          ) : (
            <span className="text-destructive">Rupture de stock</span>
          )}
        </p>
        <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
          <span className="rounded-md border border-border px-2.5 py-1">{product.condition}</span>
          <span className="rounded-md border border-border px-2.5 py-1">
            Garantie {product.warranty}
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="flex-1 rounded-md bg-[var(--ink)] py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <ShoppingBag className="size-4" />
                Ajouter au panier
              </span>
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(product)}
              aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary",
                favorite && "border-primary text-primary",
              )}
            >
              <Heart className={cn("size-4", favorite && "fill-current")} />
            </button>
          </div>
          <Link
            to="/produits/$slug"
            params={{ slug: product.slug }}
            className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </article>
  );
}
