

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

type TickerItem = {
  emoji: string;
  name: string;
  price: string;
  unit: string;
  change: number;
};

// আপাতত demo ticker data; পরে products API দিয়ে প্রতিস্থাপন করব।
const tickerItems: TickerItem[] = [
  { emoji: "🍚", name: "চাল", price: "১৪৮", unit: "কেজি", change: 2.1 },
  { emoji: "🥔", name: "আলু", price: "৪০", unit: "কেজি", change: -3.2 },
  { emoji: "🧅", name: "পেঁয়াজ", price: "৬০", unit: "কেজি", change: 1.5 },
  { emoji: "🥚", name: "ডিম", price: "১২", unit: "পিস", change: 0 },
];

export default function Navbar() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<string | null>(null);

  // Browser-এ তারিখ তৈরি করি, যাতে hydration mismatch এড়ানো যায়।
  useEffect(() => {
    const updateDate = () => {
      setDate(
        new Intl.DateTimeFormat("bn-BD", {
          timeZone: "Asia/Dhaka",
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date())
      );
    };

    const timer = window.setTimeout(updateDate, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(`${API_URL}/categories`);

        if (!response.ok) {
          throw new Error("Category API থেকে তথ্য পাওয়া যায়নি");
        }

        const result: unknown = await response.json();

        // API সরাসরি array অথবা object-এর মধ্যে array দিতে পারে।
        let data: unknown = result;

        if (!Array.isArray(data) && data && typeof data === "object") {
          const obj = data as Record<string, unknown>;
          data = obj.categories ?? obj.data ?? [];
        }

        if (!Array.isArray(data)) {
          throw new Error("Category API-এর response format সঠিক নয়");
        }

        const validCategories = data.filter(
          (item): item is Category =>
            item !== null &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            typeof item.slug === "string" &&
            typeof item.nameBn === "string" &&
            typeof item.icon === "string"
        );

        setCategories(validCategories);
      } catch (error) {
        console.error("Category loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  function formatPrice(value: string) {
    return Number(value).toLocaleString("bn-BD");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-custom bg-surface shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        {/* Logo, date and authentication */}
        <div className="flex items-center justify-between gap-3 py-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
            aria-label="বাজার দর হোম পেজ"
          >
            <span className="text-3xl" aria-hidden="true">
              🛒
            </span>

            <span>
              <span className="block text-xl font-extrabold text-brand">
                বাজার দর
              </span>

              <span className="block text-xs text-text-secondary">
                {date ?? "বাংলাদেশের বাজারদর"}
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/signin"
              className="rounded-lg border border-brand px-3 py-2 text-sm font-semibold text-brand transition hover:bg-brand-light sm:px-4"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark sm:px-4"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* API-powered category navigation */}
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="flex gap-2 overflow-x-auto pb-3"
        >
          {/* <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              pathname === "/"
                ? "bg-brand text-white"
                : "bg-brand-light text-text-primary hover:bg-brand-soft"
            }`}
          >
            🛍️ সব পণ্য
          </Link> */}

          {loading ? (
            <span className="px-3 py-2 text-sm text-text-secondary">
              ক্যাটাগরি লোড হচ্ছে...
            </span>
          ) : (
            categories.map((category) => {
              const href = `/category/${category.slug}`;
              const active = pathname === href;

              return (
                <Link
                  key={category.id}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-brand text-white"
                      : "bg-brand-light text-text-primary hover:bg-brand-soft"
                  }`}
                >
                  <span className="mr-1" aria-hidden="true">
                    {category.icon}
                  </span>
                  {category.nameBn}
                </Link>
              );
            })
          )}
        </nav>
      </div>

      {/* Price ticker */}
      <div className="overflow-hidden border-t border-border-custom bg-brand-light py-2">
        <div className="price-ticker flex w-max">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {tickerItems.map((item) => (
                <span
                  key={`${copy}-${item.name}`}
                  className="mx-5 whitespace-nowrap text-sm text-text-primary"
                >
                  {item.emoji} {item.name}{" "}
                  <strong>
                    {formatPrice(item.price)} টাকা/{item.unit}
                  </strong>{" "}
                  <span
                    className={
                      item.change > 0
                        ? "font-bold text-price-up"
                        : item.change < 0
                          ? "font-bold text-price-down"
                          : "text-price-flat"
                    }
                  >
                    {item.change > 0
                      ? "▲ "
                      : item.change < 0
                        ? "▼ "
                        : "— "}
                    {Math.abs(item.change).toLocaleString("bn-BD")}%
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
