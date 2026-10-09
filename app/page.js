import AllProducts from "./components/AllProducts";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import PriceSection from "./components/PriceSection";

export default function Home() {
  return (
    <div>
      <Marquee />
      <Hero />
      <PriceSection type="increased" />
      <PriceSection type="decreased" />

      <AllProducts />
      <Footer />
    </div>
  );
}