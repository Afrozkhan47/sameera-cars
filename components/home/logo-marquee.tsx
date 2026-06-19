"use client"

import * as React from "react"
import { motion } from "framer-motion"

const BRANDS = [
  "Honda",
  "Toyota",
  "Hyundai",
  "Kia",
  "Suzuki",
  "Volkswagen",
  "Ford",
  "BMW",
  "Mercedes",
  "Tata",
  "Skoda",
]

const BRANDS_EXTENDED = [...BRANDS, ...BRANDS]

export default function LogoMarquee() {
  return (
    <div className="relative w-full bg-black py-12 sm:py-16 overflow-hidden border-t border-zinc-900/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.32em] uppercase text-amber-400/75">
            TRUSTED PARTNERS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white mt-3 mb-3 leading-tight">
            Cars From Every Trusted Brand
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
            Discover quality pre-owned cars designed for every lifestyle and journey.
          </p>
        </motion.div>

        <div className="relative mb-8 overflow-hidden">
          <motion.div
            className="flex items-center gap-3 sm:gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
          >
            {BRANDS_EXTENDED.map((brand, idx) => (
              <motion.div
                key={`${brand}-${idx}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex h-[56px] min-w-[140px] items-center justify-center rounded-full border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm px-5 sm:px-6 text-sm sm:text-base font-medium tracking-[0.05em] text-white uppercase transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-800/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)]">
                  {brand}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
