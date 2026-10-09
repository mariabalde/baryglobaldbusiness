import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  Archive,
  Boxes,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  PackageSearch,
  Pencil,
  Plus,
  RotateCcw,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/section";
import {
  createProduct,
  getAdminDashboard,
  loginAdmin,
  logoutAdmin,
  setProductActive,
  updateProduct,
  updateOrderStatus,
} from "@/functions/admin.functions";

export const Route = createFileRoute("/admin")({
  loader: () => getAdminDashboard(),
  head: () => ({
    meta: [
      { title: "Administration — Barry Global Business" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const data = Route.useLoaderData();
  return data.authenticated ? <Dashboard data={data} /> : <Login />;
}

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="Connexion sécurisée"
        subtitle="Accès réservé à l'équipe Barry Global Business."
      />
      <form
        className="mx-auto my-16 max-w-md space-y-5 surface-luxe rounded-lg p-8"
        onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          try {
            await loginAdmin({ data: { email, password } });
            await router.invalidate();
          } catch (error) {
            // Keep the message generic for users, but preserve the technical
            // error in DevTools to diagnose server-function/CSRF failures.
            console.error("Échec de connexion administrateur", error);
            toast.error("Identifiants invalides ou configuration administrateur absente.");
          } finally {
            setPending(false);
          }
        }}
      >
        <label className="block text-sm font-medium">
          E-mail
          <input
            className="mt-2 w-full rounded-md border border-input p-3"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label className="block text-sm font-medium">
          Mot de passe
          <input
            className="mt-2 w-full rounded-md border border-input p-3"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        <button
          disabled={pending}
          className="w-full rounded-md bg-[var(--ink)] px-5 py-3 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </>
  );
}

function Dashboard({
  data,
}: {
  data: Extract<Awaited<ReturnType<typeof getAdminDashboard>>, { authenticated: true }>;
}) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | "new" | null>(null);
  const refresh = async () => router.invalidate();
  const action = async (key: string, callback: () => Promise<unknown>) => {
    setPending(key);
    try {
      await callback();
      await refresh();
      toast.success("Mise à jour enregistrée");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Action impossible");
    } finally {
      setPending(null);
    }
  };
  const statusLabel = {
    pending: "En attente",
    confirmed: "Confirmée",
    preparing: "Préparation",
    ready: "Prête",
    delivered: "Livrée",
    cancelled: "Annulée",
  } as const;
  const nextStatus = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["preparing", "cancelled"],
    preparing: ["ready", "cancelled"],
    ready: ["delivered", "cancelled"],
    delivered: [],
    cancelled: [],
  } as const;
  const statusClass = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-violet-100 text-violet-800",
    ready: "bg-cyan-100 text-cyan-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-rose-100 text-rose-800",
  } as const;
  const pendingOrders = data.orders.filter((order) => order.status === "pending").length;
  const activeOrders = data.orders.filter((order) =>
    ["confirmed", "preparing", "ready"].includes(order.status),
  ).length;
  const deliveredTotal = data.orders
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + order.total, 0);
  const lowStock = data.products.filter((product) => product.stock <= 3).length;
  return (
    <div className="min-h-screen bg-[#f6f5f1] py-6 sm:py-10">
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="overflow-hidden rounded-2xl bg-[var(--ink)] text-white shadow-[0_18px_50px_rgba(0,0,0,0.14)]">
          <div className="flex flex-col gap-7 p-6 sm:p-9 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#e4ce8a]">
                <LayoutDashboard className="size-3.5" /> ESPACE D’ADMINISTRATION
              </div>
              <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
                Bonjour, Barry Global
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                Pilotez les commandes, le stock et les ventes depuis un seul endroit.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/6 p-3 pr-4">
              <div className="grid size-9 place-items-center rounded-lg bg-[var(--gold)] font-bold text-[var(--ink)]">
                {data.email.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/55">Connecté en tant que</p>
                <p className="max-w-48 truncate text-sm font-semibold">{data.email}</p>
              </div>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-white/10 px-4 sm:px-6">
            {[
              { href: "#apercu", label: "Vue d’ensemble", icon: LayoutDashboard },
              { href: "#commandes", label: "Commandes", icon: ShoppingCart },
              { href: "#stock", label: "Stock", icon: Boxes },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 py-4 text-sm font-medium text-white/65 transition-colors hover:border-[var(--gold)] hover:text-white"
              >
                <Icon className="size-4" />
                {label}
              </a>
            ))}
          </nav>
        </header>
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Toutes les modifications sont enregistrées en base de données.
          </p>
          <button
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-muted-foreground shadow-sm transition-colors hover:border-rose-200 hover:text-rose-700"
            onClick={() => action("logout", () => logoutAdmin())}
          >
            <LogOut className="size-4" /> Se déconnecter
          </button>
        </div>
        <div id="apercu" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "À confirmer",
              value: pendingOrders,
              icon: ClipboardList,
              accent: "bg-amber-100 text-amber-700",
            },
            {
              label: "Commandes en cours",
              value: activeOrders,
              icon: Truck,
              accent: "bg-blue-100 text-blue-700",
            },
            {
              label: "Ventes livrées",
              value: `${deliveredTotal.toLocaleString("fr-FR")} FCFA`,
              icon: CircleDollarSign,
              accent: "bg-emerald-100 text-emerald-700",
            },
            {
              label: "Stock à surveiller",
              value: lowStock,
              icon: PackageSearch,
              accent: "bg-rose-100 text-rose-700",
            },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div
              key={label}
              className="rounded-2xl border border-[#e7e4dc] bg-white p-5 shadow-[0_4px_16px_rgba(23,23,23,0.04)]"
            >
              <div className="flex items-start justify-between">
                <span className={`grid size-10 place-items-center rounded-xl ${accent}`}>
                  <Icon className="size-5" />
                </span>
                <span className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  Aujourd’hui
                </span>
              </div>
              <p className="mt-6 text-2xl font-bold tracking-tight">{value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <div
          id="commandes"
          className="mt-8 overflow-x-auto rounded-2xl border border-[#e7e4dc] bg-white p-5 shadow-[0_4px_16px_rgba(23,23,23,0.04)] sm:p-6"
        >
          <div>
            <h2 className="text-xl font-bold">Dernières commandes</h2>
            <p className="mt-1 text-sm text-muted-foreground">Les 50 demandes les plus récentes.</p>
          </div>
          <table className="mt-5 w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-3">Référence</th>
                <th className="p-3">Client</th>
                <th className="p-3">Total</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-14 text-center text-muted-foreground">
                    Aucune commande pour le moment.
                  </td>
                </tr>
              ) : (
                data.orders.map((order) => (
                  <tr key={order.id} className="border-b border-border">
                    <td className="p-3 font-medium">{order.orderNumber}</td>
                    <td className="p-3">
                      {order.customerName}
                      <br />
                      <span className="text-muted-foreground">{order.customerPhone}</span>
                    </td>
                    <td className="p-3">{order.total.toLocaleString("fr-FR")} FCFA</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[order.status]}`}
                      >
                        {statusLabel[order.status]}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        {nextStatus[order.status].map((status) => (
                          <button
                            key={status}
                            disabled={pending === order.id}
                            onClick={() =>
                              action(order.id, () =>
                                updateOrderStatus({ data: { orderId: order.id, status } }),
                              )
                            }
                            className={
                              status === "cancelled"
                                ? "rounded-md border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60"
                                : "rounded-md bg-[var(--ink)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary disabled:opacity-60"
                            }
                          >
                            {status === "cancelled"
                              ? "Annuler"
                              : `Marquer ${statusLabel[status].toLowerCase()}`}
                          </button>
                        ))}
                        {nextStatus[order.status].length === 0 && (
                          <span className="text-xs text-muted-foreground">Aucune action</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div
          id="stock"
          className="mt-8 rounded-2xl border border-[#e7e4dc] bg-white p-5 shadow-[0_4px_16px_rgba(23,23,23,0.04)] sm:p-6"
        >
          <div className="flex items-start gap-3">
            <PackageSearch className="mt-0.5 size-5 text-primary" />
            <div>
              <h2 className="text-xl font-bold">Stock produits</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Chaque modification est conservée dans l’historique du stock.
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditingProductId("new")}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary"
          >
            <Plus className="size-4" /> Ajouter un produit
          </button>
          {data.products.length === 0 ? (
            <p className="py-14 text-center text-sm text-muted-foreground">
              Aucun produit disponible.
            </p>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {data.products.map((product) => {
                const stockClass =
                  product.stock === 0
                    ? "bg-rose-100 text-rose-700"
                    : product.stock <= 3
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-700";
                return (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-xl border border-[#e7e4dc] bg-[#fcfcfa] shadow-sm"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold leading-snug">{product.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {product.price.toLocaleString("fr-FR")} FCFA
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${stockClass}`}
                        >
                          {product.stock} en stock
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className={`text-xs font-medium ${product.isActive ? "text-emerald-700" : "text-muted-foreground"}`}>
                          {product.isActive ? "Visible en boutique" : "Archivé"}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProductId(product.id)}
                            className="rounded-md border border-border p-2 hover:border-primary"
                            aria-label={`Modifier ${product.name}`}
                            title="Modifier"
                          >
                            <Pencil className="size-4" aria-hidden="true" />
                          </button>
                          <button
                            disabled={pending === `active-${product.id}`}
                            onClick={() =>
                              action(`active-${product.id}`, () =>
                                setProductActive({ data: { id: product.id, isActive: !product.isActive } }),
                              )
                            }
                            className="rounded-md border border-border p-2 hover:border-primary disabled:opacity-60"
                            aria-label={`${product.isActive ? "Archiver" : "Réactiver"} ${product.name}`}
                            title={product.isActive ? "Archiver" : "Réactiver"}
                          >
                            {product.isActive ? (
                              <Archive className="size-4" aria-hidden="true" />
                            ) : (
                              <RotateCcw className="size-4" aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
        {editingProductId && (
          <ProductEditor
            product={
              editingProductId === "new"
                ? undefined
                : data.products.find((product) => product.id === editingProductId)
            }
            categories={data.categories}
            onClose={() => setEditingProductId(null)}
            onSaved={async () => {
              setEditingProductId(null);
              await refresh();
            }}
          />
        )}
      </section>
    </div>
  );
}

type ProductEditorProduct = Extract<
  Awaited<ReturnType<typeof getAdminDashboard>>,
  { authenticated: true }
>["products"][number];
type ProductEditorCategory = Extract<
  Awaited<ReturnType<typeof getAdminDashboard>>,
  { authenticated: true }
>["categories"][number];

function ProductEditor({
  product,
  categories,
  onClose,
  onSaved,
}: {
  product?: ProductEditorProduct;
  categories: ProductEditorCategory[];
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    categorySlug: product?.categorySlug ?? categories[0]?.slug ?? "",
    price: String(product?.price ?? ""),
    oldPrice: product?.oldPrice ? String(product.oldPrice) : "",
    stock: String(product?.stock ?? 0),
    imageUrl: product?.imageUrl ?? "",
    badge: product?.badge ?? "",
    warranty: product?.warranty ?? "3 mois",
    condition: product?.condition ?? "Neuf",
    description: product?.description ?? "",
    specs: product?.specs.join("\n") ?? "",
  });
  const update = (name: keyof typeof form, value: string) => setForm((current) => ({ ...current, [name]: value }));
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const data = {
      name: form.name,
      categorySlug: form.categorySlug,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      stock: Number(form.stock),
      imageUrl: form.imageUrl,
      badge: form.badge || null,
      warranty: form.warranty,
      condition: form.condition as "Neuf" | "Occasion garantie" | "Pack",
      description: form.description,
      specs: form.specs.split("\n").map((spec) => spec.trim()).filter(Boolean),
    };
    try {
      if (product) await updateProduct({ data: { ...data, id: product.id } });
      else await createProduct({ data });
      toast.success(product ? "Produit mis à jour" : "Produit ajouté");
      await onSaved();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Enregistrement impossible");
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 p-4 sm:p-8">
      <form onSubmit={submit} className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-xl font-bold">{product ? "Modifier le produit" : "Ajouter un produit"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Les champs marqués sont publiés dans la boutique.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md border border-border px-3 py-1.5 text-sm font-semibold">Fermer</button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ProductField label="Nom"><input required value={form.name} onChange={(e) => update("name", e.target.value)} className="admin-input" /></ProductField>
          <ProductField label="Catégorie"><select required value={form.categorySlug} onChange={(e) => update("categorySlug", e.target.value)} className="admin-input">{categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</select></ProductField>
          <ProductField label="Prix (FCFA)"><input required min="0" type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className="admin-input" /></ProductField>
          <ProductField label="Ancien prix / promo (facultatif)"><input min="0" type="number" value={form.oldPrice} onChange={(e) => update("oldPrice", e.target.value)} className="admin-input" /></ProductField>
          <ProductField label="Stock"><input required min="0" type="number" value={form.stock} onChange={(e) => update("stock", e.target.value)} className="admin-input" /></ProductField>
          <ProductField label="État"><select value={form.condition} onChange={(e) => update("condition", e.target.value)} className="admin-input"><option>Neuf</option><option>Occasion garantie</option><option>Pack</option></select></ProductField>
          <ProductField label="Badge"><select value={form.badge} onChange={(e) => update("badge", e.target.value)} className="admin-input"><option value="">Aucun</option><option>Neuf</option><option>Occasion</option><option>Best-seller</option><option>Promo</option><option>Pack</option></select></ProductField>
          <ProductField label="Garantie"><input required value={form.warranty} onChange={(e) => update("warranty", e.target.value)} className="admin-input" /></ProductField>
        </div>
        <div className="mt-4"><ProductField label="Image (URL ou chemin)"><input required type="text" value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} placeholder="https://… ou /catalog/image.jpg" className="admin-input" /></ProductField></div>
        <div className="mt-4"><ProductField label="Description"><textarea required value={form.description} onChange={(e) => update("description", e.target.value)} className="admin-input min-h-24" /></ProductField></div>
        <div className="mt-4"><ProductField label="Caractéristiques (une par ligne)"><textarea value={form.specs} onChange={(e) => update("specs", e.target.value)} placeholder="256 Go&#10;Double SIM&#10;Garantie 12 mois" className="admin-input min-h-28" /></ProductField></div>
        <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold">Annuler</button><button disabled={pending || categories.length === 0} className="rounded-lg bg-[var(--ink)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Enregistrement…" : "Enregistrer"}</button></div>
      </form>
    </div>
  );
}

function ProductField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium">{label}<span className="mt-1.5 block">{children}</span></label>;
}
