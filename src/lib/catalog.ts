import heroPhones from "@/assets/hero-phones.jpg";
import catAirpods from "@/assets/cat-airpods.jpg";
import catAirpods1 from "@/assets/cat-airpods1.jpg";
import catAirpods2 from "@/assets/cat-airpods2.jpg";
import catAirpods3 from "@/assets/cat-airpods3.jpg";
import catAirpod4 from "@/assets/cat-airpod4.jpg";
import catWatch from "@/assets/cat-watch.jpg";
import catRepair from "@/assets/cat-repair.jpg";
import catRepair1 from "@/assets/cat-repair1.jpg";
import catCharger from "@/assets/cat-charger.jpg";
import chargeurBag from "@/assets/chargeurbag.jpg";
import catHeadphones from "@/assets/cat-headphones.jpg";
import catHeadphones1 from "@/assets/cat-headphones1.jpg";
import catHeadphones2 from "@/assets/cat-headphones2.jpg";
import catHeadphones3 from "@/assets/cat-headphones3.jpg";
import catHeadphone4 from "@/assets/cat-headphone4.jpg";
import catEcouteur from "@/assets/cat-ecouteur.jpg";
import catCases from "@/assets/cat-cases.jpg";
import silicone from "@/assets/silicone.jpg";
import silicone1 from "@/assets/silicone1.jpg";
import silicone2 from "@/assets/silicone2.jpg";
import silicone3 from "@/assets/silicone3.jpg";
import powerBank from "@/assets/power bank.jpg";
import powerbank1 from "@/assets/powerbank1.jpg";
import supportTel from "@/assets/supportTel.jpg";
import supportTel1 from "@/assets/supportTel1.jpg";
import supportTel2 from "@/assets/supportTel2.jpg";
import supportTel3 from "@/assets/supportTel3.jpg";

export const images = {
  heroPhones,
  catAirpods,
  catAirpods1,
  catAirpods2,
  catAirpods3,
  catAirpod4,
  catWatch,
  catRepair,
  catRepair1,
  catCharger,
  chargeurBag,
  catHeadphones,
  catHeadphones1,
  catHeadphones2,
  catHeadphones3,
  catHeadphone4,
  catEcouteur,
  catCases,
  silicone,
  silicone1,
  silicone2,
  silicone3,
  powerBank,
  powerbank1,
  supportTel,
  supportTel1,
  supportTel2,
  supportTel3,
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
  image: string;
  count: string;
};

const categoryItems = [
  {
    slug: "smartphones",
    name: "Smartphones",
    icon: "📱",
    image: heroPhones,
    count: "120+ modèles",
  },
  { slug: "airpods", name: "AirPods", icon: "🎧", image: catAirpods, count: "18 références" },
  { slug: "apple-watch", name: "Apple Watch", icon: "⌚", image: catWatch, count: "12 références" },
  { slug: "chargeurs", name: "Chargeurs", icon: "🔋", image: catCharger, count: "40+ références" },
  {
    slug: "bluetooth",
    name: "Casques Bluetooth",
    icon: "🎵",
    image: catHeadphones,
    count: "25 références",
  },
  { slug: "coques", name: "Coques", icon: "🛡", image: catCases, count: "200+ modèles" },
  {
    slug: "supports",
    name: "Supports téléphone",
    icon: "📲",
    image: supportTel,
    count: "8 modèles",
  },
  {
    slug: "verres-trempes",
    name: "Verres trempés",
    icon: "📱",
    image: catCases,
    count: "150+ modèles",
  },
  { slug: "flashage", name: "Flashage", icon: "💾", image: catRepair, count: "Toutes marques" },
  { slug: "reparation", name: "Réparation", icon: "🔧", image: catRepair, count: "Express 24h" },
  {
    slug: "informatique",
    name: "Accessoires PC",
    icon: "💻",
    image: catCharger,
    count: "60+ articles",
  },
] satisfies Category[];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  badge?: "Neuf" | "Occasion" | "Best-seller" | "Promo" | "Pack";
  warranty: string;
  condition: "Neuf" | "Occasion garantie" | "Pack";
  description: string;
  specs: string[];
};

const F = (n: number) => n;

export const products: Product[] = [
  {
    id: "p1",
    slug: "iphone-15-pro-max-256-go",
    name: "iPhone 15 Pro Max 256 Go",
    category: "smartphones",
    price: F(695000),
    oldPrice: F(820000),
    rating: 5,
    reviews: 128,
    stock: 6,
    image: heroPhones,
    badge: "Neuf",
    warranty: "12 mois",
    condition: "Neuf",
    description:
      "Smartphone contrôlé en boutique, livré avec accessoires essentiels et garantie écrite.",
    specs: ["256 Go", "Double SIM selon disponibilité", "Batterie testée", "Facture fournie"],
  },
  {
    id: "p2",
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    category: "smartphones",
    price: F(615000),
    oldPrice: F(710000),
    rating: 5,
    reviews: 94,
    stock: 4,
    image: heroPhones,
    badge: "Neuf",
    warranty: "12 mois",
    condition: "Neuf",
    description:
      "Galaxy puissant pour photo, productivité et autonomie, préparé par notre équipe avant remise.",
    specs: ["Écran AMOLED", "S Pen", "Charge rapide", "Garantie boutique"],
  },
  {
    id: "p3",
    slug: "airpods-pro-2-usb-c",
    name: "AirPods Pro 2 (USB-C)",
    category: "airpods",
    price: F(135000),
    oldPrice: F(165000),
    rating: 5,
    reviews: 212,
    stock: 15,
    image: catAirpods,
    badge: "Best-seller",
    warranty: "6 mois",
    condition: "Neuf",
    description: "Écouteurs sans fil avec réduction de bruit, testés et vérifiés avant livraison.",
    specs: ["USB-C", "Réduction de bruit", "Mode transparence", "Boîtier de charge"],
  },
  {
    id: "p9",
    slug: "airpods-3eme-generation",
    name: "AirPods 3e génération",
    category: "airpods",
    price: F(95000),
    oldPrice: F(120000),
    rating: 5,
    reviews: 86,
    stock: 12,
    image: catAirpods1,
    badge: "Neuf",
    warranty: "6 mois",
    condition: "Neuf",
    description:
      "AirPods confortables avec boîtier de charge, son spatial et autonomie longue durée.",
    specs: ["Son spatial", "Boîtier Lightning selon stock", "Micro intégré", "Garantie boutique"],
  },
  {
    id: "p10",
    slug: "airpods-2eme-generation",
    name: "AirPods 2e génération",
    category: "airpods",
    price: F(65000),
    oldPrice: F(85000),
    rating: 4,
    reviews: 104,
    stock: 18,
    image: catAirpods2,
    badge: "Promo",
    warranty: "3 mois",
    condition: "Neuf",
    description: "Écouteurs sans fil légers, pratiques pour appels, musique et usage quotidien.",
    specs: ["Bluetooth", "Boîtier de charge", "Micro appels", "Compatibilité iPhone"],
  },
  {
    id: "p18",
    slug: "airpods-max-style-bluetooth",
    name: "Casque style AirPods Max Bluetooth",
    category: "airpods",
    price: F(85000),
    oldPrice: F(110000),
    rating: 4,
    reviews: 68,
    stock: 10,
    image: catAirpods3,
    badge: "Promo",
    warranty: "3 mois",
    condition: "Neuf",
    description: "Casque style AirPods Max avec finition soignée et connexion Bluetooth stable.",
    specs: ["Bluetooth", "Arceau confortable", "Commandes intégrées", "Autonomie longue durée"],
  },
  {
    id: "p19",
    slug: "airpods-boitier-compact",
    name: "AirPods boîtier compact",
    category: "airpods",
    price: F(55000),
    rating: 4,
    reviews: 91,
    stock: 20,
    image: catAirpod4,
    badge: "Neuf",
    warranty: "3 mois",
    condition: "Neuf",
    description: "Écouteurs sans fil compacts pour appels, musique et utilisation quotidienne.",
    specs: ["Boîtier compact", "Micro intégré", "Bluetooth", "Compatible iOS et Android"],
  },
  {
    id: "p4",
    slug: "apple-watch-series-9-45mm",
    name: "Apple Watch Series 9 45mm",
    category: "apple-watch",
    price: F(285000),
    oldPrice: F(340000),
    rating: 4,
    reviews: 76,
    stock: 5,
    image: catWatch,
    badge: "Promo",
    warranty: "6 mois",
    condition: "Neuf",
    description:
      "Montre connectée élégante pour santé, sport et notifications, avec configuration possible en boutique.",
    specs: ["45 mm", "Suivi santé", "Notifications", "Bracelet inclus"],
  },
  {
    id: "p5",
    slug: "casque-bluetooth-anc",
    name: "Casque Bluetooth ANC",
    category: "bluetooth",
    price: F(72000),
    oldPrice: F(95000),
    rating: 4,
    reviews: 58,
    stock: 20,
    image: catHeadphones,
    badge: "Promo",
    warranty: "3 mois",
    condition: "Neuf",
    description:
      "Casque Bluetooth confortable avec réduction de bruit active pour appels, musique et travail.",
    specs: ["Bluetooth", "ANC", "Micro intégré", "Étui de transport"],
  },
  {
    id: "p20",
    slug: "casque-bluetooth-foldable",
    name: "Casque Bluetooth pliable",
    category: "bluetooth",
    price: F(28000),
    oldPrice: F(35000),
    rating: 4,
    reviews: 74,
    stock: 24,
    image: catHeadphones1,
    badge: "Promo",
    warranty: "3 mois",
    condition: "Neuf",
    description: "Casque Bluetooth pliable, léger et pratique pour les déplacements.",
    specs: ["Pliable", "Micro intégré", "Bluetooth", "Coussinets confort"],
  },
  {
    id: "p21",
    slug: "casque-bluetooth-gaming",
    name: "Casque Bluetooth gaming",
    category: "bluetooth",
    price: F(42000),
    rating: 4,
    reviews: 52,
    stock: 14,
    image: catHeadphones2,
    badge: "Neuf",
    warranty: "3 mois",
    condition: "Neuf",
    description: "Casque Bluetooth au design gaming pour musique, appels et divertissement.",
    specs: ["Bluetooth", "Micro", "Design gaming", "Basses renforcées"],
  },
  {
    id: "p22",
    slug: "casque-bluetooth-studio",
    name: "Casque Bluetooth studio",
    category: "bluetooth",
    price: F(52000),
    oldPrice: F(65000),
    rating: 5,
    reviews: 61,
    stock: 16,
    image: catHeadphones3,
    badge: "Best-seller",
    warranty: "3 mois",
    condition: "Neuf",
    description: "Casque Bluetooth confortable avec rendu sonore équilibré pour écoute prolongée.",
    specs: ["Son stéréo", "Micro appels", "Autonomie longue durée", "Arceau ajustable"],
  },
  {
    id: "p23",
    slug: "casque-bluetooth-compact-plus",
    name: "Casque Bluetooth compact plus",
    category: "bluetooth",
    price: F(35000),
    rating: 4,
    reviews: 47,
    stock: 19,
    image: catHeadphone4,
    badge: "Neuf",
    warranty: "3 mois",
    condition: "Neuf",
    description: "Casque compact, simple à transporter, idéal pour appels et musique.",
    specs: ["Bluetooth", "Format compact", "Micro intégré", "Charge USB"],
  },
  {
    id: "p6",
    slug: "chargeur-rapide-65w-cable-tresse",
    name: "Chargeur rapide 65W + câble tressé",
    category: "chargeurs",
    price: F(18500),
    oldPrice: F(25000),
    rating: 5,
    reviews: 340,
    stock: 48,
    image: catCharger,
    badge: "Promo",
    warranty: "3 mois",
    condition: "Neuf",
    description:
      "Pack charge rapide pour smartphone et accessoires compatibles, idéal pour usage quotidien.",
    specs: ["65W", "Câble tressé", "Protection surcharge", "USB-C"],
  },
  {
    id: "p11",
    slug: "pack-chargeur-cable-sac",
    name: "Pack chargeur + câble",
    category: "chargeurs",
    price: F(15000),
    oldPrice: F(22000),
    rating: 4,
    reviews: 73,
    stock: 35,
    image: chargeurBag,
    badge: "Pack",
    warranty: "3 mois",
    condition: "Pack",
    description:
      "Pack de charge complet pour téléphone, pratique à garder dans un sac ou au bureau.",
    specs: ["Chargeur secteur", "Câble inclus", "Format compact", "Garantie boutique"],
  },
  {
    id: "p7",
    slug: "coque-antichoc-verre-trempe-9h",
    name: "Coque antichoc + verre trempé 9H",
    category: "coques",
    price: F(9500),
    oldPrice: F(14000),
    rating: 4,
    reviews: 189,
    stock: 90,
    image: catCases,
    badge: "Pack",
    warranty: "7 jours",
    condition: "Pack",
    description:
      "Pack protection complet pour sécuriser votre téléphone contre chocs, rayures et traces.",
    specs: ["Coque antichoc", "Verre trempé 9H", "Pose possible", "Plusieurs modèles"],
  },
  {
    id: "p12",
    slug: "coque-silicone-iphone",
    name: "Coque silicone iPhone",
    category: "coques",
    price: F(7500),
    rating: 4,
    reviews: 131,
    stock: 80,
    image: silicone,
    badge: "Neuf",
    warranty: "7 jours",
    condition: "Neuf",
    description: "Coque silicone souple avec toucher doux et protection quotidienne.",
    specs: ["Silicone", "Plusieurs couleurs", "Protection caméra", "Pose rapide"],
  },
  {
    id: "p13",
    slug: "coque-silicone-renforcee",
    name: "Coque silicone renforcée",
    category: "coques",
    price: F(9000),
    rating: 5,
    reviews: 97,
    stock: 64,
    image: silicone1,
    badge: "Best-seller",
    warranty: "7 jours",
    condition: "Neuf",
    description: "Coque silicone renforcée pour protéger le téléphone avec une finition élégante.",
    specs: ["Antichoc", "Finition soignée", "Compatible MagSafe selon modèle", "Plusieurs modèles"],
  },
  {
    id: "p24",
    slug: "coque-silicone-antichoc",
    name: "Coque silicone antichoc",
    category: "coques",
    price: F(8500),
    rating: 4,
    reviews: 88,
    stock: 72,
    image: silicone2,
    badge: "Neuf",
    warranty: "7 jours",
    condition: "Neuf",
    description: "Coque silicone antichoc pour protéger le téléphone avec une prise en main douce.",
    specs: ["Silicone", "Coins renforcés", "Protection caméra", "Plusieurs modèles"],
  },
  {
    id: "p25",
    slug: "coque-silicone-magsafe",
    name: "Coque silicone MagSafe",
    category: "coques",
    price: F(12000),
    oldPrice: F(15000),
    rating: 5,
    reviews: 70,
    stock: 45,
    image: silicone3,
    badge: "Promo",
    warranty: "7 jours",
    condition: "Neuf",
    description: "Coque silicone compatible MagSafe selon modèle, élégante et protectrice.",
    specs: ["Silicone", "Compatible MagSafe", "Finition douce", "Protection complète"],
  },
  {
    id: "p8",
    slug: "iphone-13-128-go-occasion-garantie",
    name: "iPhone 13 128 Go — Occasion garantie",
    category: "smartphones",
    price: F(295000),
    oldPrice: F(360000),
    rating: 4,
    reviews: 41,
    stock: 3,
    image: heroPhones,
    badge: "Occasion",
    warranty: "6 mois",
    condition: "Occasion garantie",
    description:
      "iPhone d'occasion contrôlé point par point, batterie testée et garantie boutique incluse.",
    specs: ["128 Go", "Batterie vérifiée", "Face ID testé", "Occasion garantie"],
  },
  {
    id: "p14",
    slug: "power-bank-20000mah",
    name: "Power bank 20 000 mAh",
    category: "chargeurs",
    price: F(22000),
    oldPrice: F(30000),
    rating: 4,
    reviews: 62,
    stock: 22,
    image: powerBank,
    badge: "Promo",
    warranty: "3 mois",
    condition: "Neuf",
    description:
      "Batterie externe haute capacité pour charger smartphone et accessoires en déplacement.",
    specs: ["20 000 mAh", "USB-C", "Double sortie", "Indicateur batterie"],
  },
  {
    id: "p15",
    slug: "power-bank-compact-10000mah",
    name: "Power bank compact 10 000 mAh",
    category: "chargeurs",
    price: F(14500),
    rating: 4,
    reviews: 49,
    stock: 30,
    image: powerbank1,
    badge: "Neuf",
    warranty: "3 mois",
    condition: "Neuf",
    description: "Batterie externe compacte, facile à transporter au quotidien.",
    specs: ["10 000 mAh", "Format compact", "Charge rapide", "USB-A / USB-C"],
  },
  {
    id: "p16",
    slug: "support-telephone-bureau",
    name: "Support téléphone bureau",
    category: "supports",
    price: F(6500),
    rating: 4,
    reviews: 38,
    stock: 26,
    image: supportTel,
    badge: "Neuf",
    warranty: "7 jours",
    condition: "Neuf",
    description: "Support stable pour téléphone, idéal pour appels vidéo, bureau et comptoir.",
    specs: ["Angle ajustable", "Stable", "Compact", "Compatible smartphones"],
  },
  {
    id: "p26",
    slug: "support-telephone-voiture",
    name: "Support téléphone voiture",
    category: "supports",
    price: F(8000),
    rating: 4,
    reviews: 57,
    stock: 34,
    image: supportTel1,
    badge: "Neuf",
    warranty: "7 jours",
    condition: "Neuf",
    description:
      "Support téléphone pour voiture, stable et pratique pour GPS et appels mains libres.",
    specs: ["Voiture", "Rotation 360°", "Fixation stable", "Compatible smartphones"],
  },
  {
    id: "p27",
    slug: "support-telephone-ajustable",
    name: "Support téléphone ajustable",
    category: "supports",
    price: F(7000),
    rating: 4,
    reviews: 44,
    stock: 28,
    image: supportTel2,
    badge: "Neuf",
    warranty: "7 jours",
    condition: "Neuf",
    description: "Support ajustable pour bureau, vidéo, live et appels.",
    specs: ["Ajustable", "Stable", "Pliable", "Compatible smartphones"],
  },
  {
    id: "p28",
    slug: "support-telephone-stable",
    name: "Support téléphone stable",
    category: "supports",
    price: F(9500),
    oldPrice: F(12000),
    rating: 5,
    reviews: 36,
    stock: 18,
    image: supportTel3,
    badge: "Promo",
    warranty: "7 jours",
    condition: "Neuf",
    description: "Support stable pour bureau, comptoir ou voiture selon le modèle choisi.",
    specs: ["Premium", "Base stable", "Angle réglable", "Compatible smartphones"],
  },
  {
    id: "p17",
    slug: "ecouteurs-bluetooth-compact",
    name: "Écouteurs Bluetooth compact",
    category: "bluetooth",
    price: F(18000),
    oldPrice: F(25000),
    rating: 4,
    reviews: 55,
    stock: 32,
    image: catEcouteur,
    badge: "Promo",
    warranty: "3 mois",
    condition: "Neuf",
    description: "Écouteurs Bluetooth pratiques pour musique, appels et usage quotidien.",
    specs: ["Bluetooth", "Boîtier compact", "Micro intégré", "Autonomie longue durée"],
  },
  {
    id: "p29",
    slug: "diagnostic-reparation-smartphone",
    name: "Diagnostic réparation smartphone",
    category: "reparation",
    price: F(5000),
    rating: 5,
    reviews: 83,
    stock: 99,
    image: catRepair1,
    badge: "Neuf",
    warranty: "7 jours",
    condition: "Neuf",
    description: "Diagnostic rapide pour identifier la panne et proposer une solution claire.",
    specs: ["Diagnostic express", "Devis clair", "Toutes marques", "Conseil boutique"],
  },
];

export const categories: Category[] = categoryItems.map((category) => {
  const productCount = products.filter((product) => product.category === category.slug).length;

  return {
    ...category,
    count:
      productCount > 0 ? `${productCount} produit${productCount > 1 ? "s" : ""}` : category.count,
  };
});

export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const services = [
  {
    icon: "🖥",
    name: "Réparation écran",
    desc: "Remplacement d'écran original ou compatible, en 45 minutes.",
    price: "à partir de 20 000 FCFA",
  },
  {
    icon: "🔋",
    name: "Réparation batterie",
    desc: "Batterie neuve testée, autonomie restaurée, garantie 6 mois.",
    price: "à partir de 12 000 FCFA",
  },
  {
    icon: "📷",
    name: "Réparation caméra",
    desc: "Module photo avant/arrière, nettoyage optique et calibration.",
    price: "à partir de 15 000 FCFA",
  },
  {
    icon: "🔌",
    name: "Connecteur de charge",
    desc: "Nettoyage, ressoudure ou remplacement du connecteur.",
    price: "à partir de 10 000 FCFA",
  },
  {
    icon: "💾",
    name: "Flash téléphone",
    desc: "Flashage toutes marques, restauration système complète.",
    price: "à partir de 8 000 FCFA",
  },
  {
    icon: "🧩",
    name: "Installation logiciels",
    desc: "Applications, mises à jour, configuration complète.",
    price: "à partir de 5 000 FCFA",
  },
  {
    icon: "🩺",
    name: "Diagnostic",
    desc: "Bilan complet en 20 minutes, devis clair et sans surprise.",
    price: "offert",
  },
  {
    icon: "🔓",
    name: "Déblocage",
    desc: "Déblocage opérateur, compte et réseau, méthodes sécurisées.",
    price: "sur devis",
  },
  {
    icon: "🛠",
    name: "Maintenance",
    desc: "Entretien préventif, optimisation et sauvegarde de données.",
    price: "à partir de 7 000 FCFA",
  },
  {
    icon: "✨",
    name: "Nettoyage",
    desc: "Nettoyage ultrasons, désoxydation après contact liquide.",
    price: "à partir de 10 000 FCFA",
  },
];

export const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Tecno",
  "Infinix",
  "Oppo",
  "Realme",
  "Huawei",
  "Google Pixel",
  "Nothing",
];

export const testimonials = [
  {
    name: "Aminata Diallo",
    role: "Cliente fidèle",
    text: "Écran de mon iPhone changé en 40 minutes, qualité impeccable et accueil très professionnel.",
    initials: "AD",
  },
  {
    name: "Ousmane Barry",
    role: "Entrepreneur",
    text: "J'ai équipé toute mon équipe en téléphones. Prix imbattables et service après-vente au top.",
    initials: "OB",
  },
  {
    name: "Fatou Ndiaye",
    role: "Étudiante",
    text: "Mes AirPods étaient authentiques et livrés le jour même. Je recommande à 100 %.",
    initials: "FN",
  },
  {
    name: "Cheikh Sow",
    role: "Photographe",
    text: "Diagnostic gratuit, devis honnête, réparation réussie là où deux boutiques avaient échoué.",
    initials: "CS",
  },
];

export const formatPrice = (value: number) => `${value.toLocaleString("fr-FR")} FCFA`;

export const contact = {
  address: "Parcelle Assainie PA Unité 3, Dakar",
  phone: "+221 77 326 52 52",
  phoneRaw: "+221773265252",
  whatsapp: "https://wa.me/221773265252",
  email: "contact@barryglobalbusiness.com",
  hours: [
    { day: "Lundi – Samedi", value: "09h00 – 21h00" },
    { day: "Dimanche", value: "10h00 – 18h00" },
  ],
};
