"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Award, Medal } from "lucide-react"
import students from "@/assets/students.jpeg"

const winners = [
  { name: "Student 1", year: "2023", achievement: "Outstanding Student Achievement" },
  { name: "Student 2", year: "2022", achievement: "Creative Excellence Award" },
  { name: "Student 3", year: "2021", achievement: "Technical Mastery Recognition" },
  { name: "Student 4", year: "2020", achievement: "Innovation in Styling" },
  { name: "Student 5", year: "2023", achievement: "Best Color Application" },
  { name: "Student 6", year: "2022", achievement: "Most Improved Student" },
  { name: "Student 7", year: "2021", achievement: "Industry Leadership Award" },
  { name: "Student 8", year: "2020", achievement: "Creative Vision Excellence" },
]

const criteria = [
  "Technical Excellence",
  "Creative Innovation",
  "Professional Development",
  "Industry Contribution",
  "Peer Recognition",
  "Client Satisfaction",
]


export default function AwardsTab() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <motion.h1
          className="text-5xl md:text-7xl font-black mb-16 text-center text-[var(--darkest)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          CELEBRATING <span className="text-black">OUR</span> STUDENTS
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Recent Award Winners</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {winners.map((winner, index) => (
                <motion.div
                  key={winner.name}
                  className="flex items-center space-x-4 glass-card p-4 rounded-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-2xl text-yellow-400">
                    <Trophy />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400">{winner.name}</h3>
                    <p className="text-yellow-300/80 text-sm">{winner.year}</p>
                    <p className="text-sm text-white/80">{winner.achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.img
              src={students}
              alt="Professional salon equipment"
              className="rounded-lg shadow-xl w-full h-48 object-cover mb-6 border border-yellow-400/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />

            <motion.div
              className="glass-card p-6 rounded-lg mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Award Criteria</h3>
              <ul className="space-y-2">
                {criteria.map((criterion) => (
                  <li key={criterion} className="flex items-center space-x-3">
                    <Star className="text-yellow-400 w-3 h-3" />
                    <span className="text-sm text-white/80">{criterion}</span>
                  </li>
                ))}
              </ul>
            </motion.div>


          </div>
        </div>
      </div>
    </motion.div>
  )
}
