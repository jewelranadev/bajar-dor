const UNIT_LABELS = {
  kg: "কেজি",
  kilogram: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

function PriceStat({ label, value, tone = "default" }) {
  const toneClass =
    tone === "low"
      ? "text-green-700"
      : tone === "high"
        ? "text-red-600"
        : "text-[#1f2922]";

  return (
    <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${toneClass}`}>
        {value ?? "—"}
        {value != null && (
          <span className="ml-1 text-sm font-medium text-gray-500">টাকা</span>
        )}
      </p>
    </div>
  );
}

export default function ProductSummary({ product }) {
  const unitLabel = UNIT_LABELS[product.unit] || product.unit;

  return (
    <section className="space-y-4">
      {/* Top summary */}
      <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-3xl">
            {product.image || "🛒"}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-[#1f2922] sm:text-2xl">
              {product.nameBn}
            </h1>

            {product.description && (
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                {product.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#f0f5ef] px-3 py-1 text-xs font-semibold text-green-800">
            {product.categoryNameBn || product.category || "অন্যান্য"}
          </span>

          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">
            প্রতি {unitLabel}
          </span>
        </div>
      </div>

      {/* Price summary */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-[#1f2922]">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PriceStat
            label="সর্বনিম্ন দাম"
            value={product.minPrice}
            tone="low"
          />
          <PriceStat
            label="সর্বোচ্চ দাম"
            value={product.maxPrice}
            tone="high"
          />
          <PriceStat label="গড় দাম" value={product.avgPrice} />
        </div>
      </div>
    </section>
  );
}
