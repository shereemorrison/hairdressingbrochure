"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"

interface GalleryTabProps {
  onModalStateChange?: (isOpen: boolean) => void
}

export default function GalleryTab({ onModalStateChange }: GalleryTabProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const galleryImages = [
    "/assets/buildingimages/loddoncompaspe.jpg",
    "/assets/buildingimages/mcraest.jpg",
    "/assets/buildingimages/city2.jpg",
    "/assets/buildingimages/city3.jpg",
    "/assets/buildingimages/georgia.jpg",
    "/assets/buildingimages/hargreaves.jpg",
    "/assets/buildingimages/lotushairsalon.jpg",
    "/assets/buildingimages/lotusreception.jpg",
    "/assets/buildingimages/mundy.jpg",
    "/assets/buildingimages/reception.jpg",
    "/assets/buildingimages/salon1.jpg",
    "/assets/buildingimages/salon2.jpg",
    "/assets/buildingimages/salon4.jpg",
    "/assets/buildingimages/salonbasin.jpg",
    "/assets/buildingimages/students.jpg",
    "/assets/buildingimages/thompsonbuilding.jpg",
    "/assets/buildingimages/blowdrying.jpg",
  ]

  const imageDescriptions = [
    "Loddon Campaspe Campus - Our beautiful regional campus building",
    "McRae Street Campus - Historic building in the heart of the city",
    "City Campus View - Modern facilities in downtown location",
    "City Campus Interior - State-of-the-art learning spaces",
    "Georgia Building - Heritage architecture meets modern education",
    "Hargreaves Campus - Spacious grounds and contemporary design",
    "Lotus Hair Salon - Professional training salon for students",
    "Lotus Reception Area - Welcoming entrance to our salon facilities",
    "Mundy Building - Traditional campus architecture",
    "Main Reception - Central hub for student services",
    "Training Salon 1 - Hands-on learning environment",
    "Training Salon 2 - Professional-grade equipment and stations",
    "Training Salon 4 - Advanced styling and treatment area",
    "Salon Basin Area - Hair washing and treatment stations",
    "Students at Work - Learning through practical experience",
    "Thompson Building - Administrative and classroom facilities",
    "Blow Drying Station - Professional styling equipment in use",
  ]

  useEffect(() => {
    onModalStateChange?.(selectedImage !== null)
  }, [selectedImage, onModalStateChange])

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4">
          GALLERY
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Explore our beautiful campus and facilities through the years. Tap any image to see its description.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden rounded-xl"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleImageClick(image, index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Glow Border Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Image Container */}
            <div
              className="aspect-square overflow-hidden cursor-pointer relative"
              onClick={() => handleImageClick(image, index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=300&width=300&text=Gallery+Image"
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100010] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedImage(null)
              setSelectedIndex(null)
            }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Image Container */}
            <motion.div
              className="relative max-w-4xl max-h-[90vh] rounded-xl overflow-hidden bg-black/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Gallery image"
                className="w-full max-h-[70vh] object-contain"
              />

              {/* Description Area */}
              <div className="p-4 sm:p-6 bg-black/70 backdrop-blur-sm border-t border-yellow-400/20">
                <p className="text-white/90 text-sm sm:text-base leading-relaxed text-center">
                  {imageDescriptions[selectedIndex]}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedImage(null)
                  setSelectedIndex(null)
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
