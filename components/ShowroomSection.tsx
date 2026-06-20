"use client"

import React from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { MapPin, Clock, Phone, CheckCircle2, Navigation } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { CONTACT } from "@/lib/contact"

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Sameera+cars,+Police+Station,+Pune+Nagar+Rd,+near+Yerwada,+Indira+Park+CHS,+Mahindra+Society,+Yerawada,+Pune,+Maharashtra+411006/@18.552114,73.8958849,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c11938c5548d:0x81a9a61c52278e5d!8m2!3d18.552114!4d73.8958849!16s%2Fg%2F11yyndmpcd"

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function ShowroomSection() {
  return (
    <section className="relative z-20 mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative overflow-hidden rounded-[32px] border border-zinc-200/60 bg-white/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.03)] backdrop-blur-xl md:p-8 lg:p-10"
      >
        {/* Ambient Glow Background */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-amber-400/10 blur-[100px]"
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.span
            variants={itemVariants}
            className="mb-4 text-[11px] font-bold tracking-[0.2em] text-[#b48a47] uppercase"
          >
            Visit Our Showroom
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mb-6 max-w-2xl text-4xl font-serif leading-[1.1] tracking-tight text-zinc-900 md:text-5xl lg:text-6xl"
          >
            Visit Sameera Cars <br></br>
            in Pune
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-[600px] text-base leading-relaxed text-zinc-500 md:text-lg"
          >
            Browse our inspected inventory in person, compare vehicles, speak
            with our team and experience your next car before making your
            decision.
          </motion.p>

          {/* Cards Grid */}
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Location */}
            <motion.a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group cursor-pointer flex flex-col items-start rounded-2xl border border-zinc-200/60 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:border-[#b48a47]/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors duration-300 group-hover:bg-[#b48a47]/10 group-hover:text-[#b48a47]">
                <MapPin className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-zinc-900">
                Location
              </h3>
              <address className="text-[13px] not-italic leading-relaxed text-zinc-500">
                <span className="block font-medium text-zinc-700">Sameera Cars</span>
                Police Station Road, Near Yerawada<br />
                Indira Park CHS, Mahindra Society<br />
                Pune – 411006
              </address>
            </motion.a>

            {/* Card 2: Opening Hours */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group cursor-pointer flex flex-col items-start rounded-2xl border border-zinc-200/60 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:border-[#b48a47]/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors duration-300 group-hover:bg-[#b48a47]/10 group-hover:text-[#b48a47]">
                <Clock className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-zinc-900">
                Opening Hours
              </h3>
              <p className="text-[13px] leading-relaxed text-zinc-500">
                Monday – Sunday<br />
                10:00 AM – 8:00 PM
              </p>
            </motion.div>

            {/* Card 3: Call Us */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col items-start rounded-2xl border border-zinc-200/60 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:border-[#b48a47]/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors duration-300 group-hover:bg-[#b48a47]/10 group-hover:text-[#b48a47]">
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-[1.05]" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-zinc-900">
                Call Us
              </h3>
              <div className="space-y-3 text-[13px]">
                <div>
                  <p className="font-medium text-zinc-800">Sameer Shaikh</p>
                  <p className="text-zinc-500"><a href="tel:+917038398343">
                    +91 70383 98343
                  </a></p>
                </div>
                <div>
                  <p className="font-medium text-zinc-800">Hyat Bains</p>
                  <p className="text-zinc-500"><a href="tel:+91 95957 67650">
                    +91 95957 67650
                  </a></p>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Why Visit? */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col items-start rounded-2xl border border-zinc-200/60 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:border-[#b48a47]/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors duration-300 group-hover:bg-[#b48a47]/10 group-hover:text-[#b48a47]">
                <CheckCircle2 className="h-4 w-4 transition-transform duration-300 group-hover:scale-[1.05]" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-zinc-900">
                Why Visit?
              </h3>
              <ul className="flex flex-col gap-1.5 text-[13px] text-zinc-500">
                <li className="flex items-center gap-2">
                  <span className="text-[#b48a47]">✓</span> Test Drive Available
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#b48a47]">✓</span> RC Verified Vehicles
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#b48a47]">✓</span> Inspection Completed
                </li>
              </ul>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <motion.a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-2xl sm:w-auto"
            >
              <Navigation className="h-4 w-4 transition-transform group-hover:-rotate-12" />
              Open in Google Maps
            </motion.a>

            <motion.a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-8 py-4 text-sm font-semibold text-zinc-900 shadow-sm transition-shadow hover:border-[#25D366]/30 hover:shadow-lg sm:w-auto"
            >
              <FaWhatsapp className="h-4 w-4 text-[#25D366]" />
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
