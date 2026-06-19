"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

import {
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowLeft,
  ShieldCheck,
  Maximize2,
  Share2,
  Check,
  ArrowRight,
} from "lucide-react"

import { FaInstagram, FaWhatsapp } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { urlFor } from "@/lib/sanity"
import { CONTACT } from "@/lib/contact"
import type { SanityCar } from "../cars-client"
import { Lightbox } from "@/components/Lightbox"
import { VehicleOverviewModal } from "@/components/VehicleOverviewModal"

export type SanityCarDetail = SanityCar & {
  ownership?: string
  description?: string
  availability?: boolean
}

const fallbackImage =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1600"

function formatPrice(price: string | number | undefined | null) {
  if (price == null) return "Price on Request"

  if (typeof price === "number") {
    return `₹ ${new Intl.NumberFormat("en-IN").format(price)}`
  }

  const numericPrice = Number(String(price).replace(/[^\d]/g, ""))

  if (Number.isFinite(numericPrice)) {
    return `₹ ${new Intl.NumberFormat("en-IN").format(numericPrice)}`
  }

  return String(price)
}

function formatKilometers(value: string | number | undefined | null) {
  if (value == null) return "N/A"

  const numeric =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^\d]/g, ""))

  if (Number.isFinite(numeric)) {
    return `${new Intl.NumberFormat("en-IN").format(numeric)} km`
  }

  return String(value)
}

export default function CarDetail({
  car,
}: {
  car: SanityCarDetail
}) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(0)
  const [showLightbox, setShowLightbox] = React.useState(false)
  const [showOverviewModal, setShowOverviewModal] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [showToast, setShowToast] = React.useState(false)
  const [whatsappUrl, setWhatsappUrl] = React.useState(CONTACT.whatsapp)
  const isSharing = React.useRef(false)

  const gallery =
    car.gallery && car.gallery.length > 0
      ? car.gallery
      : [fallbackImage]

  const handleNext = React.useCallback(() => {
    setDirection(1)
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length)
    setImageLoaded(false)
  }, [gallery.length])

  const handlePrev = React.useCallback(() => {
    setDirection(-1)
    setCurrentImageIndex(
      (prev) => (prev - 1 + gallery.length) % gallery.length
    )
    setImageLoaded(false)
  }, [gallery.length])

  // Keyboard navigation
  React.useEffect(() => {
    if (showLightbox || showOverviewModal) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showLightbox, showOverviewModal, handleNext, handlePrev])

  // Dynamic WhatsApp Message
  React.useEffect(() => {
    const text = `Hello Sameera Cars!\n\nI'm interested in this vehicle:\n🚗 ${car.title}\n\nCould you please share more details and availability?\n\nLink: ${window.location.href}`
    // Extract phone number from CONTACT.whatsapp assuming it's wa.me/91XXXXXXXXXX
    // Or just append text to CONTACT.whatsapp
    const baseUrl = CONTACT.whatsapp.includes('?') ? CONTACT.whatsapp + '&' : CONTACT.whatsapp + '?'
    setWhatsappUrl(`${baseUrl}text=${encodeURIComponent(text)}`)
  }, [car.title])

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      if (isSharing.current) return
      isSharing.current = true
      try {
        await navigator.share({
          title: car.title,
          url: window.location.href,
        })
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err)
        }
      } finally {
        isSharing.current = false
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  const getAltText = (index: number, title: string) => {
    const angles = ["front exterior", "side profile", "rear exterior", "dashboard", "front seats", "rear seats"]
    const angle = angles[index % angles.length]
    return `${title} ${angle}`
  }

  const getImageInfo = (index: number, width = 1600) => {
    const image = gallery[index]

    if (typeof image === "string") return { url: image, isCover: true }

    try {
      if (image) {
        const url = urlFor(image).width(width).url()
        const ref = (image as any)?.asset?._ref || ""
        const match = ref.match(/-(\d+)x(\d+)-/)

        let isCover = true
        if (match) {
          const imgWidth = parseInt(match[1], 10)
          const imgHeight = parseInt(match[2], 10)
          const aspectRatio = imgWidth / imgHeight

          if (aspectRatio < 1.5) {
            isCover = false
          }
        }
        return { url, isCover }
      }
    } catch (e) {
      console.error(e)
    }

    return { url: fallbackImage, isCover: true }
  }

  const currentImgInfo = getImageInfo(currentImageIndex)

  const lightboxImages = React.useMemo(() => {
    return gallery.map((_, idx) => getImageInfo(idx, 1600))
  }, [gallery])

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.98,
    }),
  }

  return (
    <>
      <main className="relative w-full overflow-x-hidden bg-[#F5F5F3] text-zinc-900">

        {/* BACKGROUND */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">

          <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#d4b278]/10 blur-[120px]" />

          <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-zinc-300/20 blur-[120px]" />

        </div>

        <div className="relative mx-auto w-full max-w-[1536px] px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">

          {/* TOP */}
          <div className="mb-4 flex w-full">
            <Link
              href="/cars"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-zinc-200/50 bg-white/50 px-4 text-sm font-medium text-zinc-600 backdrop-blur-md transition-all hover:bg-white/80 hover:text-zinc-900"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Inventory
            </Link>
          </div>

          {/* MAIN LAYOUT */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">

            {/* LEFT */}
            <section className="flex min-w-0 min-h-0 flex-col lg:col-span-7 xl:col-span-8">

              {/* MAIN IMAGE WRAPPER */}
              <div className="group relative w-full">

                <div className={cn(
                  "relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[24px] md:rounded-[32px] bg-transparent transition-all duration-300",
                  currentImgInfo.isCover ? "shadow-[0_12px_40px_rgba(0,0,0,0.06)]" : ""
                )}>

                  <div
                    className="group/main relative h-full w-full overflow-hidden cursor-zoom-in"
                    onClick={() => setShowLightbox(true)}
                  >

                    <AnimatePresence
                      initial={false}
                      custom={direction}
                      mode="wait"
                    >

                      <motion.div
                        key={currentImageIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipe = Math.abs(offset.x) * velocity.x
                          if (swipe < -10000) {
                            handleNext()
                          } else if (swipe > 10000) {
                            handlePrev()
                          }
                        }}
                      >
                        {(() => {
                          const imgInfo = getImageInfo(currentImageIndex)
                          return (
                            <div className={imgInfo.isCover ? "absolute inset-0" : "absolute inset-2 md:inset-6"}>
                              {!imageLoaded && (
                                <div className="absolute inset-0 animate-pulse bg-zinc-200/50 rounded-[24px] md:rounded-[32px]" />
                              )}
                              <Image
                                src={imgInfo.url}
                                alt={getAltText(currentImageIndex, car.title)}
                                fill
                                priority={currentImageIndex === 0}
                                onLoad={() => setImageLoaded(true)}
                                draggable={false}
                                sizes="(max-width:1024px) 100vw, 60vw"
                                className={cn(
                                  "transition-all duration-500",
                                  imgInfo.isCover ? "object-cover" : "object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.06)]",
                                  imageLoaded ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </div>
                          )
                        })()}
                      </motion.div>

                    </AnimatePresence>

                    {/* FULLSCREEN ICON */}
                    <div className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 md:group-hover/main:opacity-70 pointer-events-none">
                      <Maximize2 className="h-5 w-5" />
                    </div>

                  </div>

                </div>

                {/* FLOATING BUTTONS */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 z-20 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-zinc-900/20 bg-white/90 text-zinc-900 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.08] hover:bg-white md:-left-6"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 z-20 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-zinc-900/20 bg-white/90 text-zinc-900 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.08] hover:bg-white md:-right-6"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

              </div>

              {/* THUMBNAILS */}
              <div className="mt-6 w-full overflow-x-auto p-2 no-scrollbar">
                <div className="flex gap-3 md:gap-4 w-fit mx-auto">
                  {gallery.map((_, idx) => {
                    const thumbInfo = getImageInfo(idx, 400)
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setDirection(
                            idx > currentImageIndex ? 1 : -1
                          )
                          setCurrentImageIndex(idx)
                        }}
                        className={cn(
                          "relative h-[80px] w-[110px] md:h-[96px] md:w-[128px] shrink-0 overflow-hidden rounded-[14px] bg-transparent transition-all duration-300",
                          idx === currentImageIndex
                            ? "ring-2 ring-zinc-900 ring-offset-2 ring-offset-[#F5F5F3] shadow-md"
                            : "opacity-60 hover:opacity-100 md:hover:scale-105 border border-zinc-200/50 shadow-sm hover:shadow-md"
                        )}
                      >
                        {!thumbInfo.isCover && (
                          <div className="absolute inset-0 bg-[#F5F5F3]" />
                        )}
                        <div className={thumbInfo.isCover ? "absolute inset-0" : "absolute inset-1"}>
                          <Image
                            src={thumbInfo.url}
                            alt=""
                            fill
                            sizes="128px"
                            className={thumbInfo.isCover ? "object-cover" : "object-contain"}
                          />
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

            </section>

            {/* RIGHT */}
            <aside className="flex min-w-0 flex-col lg:col-span-5 xl:col-span-4">

              <div className="flex h-full flex-col overflow-hidden rounded-[34px] border border-white/60 bg-white/80 p-6 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl">

                <div className="flex flex-col">
                  <h1 className="text-3xl md:text-[40px] leading-[1.1] font-semibold tracking-tight text-zinc-950">
                    {car.title}
                  </h1>

                  <div className="mt-3 flex items-baseline gap-3">
                    <p className="text-4xl md:text-[52px] leading-none font-bold tracking-tight text-zinc-950">
                      {formatPrice(car.price)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f3efe7] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[#b48a47]">
                      <ShieldCheck className="h-4 w-4" />
                      Verified Pre-Owned
                    </div>
                  </div>
                </div>

                {/* specs */}
                {/* <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { label: <center>Year</center>, value: car.year },
                    {label: <center>Fuel</center>, value: car.fuelType },
                    { label: <center>Transmission</center>, value: car.transmission },
                    { label: <center>Driven</center>, value: formatKilometers(car.kilometersDriven) },
                    { label: <center>Ownership</center>, value: car.ownership || "1st Owner" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col justify-center rounded-2xl border-[1.5px] border-zinc-800/15 bg-zinc-50/50 p-3 w-full min-w-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-900/40">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">{item.label}</span>
                      <span className="mt-1 text-sm md:text-[15px] font-semibold text-zinc-900 break-words">{item.value}</span>
                    </div>
                  ))}
                </div> */}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Year", value: car.year },
                    { label: "Fuel", value: car.fuelType },
                    { label: "Transmission", value: car.transmission },
                    { label: "Driven", value: formatKilometers(car.kilometersDriven) },
                    { label: "Ownership", value: car.ownership || "1st Owner" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center justify-center rounded-2xl border border-zinc-300 bg-zinc-50/50 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-900/40"
                    >
                      <span className="text-center text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                        {item.label}
                      </span>

                      <span className="mt-1 whitespace-nowrap text-center text-sm font-semibold text-zinc-900 md:text-[15px]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* buttons */}
                {/* <div className="mt-8 space-y-3">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(37,211,102,0.25)] transition-all hover:bg-[#20bd5a] hover:shadow-[0_8px_25px_rgba(37,211,102,0.35)] hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Enquire on WhatsApp
                  </Link>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`tel:${CONTACT.phone}`}
                      className="flex h-14 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white text-[14px] font-semibold text-zinc-900 transition-all hover:bg-zinc-50 hover:border-zinc-300"
                    >
                      <Phone className="h-4 w-4" />
                      Call Us
                    </Link>
                    <button
                      onClick={handleShare}
                      className="flex h-14 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white text-[14px] font-semibold text-zinc-900 transition-all hover:bg-zinc-50 hover:border-zinc-300"
                    >
                      <Share2 className="h-4 w-4" />
                      Share Vehicle
                    </button>
                  </div>

                  <Link
                    href={CONTACT.instagram}
                    target="_blank"
                    className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-transparent text-[14px] font-semibold text-zinc-500 transition-all hover:text-zinc-900 hover:bg-zinc-100/50"
                  >
                    <FaInstagram className="h-4 w-4" />
                    See More Cars
                  </Link>
                </div> */}

                <div className="mt-8 space-y-4">

                  {/* PRIMARY CTA */}
                  <div className="mb-5 flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-xs font-medium text-zinc-600 backdrop-blur-sm">

                    <ShieldCheck className="h-4 w-4 text-green-600" />

                    Typically replies within 30 minutes !!

                  </div>
                  <Link

                    href={whatsappUrl}

                    target="_blank"

                    className="group flex h-15 w-full items-center justify-center gap-3 rounded-3xl bg-[#25D366] px-6 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(37,211,102,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_18px_40px_rgba(37,211,102,0.38)] active:scale-[0.98]"

                  >

                    <FaWhatsapp className="text-[22px] transition-transform duration-300 group-hover:scale-110" />

                    <span>Enquire on WhatsApp</span>

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

                  </Link>

                  {/* SECONDARY ACTIONS */}
                  <div className="grid grid-cols-2 gap-3">

                    <Link
                      href={`tel:${CONTACT.phone}`}
                      className="group flex h-14 items-center justify-center gap-2 rounded-3xl border border-zinc-300 bg-white text-[14px] font-semibold text-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/30 hover:shadow-md"
                    >
                      <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      Call Us
                    </Link>

                    <button
                      onClick={handleShare}
                      className="group flex h-14 items-center justify-center gap-2 rounded-3xl border border-zinc-300 bg-white text-[14px] font-semibold text-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/30 hover:shadow-md"
                    >
                      <Share2 className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                      Share Vehicle
                    </button>

                  </div>

                  {/* INSTAGRAM */}
                  <Link
                    href={CONTACT.instagram}
                    target="_blank"
                    className="group flex h-12 items-center justify-center gap-2 rounded-2xl border border-transparent bg-transparent text-[14px] font-medium text-zinc-500 transition-all duration-300 hover:border-zinc-300 hover:bg-white/60 hover:text-zinc-900"
                  >
                    <FaInstagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />

                    <span>See More Cars on Instagram</span>
                  </Link>

                </div>

                <div className="my-8 h-px w-full bg-zinc-200/80" />

                {/* modal trigger */}
                <div className="flex-1 mt-4">
                  <button
                    onClick={() => setShowOverviewModal(true)}
                    className="group flex w-full items-center justify-between rounded-2xl bg-[#f3efe7] px-6 py-5 transition-all hover:bg-[#e7dcc8]"
                  >
                    <span className="text-[16px] font-semibold text-zinc-900">Full Vehicle Details</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </button>
                </div>

              </div>

            </aside>

          </div>

        </div>

      </main>

      <Lightbox
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        images={lightboxImages}
        initialIndex={currentImageIndex}
      />

      <VehicleOverviewModal
        isOpen={showOverviewModal}
        onClose={() => setShowOverviewModal(false)}
        title={car.title}
        description={car.description || ""}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
          >
            <Check className="h-4 w-4 text-green-400" />
            Link copied!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}