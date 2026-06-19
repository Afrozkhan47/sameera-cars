import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sameeracars.vercel.app"),

  verification: {
    google: "qledBtheGekXwGQ3mpuFlpVNRDtiWWnSqLG0hLyVaUc",
  },

  title: {
    default: "Sameera Cars | Verified Pre-Owned Cars in Pune",
    template: "%s | Sameera Cars",
  },

  description:
    "Browse verified pre-owned cars in Pune with transparent pricing, inspected quality, and easy WhatsApp enquiries.",

  keywords: [
    "Sameera Cars",
    "Used Cars Pune",
    "Second Hand Cars Pune",
    "Pre-Owned Cars Pune",
    "Car Dealer Pune",
    "Honda City Pune",
    "Hyundai i20 Pune",
    "Toyota Used Cars",
    "Maruti Suzuki",
    "Volkswagen",
    "Skoda",
    "BMW Pune",
    "Certified Used Cars",
    "Best Used Cars Pune",
  ],

  authors: [{ name: "Sameera Cars" }],

  creator: "Sameera Cars",

  publisher: "Sameera Cars",

  applicationName: "Sameera Cars",

  category: "Automotive",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://sameeracars.vercel.app",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sameeracars.vercel.app",
    siteName: "Sameera Cars",
    title: "Sameera Cars | Verified Pre-Owned Cars in Pune",
    description:
      "Browse verified pre-owned cars in Pune with transparent pricing, inspected quality, and easy WhatsApp enquiries.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sameera Cars",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sameera Cars | Verified Pre-Owned Cars in Pune",
    description:
      "Browse verified pre-owned cars in Pune with transparent pricing and inspected vehicles.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex w-full flex-col overflow-x-hidden">
        {children}
        <GoogleAnalytics gaId="G-WGVH9QBH0N" />
      </body>
    </html>
  );
}