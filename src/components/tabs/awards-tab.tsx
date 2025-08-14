"use client"

import { motion } from "framer-motion"
import { Trophy } from "lucide-react"
import { students } from "../../data/students"
import type { Student } from "../../types/student"

export default function AwardsTab() {
  // Get featured students (those with photos)
  const featuredStudents = students.filter((student) => student.hasPhoto)

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

        {/* Featured Students with Photos */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-yellow-400 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Featured Award Winners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featuredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                className="glass-card p-4 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg"
                    style={{
                      backgroundImage: student.photoFilename
                        ? `url(/assets/students/${student.photoFilename})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center top", // Focus on top portion to avoid cutting off heads
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {!student.photoFilename &&
                      student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{student.name}</h3>
                  <p className="text-yellow-400 text-xs font-semibold mb-2">{student.year}</p>
                  <p className="text-white/70 text-xs leading-relaxed">{student.award}</p>
                </div>
              </motion.div>
            ))}
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
