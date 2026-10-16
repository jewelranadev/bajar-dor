import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-extrabold text-green-700">404</p>
      <h1 className="mt-3 text-xl font-semibold text-[#1f2922]">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        আপনি যে লিংকটি খুঁজছেন তা নেই বা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}