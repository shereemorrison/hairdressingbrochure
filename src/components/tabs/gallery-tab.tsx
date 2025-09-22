"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, MapPin } from "lucide-react"
import { imageGroups } from "../../data/gallery"

interface GalleryTabProps {
  onModalStateChange?: (isOpen: boolean) => void
}

export default function GalleryTab({ onModalStateChange }: GalleryTabProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null)



  useEffect(() => {
    onModalStateChange?.(selectedImage !== null)
  }, [selectedImage, onModalStateChange])

  const handleImageClick = (image: string, imageIndex: number, groupIndex: number) => {
    setSelectedImage(image)
    setSelectedIndex(imageIndex)
    setSelectedGroupIndex(groupIndex)
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4">
          CAMPUS GALLERY
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Explore our beautiful campuses and facilities across different locations. Tap any image to see its description.
        </p>
      </div>

      {/* Location Groups */}
      <div className="space-y-12">
        {imageGroups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            {/* Location Header */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {group.title}
                </h2>
              </div>
              <p className="text-yellow-400/80 text-sm sm:text-base font-medium">
                {group.subtitle}
              </p>
            </div>

            {/* Images Grid for this location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {group.images.map((image, imageIndex) => (
                <motion.div
                  key={`${groupIndex}-${imageIndex}`}
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
                  onClick={() => handleImageClick(image, imageIndex, groupIndex)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (groupIndex * 0.2) + (imageIndex * 0.1) }}
                >
                  {/* Glow Border Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Image Container */}
                  <div className="aspect-square overflow-hidden cursor-pointer relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${group.title} - Image ${imageIndex + 1}`}
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
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && selectedIndex !== null && selectedGroupIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100010] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedImage(null)
              setSelectedIndex(null)
              setSelectedGroupIndex(null)
            }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Image Container */}
            <motion.div
              className="relative max-w-4xl max-h-[85vh] rounded-xl overflow-hidden bg-black/50 m-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedImage(null)
                  setSelectedIndex(null)
                  setSelectedGroupIndex(null)
                }}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-4 pt-6">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Gallery image"
                  className="w-full max-h-[55vh] object-contain rounded-lg"
                />
              </div>

              {/* Description Area */}
              <div className="p-4 sm:p-6 bg-black/70 backdrop-blur-sm border-t border-yellow-400/20">
                <p className="text-white/90 text-sm sm:text-base leading-relaxed text-center">
                  {imageGroups[selectedGroupIndex].descriptions[selectedIndex]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}