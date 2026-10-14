const Marquee = async () => {
  let products = [];

  // fetching data
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();

    products = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.products)
          ? data.products
          : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-11 items-center">

        {/* Left label */}
        <div className="relative z-10 flex h-full shrink-0 items-center gap-2 bg-green-700 px-4 text-sm font-bold text-white shadow-md">
          <span className="text-base">📊</span>
          <span>বাজারদর</span>
        </div>

        {/* Scrolling content */}
        <div className="group flex min-w-0 flex-1 overflow-hidden">
          {products.length > 0 ? (
            <div className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
              {[...products, ...products].map((product, index) => {
                const name = product.nameBn;
                const price = product.today;
                const change = product.change?.pct ?? 0;
                const direction = product.change?.dir;

                const isUp = direction === "up";
                const isDown = direction === "down";

                return (
                  <div
                    key={`${product.id}-${index}`}
                    className="flex shrink-0 items-center gap-2.5 border-r border-gray-200 px-5 text-xs sm:text-sm"
                  >
                    {/* Product emoji + name */}
                    <span className="text-base">
                      {product.image || product.categoryIcon || "🛒"}
                    </span>

                    <span className="whitespace-nowrap font-medium text-gray-700">
                      {name}
                    </span>

                    {/* Price */}
                    <span className="whitespace-nowrap font-bold text-gray-900">
                      ৳{price}/
                      {product.unit === "kg"
                        ? "কেজি"
                        : product.unit === "litre"
                          ? "লিটার"
                          : product.unit === "dozen"
                            ? "ডজন"
                            : product.unit === "piece"
                              ? "পিস"
                              : product.unit}
                    </span>

                    {/* Price change */}
                    <span
                      className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-bold ${
                        isUp
                          ? "bg-red-50 text-red-600"
                          : isDown
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span>
                        {isUp ? "▲" : isDown ? "▼" : "—"}
                      </span>

                      <span>
                        {change > 0 ? "+" : ""}
                        {change}%
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center px-4 text-sm text-gray-500">
              বাজারদরের তথ্য পাওয়া যাচ্ছে না।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marquee;

