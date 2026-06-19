// "use client"
// import { type MouseEvent, useRef, useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { motion, useScroll, useTransform } from "framer-motion"
// import { ArrowRight } from "lucide-react"

// const BRANDS_DATA = [
//   "Honda",
//   "Toyota",
//   "Hyundai",
//   "Kia",
//   "Suzuki",
//   "Volkswagen",
//   "Ford",
//   "BMW",
//   "Mercedes",
//   "Tata",
//   "Skoda",
// ]

// const textContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.2,
//     },
//   },
// }

// const textItemVariants = {
//   hidden: { opacity: 0, y: 15 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 1.2,
//       ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
//     },
//   },
// }

// function SectionDivider() {
//   return (
//     <div className="relative w-full h-6 overflow-hidden">
//       {/* soft fade */}
//       <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent to-black/80" />
//       {/* divider line */}
//       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[82%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
//       {/* subtle amber ambient glow */}
//       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/5 blur-3xl rounded-full" />
//     </div>
//   )
// }

// export default function HeroSection() {
//   const router = useRouter()
//   const [isNavigating, setIsNavigating] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)

//   // Section 1 scroll targets
//   const section1Ref = useRef<HTMLDivElement>(null)
//   const { scrollYProgress: s1Progress } = useScroll({
//     target: section1Ref,
//     offset: ["start start", "end start"],
//   })

//   // Section 1 parallax & text transitions
//   const scale = useTransform(s1Progress, [0, 1], [1.02, 1.08])
//   const textOpacity = useTransform(s1Progress, [0, 0.7], [1, 0])
//   const textY = useTransform(s1Progress, [0, 0.7], [0, -40])
//   const darkOverlayOpacity = useTransform(s1Progress, [0, 0.95], [0.15, 0.9])

//   const handleInventoryClick = (event: MouseEvent<HTMLAnchorElement>) => {
//     if (
//       event.metaKey ||
//       event.ctrlKey ||
//       event.shiftKey ||
//       event.altKey ||
//       event.currentTarget.target === "_blank"
//     ) {
//       return
//     }

//     event.preventDefault()
//     setIsNavigating(true)

//     window.setTimeout(() => {
//       window.scrollTo({ top: 0, behavior: "smooth" })
//       router.push("/cars", { scroll: true })
//     }, 220)
//   }

//   return (
//     <div ref={containerRef} className="w-full bg-black text-white relative flex flex-col isolate">
//       {/* Page transition overlay */}
//       <motion.div
//         aria-hidden="true"
//         className="fixed inset-0 z-50 pointer-events-none bg-black"
//         initial={false}
//         animate={{ opacity: isNavigating ? 1 : 0 }}
//         transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//       />

//       {/* ==================================================
//           SECTION 1 — OPENING HERO
//           ================================================== */}
//       <div
//         ref={section1Ref}
//         className="relative h-screen w-full overflow-hidden flex flex-col justify-between z-10"
//       >
//         {/* Fullscreen background image with subtle scroll scaling */}
//         <motion.div
//           style={{ scale }}
//           className="absolute inset-0 w-full h-full select-none pointer-events-none z-0"
//         >
//           <Image
//             src="/hero-showroom.png"
//             alt="Sameera Cars Pune showroom storefront"
//             fill
//             className="object-cover"
//             sizes="100vw"
//             priority
//           />
//         </motion.div>

//         {/* Soft, professional gradient mask covering text for legibility without hiding cars */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent w-full md:w-[60%] z-10 pointer-events-none" />

//         {/* Dark overlay that thickens as user scrolls down to blend into black background */}
//         <motion.div
//           style={{ opacity: darkOverlayOpacity }}
//           className="absolute inset-0 bg-black z-10 pointer-events-none"
//         />

//         {/* Hero Overlay Text */}
//         <div className="container-custom relative h-full flex flex-col justify-center items-start z-20 pointer-events-none pb-20 sm:pb-28">
//           <motion.div
//             variants={textContainerVariants}
//             initial="hidden"
//             animate="visible"
//             style={{ opacity: textOpacity, y: textY }}
//             className="max-w-lg flex flex-col gap-3 sm:gap-4 text-left pl-4 sm:pl-8 lg:pl-12"
//           >
//             <motion.span
//               variants={textItemVariants}
//               className="text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-amber-500/90"
//             >
//               SAMEERA CARS
//             </motion.span>

//             <motion.h1
//               variants={textItemVariants}
//               className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal leading-tight text-white tracking-tight"
//             >
//               Your Next Car <br />
//               Is Here !!
//             </motion.h1>

//             <motion.p
//               variants={textItemVariants}
//               className="text-sm sm:text-base md:text-lg text-zinc-300/90 font-medium tracking-wide leading-relaxed mt-1"
//             >
//               Trusted pre-owned vehicles <br />
//               across every segment.
//             </motion.p>
//           </motion.div>
//         </div>

//         {/* Bottom smooth blending gradient */}
//         <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent z-[15] pointer-events-none" />
//       </div>

//       <SectionDivider />

//       {/* ==================================================
//           SECTION 2 — BRAND & SEGMENT SHOWCASE
//           ================================================== */}
//       <div className="relative w-full bg-black py-14 sm:py-16 z-20 overflow-hidden">
//         <div className="container-custom">
//           <motion.div
//             initial={{ opacity: 0, y: 18 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             className="text-center"
//           >
//             <span className="text-[10px] sm:text-xs font-semibold tracking-[0.32em] uppercase text-amber-400/80">
//               TRUSTED BRANDS
//             </span>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mt-3 leading-tight tracking-tight">
//               Available Across Every Segment
//             </h2>
//             <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
//              Pre-owned vehicles from India&apos;s most trusted automotive manufacturers.
//               <br /> <br />
//             </p>
//           </motion.div>

//           <div className="relative mt-10 overflow-hidden">
//             <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent" />
//             <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent" />

//             <motion.div
//               animate={{ x: [0, -18, 0] }}
//               transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
//               className="mx-auto flex max-w-5xl items-center justify-between gap-8 text-center"
//             >
//               {BRANDS_DATA.map((brand) => (
//                 <span
//                   key={brand}
//                   className="shrink-0 text-xs sm:text-sm font-semibold tracking-[0.24em] text-zinc-500 transition-colors duration-300 hover:text-zinc-200"
//                 >
//                   {brand}
//                 </span>
//               ))}
//             </motion.div>
//           </div>

//         </div>
//       </div>


//       {/* ==================================================
//           SECTION 4 — FINAL CTA
//           ================================================== */}
//       <section className="relative w-full bg-black overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28 z-30">

//         {/* amber radial glow */}
//         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.07),transparent_55%)]" />

//         {/* top divider line */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[78%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//           className="container-custom relative z-10 flex flex-col items-center text-center"
//         >
//           {/* eyebrow label */}



//           {/* heading */}
//           <h2 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-serif text-white leading-[0.95] tracking-tight">
//             <br/>
//             <br />
//             Ready To Find Your
//             <br />
//             Next Car?
//           </h2>

//           {/* description */}
//           <p className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400 font-medium">
//             Browse Pune&apos;s premium pre-owned collection with confidence and discover vehicles worth driving home.
//           </p>

//           {/* ── AMBER CTA BUTTON ── */}
//           {/* ───────── PREMIUM INVENTORY CTA ───────── */}
//           <div className="relative mt-12 inline-flex items-center justify-center">
//   {/* diffused glow layer behind button */}
//   <div className="absolute inset-0 rounded-full bg-amber-500/35 blur-2xl scale-x-110 scale-y-150 pointer-events-none" />

//   <Link
//     href="/cars"
//     onClick={handleInventoryClick}
//     className="
//       group relative inline-flex items-center gap-3.5
//       rounded-full
//       border border-amber-400/55
//       bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600
//       px-9 py-[18px]
//       shadow-[0_0_0_1px_rgba(251,191,36,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]
//       transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
//       hover:-translate-y-1.5 hover:scale-[1.04]
//       hover:border-amber-300/90
//       hover:shadow-[0_0_0_1px_rgba(251,191,36,0.55),0_24px_56px_rgba(245,158,11,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]
//       active:scale-[0.97] active:shadow-[0_8px_24px_rgba(245,158,11,0.25)]
//     "
//   >
//     {/* top-left shine */}
//     <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/22 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

//     <span className="relative z-10 text-[15px] font-semibold tracking-wide text-amber-950 whitespace-nowrap">
//       Browse Inventory
//     </span>

//     {/* <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/22 border border-black/12 transition-all duration-500 group-hover:translate-x-1.5 group-hover:bg-black/32">
//       <ArrowRight className="size-4 stroke-[2.5] text-amber-950" />
//     </span> */}
//   </Link>
// </div>
//         </motion.div>
//       </section>
//     </div>
//   )
// }

"use client"
import { type MouseEvent, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"

// ─── Constants ────────────────────────────────────────────────────────────────

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
  "Mahindra",
]

// Tripled so the infinite loop never shows a gap
const MARQUEE_ITEMS = [...BRANDS, ...BRANDS, ...BRANDS]

// ─── Animation Variants ───────────────────────────────────────────────────────

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.25,
    },
  },
}

const textItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Thin decorative rule between full-bleed sections.
 * Keeps the black-on-black flow visually structured without harsh breaks.
 */
function SectionDivider() {
  return (
    <div className="relative w-full h-px">
      <div className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </div>
  )
}

/**
 * True CSS-driven infinite marquee.
 * Uses a single keyframe animation duplicated via MARQUEE_ITEMS (×3) so
 * the seam is never visible. Framer Motion is only used for the
 * scroll-reveal of the section wrapper — no JS drives the scroll itself.
 */
function BrandMarquee() {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Fade masks on both edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent" />

      <div
        className="flex items-center gap-4 w-max"
        style={{
          animation: "marquee-scroll 38s linear infinite",
        }}
      >
        {MARQUEE_ITEMS.map((brand, idx) => (
          <span
            key={`${brand}-${idx}`}
            className="
              shrink-0 inline-flex items-center
              rounded-full border border-zinc-800
              bg-zinc-900/50 backdrop-blur-sm
              px-5 py-2.5
              text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase
              text-zinc-400
              transition-colors duration-300
              hover:border-zinc-700 hover:text-zinc-200
            "
          >
            {brand}
          </span>
        ))}
      </div>

      {/* Keyframe injected inline — keeps the component self-contained */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function HeroSection() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const section1Ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: s1Progress } = useScroll({
    target: section1Ref,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(s1Progress, [0, 1], [1.02, 1.07])
  const textOpacity = useTransform(s1Progress, [0, 0.65], [1, 0])
  const textY = useTransform(s1Progress, [0, 0.65], [0, -36])
  const darkOverlayOpacity = useTransform(s1Progress, [0, 0.9], [0.15, 0.92])

  const handleInventoryClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.currentTarget.target === "_blank"
    ) {
      return
    }
    event.preventDefault()
    setIsNavigating(true)
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      router.push("/cars", { scroll: true })
    }, 200)
  }

  return (
    <div
      ref={containerRef}
      className="w-full bg-black text-white relative flex flex-col isolate"
    >
      {/* ── Page-transition overlay ── */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-50 pointer-events-none bg-black"
        initial={false}
        animate={{ opacity: isNavigating ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ════════════════════════════════════════
          SECTION 1 — FULL-BLEED HERO
          ════════════════════════════════════════ */}
      <div
        ref={section1Ref}
        className="relative h-screen w-full overflow-hidden z-10"
      >
        {/* Parallax background image */}
        <motion.div
          style={{ scale }}
          className="absolute inset-0 w-full h-full select-none pointer-events-none z-0"
        >
          <Image
            src="/hero-showroom.png"
            alt="Sameera Cars Pune showroom"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Left-side legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/30 to-transparent md:w-[58%] z-10 pointer-events-none" />

        {/* Scroll-driven dark overlay blending into the section below */}
        <motion.div
          style={{ opacity: darkOverlayOpacity }}
          className="absolute inset-0 bg-black z-10 pointer-events-none"
        />

        {/* Hero copy */}
        <div className="container-custom relative h-full flex flex-col justify-center items-start z-20 pointer-events-none pb-24 sm:pb-32">
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            style={{ opacity: textOpacity, y: textY }}
            className="max-w-lg flex flex-col gap-3 sm:gap-4 text-left pl-4 sm:pl-8 lg:pl-12"
          >
            <motion.span
              variants={textItemVariants}
              className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-amber-500/85"
            >
              Sameera Cars · Pune
            </motion.span>

            <motion.h1
              variants={textItemVariants}
              className="text-[2.2rem] min-[375px]:text-[2.6rem] sm:text-5xl md:text-6xl font-serif font-normal leading-[1.08] text-white tracking-tight"
            >
              Your Next Car
              <br />
              Is Here !!
            </motion.h1>

            <motion.p
              variants={textItemVariants}
              className="text-sm sm:text-base md:text-[17px] text-zinc-300/85 font-medium leading-relaxed mt-1"
            >
              Verified pre-owned vehicles across every segment.
              <br className="hidden sm:block" />
              Transparent pricing. Zero compromise.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom blend into black */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black to-transparent z-[15] pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════
          SECTION 2 — BRANDS MARQUEE
          ════════════════════════════════════════ */}
      <div className="relative w-full bg-black pt-16 pb-20 z-20">
        <div className="container-custom mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.32em] uppercase text-amber-400/70">
              Trusted Brands
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-[2.75rem] font-serif text-white leading-tight tracking-tight">
              Every Make, One Address
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-500 max-w-md mx-auto leading-relaxed">
              From everyday hatchbacks to premium sedans — curated inventory
              from India&apos;s most trusted manufacturers.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <BrandMarquee />
        </motion.div>
      </div>

      <SectionDivider />

      {/* ════════════════════════════════════════
          SECTION 3 — STATS STRIP
          A lightweight trust-signal row that replaces dead whitespace.
          ════════════════════════════════════════ */}
      {/* <div className="relative w-full bg-black py-14 z-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800/50 rounded-2xl overflow-hidden"
          >
            {[
              { value: "500+", label: "Cars Sold" },
              { value: "10+", label: "Years in Pune" },
              { value: "100%", label: "Verified Listings" },
              { value: "1-Day", label: "Delivery Ready" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-1.5 bg-black px-6 py-10 text-center"
              >
                <span className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
                  {value}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div> */}

      <SectionDivider />

      {/* ════════════════════════════════════════
          SECTION 4 — CTA
          ════════════════════════════════════════ */}
      <section className="relative w-full bg-black overflow-hidden py-24 sm:py-32 z-30">
        {/* Ambient amber radial */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_70%,rgba(245,158,11,0.06),transparent)]" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="container-custom relative z-10 flex flex-col items-center text-center"
        >
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.32em] uppercase text-amber-400/70 mb-6">
            Browse the Collection
          </span>

          <h2 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-[1.05] tracking-tight">
            Ready to Find Your
            <br />
            Next Car?
          </h2>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400">
            Pune&apos;s pre-owned collection — inspected, priced fairly, and
            ready to drive home today.
          </p>

          {/* CTA Button */}
          <div className="relative mt-12 inline-flex items-center justify-center">
            {/* Diffused glow */}
            <div className="absolute inset-0 rounded-full bg-amber-500/30 blur-2xl scale-110 pointer-events-none" />

            <Link
              href="/cars"
              onClick={handleInventoryClick}
              className="
                group relative inline-flex items-center gap-3
                rounded-full
                border border-amber-400/50
                bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600
                px-9 py-[17px]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]
                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:-translate-y-1 hover:scale-[1.03]
                hover:shadow-[0_20px_48px_rgba(245,158,11,0.4),inset_0_1px_0_rgba(255,255,255,0.22)]
                active:scale-[0.97]
              "
            >
              {/* Shine on hover */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 text-[15px] font-semibold tracking-wide text-amber-950 whitespace-nowrap">
                Browse Inventory
              </span>
            </Link>
          </div>

          {/* Trust footnote */}
          <p className="mt-7 text-xs text-zinc-600 tracking-wide">
            No hidden fees &nbsp;·&nbsp; Verified ownership &nbsp;·&nbsp; Pune&apos;s trusted dealership
          </p>
        </motion.div>
      </section>
    </div>
  )
}