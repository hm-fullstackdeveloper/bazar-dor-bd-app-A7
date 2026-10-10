

import Image from "next/image";
import Link from "next/link";
import AllProducts from "./components/products/AllProducts";

import ProductSections from "./components/price-up/page";
import ProductFallSections from "./components/price-down/page";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-brand-light">
      {/* Hero Section */}
      <section className="relative isolate m-2 overflow-hidden  bg-w sm:m-4 lg:m-8">
        {/* Decorative background shape */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-white opacity-70 blur-3xl"
        />

        <div className="mx-auto grid w-full  max-w-9xl grid-cols-1 items-center justify-between gap-3  sm:px-6 sm:py-12 md:grid-cols-2 md:gap-8 lg:gap-12 lg:px-10 lg:py-16">
          {/* Left: Text */}
          <div className="mx-auto w-full max-w-5xl  text-center md:mx-0 md:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-custom bg-page px-4 py-2 text-sm font-semibold text-brand-dark shadow-sm">
              <span aria-hidden="true">🇧🇩</span>
              <span>বাংলাদেশের নিত্যদিনের বাজারদর</span>
            </div>

            <h1 className="text-xl font-extrabold leading-snug tracking-tight text-text-primary sm:text-2xl md:text-3xl lg:text-4xl">
              আজকের বাজারের দাম এক নজরে,
            </h1>

            <p className="mx-auto mt-4 max-w-md text-[2px] leading-6 text-text-secondary sm:text-base sm:leading-7 md:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম - বাজারভিত্তিক বিস্তারিত,গড়, সর্বনিম্ন-
              <br></br>সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <Link
                href="#sob-ponno"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-bold text-white shadow-lg shadow-green-800/15 transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                সব পণ্য দেখুন
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>





          {/* Right: Banner Image */}
          <div className="relative mx-auto w-full max-w-xl md:ml-auto md:mr-0">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-[2rem] bg-white blur-xl"
            />

            <div className="relative mx-auto  w-full max-w-md  shadow-green-900/10 sm:aspect-[4/3] md:aspect-[4/3]">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজার"
                fill
                priority
                sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) 45vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
  
      <ProductSections />
      <ProductFallSections />
      <AllProducts />
    </div>
  );
}
