import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { useEcommerce } from "@/hooks/use-ecommerce";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Catégories — Barry Global Business" },
      {
        name: "description",
        content:
          "Smartphones, AirPods, Apple Watch, chargeurs, casques Bluetooth, coques, verres trempés, flashage, réparation et accessoires informatiques.",
      },
      { property: "og:title", content: "Catégories — Barry Global Business" },
      {
        property: "og:description",
        content: "Explorez toutes nos catégories de produits et services mobiles.",
      },
    ],
  }),
  component: Categories,
});

function Categories() {
  const { categories } = useEcommerce();
  return (
    <>
      <PageHeader
        eyebrow="Catégories"
        title="Produits et services disponibles"
        subtitle="Téléphones, accessoires, réparation et flashage, regroupés par catégorie."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                to="/boutique"
                search={{ categorie: c.slug }}
                className="group surface-luxe hover-lift block overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="size-full object-cover opacity-95 transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                  <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-md bg-background/90 text-lg">
                    {c.icon}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-lg font-semibold">{c.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{c.count}</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary">Voir →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
