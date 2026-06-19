import type { Metadata } from "next";
import HeroSection from "@/components/home/hero-section"

export const metadata: Metadata = {
  title: {
    default: "Sameera Cars | Verified Pre-Owned Cars in Pune",
    template: "%s | Sameera Cars",
  },

  description:
    "Browse verified pre-owned cars in Pune. Transparent pricing, inspected vehicles, and easy WhatsApp enquiries.",

  keywords: [
    "Used Cars Pune",
    "Second Hand Cars Pune",
    "Pre Owned Cars",
    "Sameera Cars",
    "Car Dealer Pune",
    "Honda City Pune",
    "Hyundai i20 Pune",
    "Maruti Suzuki",
    "Toyota",
    "Skoda",
    "Volkswagen",
  ],

  authors: [{ name: "Sameera Cars" }],

  creator: "Sameera Cars",

  publisher: "Sameera Cars",

  metadataBase: new URL("https://sameeracars.vercel.app"),

  openGraph: {
    title: "Sameera Cars | Verified Pre-Owned Cars in Pune",

    description:
      "Browse verified pre-owned cars with transparent pricing and inspected quality.",

    url: "https://sameeracars.vercel.app",

    siteName: "Sameera Cars",

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Sameera Cars",

    description:
      "Verified pre-owned cars in Pune.",

  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      <HeroSection />
    </main>
  )
}