"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { imageGroups } from "../../data/gallery"

interface GalleryTabProps {
  onModalStateChange?: (isOpen: boolean) => void
}

interface FlattenedSlide {
  type: 'title' | 'image'
  src?: string
  description?: string
  groupTitle: string
  groupSubtitle?: string
  groupIndex: number
  imageIndex?: number
}

export default function GalleryTab({ onModalStateChange }: GalleryTabProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Flatten all slides (title + images) for navigation
  const flattenedSlides: FlattenedSlide[] = imageGroups.flatMap((group, groupIndex) => {
    const titleSlide: FlattenedSlide = {
      type: 'title',
      groupTitle: group.title,
      groupSubtitle: group.subtitle,
      groupIndex
    }

    const imageSlides: FlattenedSlide[] = group.images.map((image, imageIndex) => ({
      type: 'image',
      src: image,
      description: group.descriptions[imageIndex],
      groupTitle: group.title,
      groupIndex,
      imageIndex
    }))

    return [titleSlide, ...imageSlides]
  })

  useEffect(() => {
    onModalStateChange?.(selectedImage !== null)
  }, [selectedImage, onModalStateChange])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentImageIndex !== null) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          navigateToPrevious()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          navigateToNext()
        } else if (e.key === 'Escape') {
          e.preventDefault()
          closeModal()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentImageIndex])

  const handleImageClick = (image: string, imageIndex: number, groupIndex: number) => {
    // Find the flattened index for this image (skip title slides)
    const slideIndex = flattenedSlides.findIndex(
      slide => slide.type === 'image' && slide.groupIndex === groupIndex && slide.imageIndex === imageIndex
    )
    setSelectedImage(image)
    setCurrentImageIndex(slideIndex)
  }

  const navigateToNext = () => {
    if (currentImageIndex !== null) {
      const nextIndex = (currentImageIndex + 1) % flattenedSlides.length
      setCurrentImageIndex(nextIndex)
      const nextSlide = flattenedSlides[nextIndex]
      setSelectedImage(nextSlide.type === 'image' ? nextSlide.src! : null)
    }
  }

  const navigateToPrevious = () => {
    if (currentImageIndex !== null) {
      const prevIndex = currentImageIndex === 0 ? flattenedSlides.length - 1 : currentImageIndex - 1
      setCurrentImageIndex(prevIndex)
      const prevSlide = flattenedSlides[prevIndex]
      setSelectedImage(prevSlide.type === 'image' ? prevSlide.src! : null)
    }
  }

  // Mobile swipe detection
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      navigateToNext()
    }
    if (isRightSwipe) {
      navigateToPrevious()
    }
  }

  const closeModal = () => {
    setSelectedImage(null)
    setCurrentImageIndex(null)
  }

  const currentSlide = currentImageIndex !== null ? flattenedSlides[currentImageIndex] : null

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
       <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-white font-black mb-4 sm:mb-6 leading-tight drop-shadow-lg">
         CAMPUS AND
         <br />
         <span className="text-yellow-400">FACILITIES GALLERY</span>
       </h1>
        <p className="text-lg text-white/80 max-w-2xl">
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
        {currentImageIndex !== null && currentSlide && (
          <motion.div
            className="fixed inset-0 z-[100010] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Navigation Button - Previous - hidden on mobile, visible on desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateToPrevious()
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors touch-manipulation hidden sm:block"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Navigation Button - Next - hidden on mobile, visible on desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateToNext()
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors touch-manipulation hidden sm:block"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Slide Container */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[85vh] rounded-xl overflow-hidden bg-black/50 mx-4 sm:m-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Header with close button and counter */}
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 sm:p-4 bg-gradient-to-b from-black/70 to-transparent">
                <div className="text-white/80 text-sm">
                  {currentImageIndex + 1} of {flattenedSlides.length}
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors touch-manipulation"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {currentSlide.type === 'title' ? (
                /* Title Slide */
                <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] p-6 sm:p-8 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {currentSlide.groupTitle}
                    </h2>
                  </div>
                  <p className="text-yellow-400/80 text-base sm:text-lg md:text-xl font-medium max-w-2xl">
                    {currentSlide.groupSubtitle}
                  </p>
                  <div className="mt-8 text-white/60 text-sm">
                    Swipe or use navigation arrows to explore this location
                  </div>
                </div>
              ) : (
                /* Image Slide */
                <>
                  <div className="p-3 sm:p-4 pt-12 sm:pt-16">
                    <img
                      key={currentImageIndex} // Force re-render for smooth transitions
                      src={currentSlide.src || "/placeholder.svg"}
                      alt="Gallery image"
                      className="w-full max-h-[50vh] sm:max-h-[55vh] object-contain rounded-lg"
                    />
                  </div>

                  {/* Description Area */}
                  <div className="p-4 sm:p-6 bg-black/70 backdrop-blur-sm border-t border-yellow-400/20">
                    <div className="text-center mb-2">
                      <span className="text-yellow-400 text-sm font-medium">
                        {currentSlide.groupTitle}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed text-center">
                      {currentSlide.description}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}