import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { contact, images, services } from "@/lib/catalog";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services de réparation — Barry Global Business" },
      {
        name: "description",
        content:
          "Réparation écran, batterie, caméra, connecteur, flashage, installation de logiciels, déblocage, diagnostic, maintenance et nettoyage à Dakar.",
      },
      { property: "og:title", content: "Services de réparation — Barry Global Business" },
      {
        property: "og:description",
        content: "Atelier expert, diagnostic offert et garantie sur chaque intervention.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Nos services"
        title="Réparation et maintenance téléphone"
        subtitle="Diagnostic, devis clair, intervention rapide et garantie sur les pièces."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="surface-luxe grid overflow-hidden rounded-lg lg:grid-cols-2">
            <img
              src={images.catRepair}
              alt="Technicien réparant un smartphone en atelier"
              loading="lazy"
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
            <div className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Un atelier pour les réparations du quotidien
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Nos techniciens interviennent sur toutes les marques : Apple, Samsung, Xiaomi,
                Tecno, Infinix, Oppo, Realme, Huawei, Google Pixel et Nothing. Micro-soudure,
                désoxydation, récupération de données et flashage complet.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                {[
                  "Diagnostic complet avant intervention",
                  "Pièces testées et garanties selon prestation",
                  "Réparation express selon disponibilité",
                  "Suivi de votre réparation par WhatsApp",
                ].map((l) => (
                  <li key={l} className="flex gap-3 text-muted-foreground">
                    <span className="text-primary">◆</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 50}>
              <div className="surface-luxe hover-lift flex h-full flex-col rounded-lg p-7">
                <span className="grid size-12 place-items-center rounded-lg gold-hairline text-xl">
                  {s.icon}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <p className="mt-4 text-xs uppercase tracking-widest text-primary">{s.price}</p>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Prendre rendez-vous
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
