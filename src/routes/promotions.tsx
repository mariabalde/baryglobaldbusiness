import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { ProductCard } from "@/components/site/product-card";
import { useEcommerce } from "@/hooks/use-ecommerce";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: "Promotions & offres — Barry Global Business" },
      {
        name: "description",
        content:
          "Jusqu'à -40% sur les smartphones, AirPods et accessoires. Packs accessoires, offres Apple et Samsung, livraison gratuite dès 50 000 FCFA.",
      },
      { property: "og:title", content: "Promotions & offres — Barry Global Business" },
      {
        property: "og:description",
        content: "Remises sur téléphones et accessoires à Dakar.",
      },
    ],
  }),
  component: Promotions,
});

const banners = [
  { tag: "-20%", title: "Pack Accessoires", sub: "Coque + verre trempé + chargeur rapide" },
  { tag: "-40%", title: "Offre Apple", sub: "AirPods Pro 2 & Apple Watch Series 9" },
  { tag: "-30%", title: "Offre Samsung", sub: "Galaxy S24 et accessoires officiels" },
  { tag: "0 FCFA", title: "Livraison gratuite", sub: "Dès 50 000 FCFA d'achat à Dakar" },
];

function Promotions() {
  const { products } = useEcommerce();
  const deals = products.filter((p) => p.oldPrice);

  return (
    <>
      <PageHeader
        eyebrow="Promotions"
        title="Promotions disponibles"
        subtitle="Remises sur une sélection de produits, selon le stock en boutique."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {banners.map((b, i) => (
            <Reveal key={b.title} delay={i * 70}>
              <div className="surface-luxe hover-lift relative flex items-center justify-between gap-6 overflow-hidden rounded-lg p-8 sm:p-10">
                <div className="relative min-w-0">
                  <h2 className="font-display text-xl font-semibold sm:text-2xl">{b.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{b.sub}</p>
                  <Link
                    to="/boutique"
                    className="mt-6 inline-flex rounded-md gold-hairline px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    En profiter
                  </Link>
                </div>
                <span className="relative shrink-0 font-display text-3xl font-extrabold text-primary sm:text-4xl">
                  {b.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <h2 className="mt-20 text-2xl font-bold sm:text-3xl">Produits en promotion</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
