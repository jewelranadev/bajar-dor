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
    </div>
  );
}