import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { useEcommerce } from "@/hooks/use-ecommerce";
import { formatPrice } from "@/lib/catalog";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Panier — Barry Global Business" },
      { name: "description", content: "Consultez votre panier Barry Global Business." },
    ],
  }),
  component: Panier,
});

function Panier() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useEcommerce();

  return (
    <>
      <PageHeader
        eyebrow="Panier"
        title="Votre sélection"
        subtitle="Vérifiez les quantités avant de confirmer votre commande."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {cartItems.length === 0 ? (
          <Reveal>
            <div className="surface-luxe rounded-lg p-10 text-center">
              <h2 className="text-2xl font-bold">Votre panier est vide</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Ajoutez des téléphones, accessoires ou packs depuis la boutique.
              </p>
              <Link
                to="/boutique"
                className="mt-7 inline-flex rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Découvrir la boutique
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
            <div className="grid gap-4">
              {cartItems.map(({ product, quantity, lineTotal }, index) => (
                <Reveal key={product.id} delay={index * 50}>
                  <article className="surface-luxe grid gap-5 rounded-lg p-5 sm:grid-cols-[8rem_1fr_auto]">
                    <Link to="/produits/$slug" params={{ slug: product.slug }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        width={320}
                        height={320}
                        className="aspect-square w-full rounded-lg object-cover"
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        to="/produits/$slug"
                        params={{ slug: product.slug }}
                        className="font-display text-lg font-semibold hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {product.condition} · Garantie {product.warranty}
                      </p>
                      <p className="mt-3 text-lg font-bold text-foreground">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center rounded-md gold-hairline">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="grid size-10 place-items-center text-primary"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="min-w-10 text-center text-sm font-semibold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="grid size-10 place-items-center text-primary"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <p className="font-display font-bold">{formatPrice(lineTotal)}</p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                        Retirer
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <aside className="surface-luxe sticky top-28 rounded-lg p-6">
                <h2 className="font-display text-xl font-semibold">Résumé</h2>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 text-muted-foreground">
                    <span>Sous-total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-muted-foreground">
                    <span>Livraison</span>
                    <span>À confirmer</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between gap-4 font-display text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/commande"
                  className="mt-7 flex w-full justify-center rounded-md bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Continuer la commande
                </Link>
              </aside>
            </Reveal>
          </div>
        )}
      </section>
    </>
  );
}
