import Link from "next/link";

const NavLinks = async () => {

    // fetch categories from the API
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
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 overflow-x-auto px-4 py-3 sm:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;