"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { teachers } from "../../data/teachers"
import type { Teacher } from "../../types/teacher"

export default function TeachersTab() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  
  // Detect if we're on a mobile device
  const isMobile = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  const groupPhotos = [
    {
      src: "/assets/teachers/staff1980.webp",
      alt: "Staff 1980s",
      names: ["Staff from the 1980s"],
    },
    { 
      src: "/assets/teachers/hairstaff.webp",
      alt: "Our Staff Today",
      names: ["Our Staff"],
    },
    {
      src: "/assets/teachers/group1.webp",
      alt: "",
      names: ["Julie M", "Alisha W", "Julie C", "Wendy", "Jacinta"],
    },
    {
      src: "/assets/teachers/group2.webp",
      alt: "",
      names: ["Sue", "Deb", "Julie", "Gayle"],
    },
    {
      src: "/assets/teachers/danicaorchard.webp",
      alt: "",
      names: ["Danica Orchard"],
    },
    {
      src: "/assets/teachers/breannagiddingcathyritchie.webp",
      alt: "",
      names: ["Breanna Gidding & Cathay Ritchie"],
    },
    {
      src: "/assets/teachers/grantmckinnon.webp",
      alt: "",
      names: ["Grant McKinnon"],
    },
    {
      src: "/assets/teachers/alishaweekley.webp",
      alt: "",
      names: ["Alisha Weekley"],
    },
    {
      src: "/assets/teachers/briannawatson.webp",
      alt: "",
      names: ["Brianna Watson"],
    },
    {
      src: "/assets/teachers/kieragwin.webp",
      alt: "",
      names: ["Kiera Gwin"],
    },
    {
      src: "/assets/teachers/laurenmcilrath.webp",
      alt: "",
      names: ["Lauren McIlrath"],
    },
  ]

  // Preload ALL images like the gallery tab does
  useEffect(() => {
    // Preload all images by creating hidden img elements
    groupPhotos.forEach((photo) => {
      const img = new Image()
      img.src = photo.src
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
    setCurrentSlide((prev) => (prev + 1) % groupPhotos.length)
  }

  const prevSlide = () => {
    // Original desktop behavior - instant transition  
    setCurrentSlide((prev) => (prev - 1 + groupPhotos.length) % groupPhotos.length)
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

  const groupedTeachers = (teachers as Teacher[]).reduce(
    (acc, teacher) => {
      if (!acc[teacher.year]) {
        acc[teacher.year] = []
      }
      acc[teacher.year].push(teacher)
      return acc
    },
    {} as Record<string, Teacher[]>,
  )

  const sortedYears = Object.keys(groupedTeachers).sort((a, b) => {
    const getFirstYear = (year: string) => {
      const match = year.match(/^\d{4}/)
      return match ? Number.parseInt(match[0]) : 9999
    }
    return getFirstYear(a) - getFirstYear(b)
  })

  return (
    <div className="relative">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-white font-black mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              CELEBRATING OUR TEACHING
              <br />
              <span className="text-yellow-400">STAFF</span>
            </h1>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-sm sm:text-base font-bold text-white/90 max-w-2xl mx-auto px-4">
            Our dedicated teaching staff have shaped generations of hairdressing professionals, bringing decades of industry experience and passion for education to every salon classroom
          </p>
        </motion.div>


        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-xl mx-auto">
            <div className="glass-card p-6 rounded-lg text-center relative">
              {/* Simple chevrons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <motion.div
                className="relative"
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Authentic Vintage Polaroid-style frame */}
                <div 
                  className={`polaroid-frame transform hover:rotate-0 transition-all duration-500 mx-auto w-full max-w-[280px] sm:max-w-[320px] ${isMobile ? 'rotate-0' : ''}`}
                  style={{
                    transform: isMobile ? 'rotate(0deg)' : `rotate(${(currentSlide * 7) % 5 - 2}deg)`,
                    maxWidth: (groupPhotos[currentSlide].names?.length || 1) > 1 ? 'clamp(250px, 85vw, 320px)' : 'clamp(220px, 80vw, 280px)',
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className={`polaroid-photo transition-all duration-500 ${(groupPhotos[currentSlide].names?.length || 1) > 1 ? 'aspect-[4/3]' : 'aspect-square'}`}>
                    <img
                      src={groupPhotos[currentSlide].src}
                      alt={groupPhotos[currentSlide].alt}
                      className="w-full h-full brightness-110 sepia-[0.2] contrast-110 saturate-80"
                      style={{
                        objectPosition: (groupPhotos[currentSlide].names?.length || 1) > 1 ? 'center center' : 'center top',
                        objectFit: (groupPhotos[currentSlide].names?.length || 1) > 1 ? 'contain' : 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  </div>
                  
                  {/* Polaroid writing area */}
                  <div className="polaroid-writing-area min-h-[60px] flex items-center justify-center">
                    <p className="polaroid-handwriting text-center text-sm italic font-bold relative z-10">
                      {groupPhotos[currentSlide].names?.join(", ") || "Group Photo"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Dot indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {groupPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-yellow-400" : "bg-white/30"
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid gap-6">
            {sortedYears.map((year, yearIndex) => (
              <motion.div
                key={year}
                className="glass-card p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + yearIndex * 0.05, duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">{year}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                  {groupedTeachers[year].map((teacher, teacherIndex) => (
                    <motion.div
                      key={teacher.id}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + yearIndex * 0.1 + teacherIndex * 0.05, duration: 0.3 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center border border-yellow-400/30">
                        <span className="text-xs font-semibold text-yellow-400">
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-yellow-400 transition-colors truncate">
                          {teacher.name}
                        </p>
                        {teacher.role === "receptionist" && <p className="text-xs text-white/60">Receptionist</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}