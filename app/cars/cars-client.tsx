"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  SearchX,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { urlFor } from "@/lib/sanity"
import { ShowroomSection } from "@/components/ShowroomSection"
type FilterKey =
  | "all"
  | "suv"
  | "sedan"
  | "hatchback"
  | "luxury"
  | "petrol"
  | "diesel"
  | "cng"
  | "electric"
  | "automatic"
  | "manual"
export type SanityCar = {
  _id: string
  title: string
  slug: { current: string }
  brand: string
  price: string
  year: number
  fuelType:
  | "Petrol"
  | "Diesel"
  | "Electric"
  | "Hybrid"
  | "CNG"
  | "Petrol + CNG"
  | string
  transmission: "Manual" | "Automatic" | string
  kilometersDriven: string | number
  availability?: string
  ownership?: string
  gallery: unknown[]
}
const FILTERS: { label: string; value: FilterKey }[] = [
  { label: "All", value: "all" },
  { label: "Hatchback", value: "hatchback" },
  { label: "SUV / MUV", value: "suv" },
  { label: "Sedan", value: "sedan" },
  { label: "Luxury", value: "luxury" },
  { label: "Petrol", value: "petrol" },
  { label: "Diesel", value: "diesel" },
  { label: "CNG", value: "cng" },
  { label: "Automatic", value: "automatic" },
  { label: "Manual", value: "manual" },
]
const premiumEasing = [0.22, 1, 0.36, 1] as const
const fallbackImage =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1600"
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: premiumEasing,
    },
  },
}
function getCarImage(car: SanityCar, index = 0) {
  try {
    if (car.gallery?.[index]) {
      return urlFor(car.gallery[index]).width(1600).url()
    }
    if (car.gallery?.[0]) {
      return urlFor(car.gallery[0]).width(1600).url()
    }
  } catch (e) {
    console.error("Sanity image error:", e)
  }
  return fallbackImage
}
function formatPrice(price: string | number | undefined | null) {
  if (!price) return "₹ Price on Request"
  const numeric =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^\d]/g, ""))
  if (!Number.isNaN(numeric)) {
    return `₹ ${new Intl.NumberFormat("en-IN").format(numeric)}`
  }
  return String(price)
}
function formatKilometers(value: string | number | undefined | null) {
  if (!value) return "N/A"
  const numeric =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^\d]/g, ""))
  if (!Number.isNaN(numeric)) {
    return `${new Intl.NumberFormat("en-IN").format(numeric)} km`
  }
  return String(value)
}
function getCarCategories(car: SanityCar): Set<FilterKey> {
  const categories = new Set<FilterKey>()
  categories.add("all")
  const search = `${car.title} ${car.brand}`.toLowerCase()
  const fuel = car.fuelType?.toLowerCase() || ""
  const trans = car.transmission?.toLowerCase() || ""
  if (
    search.includes("tiago") ||
    search.includes("swift") ||
    search.includes("baleno") ||
    search.includes("celerio") ||
    search.includes("i10") ||
    search.includes("i20") ||
    search.includes("altroz")
  ) {
    categories.add("hatchback")
  }
  if (
    search.includes("ertiga") ||
    search.includes("creta") ||
    search.includes("brezza") ||
    search.includes("xuv") ||
    search.includes("seltos") ||
    search.includes("nexon") ||
    search.includes("thar")
  ) {
    categories.add("suv")
  }
  if (
    search.includes("city") ||
    search.includes("verna") ||
    search.includes("slavia") ||
    search.includes("virtus")
  ) {
    categories.add("sedan")
  }
  if (
    search.includes("bmw") ||
    search.includes("mercedes") ||
    search.includes("audi")
  ) {
    categories.add("luxury")
  }
  if (fuel.includes("petrol")) categories.add("petrol")
  if (fuel.includes("diesel")) categories.add("diesel")
  if (fuel.includes("cng")) categories.add("cng")
  if (trans.includes("automatic")) categories.add("automatic")
  if (trans.includes("manual")) categories.add("manual")
  return categories
}
function matchesFilter(car: SanityCar, filter: FilterKey) {
  return getCarCategories(car).has(filter)
}
function FilterPill({
  filter,
  isActive,
  onClick,
}: {
  filter: (typeof FILTERS)[number]
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative shrink-0 rounded-full px-4 py-2 md:px-6 md:py-3 text-[13px] md:text-sm font-medium transition-all duration-300",
        isActive
          ? "bg-zinc-900 text-white shadow-md"
          : "text-zinc-600 hover:-translate-y-[2px] hover:bg-white/80 hover:text-zinc-900 hover:shadow-md"
      )}
    >
      {filter.label}
    </button>
  )
}
function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[30px] border border-zinc-200 bg-white shadow-sm">
      <div className="h-[245px] w-full animate-pulse bg-zinc-200" />
      <div className="p-5">
        <div className="mb-2 h-8 w-3/4 animate-pulse rounded-md bg-zinc-200" />
        <div className="mb-4 h-10 w-1/2 animate-pulse rounded-md bg-zinc-200" />
        <div className="mb-4 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-16 animate-pulse rounded-full bg-zinc-200" />
          ))}
        </div>
        <div className="h-12 w-full animate-pulse rounded-2xl bg-zinc-200" />
      </div>
    </div>
  )
}

function CarCard({ car }: { car: SanityCar }) {
  return (
    <Link
      href={`/cars/${car.slug.current}`}
      className="block"
    >
      <motion.article
        variants={itemVariants}
        className="group overflow-hidden rounded-[30px] border border-transparent bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-700 ease-[0.22,1,0.36,1] hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
      >
        <div className="relative h-[245px] min-h-[245px] w-full overflow-hidden bg-zinc-200">
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={getCarImage(car, 0)}
              alt={car.title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
              className={cn("object-cover transition-transform duration-700 group-hover:scale-[1.02]", car.availability?.toLowerCase().includes("sold") && "saturate-[0.8]")}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {car.availability?.toLowerCase().includes("sold") && (
            <div className="absolute -right-10 top-6 z-20 w-40 rotate-45 bg-[#800000] py-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md">
              Sold
            </div>
          )}
        </div>
        <div className="p-5">
          <h2 className="line-clamp-1 text-[24px] font-semibold tracking-[-0.04em] text-zinc-900">
            {car.title}
          </h2>
          <p className="mt-1 text-[32px] sm:text-[40px] md:text-[44px] font-bold leading-none tracking-tighter text-zinc-950">
            {formatPrice(car.price)}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              car.year,
              car.fuelType,
              car.transmission,
              formatKilometers(car.kilometersDriven),
            ].map((item) => (
              <span
                key={String(item)}
                className="rounded-full border border-zinc-200/50 bg-zinc-100/50 px-3 py-1.5 text-[11px] font-medium text-zinc-600"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-500 group-hover:bg-zinc-800">
              {car.availability?.toLowerCase().includes("sold") ? "Sold • View Details" : "View Vehicle Details"}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
export default function CarsClient({
  initialCars,
}: {
  initialCars: SanityCar[]
}) {
  const [activeFilter, setActiveFilter] = React.useState<FilterKey>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedBrand, setSelectedBrand] = React.useState<string>("all")
  const [isBrandOpen, setIsBrandOpen] = React.useState(false)
  const [sortBy, setSortBy] = React.useState<"featured" | "price-asc" | "price-desc" | "newest" | "oldest">("featured")
  const [priceRange, setPriceRange] = React.useState<[number, number] | null>(null)
  const [tempPriceRange, setTempPriceRange] = React.useState<[number, number]>([200000, 1500000])
  const [isSortOpen, setIsSortOpen] = React.useState(false)
  const [isPriceOpen, setIsPriceOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const sortRef = React.useRef<HTMLDivElement>(null)
  const priceRef = React.useRef<HTMLDivElement>(null)

  const formatLakh = (v: number) => "₹" + (v / 100000).toFixed(1).replace(".0", "") + "L"

  React.useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [activeFilter, searchQuery, selectedBrand, sortBy, priceRange])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false)
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setIsPriceOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsBrandOpen(false)
        setIsSortOpen(false)
        setIsPriceOpen(false)
      }
    }

    if (isBrandOpen || isSortOpen || isPriceOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isBrandOpen, isSortOpen, isPriceOpen])

  const brands = React.useMemo(() => {
    const allBrands = initialCars.map((c) => c.brand).filter(Boolean)
    return Array.from(new Set(allBrands)).sort()
  }, [initialCars])

  const visibleCars = initialCars.filter((car) => {
    const matchesCat = matchesFilter(car, activeFilter)
    const matchesBrand = selectedBrand === "all" || car.brand === selectedBrand
    const matchesSearch =
      searchQuery === "" ||
      `${car.title} ${car.brand}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

    let matchesPrice = true
    if (priceRange) {
      const numericPrice = typeof car.price === "number" ? car.price : Number(String(car.price).replace(/[^\d]/g, ""))
      if (!Number.isNaN(numericPrice) && numericPrice > 0) {
        matchesPrice = numericPrice >= priceRange[0] && numericPrice <= priceRange[1]
      }
    }

    return matchesCat && matchesBrand && matchesSearch && matchesPrice
  })

  const sortedCars = React.useMemo(() => {
    const sorted = [...visibleCars]
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => {
        const pA = Number(String(a.price).replace(/[^\d]/g, "")) || 0
        const pB = Number(String(b.price).replace(/[^\d]/g, "")) || 0
        return pA - pB
      })
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => {
        const pA = Number(String(a.price).replace(/[^\d]/g, "")) || 0
        const pB = Number(String(b.price).replace(/[^\d]/g, "")) || 0
        return pB - pA
      })
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => (b.year || 0) - (a.year || 0))
    } else if (sortBy === "oldest") {
      sorted.sort((a, b) => (a.year || 0) - (b.year || 0))
    }
    return sorted
  }, [visibleCars, sortBy])
  const heroCars = React.useMemo(() => {
    if (!initialCars) return []
    const preferredBrands = ["bmw", "volkswagen", "honda", "maruti suzuki", "toyota", "duster"]
    const filtered = initialCars.filter((car) =>
      preferredBrands.some((b) => car.brand?.toLowerCase().includes(b)) ||
      preferredBrands.some((b) => car.title?.toLowerCase().includes(b))
    )
    return filtered.length >= 3 ? filtered.slice(0, 5) : initialCars.slice(0, 5)
  }, [initialCars])

  const [currentSlide, setCurrentSlide] = React.useState(0)
  React.useEffect(() => {
    if (!heroCars || heroCars.length <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroCars.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [heroCars])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 400 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const headingX = useTransform(smoothX, [-0.5, 0.5], [-3, 3])
  const headingY = useTransform(smoothY, [-0.5, 0.5], [-3, 3])

  const orbX = useTransform(smoothX, [-0.5, 0.5], [-12, 12])
  const orbY = useTransform(smoothY, [-0.5, 0.5], [-12, 12])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#ece9e4] text-zinc-900">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')]" />

      <section
        className="relative z-10 overflow-hidden border-b border-zinc-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.02)]"
        onMouseMove={handleMouseMove}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] bg-white/40 blur-[120px]" />

          <motion.div
            style={{ x: orbX, y: orbY }}
            className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#d4b278]/20 blur-[140px]"
          />
          <motion.div
            style={{ x: orbX, y: orbY }}
            className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#7d8797]/15 blur-[160px]"
          />

          <motion.div
            style={{ x: orbX, y: orbY }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[100vh] font-bold leading-none text-zinc-900 opacity-5 blur-[2px]"
          >
            S
          </motion.div>
        </div>

        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 pt-16 pb-12 text-center lg:pt-20 lg:pb-16 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="flex flex-col items-center"
          >
            <motion.h1
              style={{ x: headingX, y: headingY, textShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
              className="text-4xl min-[375px]:text-5xl font-semibold leading-[0.85] tracking-[-0.06em] text-zinc-950 md:text-7xl lg:text-[80px]"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEasing } }
                }}
                className="block"
              >
                SAMEERA
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEasing } }
                }}
                className="block bg-gradient-to-r from-[#c5a666] via-[#e8d1a1] to-[#c5a666] bg-[length:200%_auto] bg-clip-text text-transparent -mt-1 drop-shadow-sm [-webkit-text-stroke:1px_rgba(0,0,0,0.15)]"
                animate={{
                  backgroundPosition: ["0% center", "-200% center"],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                CARS
              </motion.span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 1, ease: premiumEasing } }
              }}
              className="mt-6 max-w-[650px] text-[17px] leading-[1.6] text-zinc-500 md:text-[19px]"
            >
              Browse verified pre-owned cars with transparent pricing, inspected quality, and vehicles that fit every lifestyle and budget.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEasing } }
              }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-600 md:gap-5 md:text-[12px]"
            >
              {[
                { text: "Verified Vehicles", icon: ShieldCheck },
                { text: "Transparent Pricing", icon: CheckCircle2 },
                { text: "RC Checked", icon: CheckCircle2 },
                { text: "Test Drive Available", icon: CheckCircle2 }
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-[20px] border border-white/60 bg-white/40 px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-500 hover:-translate-y-[2px] hover:bg-white/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                  <span className="relative flex items-center gap-2">
                    <badge.icon className="h-3.5 w-3.5 text-[#b89b5e]" strokeWidth={2.5} />
                    {badge.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section id="catalogue" className="sticky top-6 z-40 mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">

          <div className="flex w-full flex-col md:flex-row items-stretch gap-2 rounded-[32px] border border-white/80 bg-white/60 py-2 px-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-3xl">
            {/* Left side: Brand Dropdown and Main Filters */}
            <div className="flex flex-1 min-w-0 items-center gap-2">
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300",
                    selectedBrand !== "all" || isBrandOpen
                      ? "bg-zinc-900 text-white shadow-md"
                      : "bg-white/50 text-zinc-600 hover:bg-white/80 hover:text-zinc-900 border border-zinc-200/50"
                  )}
                >
                  {selectedBrand === "all" ? "All Brands" : selectedBrand}
                  <ChevronRight className={cn("h-4 w-4 transition-transform", isBrandOpen && "rotate-90")} />
                </button>
                <AnimatePresence>
                  {isBrandOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 top-full mt-2 w-[220px] max-h-[300px] overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl z-[100]"
                    >
                      <button
                        onClick={() => { setSelectedBrand("all"); setIsBrandOpen(false) }}
                        className={cn(
                          "w-full rounded-xl px-4 py-2 text-left text-sm font-medium transition-all",
                          selectedBrand === "all" ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                        )}
                      >
                        All Brands
                      </button>
                      {brands.map(brand => (
                        <button
                          key={brand}
                          onClick={() => { setSelectedBrand(brand); setIsBrandOpen(false) }}
                          className={cn(
                            "w-full rounded-xl px-4 py-2 text-left text-sm font-medium transition-all",
                            selectedBrand === brand ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                          )}
                        >
                          {brand}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-1 overflow-x-auto no-scrollbar min-w-0">
                <div className="flex min-w-max items-center gap-2 pr-2">
                  {FILTERS.map((filter) => (
                    <FilterPill
                      key={filter.value}
                      filter={filter}
                      isActive={activeFilter === filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                    />
                  ))}

                  {/* Active Price Range Chip */}
                  <AnimatePresence>
                    {priceRange !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, width: 0 }}
                        animate={{ opacity: 1, scale: 1, width: "auto" }}
                        exit={{ opacity: 0, scale: 0.8, width: 0 }}
                        className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-900 pl-3 pr-1 py-1.5 md:pl-4 md:pr-2 md:py-2 text-[13px] md:text-sm font-medium text-white shadow-md ml-2"
                      >
                        {formatLakh(priceRange[0])} - {formatLakh(priceRange[1])}
                        <button
                          onClick={() => {
                            setPriceRange(null)
                            setTempPriceRange([200000, 1500000])
                          }}
                          className="ml-1 rounded-full p-1 transition-colors hover:bg-white/20"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right side: Price and Sort */}
            <div className="flex w-full md:w-auto shrink-0 items-center justify-between md:justify-start gap-2 border-t border-zinc-200/50 md:border-t-0 md:border-l md:pl-3 pt-3 md:pt-0 mt-3 md:mt-0">

              {/* Price Filter */}
              <div className="relative shrink-0" ref={priceRef}>
                <button
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300",
                    isPriceOpen
                      ? "bg-zinc-900 text-white shadow-md"
                      : "bg-white/50 text-zinc-600 hover:bg-white/80 hover:text-zinc-900 border border-zinc-200/50"
                  )}
                >
                  Price
                  <ChevronRight className={cn("h-4 w-4 transition-transform", isPriceOpen && "rotate-90")} />
                </button>
                <AnimatePresence>
                  {isPriceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 md:left-auto md:right-0 top-full mt-2 w-[calc(100vw-48px)] sm:w-[280px] rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl z-[100]"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-zinc-900">Price Range</h4>
                        <span className="text-sm font-medium text-[#b48a47]">
                          {formatLakh(tempPriceRange[0])} — {formatLakh(tempPriceRange[1])}
                        </span>
                      </div>

                      <div className="relative mb-6 h-6 w-full flex items-center">
                        <div className="absolute h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                          <div
                            className="absolute h-full bg-[#b48a47]"
                            style={{
                              left: `${((tempPriceRange[0] - 200000) / 1300000) * 100}%`,
                              right: `${100 - ((tempPriceRange[1] - 200000) / 1300000) * 100}%`
                            }}
                          />
                        </div>
                        <input
                          type="range"
                          min={200000}
                          max={1500000}
                          step={50000}
                          value={tempPriceRange[0]}
                          onChange={(e) => {
                            const val = Math.min(Number(e.target.value), tempPriceRange[1] - 50000)
                            setTempPriceRange([val, tempPriceRange[1]])
                          }}
                          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#b48a47] [&::-webkit-slider-thumb]:shadow-md"
                        />
                        <input
                          type="range"
                          min={200000}
                          max={1500000}
                          step={50000}
                          value={tempPriceRange[1]}
                          onChange={(e) => {
                            const val = Math.max(Number(e.target.value), tempPriceRange[0] + 50000)
                            setTempPriceRange([tempPriceRange[0], val])
                          }}
                          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#b48a47] [&::-webkit-slider-thumb]:shadow-md"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setTempPriceRange([200000, 1500000])
                            setPriceRange(null)
                            setIsPriceOpen(false)
                          }}
                          className="flex-1 rounded-xl bg-zinc-100 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => {
                            setPriceRange(tempPriceRange)
                            setIsPriceOpen(false)
                          }}
                          className="flex-1 rounded-xl bg-zinc-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                        >
                          Apply
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort By Dropdown */}
              <div className="relative shrink-0" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300",
                    isSortOpen
                      ? "bg-zinc-900 text-white shadow-md"
                      : "bg-white/50 text-zinc-600 hover:bg-white/80 hover:text-zinc-900 border border-zinc-200/50"
                  )}
                >
                  Sort By: {
                    sortBy === "featured" ? "Featured" :
                      sortBy === "price-asc" ? "Low → High" :
                        sortBy === "price-desc" ? "High → Low" :
                          sortBy === "newest" ? "Newest" : "Oldest"
                  }
                  <ChevronRight className={cn("h-4 w-4 transition-transform", isSortOpen && "rotate-90")} />
                </button>
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-[calc(100vw-48px)] sm:w-[180px] rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl z-[100]"
                    >
                      {[
                        { id: "featured", label: "Featured" },
                        { id: "price-asc", label: "Price: Low → High" },
                        { id: "price-desc", label: "Price: High → Low" },
                        { id: "newest", label: "Newest First" },
                        { id: "oldest", label: "Oldest First" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id as any)
                            setIsSortOpen(false)
                          }}
                          className={cn(
                            "w-full rounded-xl px-4 py-2 text-left text-sm font-medium transition-all",
                            sortBy === option.id ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="mb-16 flex flex-col justify-between gap-8 border-b border-zinc-200/70 pb-8 md:flex-row md:items-end">
          <div>

            <h1 className="text-5xl font-semibold tracking-[-0.06em] text-zinc-950 md:text-6xl">
              Find Your Next Car
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-500">
              Browse inspected pre-owned vehicles from trusted brands.
            </p>

          </div>

          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-[-0.05em] text-[#b48a47] md:text-4xl">
                {sortedCars.length}
              </span>

              <span className="text-sm font-medium text-zinc-500">
                Vehicles Available
              </span>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : sortedCars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 mb-6">
              <SearchX className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 mb-2">No vehicles found</h3>
            <p className="text-zinc-500 mb-8 max-w-sm">
              Try another brand, category or search term to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveFilter("all")
                setSelectedBrand("all")
                setPriceRange(null)
                setTempPriceRange([200000, 1500000])
                setSortBy("featured")
              }}
              className="rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 shadow-md hover:scale-105 active:scale-95"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="sync">
            <motion.div
              key={activeFilter + searchQuery + selectedBrand}
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3"
            >
              {sortedCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      <ShowroomSection />

    </main>
  )
}