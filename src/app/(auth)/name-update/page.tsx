
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/app/lib/auth-client";

export default function NameUpdatePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Session থেকে বর্তমান নাম একবার সেট করা
  if (session?.user && !initialized) {
    setName(session.user.name ?? "");
    setInitialized(true);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length < 2) {
      setError("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } =
        await authClient.updateUser({
          name: trimmedName,
        });

      if (updateError) {
        setError(
          updateError.message || "নাম আপডেট করা যায়নি।"
        );
        return;
      }

      setSuccess("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <main className="min-h-[60vh] bg-[#f1f6f2] px-4 py-12">
        <p className="text-center text-sm text-text-secondary">
          লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-[60vh] bg-[#f1f6f2] px-4 py-12">
        <div className="mx-auto max-w-md rounded-xl border border-border-custom bg-surface p-6 text-center">
          <h1 className="text-xl font-bold">
            লগইন প্রয়োজন
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            নাম আপডেট করতে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।
          </p>

          <Link
            href="/sign-in"
            className="mt-5 inline-block rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#f1f6f2] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-lg">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">
            নাম আপডেট
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
          </p>
        </div>

        {/* User information */}
        <section className="rounded-xl border border-border-custom bg-surface p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
              {session.user.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>

            <div className="min-w-0">
              <h2 className="truncate font-semibold text-text-primary">
                {session.user.name}
              </h2>

              <p className="truncate text-sm text-text-secondary">
                {session.user.email}
              </p>
            </div>
          </div>

          <div className="mb-5 border-t border-border-custom" />

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              আপনার নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
                setSuccess("");
              }}
              placeholder="আপনার নাম লিখুন"
              autoComplete="name"
              required
              minLength={2}
              disabled={loading}
              className="h-11 w-full rounded-lg border border-border-custom bg-surface px-3 text-sm text-text-primary outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10 disabled:opacity-60"
            />

            <p className="mt-2 text-xs text-text-secondary">
              আপনার নতুন নাম Navbar-এও প্রদর্শিত হবে।
            </p>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="mt-5 h-11 w-full rounded-lg bg-brand px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </form>
        </section>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-text-secondary transition hover:text-brand"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
