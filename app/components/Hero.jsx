import Link from "next/link";
import Image from "next/image";

const Hero = () => {
const date = new Date().toLocaleDateString("bn-BD", {
weekday: "long",
day: "numeric",
month: "long",
year: "numeric",
});

return ( <section className="overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50"> <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
{/* Left Side */} <div className="order-2 lg:order-1">
{/* Date */} <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm"> <span className="h-2 w-2 rounded-full bg-green-600"></span>
{date} </p>


      {/* heading */}
      <h1 className="text-3xl leading-snug font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[52px]">
        আজকের বাজারের দাম{" "}
        <span className="text-green-700">এক নজরে</span>
      </h1>

      {/* description */}
      <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
      </p>

      {/* CTA Button */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="#products"
          className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800"
        >
          সব পণ্য দেখুন
          <span aria-hidden="true">→</span>
        </Link>

      </div>
    </div>

    {/* right side */}
    <div className="order-1 lg:order-2">
      <div className="relative mx-auto max-w-lg">
        {/* Decorative Background */}
        <div className="absolute inset-4 rounded-[2rem] bg-green-200/50 blur-2xl"></div>

        {/* hero image */}
        <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-3 shadow-xl shadow-green-900/10 sm:p-5">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের বিভিন্ন পণ্য"
            width={600}
            height={450}
            priority
            className="h-auto w-full rounded-2xl object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </div>
    </div>
  </div>
</section>


);
};

export default Hero;
