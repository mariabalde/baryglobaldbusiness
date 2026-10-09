import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products } from "@/lib/catalog";

const configuredBaseUrl = import.meta.env.VITE_SITE_URL;
const fallbackBaseUrl = "https://barryglobalbusiness.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/boutique", changefreq: "daily", priority: "0.9" },
          { path: "/categories", changefreq: "weekly", priority: "0.8" },
          { path: "/favoris", changefreq: "monthly", priority: "0.3" },
          { path: "/panier", changefreq: "monthly", priority: "0.3" },
          { path: "/commande", changefreq: "monthly", priority: "0.3" },
          { path: "/services", changefreq: "weekly", priority: "0.8" },
          { path: "/promotions", changefreq: "daily", priority: "0.8" },
          { path: "/a-propos", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/conditions-generales", changefreq: "yearly", priority: "0.3" },
          { path: "/politique-confidentialite", changefreq: "yearly", priority: "0.3" },
          ...products.map((product) => ({
            path: `/produits/${product.slug}`,
            changefreq: "weekly" as const,
            priority: "0.7",
          })),
        ];

        const baseUrl = String(configuredBaseUrl || fallbackBaseUrl).replace(/\/$/, "");

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${baseUrl}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
