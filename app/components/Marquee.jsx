const Marquee = async () => {
  let products = [];

  // Fetching data
  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
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
    <div className="overflow-hidden border-b border-gray-200 bg-[#f8faf8]">
      <div className="flex h-10 items-center">
        {/* Left label */}
        <div className="z-10 flex h-full shrink-0 items-center bg-green-700 px-3 text-sm font-bold text-white">
          বাজারদর
        </div>

        {/* Scrolling Content */}
        <div className="group flex min-w-0 flex-1 overflow-hidden">
          {products.length > 0 ? (
            <div className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
              {[...products, ...products].map((product, index) => {
                const name = product.nameBn;
                const price = Number(product.today) || 0;
                const change = Number(product.change?.pct) || 0;
                const direction = product.change?.dir;

                const isUp = direction === "up";
                const isDown = direction === "down";

                // Convert numbers to Bangla digits
                const banglaNumber = (number) =>
                  number.toLocaleString("bn-BD", {
                    maximumFractionDigits: 2,
                  });

                const unit =
                  product.unit === "kg"
                    ? "কেজি"
                    : product.unit === "litre" ||
                        product.unit === "liter"
                      ? "লিটার"
                      : product.unit === "dozen"
                        ? "ডজন"
                        : product.unit === "piece"
                          ? "পিস"
                          : product.unit;

                return (
                  <div
                    key={`${product.id}-${index}`}
                    className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-4 text-xs sm:text-sm"
                  >
                    {/* Product name */}
                    <span className="whitespace-nowrap font-medium text-gray-700">
                      {name}
                    </span>

                    {/* Price */}
                    <span className="whitespace-nowrap font-semibold text-gray-800">
                      ৳{banglaNumber(price)}/{unit}
                    </span>

                    {/* Price change */}
                    <span
                      className={`flex items-center gap-1 whitespace-nowrap font-semibold ${
                        isUp
                          ? "text-red-600"
                          : isDown
                            ? "text-green-600"
                            : "text-gray-500"
                      }`}
                    >
                      <span>
                        {isUp ? "▲" : isDown ? "▼" : "—"}
                      </span>

                      <span>
                        {change > 0 ? "+" : ""}
                        {banglaNumber(change)}%
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
