import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { ProductCard, Stars } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { useEcommerce } from "@/hooks/use-ecommerce";
import { formatPrice } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { getStorefrontCatalog } from "@/functions/storefront.functions";

export const Route = createFileRoute("/produits/$slug")({
  loader: async ({ params }) => {
    const catalog = await getStorefrontCatalog();
    const product = catalog.products.find((item) => item.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.product.name} — Barry Global Business` },
      { name: "description", content: loaderData.product.description },
      { property: "og:title", content: `${loaderData.product.name} — Barry Global Business` },
      { property: "og:description", content: loaderData.product.description },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, isFavorite, toggleFavorite, products, categories } = useEcommerce();
  const category = categories.find((item) => item.slug === product.category);
  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const favorite = isFavorite(product.id);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:py-24">
        <Reveal>
          <div className="surface-luxe overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              width={1400}
              height={1100}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap gap-2">
              {product.badge && (
                <span className="rounded-md bg-[var(--ink)] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-md bg-secondary px-3 py-1.5 text-xs font-bold text-foreground">
                  -{discount}%
                </span>
              )}
            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-primary">
              {category?.name ?? "Produit"}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{product.name}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Stars value={product.rating} />
              <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
            </div>

            <div className="mt-7 flex flex-wrap items-baseline gap-4">
              <span className="text-3xl font-extrabold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: product.condition },
                { icon: Truck, label: "Livraison Dakar" },
                { icon: ShieldCheck, label: `Garantie ${product.warranty}` },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="surface-luxe rounded-lg p-4 text-sm">
                  <Icon className="mb-3 size-5 text-primary" />
                  {label}
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm font-medium text-[var(--success)]">
              Stock boutique indiqué: {product.stock} disponible{product.stock > 1 ? "s" : ""} —
              confirmation finale sur WhatsApp
            </p>

            <ul className="mt-7 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {product.specs.map((spec) => (
                <li key={spec} className="flex gap-3">
                  <span className="text-primary">◆</span>
                  {spec}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                <ShoppingBag className="size-4" />
                Ajouter au panier
              </button>
              <Link
                to="/commande"
                onClick={() => addToCart(product)}
                className="inline-flex items-center justify-center gap-2 rounded-md gold-hairline px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                Acheter maintenant
              </Link>
              <button
                type="button"
                onClick={() => toggleFavorite(product)}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-md gold-hairline px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary",
                  favorite && "border-primary text-primary",
                )}
              >
                <Heart className={cn("size-4", favorite && "fill-current")} />
                {favorite ? "Dans les favoris" : "Ajouter aux favoris"}
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-2xl font-bold sm:text-3xl">Produits similaires</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 50}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
