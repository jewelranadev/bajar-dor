"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

export default function PriceSection({ type }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isIncreased = type === "increased";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      isIncreased
        ? product.change?.dir === "up"
        : product.change?.dir === "down"
    )
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      {/* Section Title */}
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#1f2922]">
        <span className={isIncreased ? "text-red-500" : "text-green-600"}>
          {isIncreased ? "▲" : "▼"}
        </span>

        {isIncreased ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে"}
      </h2>

      {/* Loading */}
      {loading ? (
        <p className="text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-sm text-gray-500">
          কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group block rounded-xl border border-[#E1E9E1] bg-[#FAFCFA] p-3 transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
            >
              {/* Product Information */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F5F0] text-2xl">
                  {product.image || product.categoryIcon || "🥬"}
                </div>

                <div>
                  <h3 className="font-semibold text-[#1f2922] transition group-hover:text-green-700">
                    {product.nameBn}
                  </h3>

                  <p className="text-xs text-gray-500">
                    প্রতি{" "}
                    {product.unit === "kg" ||
                    product.unit === "kilogram"
                      ? "কেজি"
                      : product.unit === "litre" ||
                          product.unit === "liter"
                        ? "লিটার"
                        : product.unit || "একক"}
                  </p>
                </div>
              </div>

              {/* Price and Percentage */}
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    আজকের দাম
                  </p>

                  <p className="font-bold text-[#1f2922]">
                    {product.today ?? "—"} টাকা
                  </p>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    isIncreased
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {isIncreased ? "▲" : "▼"}{" "}
                  {Math.abs(Number(product.change?.pct) || 0)}%
                </span>
              </div>

              {/* Details Link Text */}
              <div className="mt-3 border-t border-[#E8EEE8] pt-2 text-right text-xs font-medium text-green-700">
                বিস্তারিত দেখুন →
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}