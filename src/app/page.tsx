

// import Image from "next/image";
// import Link from "next/link";
import AllProducts from "./components/products/AllProducts";

import PriceUp from "./components/price-up/page";
import PriceDown from "./components/price-down/page";
import Baneer from "./components/baneer/page";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-brand-light">
      {/* Hero Section */}

      {/* Products Section */}
      <Baneer/>
      <PriceUp />
      <PriceDown />
      <AllProducts />
    </div>
  );
}
