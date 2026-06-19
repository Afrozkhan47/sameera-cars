"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface VehicleOverviewModalProps {
  isOpen: boolean
  onClose: () => void
  description: string
  title: string
}

export function VehicleOverviewModal({ isOpen, onClose, description, title }: VehicleOverviewModalProps) {
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

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Enhanced description renderer
  const renderDescription = () => {
    if (!description) {
      return (
        <p className="text-zinc-600 leading-relaxed">
          Premium inspected vehicle with verified ownership, smooth driving experience, excellent condition and transparent documentation.
        </p>
      )
    }

    const lines = description.split('\n')
    return lines.map((line, idx) => {
      const text = line.trim()
      if (!text) return null

      // Bullet points
      if (text.startsWith('•') || text.startsWith('-')) {
        return (
          <li key={idx} className="ml-4 list-disc text-zinc-600 leading-relaxed mb-2">
            {text.substring(1).trim()}
          </li>
        )
      }

      // Highlights / checkmarks
      if (text.startsWith('✅')) {
        return (
          <div key={idx} className="flex items-start gap-2 mb-2">
            <span className="text-green-500 shrink-0">✅</span>
            <span className="text-zinc-700 font-medium">{text.substring(1).trim()}</span>
          </div>
        )
      }

      // Headers (short lines without punctuation might be headers)
      if (text.length < 30 && !text.endsWith('.') && idx > 0 && lines[idx - 1].trim() === '') {
        return (
          <h3 key={idx} className="text-lg font-semibold text-zinc-900 mt-6 mb-3">
            {text}
          </h3>
        )
      }

      // Default paragraph
      return (
        <p key={idx} className="mb-4 text-zinc-600 leading-relaxed last:mb-0">
          {text}
        </p>
      )
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-8"
      >
        {/* Click outside to close */}
        <div className="absolute inset-0 z-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[900px] bg-white rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5 md:px-8 md:py-6 bg-white shrink-0">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900">Vehicle Overview</h2>
              <p className="text-sm text-zinc-500 mt-1">{title}</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8 overscroll-contain">
            <div className="max-w-prose">
              {renderDescription()}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
