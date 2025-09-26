"use client"

import { motion } from "framer-motion"
import { Coffee, Utensils, Clock, Phone, Users, Heart } from "lucide-react"

export default function RefreshmentsTab() {
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
              DELICIOUS
              <br />
              <span className="text-yellow-400">REFRESHMENTS</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl">Refreshment details to be announced.</p>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Menu</h3>
            </div>
            <p className="text-sm text-white/90 text-center py-4">Finger food (options tbc)</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Beverages</h3>
            </div>
            <p className="text-sm text-white/90 text-center py-4">TBA</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Catering Contact</h3>
            </div>
            <p className="text-sm text-white/90 text-center py-4">TBA</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Special Requirements</h3>
            </div>
            <p className="text-sm text-white/90 text-center py-4">TBA</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
