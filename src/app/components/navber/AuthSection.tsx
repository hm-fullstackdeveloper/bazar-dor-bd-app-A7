
"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient, useSession } from "@/app/lib/auth-client";

export default function AuthSection() {
  const { data: session } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);

  if (!session?.user) {
    return (
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
  }

  const user = session.user;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setProfileOpen((prev) => !prev)}
        aria-expanded={profileOpen}
        className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-brand-light"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
          {user.name?.charAt(0)?.toUpperCase() ?? "U"}
        </span>

        <span className="max-w-24 truncate text-sm font-medium text-text-primary">
          {user.name}
        </span>

        <span className="text-xs" aria-hidden="true">
          {profileOpen ? "▲" : "▼"}
        </span>
      </button>

      {profileOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-border-custom bg-surface p-2 shadow-lg">
          <div className="border-b border-border-custom px-3 py-3">
            <p className="truncate text-sm font-semibold text-text-primary">
              {user.name}
            </p>

            <p className="truncate text-xs text-text-secondary">
              {user.email}
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
  );
}
