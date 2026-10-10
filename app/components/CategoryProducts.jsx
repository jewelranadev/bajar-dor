"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function CategoryProducts({ products, loading = false }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...(products || [])];

    if (sortBy === "low-to-high") {
      result.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sortBy === "high-to-low") {
      result.sort((a, b) => Number(b.today) - Number(a.today));
    }

    return result;
  }, [products, sortBy]);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-200 bg-[#fbfdfb] px-4 py-3">
        <p className="text-sm text-gray-500">সাজান:</p>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#1f2922] outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 bg-[#fbfdfb] p-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-4 h-5 w-20 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] py-12 text-center">
          <p className="text-lg font-semibold text-[#1f2922]">
            404 — কোনো পণ্য পাওয়া যায়নি
          </p>

          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্যের তথ্য নেই।
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-500">
            মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => {
              const direction = product.change?.dir;
              const percentage = Number(product.change?.pct ?? 0);

              const isUp = direction === "up";
              const isDown = direction === "down";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="block rounded-xl border border-gray-200 bg-[#fbfdfb] p-3 transition hover:shadow-md"
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
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}