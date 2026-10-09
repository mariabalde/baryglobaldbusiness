import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="border-t border-[#2f2f2f] bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-md bg-primary font-display font-bold text-primary-foreground">
                B
              </span>
              <span className="font-display text-base font-semibold">
                BARRY <span className="text-primary">GLOBAL BUSINESS</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#a7a7a7]">
              Vente de téléphones neufs et d'occasion, réparation, flashage et accessoires. Boutique
              basée à Dakar.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid size-10 place-items-center rounded-md border border-[#3a3a3a] text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="size-[18px]" />
              </a>
            </div>
          </div>

          <nav aria-label="Liens utiles">
            <h3 className="font-display text-sm uppercase tracking-[0.25em] text-primary">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-[#a7a7a7]">
              {[
                { to: "/boutique", label: "Boutique" },
                { to: "/categories", label: "Catégories" },
                { to: "/services", label: "Services" },
                { to: "/promotions", label: "Promotions" },
                { to: "/a-propos", label: "À propos" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.25em] text-primary">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-[#a7a7a7]">
              <li>Réparation écran & batterie</li>
              <li>Flashage & installation logiciels</li>
              <li>Déblocage & diagnostic</li>
              <li>Maintenance & nettoyage</li>
              <li>Accessoires informatiques</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.25em] text-primary">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-[#a7a7a7]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`tel:${contact.phoneRaw}`} className="hover:text-primary">
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`mailto:${contact.email}`} className="break-all hover:text-primary">
                  {contact.email}
                </a>
              </li>
              {contact.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-white">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#2f2f2f] pt-6 text-xs text-[#a7a7a7] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Barry Global Business. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/conditions-generales" className="hover:text-primary">
              Conditions générales
            </Link>
            <Link to="/politique-confidentialite" className="hover:text-primary">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
