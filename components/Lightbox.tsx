"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  images: { url: string; isCover: boolean }[]
  initialIndex: number
}

export function Lightbox({ isOpen, onClose, images, initialIndex }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)
  const [direction, setDirection] = React.useState(0)

  // Update internal index when modal opens with a new initial index
  React.useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  // Lock scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleNext = React.useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrev = React.useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, handleNext, handlePrev])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
      >
        {/* Click outside to close */}
        <div className="absolute inset-0 z-0" onClick={onClose} />

        {/* Top Controls */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Main Image Container */}
        <div className="relative z-10 flex h-[85vh] w-[95vw] max-w-7xl items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  handleNext()
                } else if (swipe > swipeConfidenceThreshold) {
                  handlePrev()
                }
              }}
              className="relative h-full w-full"
            >
              <Image
                src={currentImage.url}
                alt={`Image ${currentIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain rounded-2xl border border-white/10 drop-shadow-[0_35px_90px_rgba(0,0,0,0.45)]"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className="absolute left-2 md:-left-16 z-20 flex h-10 w-10 md:h-14 md:w-14 -translate-y-1/2 top-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-2 md:-right-16 z-20 flex h-10 w-10 md:h-14 md:w-14 -translate-y-1/2 top-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </button>
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 font-medium text-white/70 tracking-widest text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}
