import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X, Phone } from "lucide-react";
import { useEcommerce } from "@/hooks/use-ecommerce";
import { cn } from "@/lib/utils";
import { contact, formatPrice } from "@/lib/catalog";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/boutique", label: "Boutique" },
  { to: "/categories", label: "Catégories" },
  { to: "/services", label: "Services" },
  { to: "/promotions", label: "Promotions" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { cartCount, favoritesCount, products } = useEcommerce();

  const results = products
    .filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase()))
    .slice(0, 6);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "border-b border-border bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          : "border-b border-border/70 bg-white",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-2 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-4"
          aria-label="Barry Global Business — accueil"
        >
          <div className="shrink-0">
            <img
              src="/LogoBGB.png"
              alt="Barry Global Business"
              className="h-14 w-auto object-contain sm:h-16"
            />
          </div>
        </Link>

        <nav className="hidden justify-center lg:flex" aria-label="Navigation principale">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{
                    className: "text-primary after:scale-x-100",
                  }}
                  className="relative px-3 py-2 text-sm font-medium text-[#555555] transition-colors after:absolute after:right-3 after:bottom-1 after:left-3 after:h-px after:origin-center after:scale-x-0 after:bg-primary after:transition-transform hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              aria-label="Rechercher"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <Search className="size-[18px]" />
            </button>
            {[
              { icon: Heart, label: "Favoris", to: "/favoris", count: favoritesCount },
              { icon: ShoppingBag, label: "Panier", to: "/panier", count: cartCount },
            ].map(({ icon: Icon, label, to, count }) => (
              <Link
                key={label}
                to={to}
                aria-label={label}
                className="relative grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                <Icon className="size-[18px]" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {count}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/contact"
              aria-label="Compte"
              className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <User className="size-[18px]" />
            </Link>
          </div>
          <button
            type="button"
            aria-label="Rechercher"
            onClick={() => setSearchOpen(true)}
            className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary md:hidden"
          >
            <Search className="size-[18px]" />
          </button>
          <Link
            to="/panier"
            aria-label="Panier"
            className="relative grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary md:hidden"
          >
            <ShoppingBag className="size-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-[var(--ink)] hover:text-white xl:inline-flex"
          >
            <Phone className="size-4" />
            {contact.phone}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-md gold-hairline text-primary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="block border-b border-border/60 py-3.5 text-base font-medium text-foreground/90"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3 px-4 pb-3 sm:px-6">
            <Link
              to="/favoris"
              onClick={() => setOpen(false)}
              className="rounded-md gold-hairline py-3 text-center text-sm font-semibold text-foreground"
            >
              Favoris ({favoritesCount})
            </Link>
            <Link
              to="/panier"
              onClick={() => setOpen(false)}
              className="rounded-md gold-hairline py-3 text-center text-sm font-semibold text-foreground"
            >
              Panier ({cartCount})
            </Link>
          </div>
          <div className="flex gap-3 px-4 pb-5 sm:px-6">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-md bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${contact.phoneRaw}`}
              className="flex-1 rounded-md gold-hairline py-3 text-center text-sm font-semibold text-foreground"
            >
              Appeler
            </a>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-background/95 px-4 py-6">
          <div className="mx-auto max-w-2xl">
            <div className="surface-luxe rounded-lg p-5">
              <div className="flex items-center gap-3">
                <Search className="size-5 text-primary" />
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher un produit..."
                  className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Fermer la recherche"
                  className="grid size-10 place-items-center rounded-md gold-hairline text-primary"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-5 grid gap-3">
                {(query.trim() ? results : products.slice(0, 4)).map((product) => (
                  <Link
                    key={product.id}
                    to="/produits/$slug"
                    params={{ slug: product.slug }}
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-secondary"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="size-16 rounded-md object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-sm font-semibold">
                        {product.name}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {product.condition} · {formatPrice(product.price)}
                      </span>
                    </span>
                  </Link>
                ))}
                {query.trim() && results.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Aucun produit trouvé.
                  </p>
                )}
              </div>
              <Link
                to="/boutique"
                onClick={() => {
                  setSearchOpen(false);
                  setQuery("");
                }}
                className="mt-5 flex justify-center rounded-md gold-hairline px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-[var(--ink)] hover:text-white"
              >
                Voir toute la boutique
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
