import { notFound } from "next/navigation";
import CategoryProducts from "../../components/CategoryProducts";

const CATEGORIES_API =
  "https://api.abcz.workers.dev/api/bazardor/categories";

const PRODUCTS_API =
  "https://api.abcz.workers.dev/api/bazardor/products";

async function getData(url) {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  if (Array.isArray(data.products)) {
    return data.products;
  }

  if (Array.isArray(data.categories)) {
    return data.categories;
  }

  return [];
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getData(CATEGORIES_API),
    getData(PRODUCTS_API),
  ]);

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <main className="min-h-screen bg-[#f0f5f0]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center gap-4 rounded-2xl border border-gray-200 bg-[#fbfdfb] p-5 sm:p-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-4xl">
            {category.icon || "🛒"}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#1f2922]">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <CategoryProducts products={categoryProducts} />
      </div>
    </main>
  );
}  