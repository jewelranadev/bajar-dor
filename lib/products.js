// lib/products.js
const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

async function fetchAllProducts() {
  const res = await fetch(API_URL, { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : data.products || [];
}

// Min / max / average price are calculated from the per-market prices.
// Average = mean of each market's (min + max) / 2.
function summarize(product) {
  const markets = (product.markets || []).filter(
    (m) => Number.isFinite(Number(m.min)) && Number.isFinite(Number(m.max))
  );

  const today = Number(product.today);
  const pct = Math.abs(Number(product.change?.pct ?? 0));
  const dir = product.change?.dir;

  let minPrice = Number.isFinite(today) ? today : null;
  let maxPrice = minPrice;
  let avgPrice = minPrice;

  if (markets.length > 0) {
    minPrice = Math.min(...markets.map((m) => Number(m.min)));
    maxPrice = Math.max(...markets.map((m) => Number(m.max)));

    const midpoints = markets.map((m) => (Number(m.min) + Number(m.max)) / 2);
    avgPrice = Math.round(
      midpoints.reduce((sum, value) => sum + value, 0) / midpoints.length
    );
  }

  const trend =
    dir === "up"
      ? `গতকালের চেয়ে ${pct}% বেশি`
      : dir === "down"
        ? `গতকালের চেয়ে ${pct}% কম`
        : "গতকালের মতোই";

  const description =
    markets.length > 0
      ? `${markets.length}টি বাজারের তথ্য অনুযায়ী আজ গড় দাম ${avgPrice} টাকা, ${trend}।`
      : `আজকের দাম ${product.today} টাকা, ${trend}।`;

  return {
    ...product,
    description,
    categories: product.categoryNameBn ? [product.categoryNameBn] : [],
    minPrice,
    maxPrice,
    avgPrice,
  };
}

// Finds a product by slug (preferred) or by id, so old /product/1 links still work.
export async function getProductBySlug(key) {
  const products = await fetchAllProducts();

  const product = products.find(
    (p) => String(p.slug) === String(key) || String(p.id) === String(key)
  );

  return product ? summarize(product) : null;
}