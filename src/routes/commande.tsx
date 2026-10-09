import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { useEcommerce } from "@/hooks/use-ecommerce";
import { formatPrice } from "@/lib/catalog";
import type { OrderCustomer } from "@/lib/ecommerce";
import { createOrder } from "@/functions/orders.functions";

export const Route = createFileRoute("/commande")({
  head: () => ({
    meta: [
      { title: "Commande — Barry Global Business" },
      {
        name: "description",
        content: "Confirmez votre commande Barry Global Business par WhatsApp.",
      },
    ],
  }),
  component: Commande,
});

const schema = z.object({
  name: z.string().trim().min(2, "Votre nom est requis").max(100),
  phone: z.string().trim().min(7, "Votre téléphone est requis").max(30),
  address: z.string().trim().max(200),
  deliveryMode: z.enum(["livraison", "retrait"]),
  note: z.string().trim().max(500).optional(),
});

function Commande() {
  const { cartItems, cartTotal, buildWhatsAppOrderUrl, cartLines, clearCart } = useEcommerce();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const idempotencyKey = useRef(crypto.randomUUID());

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = schema.safeParse(Object.fromEntries(form));

    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        next[String(issue.path[0])] = issue.message;
      });
      setErrors(next);
      return;
    }

    const customer = result.data as OrderCustomer;
    if (customer.deliveryMode === "livraison" && customer.address.trim().length < 5) {
      setErrors({ address: "Adresse requise pour la livraison" });
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const result = await createOrder({
        data: { idempotencyKey: idempotencyKey.current, customer, items: cartLines },
      });
      window.open(
        buildWhatsAppOrderUrl(customer, result.orderNumber),
        "_blank",
        "noopener,noreferrer",
      );
      clearCart();
      toast.success("Commande enregistrée", { description: `Référence ${result.orderNumber}` });
    } catch (error) {
      toast.error("Commande non envoyée", {
        description: error instanceof Error ? error.message : "Réessayez dans quelques instants.",
      });
      idempotencyKey.current = crypto.randomUUID();
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <>
      <PageHeader
        eyebrow="Commande"
        title="Confirmer votre achat"
        subtitle="La commande est préparée sur WhatsApp avec vos produits et vos coordonnées."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {cartItems.length === 0 ? (
          <Reveal>
            <div className="surface-luxe rounded-lg p-10 text-center">
              <h2 className="text-2xl font-bold">Votre panier est vide</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Ajoutez au moins un produit avant de confirmer une commande.
              </p>
              <Link
                to="/boutique"
                className="mt-7 inline-flex rounded-md bg-[var(--ink)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Aller à la boutique
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
            <Reveal>
              <form onSubmit={onSubmit} className="surface-luxe rounded-lg p-8" noValidate>
                <h2 className="font-display text-xl font-semibold">Coordonnées</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      Nom complet
                    </label>
                    <input id="name" name="name" className={field} placeholder="Votre nom" />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      Téléphone
                    </label>
                    <input id="phone" name="phone" className={field} placeholder="+221 ..." />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Mode de réception
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <label className="cursor-pointer rounded-md gold-hairline p-4 text-sm">
                        <input
                          type="radio"
                          name="deliveryMode"
                          value="livraison"
                          defaultChecked
                          className="mr-2 accent-[var(--gold)]"
                        />
                        Livraison à Dakar
                      </label>
                      <label className="cursor-pointer rounded-md gold-hairline p-4 text-sm">
                        <input
                          type="radio"
                          name="deliveryMode"
                          value="retrait"
                          className="mr-2 accent-[var(--gold)]"
                        />
                        Retrait en boutique
                      </label>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      Adresse de livraison
                    </label>
                    <input
                      id="address"
                      name="address"
                      className={field}
                      placeholder="Quartier, repère, ville"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-destructive">{errors.address}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="note"
                      className="text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      Note facultative
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      rows={4}
                      className={`${field} resize-none`}
                      placeholder="Couleur souhaitée, modèle de téléphone, heure de livraison..."
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-8 w-full rounded-md bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
                >
                  {submitting ? "Enregistrement..." : "Envoyer la commande sur WhatsApp"}
                </button>
              </form>
            </Reveal>

            <Reveal delay={120}>
              <aside className="surface-luxe sticky top-28 rounded-lg p-6">
                <h2 className="font-display text-xl font-semibold">Résumé</h2>
                <div className="mt-6 space-y-4">
                  {cartItems.map(({ product, quantity, lineTotal }) => (
                    <div key={product.id} className="flex gap-3 border-b border-border pb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="size-16 rounded-md object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold">{product.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Quantité: {quantity}</p>
                        <p className="mt-1 text-sm font-bold text-foreground">
                          {formatPrice(lineTotal)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex justify-between gap-4 font-display text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </aside>
            </Reveal>
          </div>
        )}
      </section>
    </>
  );
}
