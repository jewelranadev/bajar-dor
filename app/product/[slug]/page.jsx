import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import ProductSummary from "../../components/ProductSummary";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/products";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?next=/product/${slug}`);
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6">
      <Link
        href="/"
        className="mb-4 inline-block text-sm text-gray-500 hover:text-green-700"
      >
        ← সব পণ্য
      </Link>

      <ProductSummary product={product} />

     
    </main>
  );
}