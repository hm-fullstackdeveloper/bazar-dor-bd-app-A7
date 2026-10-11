
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-green-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 sm:items-start">
          {/* Brand information */}
          <div>
          
            <p className="mt-3 max-w-sm text-sm leading-7 text-gray-600">
              বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Important links */}
          <div className="sm:text-right">
            <p className="mt-5 text-sm leading-6 text-gray-500">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর
              নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5 text-center">
          <p className="text-xs leading-6 text-gray-500">
            © {new Date().getFullYear()} বাজার দর (Bazar Dor)।
            সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
