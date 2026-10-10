import AllProducts from "./components/AllProducts";

import Hero from "./components/Hero";
import PriceSection from "./components/PriceSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <PriceSection type="increased" />
      <PriceSection type="decreased" />

      <AllProducts />
      
    </div>
  );
}