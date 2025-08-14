"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"

export default function GalleryTab() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4">
          GALLERY
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Explore our beautiful campus and facilities through the years
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
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
            onClick={() => setSelectedImage(image)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Glow Border Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Image Container */}
            <motion.div
              className="relative max-w-4xl max-h-[90vh] rounded-xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Gallery image"
                className="w-full h-full object-contain"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
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
