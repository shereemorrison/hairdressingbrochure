"use client"

import { motion } from "framer-motion"
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { students } from "../../data/students"
import type { Student } from "../../types/student"

export default function AwardsTab() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Get featured students (those with photos)
  const featuredStudents = students.filter((student) => student.hasPhoto)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredStudents.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredStudents.length) % featuredStudents.length)
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

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 sm:mb-8 text-center text-[var(--darkest)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          AWARD <span className="text-black">WINNERS</span>
        </motion.h1>

        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-yellow-400 flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" />
            Award Winner Photo Gallery
          </h2>

          <div className="relative max-w-md mx-auto">
            <div className="glass-card p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
              <div className="relative">
                {featuredStudents.length > 0 && (
                  <motion.div
                    key={currentSlide}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="w-32 h-32 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg"
                      style={{
                        backgroundImage: featuredStudents[currentSlide].photoFilename
                          ? `url(/assets/students/${featuredStudents[currentSlide].photoFilename})`
                          : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {!featuredStudents[currentSlide].photoFilename &&
                        featuredStudents[currentSlide].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{featuredStudents[currentSlide].name}</h3>
                    <p className="text-yellow-400 text-sm font-semibold mb-3">{featuredStudents[currentSlide].year}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{featuredStudents[currentSlide].award}</p>
                  </motion.div>
                )}

                {/* Navigation Arrows */}
                {featuredStudents.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Dot Indicators */}
              {featuredStudents.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {featuredStudents.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-yellow-400" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Award Categories */}
        <div className="space-y-6 sm:space-y-8">
          {Object.entries(groupedByAward).map(([award, winners], categoryIndex) => (
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
                  .filter((winner) => !featuredStudents.some((featured) => featured.id === winner.id)) // Filter out duplicates
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
