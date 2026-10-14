"use client";

import { signIn, signUp } from "@/app/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";
import Link from "next/link";

const SignUpFromPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: Record<string, FormDataEntryValue> = Object.fromEntries(
      formData.entries()
    );

    console.log("data from data", data);

    const { data: resData, error } = await signUp.email({
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
    });

    console.log("Full Data Messege", resData, error);
    if (error) {
  toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
} else {
  toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
}
  };

  const handelGoogleSign = async () => {
    const resData = await signIn.social({
      provider: "google",
    });

    console.log("Data Analaisis google", resData);
  };

  const handelGithubSign = async () => {
    const restData = await signIn.social({
      provider: "github",
    });

    console.log("Data Analaisis github", restData);
  };

  return (
    <div className="min-h-screen bg-[#eff5f0] text-[#183126]">
      {/* Signup Section */}
      <main className="mx-auto flex min-h-[calc(100vh-0px)] w-full flex-col">
        {/* Page Heading */}
        <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-14">
          <div className="mb-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#008d46] text-2xl text-white shadow-sm">
                🛒
              </span>

              <div className="text-left">
                <h1 className="text-2xl font-extrabold tracking-tight text-[#173b29]">
                  বাজার দর
                </h1>
                <p className="text-xs text-gray-500">
                  বাংলাদেশের নিত্যদিনের বাজারদর
                </p>
              </div>
            </div>

            <h2 className="mt-7 text-2xl font-bold text-[#183126] sm:text-3xl">
              অ্যাকাউন্ট তৈরি করুন
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              বাজার দরের সর্বশেষ তথ্য পেতে নিবন্ধন করুন।
            </p>
          </div>

          {/* Signup Card */}
          <div className="w-full max-w-md rounded-2xl border border-[#e4ece6] bg-white p-6 shadow-sm sm:p-8">
            <Form
              className="flex w-full flex-col gap-5"
              onSubmit={onSubmit}
            >
              {/* Name */}
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                  }
                  return null;
                }}
                className="w-full"
              >
                <Label className="mb-2 block text-sm font-semibold text-gray-700">
                  নাম
                </Label>

                <Input
                  placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                  className="h-11 w-full rounded-lg border border-[#dce7df] bg-[#fbfdfb] px-3 text-sm outline-none transition focus-within:border-[#159957]"
                />

                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              {/* Email */}
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      value
                    )
                  ) {
                    return "সঠিক ইমেইল ঠিকানা লিখুন";
                  }
                  return null;
                }}
                className="w-full"
              >
                <Label className="mb-2 block text-sm font-semibold text-gray-700">
                  ইমেইল
                </Label>

                <Input
                  placeholder="আপনার ইমেইল লিখুন"
                  className="h-11 w-full rounded-lg border border-[#dce7df] bg-[#fbfdfb] px-3 text-sm outline-none transition focus-within:border-[#159957]"
                />

                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              {/* Password */}
              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "কমপক্ষে একটি ইংরেজি বড় হাতের অক্ষর দিন";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "কমপক্ষে একটি সংখ্যা দিন";
                  }
                  return null;
                }}
                className="w-full"
              >
                <Label className="mb-2 block text-sm font-semibold text-gray-700">
                  পাসওয়ার্ড
                </Label>

                <Input
                  placeholder="একটি পাসওয়ার্ড তৈরি করুন"
                  className="h-11 w-full rounded-lg border border-[#dce7df] bg-[#fbfdfb] px-3 text-sm outline-none transition focus-within:border-[#159957]"
                />

                <Description className="mt-1 text-xs text-gray-500">
                  কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা দিন।
                </Description>

                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              {/* Confirm Password - Visual field only */}
              <TextField className="w-full">
                <Label className="mb-2 block text-sm font-semibold text-gray-700">
                  পাসওয়ার্ড নিশ্চিত করুন
                </Label>

                <Input
                  type="password"
                  placeholder="আবার পাসওয়ার্ড লিখুন"
                  className="h-11 w-full rounded-lg border border-[#dce7df] bg-[#fbfdfb] px-3 text-sm outline-none transition focus-within:border-[#159957]"
                />
              </TextField>

              {/* Submit */}
              <Button
                type="submit"
                className="mt-1 flex h-11 w-full items-center justify-center rounded-lg bg-[#008d46] px-4 text-sm font-semibold text-white transition hover:bg-[#00783b]"
              >
                অ্যাকাউন্ট তৈরি করুন
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-500">অথবা</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  type="button"
                  onClick={handelGoogleSign}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dce7df] bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <span className="font-bold text-[#4285F4]">G</span>
                  Google দিয়ে চালিয়ে যান
                </Button>

                <Button
                  type="button"
                  onClick={handelGithubSign}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#dce7df] bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <span className="text-base font-bold">⌘</span>
                  GitHub দিয়ে চালিয়ে যান
                </Button>
              </div>

              {/* Sign In Link */}
              <p className="w-full text-center text-sm text-gray-600">
                অ্যাকাউন্ট আছে?{" "}
                <a
                  href="/sign-in"
                  className="font-semibold text-[#008d46] transition hover:text-[#006d36] hover:underline"
                >
                  সাইন ইন করুন
                </a>
              </p>
            </Form>
          </div>

          {/* Back to Home */}
          <Link
            href="/"
            className="mt-6 text-sm text-gray-500 transition hover:text-[#008d46]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e1e9e3] bg-white px-5 py-5">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
            <p>বাজার দর — প্রতিদিনের বাজারদর জানুন সহজেই।</p>

            <p>
              সঠিক বাজার তথ্য, সচেতন কেনাকাটা এবং সাশ্রয়ী জীবন।
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default SignUpFromPage;
