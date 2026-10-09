"use client";

import { useEffect, useState } from "react";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#1f2922]">
          সব পণ্য
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          মোট {products.length}টি পণ্যের দাম দেখানো হচ্ছে
        </p>
      </div>

      {loading ? (
        <p className="py-6 text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      ) : products.length === 0 ? (
        <p className="py-6 text-sm text-gray-500">
          কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const direction = product.change?.dir;
            const percentage = Number(product.change?.pct ?? 0);

            const isUp = direction === "up";
            const isDown = direction === "down";

            return (
              <div
                key={product.id}
                className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-3 transition hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f5ef] text-2xl">
                    {product.image || "🥬"}
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#1f2922]">
                      {product.nameBn}
                    </h3>

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
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}