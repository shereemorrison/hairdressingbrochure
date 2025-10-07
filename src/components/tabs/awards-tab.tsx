"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { students } from "../../data/students"
import type { Student } from "../../types/student"

export default function AwardsTab() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  // Get featured students (those with photos) and organize by category
  const allStudentsWithPhotos = students.filter((student) => student.hasPhoto)
  
  // Separate medals/historical items from regular awards
  const perpetualTrophy = allStudentsWithPhotos.filter((student) => 
    student.name === "Perpetual Trophies"
  )
  
  const medalsAndOtherHistorical = allStudentsWithPhotos.filter((student) => 
    student.award === "Hairdressing Medal" && 
    student.name !== "Perpetual Trophies"
  )
  
  const regularAwards = allStudentsWithPhotos.filter((student) => 
    student.award !== "Hairdressing Medal" && 
    student.name !== "Perpetual Trophies"
  ).sort((a, b) => a.year - b.year) // Sort regular awards chronologically
  
  // Combine: perpetual trophy first, then regular awards, then other medals/historical last
  const featuredStudents = [...perpetualTrophy, ...regularAwards, ...medalsAndOtherHistorical]

  // Preload ALL images like the gallery tab does
  useEffect(() => {
    // Preload all student images by creating hidden img elements
    featuredStudents.forEach((student) => {
      if (student.hasPhoto && student.photoFilename) {
        const img = new Image()
        img.src = `/assets/students/${student.photoFilename}`
      }
    })
  }, [])

  // Keyboard navigation for laptop users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextSlide()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const nextSlide = () => {
    // Original desktop behavior - instant transition
    setCurrentSlide((prev) => (prev + 1) % featuredStudents.length)
  }

  const prevSlide = () => {
    // Original desktop behavior - instant transition  
    setCurrentSlide((prev) => (prev - 1 + featuredStudents.length) % featuredStudents.length)
  }



  // Aggressive swipe isolation - prevents ALL background movement
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
    // Don't prevent default here - let the container handle scrolling
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
    
    // Only prevent default if we detect significant horizontal movement
    if (touchStartX.current && touchEndX.current && touchStartY.current) {
      const horizontalDistance = Math.abs(touchStartX.current - touchEndX.current)
      const verticalDistance = Math.abs(e.targetTouches[0].clientY - touchStartY.current)
      
      // If horizontal movement is much greater than vertical, prevent scrolling
      if (horizontalDistance > verticalDistance && horizontalDistance > 20) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe || isRightSwipe) {
      e.preventDefault()
      e.stopPropagation()
      
      if (isLeftSwipe) {
        nextSlide()
      } else if (isRightSwipe) {
        prevSlide()
      }
    }
  }

  // Group students by award category
  const groupedByAward = students.reduce(
    (acc, student) => {
      if (!acc[student.award]) {
        acc[student.award] = []
      }
      acc[student.award].push(student)
      return acc
    },
    {} as Record<string, Student[]>,
  )

  // Sort students within each award by year
  Object.keys(groupedByAward).forEach((award) => {
    groupedByAward[award].sort((a, b) => a.year - b.year)
  })

  // Sort award categories by earliest year in each category
  const sortedAwardEntries = Object.entries(groupedByAward).sort(([, a], [, b]) => {
    const earliestYearA = Math.min(...a.map(student => student.year || Infinity))
    const earliestYearB = Math.min(...b.map(student => student.year || Infinity))
    return earliestYearA - earliestYearB
  })

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-white font-black mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              CELEBRATING OUR
              <br />
              <span className="text-yellow-400">AWARD WINNERS</span>
            </h1>
          </motion.div>
        </div>


        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="text-sm sm:text-base font-bold text-white/90 max-w-2xl mx-auto px-4">
              Photos were not available for all award winners
            </p>
          </motion.div>

          <div className="glass-card p-6 rounded-lg text-center max-w-xl mx-auto relative">
            {/* Navigation arrows - positioned relative to carousel container */}
            {featuredStudents.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors z-20"
                  aria-label="Previous student"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors z-20"
                  aria-label="Next student"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
            <div className="relative">
              {featuredStudents.length > 0 && (
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                    {/* Authentic Vintage Polaroid-style frame */}
                <div 
                  className="polaroid-frame transform hover:rotate-0 transition-all duration-500 mx-auto w-full max-w-[280px] sm:max-w-[320px]"
                  style={{
                    transform: `rotate(${(currentSlide * 7) % 5 - 2}deg)`,
                    maxWidth: featuredStudents[currentSlide].name.toLowerCase().includes('group') ? 'clamp(250px, 85vw, 320px)' : 'clamp(220px, 80vw, 280px)',
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className={`polaroid-photo transition-all duration-500 ${featuredStudents[currentSlide].name.toLowerCase().includes('group') ? 'aspect-[4/3]' : 'aspect-square'}`}>
                    <div
                      className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-4xl brightness-110 sepia-[0.2] contrast-110 saturate-80"
                      style={{
                        backgroundImage: featuredStudents[currentSlide].photoFilename
                          ? `url(/assets/students/${featuredStudents[currentSlide].photoFilename})`
                          : undefined,
                        backgroundSize: featuredStudents[currentSlide].name.toLowerCase().includes('group') ? "contain" : "cover",
                        backgroundPosition: featuredStudents[currentSlide].name.toLowerCase().includes('group') ? "center center" : "center top",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                          {!featuredStudents[currentSlide].photoFilename &&
                            featuredStudents[currentSlide].name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                        </div>
                      </div>
                      
                      {/* Polaroid writing area */}
                      <div className="polaroid-writing-area min-h-[60px] flex flex-col items-center justify-center">
                        <p className="polaroid-handwriting text-center text-sm italic font-bold mb-1 relative z-10">
                          {featuredStudents[currentSlide].name}
                        </p>
                        <p className="polaroid-handwriting text-center text-xs font-bold relative z-10">
                          {featuredStudents[currentSlide].award}{featuredStudents[currentSlide].year ? ` - ${featuredStudents[currentSlide].year}` : ''}
                        </p>
                      </div>
                    </div>
                </motion.div>
              )}
            </div>

            {/* Dot indicators */}
            {featuredStudents.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {featuredStudents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-yellow-400" : "bg-white/30"
                    }`}
                    aria-label={`Go to student ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Memorial Tribute */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="text-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-3 text-red-400" />
              <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
                The Christine Mitchell Julie -Arthur perpetual trophy commemorates two young hairdressers who died in a car accident. Their families donated the award in their memory.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Award Categories */}
        <div className="space-y-6 sm:space-y-8">
          {sortedAwardEntries
            .filter(([award, winners]) =>
              winners.some(winner => !featuredStudents.some(featured => featured.id === winner.id))
            )
            .map(([award, winners], categoryIndex) => (
            <motion.div
              key={award}
              className="glass-card p-4 sm:p-6 rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + categoryIndex * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{award}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                {winners
                  .filter((winner) => !featuredStudents.some((featured) => featured.id === winner.id))
                  .map((winner, index) => (
                    <motion.div
                      key={winner.id}
                      className="flex items-center gap-3 p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + categoryIndex * 0.1 + index * 0.05, duration: 0.3 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 text-white/70 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {winner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-white/60">{winner.year}</span>
                        <p className="text-sm font-medium text-white/80">{winner.name}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}