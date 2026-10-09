import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/section";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { useEcommerce } from "@/hooks/use-ecommerce";

export const Route = createFileRoute("/favoris")({
  head: () => ({
    meta: [
      { title: "Favoris — Barry Global Business" },
      { name: "description", content: "Retrouvez vos produits favoris Barry Global Business." },
    ],
  }),
  component: Favoris,
});

function Favoris() {
  const { favoriteIds, products } = useEcommerce();
  const favorites = products.filter((product) => favoriteIds.includes(product.id));

  return (
    <>
      <PageHeader
        eyebrow="Favoris"
        title="Vos produits gardés de côté"
        subtitle="Comparez vos coups de cœur avant de passer commande."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {favorites.length === 0 ? (
          <Reveal>
            <div className="surface-luxe rounded-lg p-10 text-center">
              <h2 className="text-2xl font-bold">Aucun favori pour le moment</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Touchez le bouton favori sur un produit pour le retrouver ici.
              </p>
              <Link
                to="/boutique"
                className="mt-7 inline-flex rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Voir la boutique
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((product, index) => (
              <Reveal key={product.id} delay={index * 50}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
