"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  API_BASE_URL_MAIN_CATEGORIES,
  fetchApi,
} from "../../lib/api";
import type { Category } from "../../types/product";
import { authClient , useSession } from "@/app/lib/auth-client";
// import { authClient } from "@/app/lib/auth-client";

// Price ticker type
type TickerItem = {
  emoji: string;
  name: string;
  price: string;
  unit: string;
  change: number;
};



 

// Demo ticker data
const tickerItems: TickerItem[] = [
  { emoji: "🍚", name: "চাল", price: "১৪৮", unit: "কেজি", change: 2.1 },
  { emoji: "🥔", name: "আলু", price: "৪০", unit: "কেজি", change: -3.2 },
  { emoji: "🧅", name: "পেঁয়াজ", price: "৬০", unit: "কেজি", change: 1.5 },
  { emoji: "🥚", name: "ডিম", price: "১২", unit: "পিস", change: 0 },
];

// API response থেকে Category বের করা
function extractCategories(result: unknown): Category[] {


  let data: unknown = result;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const response = data as Record<string, unknown>;
    data = response.categories ?? response.data ?? [];
  }

  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(
    (item): item is Category => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const category = item as Record<string, unknown>;

      return (
        (typeof category.id === "string" ||
          typeof category.id === "number") &&
        typeof category.slug === "string" &&
        typeof category.nameBn === "string"
      );
     
    }
    
  );
  
}

export default function Navbar() {
  const pathname = usePathname();
  
  const {data:session, } = useSession()
  console.log(session)
 
  // const authLink = <>
  // {
  //   session?.user? <>
  //   <span>{session.user.name}</span>
    
  //   </> : <>
    
  //   <div>
  //           <Link
  //             href="/sign-in"
  //             className="rounded-lg border border-brand px-3 py-2 text-sm font-semibold text-brand transition hover:bg-brand-light sm:px-4"
  //           >
  //             সাইন ইন
  //           </Link>

  //           <Link
  //             href="/sign-up"
  //             className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark sm:px-4"
  //           >
  //             সাইন আপ
  //           </Link>
  //         </div>
  //   </>
  // }
  
  // </>
  const [profileOpen, setProfileOpen] = useState(false);
const authLink = session?.user ? (
  <div className="relative">
    <button
      type="button"
      onClick={() => setProfileOpen(!profileOpen)}
      aria-expanded={profileOpen}
      className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-brand-light"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
        {session.user.name?.charAt(0)?.toUpperCase() ?? "U"}
      </span>

      <span className="max-w-24 truncate text-sm font-medium text-text-primary">
        {session.user.name}
      </span>

      <span className="text-xs" aria-hidden="true">
        {profileOpen ? "▲" : "▼"}
      </span>
    </button>

    {profileOpen && (
      <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-border-custom bg-surface p-2 shadow-lg">
        <div className="border-b border-border-custom px-3 py-3">
          <p className="truncate text-sm font-semibold text-text-primary">
            {session.user.name}
          </p>

          <p className="truncate text-xs text-text-secondary">
            {session.user.email}
          </p>
        </div>

        <Link
          href="/name-update"
          onClick={() => setProfileOpen(false)}
          className="block rounded-lg px-3 py-2 text-sm text-text-primary transition hover:bg-brand-light"
        >
          নাম আপডেট করুন
        </Link>

        <button
          type="button"
          onClick={async () => {
            const { error } = await authClient.signOut();

            if (error) {
              console.error("Sign out error:", error);
              return;
            }

            setProfileOpen(false);
            window.location.href = "/sign-in";
          }}
          className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          ↪ Sign Out
        </button>
      </div>
    )}
  </div>
) : (
  <div className="flex items-center gap-2">
    <Link
      href="/sign-in"
      className="rounded-lg border border-brand px-3 py-2 text-sm font-semibold text-brand transition hover:bg-brand-light sm:px-4"
    >
      সাইন ইন
    </Link>

    <Link
      href="/sign-up"
      className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark sm:px-4"
    >
      সাইন আপ
    </Link>
  </div>
);



  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryError, setCategoryError] = useState(false);
  const [date, setDate] = useState<string | null>(null);

  // Bangladesh date
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

    updateDate();

    return undefined;
  }, []);

  // Load categories from shared API
  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        setLoading(true);
        setCategoryError(false);

        const result = await fetchApi<unknown>(
          API_BASE_URL_MAIN_CATEGORIES
        );

        const data = extractCategories(result);

        if (!cancelled) {
          setCategories(data);
          setCategoryError(data.length === 0);
        }
      } catch (error) {
        console.error("Category loading error:", error);

        if (!cancelled) {
          setCategories([]);
          setCategoryError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
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
            {authLink}
          </div>
        </div>

        {/* Category navigation */}
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="flex gap-2 overflow-x-auto pb-3"
        >
          {loading ? (
            <span className="px-3 py-2 text-sm text-text-secondary">
              ক্যাটাগরি লোড হচ্ছে...
            </span>
          ) : categoryError ? (
            <span className="px-3 py-2 text-sm text-text-secondary">
              ক্যাটাগরি লোড করা যায়নি।
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
                  {category.icon && (
                    <span className="mr-1" aria-hidden="true">
                      {category.icon}
                    </span>
                  )}

                  {category.nameBn}
                </Link>
              );
            })
          )}
        </nav>
      </div>

      {/* Price ticker - demo data */}
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
