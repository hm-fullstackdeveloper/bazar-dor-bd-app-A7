import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar";
import Navbar from "../app/components/Navbar";
import Fotter from "../app/components/fotter/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html
    //   lang="bn"
    //   className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    // >
    <html
  lang="bn"
  suppressHydrationWarning
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  
>
      <body className="flex min-h-full flex-col bg-brand-light">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Fotter/>
      </body>
    </html>
  );
}
