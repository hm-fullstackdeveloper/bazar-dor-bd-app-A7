
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function baneerPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const date = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date());

      setCurrentDate(date);
    };

    updateDate();

    const timer = window.setInterval(updateDate, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="relative isolate overflow-hidden rounded-2xl bg-w">
          {/* Decorative background shape */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-white opacity-70 blur-3xl"
          />

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-12">
            {/* Left: Text */}
            <div className="w-full text-center md:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-custom bg-page px-4 py-2 text-sm font-semibold text-brand-dark shadow-sm">
                <span aria-hidden="true">📅</span>
                <span>{currentDate || "আজকের তারিখ"}</span>
              </div>

              <h1 className="text-xl font-extrabold leading-snug tracking-tight text-text-primary sm:text-2xl md:text-3xl lg:text-4xl">
                আজকের বাজারের দাম এক নজরে,
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-text-secondary sm:text-base sm:leading-7 md:mx-0">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম - বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-
                <br />
                সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
              </p>

              {/* CTA Button */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <Link
                  href="#all-products"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-bold text-white shadow-lg shadow-green-800/15 transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  সব পণ্য দেখুন
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right: Banner Image */}
            <div className="relative mx-auto w-full max-w-lg md:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[2rem] bg-white blur-xl"
              />

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg shadow-green-900/10">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজার"
                  fill
                  priority
                  sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 45vw, 560px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
