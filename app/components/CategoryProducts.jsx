"use client";

import { useMemo, useState } from "react";

export default function CategoryProducts({ products }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    } else if (sortBy === "change") {
      result.sort(
        (a, b) =>
          Math.abs(b.change?.pct ?? 0) -
          Math.abs(a.change?.pct ?? 0)
      );
    }

    return result;
  }, [products, sortBy]);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-200 bg-[#fbfdfb] px-4 py-3">
        <p className="text-sm text-gray-500">
          সাজান
        </p>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#1f2922] outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">
            দাম: কম থেকে বেশি
          </option>
          <option value="high-to-low">
            দাম: বেশি থেকে কম
          </option>
          <option value="change">
            পরিবর্তন অনুযায়ী
          </option>
        </select>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] py-12 text-center">
          <p className="text-lg font-semibold text-[#1f2922]">
            কোনো পণ্য পাওয়া যায়নি
          </p>

          <p className="mt-2 text-sm text-gray-500">
            এই category-তে বর্তমানে কোনো পণ্যের তথ্য নেই।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const direction = product.change?.dir;
            const percentage = Number(
              product.change?.pct ?? 0
            );

            const isUp = direction === "up";
            const isDown = direction === "down";

            return (
              <article
                key={product.id}
                className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-3 transition hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f5ef] text-2xl">
                    {product.image || "🛒"}
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#1f2922]">
                      {product.nameBn}
                    </h2>

                    <p className="text-xs text-gray-500">
                      প্রতি{" "}
                      {product.unit === "kg"
                        ? "কেজি"
                        : product.unit === "litre"
                          ? "লিটার"
                          : product.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      আজকের দাম
                    </p>

                    <p className="font-bold text-[#1f2922]">
                      {product.today} টাকা
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                    {Math.abs(percentage).toFixed(1)}%
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}