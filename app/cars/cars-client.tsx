"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  SearchX,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { urlFor } from "@/lib/sanity"
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
        "relative shrink-0 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
        isActive
          ? "bg-zinc-900 text-white shadow-md"
          : "text-zinc-600 hover:bg-white/80 hover:text-zinc-900"
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
          <p className="mt-1 text-[40px] md:text-[44px] font-bold leading-none tracking-[-0.05em] text-zinc-950">
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
  const [isLoading, setIsLoading] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [activeFilter, searchQuery, selectedBrand])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false)
      }
    }
    if (isBrandOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isBrandOpen])

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
    return matchesCat && matchesBrand && matchesSearch
  })
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
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ece9e4] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/40 via-[#ece9e4] to-[#ece9e4] text-zinc-900 after:pointer-events-none after:absolute after:inset-0 after:z-0 after:opacity-[0.025] after:mix-blend-overlay after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#d4b278]/20 blur-[140px]" />
        <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#7d8797]/10 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-white/30 blur-[160px]" />
      </div>
      <section className="relative z-10 overflow-hidden bg-gradient-to-b from-[#f8f6f1] via-[#f3f0ea] to-[#ece9e4]">
        <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-20 px-6 py-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <div className="mb-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 shadow-lg backdrop-blur-xl">
                <ShieldCheck className="h-4 w-4 text-[#d4b278]" />
                Verified Quality
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700 shadow-lg backdrop-blur-xl">
                <CheckCircle2 className="h-4 w-4 text-[#d4b278]" />
                Transparent Pricing
              </div>
            </div>
            <h1 className="max-w-xl text-[64px] font-semibold leading-[0.9] tracking-[-0.06em] text-zinc-950 md:text-[88px] lg:text-[110px]">
              SAMEERA
              <br />
              <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-[#8d7a55] bg-clip-text text-transparent">
                CARS
              </span>
            </h1>
            <p className="mt-10 max-w-lg text-xl leading-relaxed text-zinc-500">
              Pre-owned vehicles with verified inspection,
              transparent pricing, and a luxury buying experience.
            </p>
            <div className="mt-12 flex items-center gap-5">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                <Sparkles className="h-4 w-4 text-[#d4b278]" />
                Trusted by hundreds of Pune buyers
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-[#d4b278]/20 via-transparent to-white/30 blur-3xl" />
            <div className="relative h-[560px] min-h-[560px] w-full overflow-hidden rounded-[40px] isolate border border-white/50 bg-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
              <AnimatePresence mode="sync">
                {heroCars.length > 0 && (
                  <motion.div
                    key={currentSlide}
                    initial={{
                      opacity: 0,
                      scale: 1,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1.06,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.06,
                    }}
                    transition={{
                      opacity: { duration: 1.2, ease: "easeInOut" },
                      scale: { duration: 6, ease: "linear" },
                    }}
                    className="absolute inset-0 h-full w-full"
                  >
                    <Image
                      src={getCarImage(heroCars[currentSlide])}
                      alt="Featured Car"
                      fill
                      priority
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover contrast-110 saturate-110"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>
      <div className="relative z-20 mx-auto -mt-6 mb-8 flex max-w-5xl flex-wrap items-center justify-center gap-6 px-6 text-[12px] font-semibold tracking-wider text-zinc-500 uppercase md:text-[13px] md:gap-10">
        <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#d4b278]" /> Verified Vehicles</span>
        <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#d4b278]" /> Transparent Pricing</span>
        <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#d4b278]" /> Test Drive Available</span>
        <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#d4b278]" /> RC Checked</span>
      </div>
      <section className="sticky top-6 z-40 mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">

          <div className="flex flex-1 min-w-0 items-center gap-2 rounded-[32px] border border-white/80 bg-white/60 py-2 pl-2 pr-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-3xl">
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
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
              <div className="flex min-w-max gap-2 pr-2">
                {FILTERS.map((filter) => (
                  <FilterPill
                    key={filter.value}
                    filter={filter}
                    isActive={activeFilter === filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4b278]">
              <CheckCircle2 className="h-3.5 w-3.5" /> Updated Today
            </p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-zinc-950">
              Check Out Our Catalogue
            </h2>
            <p className="mt-3 text-lg text-zinc-600">
              Hand-picked, inspected and verified vehicles.
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-4xl font-semibold tracking-[-0.05em] text-zinc-950">
              {visibleCars.length}
            </p>
            <p className="text-sm font-medium text-zinc-500">
              Vehicles Available
            </p>
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : visibleCars.length === 0 ? (
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
              {visibleCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </main>
  )
}