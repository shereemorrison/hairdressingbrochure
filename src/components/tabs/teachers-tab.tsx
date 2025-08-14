"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { teachers } from "../../data/teachers"
import type { Teacher } from "../../types/teacher"

export default function TeachersTab() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const groupPhotos = [
    {
      src: "/assets/teachers/staff1980.png",
      alt: "Staff 1980s",
      names: ["Staff from the 1980s"],
    },
    {
      src: "/assets/teachers/group1.jpg",
      alt: "",
      names: ["Julie M", "Alisha W", "Julie C", "Wendy", "Jacinta"],
    },
    {
      src: "/assets/teachers/group2.png",
      alt: "",
      names: ["Sue", "Deb", "Julie", "Gayle"],
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % groupPhotos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + groupPhotos.length) % groupPhotos.length)
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
    // Handle year ranges
    const getFirstYear = (year: string) => {
      const match = year.match(/^\d{4}/)
      return match ? Number.parseInt(match[0]) : 9999
    }
    return getFirstYear(a) - getFirstYear(b)
  })

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {" "}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 sm:mb-8 text-center text-[var(--darkest)]" // Reduced font sizes and margins
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          OUR <span className="text-black">TEACHERS</span>
        </motion.h1>
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="relative max-w-xl mx-auto">
            {" "}
            <div className="glass-card p-4 rounded-lg text-center">
              {" "}
              <div className="relative overflow-hidden rounded-lg mb-3 bg-black/20">
                {" "}
                <img
                  src={groupPhotos[currentSlide].src || "/placeholder.svg"}
                  alt={groupPhotos[currentSlide].alt}
                  className="w-full h-48 sm:h-56 object-contain" // Reduced height
                />
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> {/* Reduced icon size */}
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-4 h-4" /> {/* Reduced icon size */}
                </button>
              </div>
              <div className="text-yellow-400">
                <h3 className="text-base sm:text-lg font-bold mb-2">{groupPhotos[currentSlide].alt}</h3>{" "}
                <div className="flex flex-wrap justify-center gap-2">
                  {groupPhotos[currentSlide].names.map((name, index) => (
                    <span key={index} className="text-xs sm:text-sm text-white/90">
                      {" "}
                      {name}
                      {index < groupPhotos[currentSlide].names.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-3 space-x-2">
                {" "}
                {groupPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-yellow-400" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
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
                transition={{ delay: 0.7 + yearIndex * 0.1, duration: 0.5 }}
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
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto px-4">
            {" "}
            Our dedicated teaching staff has shaped generations of hairdressing professionals, bringing decades of
            industry experience and passion for education to every classroom.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
