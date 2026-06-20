"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { FaWhatsapp, FaInstagram } from "react-icons/fa"
import { CONTACT } from "@/lib/contact"

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Sameera+cars,+Police+Station,+Pune+Nagar+Rd,+near+Yerwada,+Indira+Park+CHS,+Mahindra+Society,+Yerawada,+Pune,+Maharashtra+411006/@18.552114,73.8958849,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c11938c5548d:0x81a9a61c52278e5d!8m2!3d18.552114!4d73.8958849!16s%2Fg%2F11yyndmpcd"

export function Footer() {
  // Use 2026 as explicitly requested in the prompt
  const currentYear = "2026"

  return (
    <footer className="w-full border-t border-zinc-200/50 bg-[#fcfcfc] pb-5 pt-8 md:pb-6 md:pt-12">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Column 1: Brand & About */}
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-3 inline-block">
              <span className="font-serif text-2xl font-normal tracking-wide text-zinc-900">
                SAMEERA CARS
              </span>
            </Link>
            <p className="mb-4 max-w-md text-sm leading-snug text-zinc-500">
              pre-owned cars in Pune. Carefully inspected vehicles with
              transparent pricing and a smooth buying experience.
            </p>
            <address className="mb-3 text-[13px] not-italic leading-normal text-zinc-500">
              <span className="mb-0.5 block font-medium text-zinc-800">
                Sameera Cars
              </span>
              Police Station Road, Near Yerawada
              <br />
              Indira Park CHS, Mahindra Society
              <br />
              Pune – 411006
            </address>
            <div className="text-[13px] leading-normal text-zinc-500">
              <span className="mb-0.5 block font-medium text-zinc-800">
                Opening Hours
              </span>
              Monday – Sunday
              <br />
              10:00 AM – 8:00 PM
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start lg:pl-8">
            <h3 className="mb-3 text-sm font-semibold tracking-wider text-zinc-900 uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-500 transition-colors hover:text-[#b48a47]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cars"
                  className="text-sm text-zinc-500 transition-colors hover:text-[#b48a47]"
                >
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/cars#showroom"
                  className="text-sm text-zinc-500 transition-colors hover:text-[#b48a47]"
                >
                  Contact / Showroom
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div className="flex flex-col items-start">
            <h3 className="mb-3 text-sm font-semibold tracking-wider text-zinc-900 uppercase">
              Contact
            </h3>

            <div className="mb-4 flex flex-col space-y-3">
              <div className="group">
                <p className="mb-0.5 text-[13px] font-medium text-zinc-800">
                  Primary Contact: Sameer Shaikh
                </p>
                <a
                  href="tel:+917038398343"
                  className="text-sm text-zinc-500 transition-colors group-hover:text-[#b48a47]"
                >
                  +91 70383 98343
                </a>
              </div>
              <div className="group">
                <p className="mb-0.5 text-[13px] font-medium text-zinc-800">
                  Sales: Hyat Bains
                </p>
                <a
                  href="tel:+919595767650"
                  className="text-sm text-zinc-500 transition-colors group-hover:text-[#b48a47]"
                >
                  +91 95957 67650
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-[#25D366]/10 hover:text-[#25D366]"
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp className="h-[18px] w-[18px]" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
                aria-label="Open in Google Maps"
              >
                <MapPin className="h-[18px] w-[18px]" />
              </motion.a>

              {CONTACT.instagram && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-[#E1306C]/10 hover:text-[#E1306C]"
                  aria-label="Follow on Instagram"
                >
                  <FaInstagram className="h-[18px] w-[18px]" />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-zinc-200/60 pt-5 sm:flex-row">
          <p className="mb-3 text-[13px] text-zinc-400 sm:mb-0">
            © {currentYear} Sameera Cars
          </p>
          <p className="text-[13px] text-zinc-400">
            Designed & Developed by <span className="font-medium">Afroz Khan</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
