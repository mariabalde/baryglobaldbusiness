import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Barry Global Business" },
      {
        name: "description",
        content: "Utilisation des informations transmises à Barry Global Business.",
      },
    ],
  }),
  component: PolitiqueConfidentialite,
});

function PolitiqueConfidentialite() {
  return (
    <>
      <PageHeader
        eyebrow="Confidentialité"
        title="Politique de confidentialité"
        subtitle="Nous utilisons vos informations uniquement pour répondre à vos demandes et préparer vos commandes."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="surface-luxe space-y-8 rounded-lg p-8 text-sm leading-relaxed text-muted-foreground sm:p-10">
            {[
              {
                title: "Données collectées",
                text: "Nous pouvons collecter votre nom, téléphone, email, adresse de livraison et message lorsque vous nous contactez ou préparez une commande.",
              },
              {
                title: "Utilisation",
                text: "Ces informations servent à confirmer vos achats, organiser la livraison, répondre à vos questions et assurer le suivi après-vente.",
              },
              {
                title: "Partage",
                text: "Vos données ne sont pas revendues. Elles peuvent être transmises uniquement aux personnes nécessaires à la livraison ou au traitement de votre demande.",
              },
              {
                title: "Conservation",
                text: "Les informations sont conservées le temps nécessaire au suivi commercial, à la garantie et aux obligations de gestion.",
              },
              {
                title: "Vos droits",
                text: "Vous pouvez demander la correction ou la suppression de vos informations en contactant Barry Global Business.",
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
