import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { contact } from "@/lib/catalog";

export const Route = createFileRoute("/conditions-generales")({
  head: () => ({
    meta: [
      { title: "Conditions générales — Barry Global Business" },
      {
        name: "description",
        content: "Conditions de vente, garantie, livraison et service après-vente.",
      },
    ],
  }),
  component: ConditionsGenerales,
});

function ConditionsGenerales() {
  return (
    <>
      <PageHeader
        eyebrow="Conditions"
        title="Conditions générales"
        subtitle="Les règles simples qui encadrent vos achats, réparations et garanties."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="surface-luxe space-y-8 rounded-lg p-8 text-sm leading-relaxed text-muted-foreground sm:p-10">
            {[
              {
                title: "Commandes",
                text: "Toute commande passée sur le site est confirmée par WhatsApp ou par téléphone avant préparation. Les prix affichés sont en FCFA et peuvent varier selon disponibilité.",
              },
              {
                title: "Livraison et retrait",
                text: `La livraison est confirmée avec le client selon l'adresse fournie. Le retrait est possible à ${contact.address}.`,
              },
              {
                title: "Garanties",
                text: "Chaque produit indique sa durée de garantie. La garantie couvre les défauts constatés dans un usage normal et ne couvre pas les chocs, liquides ou mauvaises manipulations.",
              },
              {
                title: "Réparations",
                text: "Un diagnostic et un devis sont communiqués avant intervention. Les délais dépendent de la panne, de la disponibilité des pièces et de la marque de l'appareil.",
              },
              {
                title: "Retours",
                text: "Tout retour doit être validé par Barry Global Business avec facture ou preuve d'achat. Le produit doit être complet et dans son état de remise.",
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {section.title}
                </h2>
                <p className="mt-3">{section.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
