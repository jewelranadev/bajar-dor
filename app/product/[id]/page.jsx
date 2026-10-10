import { notFound } from "next/navigation";
import Link from "next/link";

async function getProducts() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return Array.isArray(data) ? data : data.products;
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") {
    return "—";
  }

  const number = Number(price);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

function getUnit(unit) {
  const units = {
    kg: "কেজি",
    kilogram: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  return units[String(unit || "").toLowerCase()] || unit || "কেজি";
}

function getValidMarkets(markets = []) {
  return markets
    .map((market) => ({
      ...market,
      min: Number(market.min),
      max: Number(market.max),
    }))
    .filter(
      (market) =>
        Number.isFinite(market.min) &&
        Number.isFinite(market.max) &&
        market.min >= 0 &&
        market.max >= market.min
    );
}

function getPriceSummary(product, markets) {
  const minimums = markets.map((market) => market.min);
  const maximums = markets.map((market) => market.max);

  const min =
    product.minPrice ??
    product.minimumPrice ??
    (minimums.length ? Math.min(...minimums) : null);

  const max =
    product.maxPrice ??
    product.maximumPrice ??
    (maximums.length ? Math.max(...maximums) : null);

  const avg =
    product.avgPrice ??
    product.averagePrice ??
    (markets.length
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : null);

  return { min, max, avg };
}

export default async function ProductDetails({ params }) {
  const { id } = await params;

  const products = await getProducts();

  const product = products?.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    notFound();
  }

  const unit = getUnit(product.unit);
  const markets = getValidMarkets(product.markets || []);
  const summary = getPriceSummary(product, markets);

  const change = product.change?.pct;
  const direction = product.change?.dir;

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-6 text-[#26312B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-600">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link href="/" className="hover:text-green-700">
            {product.categoryNameBn || "চাল"}
          </Link>

          <span>›</span>

          <span className="truncate">
            {product.nameBn}
          </span>
        </div>

        {/* Product Header */}
        <section className="mb-4 flex flex-col justify-between gap-5 rounded-xl border border-[#E1E9E1] bg-[#FAFCFA] p-5 sm:flex-row sm:items-center sm:p-6">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl">
              {product.image || product.categoryIcon || "🍚"}
            </div>

            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unit} · {product.categoryNameBn || "চাল"}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                গতকালের তুলনায় আজকের দামের পরিবর্তন
                {change !== undefined && change !== null && (
                  <span
                    className={`ml-1 font-semibold ${
                      direction === "up"
                        ? "text-red-600"
                        : direction === "down"
                          ? "text-green-600"
                          : "text-gray-600"
                    }`}
                  >
                    {direction === "up"
                      ? "▲"
                      : direction === "down"
                        ? "▼"
                        : "●"}{" "}
                    {formatPrice(change)}%
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex min-w-24 flex-col items-center justify-center rounded-xl bg-[#F0F5F0] px-5 py-3">
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-2xl font-bold">
              {formatPrice(product.today)}
            </p>

            <p className="text-xs text-gray-500">
              টাকা / {unit}
            </p>

            {change !== undefined && change !== null && (
              <p
                className={`mt-1 text-xs font-semibold ${
                  direction === "down"
                    ? "text-green-600"
                    : direction === "up"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {direction === "up"
                  ? "▲"
                  : direction === "down"
                    ? "▼"
                    : "●"}{" "}
                {formatPrice(change)}%
              </p>
            )}
          </div>
        </section>

        {/* Priceand Market Table */}
        <section className="rounded-xl border border-[#E1E9E1] bg-[#FAFCFA] p-4 sm:p-5">

          <h2 className="mb-3 text-sm font-bold">
            দামের সারসংক্ষেপ
          </h2>

          {/* Cards */}
          <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-3">

            {/* Minimum Price */}
            <div className="rounded-xl border border-[#E1E9E1] p-4">
              <p className="text-xs text-gray-600">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {formatPrice(summary.min)}{" "}
                <span className="text-xs font-normal">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-[11px] text-gray-500">
                সব বাজারের সর্বনিম্ন দাম
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-xl border border-[#E1E9E1] p-4">
              <p className="text-xs text-gray-600">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-1 text-xl font-bold text-red-600">
                {formatPrice(summary.max)}{" "}
                <span className="text-xs font-normal">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-[11px] text-gray-500">
                সব বাজারের সর্বোচ্চ দাম
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-[#E1E9E1] p-4">
              <p className="text-xs text-gray-600">
                গড় দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {formatPrice(summary.avg)}{" "}
                <span className="text-xs font-normal">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-[11px] text-gray-500">
                প্রতি {unit}-এর গড় হিসাব
              </p>
            </div>
          </div>

          {/* Market Prices */}
          <h2 className="mb-3 text-sm font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-hidden rounded-xl border border-[#E1E9E1]">

            {markets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse text-left text-xs">

                  <thead className="bg-[#F7FAF7] text-gray-500">
                    <tr>
                      <th className="px-3 py-3 font-medium sm:px-4">
                        বাজার
                      </th>

                      <th className="px-3 py-3 font-medium sm:px-4">
                        বিভাগ
                      </th>

                      <th className="px-3 py-3 text-right font-medium sm:px-4">
                        সর্বনিম্ন
                      </th>

                      <th className="px-3 py-3 text-right font-medium sm:px-4">
                        সর্বোচ্চ
                      </th>

                      <th className="px-3 py-3 text-right font-medium sm:px-4">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => {
                      const average = (market.min + market.max) / 2;

                      return (
                        <tr
                          key={`${market.market || "market"}-${index}`}
                          className={`border-t border-[#D9E1D9] ${
                            index % 2 === 0
                              ? "bg-[#FAFCFA]"
                              : "bg-[#F0F5F0]"
                          }`}
                        >
                          <td className="whitespace-nowrap px-3 py-3 font-medium sm:px-4">
                            {market.market || "তথ্য নেই"}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                            {market.division || "তথ্য নেই"}
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right sm:px-4">
                            {formatPrice(market.min)} টাকা
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right sm:px-4">
                            {formatPrice(market.max)} টাকা
                          </td>

                          <td className="whitespace-nowrap px-3 py-3 text-right font-semibold sm:px-4">
                            {formatPrice(average)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="px-4 py-8 text-center text-sm text-gray-500">
                এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}