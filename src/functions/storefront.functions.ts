import { createServerFn } from "@tanstack/react-start";
import { asc, eq } from "drizzle-orm";
import type { Category, Product } from "@/lib/catalog";

function asProduct(row: {
  legacyId: string;
  slug: string;
  name: string;
  categorySlug: string;
  price: number;
  oldPrice: number | null;
  rating: string;
  reviews: number;
  stock: number;
  imageUrl: string;
  badge: Product["badge"] | null;
  warranty: string;
  condition: Product["condition"];
  description: string;
  specs: string[];
}): Product {
  return {
    id: row.legacyId,
    slug: row.slug,
    name: row.name,
    category: row.categorySlug,
    price: row.price,
    oldPrice: row.oldPrice ?? undefined,
    rating: Number(row.rating),
    reviews: row.reviews,
    stock: row.stock,
    image: row.imageUrl,
    badge: row.badge ?? undefined,
    warranty: row.warranty,
    condition: row.condition,
    description: row.description,
    specs: row.specs,
  };
}

export const getStorefrontCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const [{ db }, { categories, products }] = await Promise.all([
    import("@/db/client"),
    import("@/db/schema"),
  ]);
  const [categoryRows, productRows] = await Promise.all([
    db
      .select()
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(asc(categories.sortOrder)),
    db.select().from(products).where(eq(products.isActive, true)).orderBy(asc(products.name)),
  ]);

  const mappedProducts = productRows.map((row) =>
    asProduct({ ...row, specs: row.specs as string[] }),
  );
  const mappedCategories: Category[] = categoryRows.map((category) => {
    const count = mappedProducts.filter((product) => product.category === category.slug).length;
    return {
      slug: category.slug,
      name: category.name,
      icon: category.icon,
      image: category.imageUrl,
      count: `${count} référence${count > 1 ? "s" : ""}`,
    };
  });
  return { products: mappedProducts, categories: mappedCategories };
});
