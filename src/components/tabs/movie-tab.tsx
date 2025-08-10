"use client"

import { motion } from "framer-motion"
import { Lock, Film, Calendar, Star } from "lucide-react"

const comingSoonFeatures = [
  "Exclusive behind-the-scenes footage",
  "Interviews with legendary stylists",
  "Historical archive materials",
  "Student success stories",
  "Industry evolution timeline",
  "Special guest appearances",
]

export default function MovieTab() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center py-16 max-w-4xl mx-auto px-6">
        <motion.div
          className="text-6xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Lock className="w-24 h-24 mx-auto text-yellow-400" />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          DOCUMENTARY COMING SOON
        </motion.h1>

        <motion.p
          className="text-lg mb-8 text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          This exclusive content will be available after the celebration event
        </motion.p>

        <motion.div
          className="glass-card p-6 rounded-lg mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Film className="w-6 h-6 mr-2 text-yellow-400" />
            <h3 className="text-xl font-bold text-yellow-400">What to Expect</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {comingSoonFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-6 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 mr-2 text-yellow-400" />
            <h3 className="text-xl font-bold text-yellow-400">Release Information</h3>
          </div>
          <p className="text-sm mb-4 text-white/80">
            Our documentary celebrating decades of hairdressing excellence will premiere during the October 2025
            celebration event.
          </p>
          <p className="text-sm text-white/80">
            Attendees will be the first to experience this exclusive look at the evolution of hairdressing education at
            Bendigo TAFE.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
