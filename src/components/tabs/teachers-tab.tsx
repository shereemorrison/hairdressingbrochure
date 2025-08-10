"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"

const teachers = [
  { name: "Teacher 1", years: "2015-Present", specialty: "Traditional Cutting & Styling" },
  { name: "Teacher 2", years: "2015-Present", specialty: "Color Theory & Chemistry" },
  { name: "Teacher 3", years: "2015-Present", specialty: "Advanced Techniques" },
  { name: "Teacher 4", years: "2015-Present", specialty: "Modern Styling & Trends" },
  { name: "Teacher 5", years: "2010-Present", specialty: "Creative Design & Innovation" },
  { name: "Teacher 6", years: "2015-Present", specialty: "Business & Industry Relations" },
]

export default function TeachersTab() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-8 sm:mb-16 text-center text-[var(--darkest)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          OUR <span className="text-black">TEACHERS</span>
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.name}
              className="glass-card p-4 sm:p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400/30 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center backdrop-blur-sm">
                <User className="text-base sm:text-lg text-yellow-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-yellow-400">{teacher.name}</h3>
              <p className="text-yellow-300/80 mb-2 text-xs sm:text-sm">{teacher.years}</p>
              <p className="text-xs sm:text-sm text-white/80">{teacher.specialty}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
            Our dedicated teaching staff has shaped generations of hairdressing professionals, bringing decades of
            industry experience and passion for education to every classroom.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
