import Link from "next/link";

const NavLinks = async () => {
  // Fetch categories from your existing API
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  const categories = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-3 sm:gap-3">

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-transparent px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:border-green-100 hover:bg-green-50 hover:text-green-700"
            >
              {category.icon && (
                <span className="text-base">
                  {category.icon}
                </span>
              )}

              <span>{category.nameBn}</span>
            </Link>
          ))}

        </div>
      </div>
    </nav>
  );
};

export default NavLinks;