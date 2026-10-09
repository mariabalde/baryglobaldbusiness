import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { PageHeader } from "@/components/site/section";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { useEcommerce } from "@/hooks/use-ecommerce";

export const Route = createFileRoute("/boutique")({
  validateSearch: z.object({
    categorie: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Boutique — Barry Global Business" },
      {
        name: "description",
        content:
          "Achetez smartphones neufs et d'occasion, AirPods, Apple Watch, chargeurs, casques Bluetooth et coques au meilleur prix à Dakar.",
      },
      { property: "og:title", content: "Boutique — Barry Global Business" },
      {
        property: "og:description",
        content: "Smartphones, AirPods, Apple Watch et accessoires garantis.",
      },
    ],
  }),
  component: Boutique,
});

const sorts = {
  populaire: "Popularité",
  prixAsc: "Prix croissant",
  prixDesc: "Prix décroissant",
} as const;

const quickTabs = [
  { slug: "tous", name: "Tous les produits" },
  { slug: "smartphones", name: "Smartphones" },
  { slug: "airpods", name: "Audio" },
  { slug: "apple-watch", name: "Montres" },
  { slug: "coques", name: "Accessoires" },
  { slug: "promotions", name: "Promotions" },
] as const;

function Boutique() {
  const { categories, products } = useEcommerce();
  const search = Route.useSearch();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>(search.categorie ?? "tous");
  const [sort, setSort] = useState<keyof typeof sorts>("populaire");

  useEffect(() => {
    setCat(search.categorie ?? "tous");
  }, [search.categorie]);

  const list = useMemo(() => {
    let items = products.filter(
      (p) =>
        (cat === "tous" || p.category === cat) &&
        p.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
    if (sort === "prixAsc") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "prixDesc") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [products, query, cat, sort]);

  return (
    <>
      <PageHeader
        eyebrow="Boutique"
        title="Nos produits en stock"
        subtitle="Recherchez un produit, vérifiez le prix et contactez-nous pour confirmer la disponibilité."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="flex flex-wrap gap-2">
          {quickTabs.map((c) =>
            c.slug === "promotions" ? (
              <Link
                key={c.slug}
                to="/promotions"
                className="rounded-md gold-hairline px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            ) : (
              <Link
                key={c.slug}
                to="/boutique"
                search={c.slug === "tous" ? {} : { categorie: c.slug }}
                className={
                  (c.slug === "tous" && cat === "tous") || cat === c.slug
                    ? "rounded-md bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-white"
                    : "rounded-md gold-hairline px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                }
              >
                {c.name}
              </Link>
            ),
          )}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr]">
          <aside className="surface-luxe h-fit rounded-lg p-5 lg:sticky lg:top-28">
            <h2 className="text-base font-semibold">Filtres</h2>
            <div className="mt-5 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Catégorie
                </p>
                <div className="mt-3 grid gap-2">
                  {[{ slug: "tous", name: "Tous" }, ...categories].map((c) => (
                    <Link
                      key={c.slug}
                      to="/boutique"
                      search={c.slug === "tous" ? {} : { categorie: c.slug }}
                      className={
                        cat === c.slug
                          ? "rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-foreground"
                          : "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      }
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Recherche
                </span>
                <span className="relative mt-3 block">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Produit, marque..."
                    aria-label="Rechercher un produit"
                    className="w-full rounded-md border border-input bg-background py-3 pr-3 pl-10 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </span>
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Prix
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
                  className="mt-3 w-full rounded-md border border-input bg-background px-3 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  {Object.entries(sorts).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Disponibilité
                </p>
                <p className="mt-3 rounded-md border border-border px-3 py-2 text-sm text-[var(--success)]">
                  Produits en stock
                </p>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <h2 className="text-2xl font-bold">Tous les produits</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {list.length} article{list.length > 1 ? "s" : ""} affiché
                  {list.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {list.length === 0 ? (
              <p className="mt-16 text-center text-muted-foreground">
                Aucun produit ne correspond à votre recherche.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 min-[520px]:grid-cols-2 xl:grid-cols-3">
                {list.map((p, i) => (
                  <Reveal key={p.id} delay={i * 50}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
