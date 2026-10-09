import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { contact } from "@/lib/catalog";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Barry Global Business, Parcelle Assainie PA Unité 3" },
      {
        name: "description",
        content:
          "Contactez Barry Global Business : Parcelle Assainie PA Unité 3, Dakar. Téléphone et WhatsApp +221 77 326 52 52.",
      },
      { property: "og:title", content: "Contact — Barry Global Business" },
      {
        property: "og:description",
        content: "Boutique et atelier à Dakar, ouverts 7j/7. Écrivez-nous ou passez nous voir.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Votre nom est requis").max(100),
  email: z.string().trim().email("Adresse e-mail invalide").max(255),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10, "Message trop court").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = schema.safeParse(Object.fromEntries(form));
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((i) => (next[String(i.path[0])] = i.message));
      setErrors(next);
      return;
    }
    setErrors({});
    const values = result.data;
    const message = [
      "Bonjour Barry Global Business, je souhaite vous contacter depuis le site.",
      "",
      `Nom: ${values.name}`,
      `E-mail: ${values.email}`,
      values.phone ? `Téléphone: ${values.phone}` : null,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    e.currentTarget.reset();
    window.open(
      `${contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    toast.success("Conversation WhatsApp ouverte", {
      description: "Votre message est prêt à être envoyé à la boutique.",
    });
  };

  const field =
    "w-full rounded-md border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Passez nous voir ou écrivez-nous"
        subtitle="Notre équipe vous conseille sur l'achat, la réparation et le suivi de votre appareil."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="surface-luxe flex h-full flex-col gap-6 rounded-lg p-8">
              {[
                { icon: MapPin, label: "Adresse", value: contact.address, href: undefined },
                {
                  icon: Phone,
                  label: "Téléphone",
                  value: contact.phone,
                  href: `tel:${contact.phoneRaw}`,
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: contact.phone,
                  href: contact.whatsapp,
                },
                {
                  icon: Mail,
                  label: "E-mail",
                  value: contact.email,
                  href: `mailto:${contact.email}`,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md gold-hairline text-primary">
                    <Icon className="size-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="block break-words font-display text-sm font-semibold hover:text-primary"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-display text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-2 border-t border-border pt-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Horaires</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {contact.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-semibold">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={onSubmit} className="surface-luxe rounded-lg p-8" noValidate>
              <h2 className="font-display text-xl font-semibold">Envoyer un message</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Nom complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    className={`mt-2 ${field}`}
                    placeholder="Votre nom"
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`mt-2 ${field}`}
                    placeholder="vous@email.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Téléphone (facultatif)
                  </label>
                  <input id="phone" name="phone" className={`mt-2 ${field}`} placeholder="+221 …" />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`mt-2 ${field} resize-none`}
                    placeholder="Décrivez votre besoin : achat, réparation, flashage…"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="mt-7 w-full rounded-md bg-[var(--ink)] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto sm:px-10"
              >
                Envoyer le message
              </button>
            </form>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <div className="surface-luxe overflow-hidden rounded-lg">
            <iframe
              title="Localisation Barry Global Business — Parcelle Assainie PA Unité 3, Dakar"
              src="https://www.google.com/maps?q=Parcelles%20Assainies%20Unit%C3%A9%203%20Dakar&output=embed"
              loading="lazy"
              className="h-[420px] w-full border-0 grayscale-[35%]"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
