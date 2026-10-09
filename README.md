# Barry Global Business

Site vitrine et boutique légère pour Barry Global Business, spécialisé dans la vente de téléphones,
accessoires, réparation, flashage et services mobiles à Dakar.

## Stack

- React 19
- TanStack Router / TanStack Start
- Vite
- Tailwind CSS 4
- Radix UI / composants UI locaux
- Commande via WhatsApp

## Installation

```bash
npm install
npm run dev
```

## Base de donnees

Le projet utilise Drizzle ORM avec Postgres.

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Boutique et back-office

Le catalogue public est lu depuis Postgres. La création d'une commande enregistre d'abord
la demande en base, puis ouvre WhatsApp avec sa référence. Le stock est retiré à la
confirmation de la commande dans `/admin`, pas au simple ajout au panier.

Avant de déployer, applique les migrations puis configure ces secrets dans l'hébergeur
(et uniquement dans `.env` en local) :

```bash
npm run db:migrate
npm run db:seed
npm run admin:hash
```

Copie le hash affiché dans `ADMIN_PASSWORD_HASH`, puis définis `ADMIN_EMAIL` et un
`SESSION_SECRET` aléatoire d'au moins 32 caractères. Ne préfixe jamais ces variables par
`VITE_` et ne les ajoute jamais à Git. L'administration est disponible sur `/admin`.

Si tu veux explorer la base visuellement:

```bash
npm run db:studio
```

## Scripts

```bash
npm run dev        # serveur local
npm run build      # build production
npm run preview    # aperçu du build
npm run lint       # vérification ESLint
npm run format     # formatage Prettier
```

## Structure Principale

- `src/lib/catalog.ts`: produits, catégories, services, contact et prix.
- `src/lib/ecommerce.tsx`: panier, favoris et URL de commande WhatsApp.
- `src/routes`: pages du site.
- `src/components/site`: navigation, footer, cartes produit et blocs de page.
- `src/components/ui`: composants UI réutilisables.
- `src/assets`: images importées dans le catalogue.
- `src/db`: schema Drizzle et client Postgres.
- `drizzle`: migrations SQL versionnées.
- `scripts/seed.ts`: remplissage initial des catégories et produits.

## Points A Surveiller

- Le catalogue reste pour l'instant la source de vérité du front, mais les données sont maintenant prêtes à être injectées en base.
- Le panier et les favoris sont stockés dans le navigateur du visiteur.
- Les commandes et messages passent par WhatsApp; il n'y a pas encore de back-office.
- Les liens sociaux doivent être ajoutés seulement quand les vrais comptes officiels sont connus.

## Déploiement

Le build actuel cible Nitro/Cloudflare via la configuration Lovable. Eviter les réécritures
d'historique Git sur les branches connectées à Lovable.
