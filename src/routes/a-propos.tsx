import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/section";
import { Counter, Reveal } from "@/components/site/reveal";
import { brands, images } from "@/lib/catalog";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Barry Global Business" },
      {
        name: "description",
        content:
          "Barry Global Business : boutique et atelier à Dakar pour la vente de téléphones, la réparation et les accessoires.",
      },
      { property: "og:title", content: "À propos — Barry Global Business" },
      {
        property: "og:description",
        content: "Notre histoire, nos valeurs et notre engagement qualité à Dakar.",
      },
    ],
  }),
  component: APropos,
});

function APropos() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Une boutique tech de proximité"
        subtitle="Depuis Parcelle Assainie, nous vendons, réparons et accompagnons nos clients après l'achat."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="surface-luxe overflow-hidden rounded-lg">
              <img
                src={images.heroPhones}
                alt="Sélection de smartphones disponibles en boutique"
                loading="lazy"
                width={1600}
                height={1200}
                className="w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-2xl font-bold sm:text-3xl">Notre façon de travailler</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Barry Global Business, c'est une boutique et un atelier réunis sous un même toit :
              téléphones neufs et d'occasion contrôlés, accessoires utiles et réparations suivies
              par notre équipe.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Chaque client repart avec un appareil testé, un prix clair et une garantie indiquée
              avant l'achat ou la réparation.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Transparence", d: "Devis détaillé avant toute intervention." },
                { t: "Qualité", d: "Pièces sélectionnées et testées en atelier." },
                { t: "Rapidité", d: "La plupart des réparations en moins de 24h." },
                { t: "Proximité", d: "Un conseil humain, avant et après l'achat." },
              ].map((v) => (
                <li key={v.t} className="surface-luxe rounded-lg p-5">
                  <p className="font-display text-sm font-semibold text-primary">{v.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[
            { value: 5000, suffix: "+", label: "Clients satisfaits" },
            { value: 2500, suffix: "+", label: "Téléphones réparés" },
            { value: 1000, suffix: "+", label: "Produits vendus" },
            { value: 98, suffix: "%", label: "Taux de satisfaction" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="surface-luxe rounded-lg p-8 text-center">
                <p className="text-4xl font-extrabold text-foreground">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Marques disponibles</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {brands.map((b) => (
              <span
                key={b}
                className="rounded-lg gold-hairline px-5 py-2.5 font-display text-sm text-muted-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
