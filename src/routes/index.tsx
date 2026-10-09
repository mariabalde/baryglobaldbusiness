import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Clock, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Counter, Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section";
import { ProductCard, Stars } from "@/components/site/product-card";
import { useEcommerce } from "@/hooks/use-ecommerce";
import { brands, contact, images, services, testimonials } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barry Global Business — La technologie au meilleur prix" },
      {
        name: "description",
        content:
          "Téléphones neufs et d'occasion, réparation express, AirPods, Apple Watch, chargeurs, coques et flashage à Dakar — Parcelle Assainie PA Unité 3.",
      },
      { property: "og:title", content: "Barry Global Business — La technologie au meilleur prix" },
      {
        property: "og:description",
        content: "Boutique de téléphones et accessoires, réparation et service client à Dakar.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:py-22">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Boutique tech à Dakar
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-2xl text-4xl leading-tight font-bold sm:text-5xl lg:text-[3.4rem]">
              Téléphones, accessoires et réparation au bon prix
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Découvrez nos smartphones, accessoires et services de réparation à Dakar. Des produits
              sélectionnés avec soin, des prix accessibles et un service de proximité.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/boutique"
                className="group inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                Découvrir la boutique
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md gold-hairline px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                <Wrench className="size-4" />
                Réparer mon téléphone
              </Link>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "Garantie boutique" },
                { icon: Truck, label: "Livraison Dakar" },
                { icon: BadgeCheck, label: "Testé avant vente" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Icon className="size-5 shrink-0 text-primary" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative">
          <div className="surface-luxe overflow-hidden rounded-lg">
            <img
              src={images.heroPhones}
              alt="Smartphones disponibles chez Barry Global Business"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute right-4 bottom-4 left-4 rounded-lg border border-border bg-white/95 px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <p className="text-lg font-bold text-foreground">WhatsApp direct</p>
            <p className="text-xs text-muted-foreground">
              {contact.phone} · réponse rapide pendant les heures d'ouverture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const { categories, products } = useEcommerce();
  return (
    <>
      <Hero />

      {/* Catégories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          eyebrow="Catégories"
          title="Ce que vous pouvez trouver en boutique"
          subtitle="Smartphones, écouteurs, montres, chargeurs, coques et services de réparation."
        />
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 50}>
              <Link
                to="/boutique"
                search={{ categorie: c.slug }}
                className="group surface-luxe hover-lift block overflow-hidden rounded-lg"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="size-full object-cover opacity-90 transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 grid size-9 place-items-center rounded-lg bg-background/85 text-base">
                    {c.icon}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-semibold">{c.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.count}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Produits */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading
            eyebrow="Boutique"
            title="Produits disponibles en ce moment"
            subtitle="Prix affichés, stock indiqué, garantie précisée pour chaque article."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link
              to="/boutique"
              className="inline-flex items-center gap-2 rounded-md gold-hairline px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Voir toute la boutique
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Promotions */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          eyebrow="Promotions"
          title="Offres du moment"
          subtitle="Des réductions simples sur les produits et packs les plus demandés."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="surface-luxe relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-8 sm:p-10">
              <div className="relative">
                <span className="text-5xl font-extrabold text-primary sm:text-6xl">-40%</span>
                <h3 className="mt-4 text-2xl font-bold sm:text-3xl">Offre Apple et Samsung</h3>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">
                  AirPods, Apple Watch et Galaxy à prix réduit selon le stock disponible.
                </p>
              </div>
              <div className="relative mt-10 flex flex-wrap items-center gap-6">
                <div className="surface-luxe rounded-lg px-5 py-4">
                  <p className="text-sm font-semibold text-foreground">Offre selon stock</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Prix et disponibilité confirmés sur WhatsApp avant achat.
                  </p>
                </div>
                <Link
                  to="/promotions"
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  J'en profite
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-6">
            {[
              { title: "Pack Accessoires", sub: "Coque + verre + chargeur", tag: "-20%" },
              { title: "Livraison gratuite", sub: "Dès 50 000 FCFA d'achat", tag: "Offert" },
            ].map((o, i) => (
              <Reveal key={o.title} delay={i * 100}>
                <div className="surface-luxe hover-lift flex h-full items-center justify-between gap-4 rounded-lg p-7">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold">{o.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{o.sub}</p>
                  </div>
                  <span className="shrink-0 font-display text-2xl font-bold text-primary">
                    {o.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading
            eyebrow="Nos services"
            title="Réparation et assistance téléphone"
            subtitle="Diagnostic clair, prix annoncé avant intervention, garantie sur les réparations."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <div className="surface-luxe hover-lift flex h-full flex-col rounded-lg p-7">
                  <span className="grid size-12 place-items-center rounded-lg gold-hairline text-xl">
                    {s.icon}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-primary">{s.price}</p>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-md gold-hairline px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    Prendre rendez-vous
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-primary underline-offset-8 hover:underline"
            >
              Voir les 10 services
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Statistiques */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          eyebrow="Pourquoi nous choisir"
          title="Une boutique connue pour son suivi"
        />
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[
            { value: 5000, suffix: "+", label: "Clients satisfaits" },
            { value: 2500, suffix: "+", label: "Téléphones réparés" },
            { value: 1000, suffix: "+", label: "Produits vendus" },
            { value: 98, suffix: "%", label: "Taux de satisfaction" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="surface-luxe hover-lift rounded-lg p-8 text-center">
                <p className="text-4xl font-extrabold text-foreground sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Marques */}
      <section className="overflow-hidden border-y border-border py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-4 px-4 sm:px-6">
          {brands.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="font-display text-lg font-semibold tracking-wide text-muted-foreground/75 transition-colors hover:text-primary sm:text-xl"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* Témoignages */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          eyebrow="Témoignages"
          title="Avis de clients"
          subtitle="Des retours simples de clients accompagnés en boutique et à distance."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <figure className="surface-luxe hover-lift flex h-full flex-col rounded-lg p-7">
                <Stars value={5} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-secondary text-sm font-bold text-foreground">
                    {t.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-semibold">
                      {t.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Galerie */}
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading eyebrow="Galerie" title="Nos produits et notre atelier" />
          <div className="mt-14 columns-2 gap-5 md:columns-3 lg:columns-4 [&>*]:mb-5">
            {[
              images.heroPhones,
              images.catAirpods,
              images.catRepair,
              images.catWatch,
              images.catCharger,
              images.catHeadphones,
              images.catCases,
              images.heroPhones,
            ].map((src, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="group overflow-hidden rounded-lg gold-hairline">
                  <img
                    src={src}
                    alt="Produits et services Barry Global Business"
                    loading="lazy"
                    width={800}
                    height={800}
                    className="w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA contact */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <div className="surface-luxe relative overflow-hidden rounded-lg px-8 py-14 text-center sm:px-16">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Besoin d'un prix ou d'une réparation ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              {contact.address} — ouvert du lundi au samedi de 09h à 21h.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Écrire sur WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md gold-hairline px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Clock className="size-4" />
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
