"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Phone, Clock, Users } from "lucide-react"

const eventHighlights = [
  "Live hairdressing demonstrations",
  "Alumni success stories",
  "Industry networking opportunities",
  "Student showcase presentations",
  "Refreshments and entertainment",
]

const schedule = [
  { time: "05:00 PM", event: "Welcome" },
  { time: "6:00 PM", event: "Awards Ceremony" },
  { time: "6:30 PM", event: "Video Presentation" },
]

export default function CelebrateTab() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-1 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl text-white font-black mb-6 leading-tight drop-shadow-lg">
              COME JOIN US TO CELEBRATE
              <br />
              <span className="text-yellow-400">HAIRDRESSING</span>
            </h1>
            <p className="text-lg text-white/90 font-semibold mb-6 leading-relaxed drop-shadow-md">
              At Bendigo TAFE, we've been shaping the future of hairdressing for decades. From traditional techniques to
              cutting-edge trends, our program has evolved to meet the ever-changing demands of the beauty industry.
            </p>
            <div className="space-y-4">
              {eventHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-white/90 font-semibold drop-shadow-md">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
              <h3 className="text-lg font-bold text-yellow-400">When</h3>
            </div>
            <p className="text-sm text-white/90">October 2025</p>
            <p className="text-xs mt-1 text-white/70">Save the date for this special celebration</p>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
              <h3 className="text-lg font-bold text-yellow-400">Where</h3>
            </div>
            <p className="text-sm text-white/90">Building G, 154 Hargreaves Street Bendigo, VIC 3552</p>
          </div>
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Phone className="w-5 h-5 mr-2 text-yellow-400" />
              <h3 className="text-lg font-bold text-yellow-400">Contact</h3>
            </div>
            <p className="text-sm text-white/90">Julie Curnow</p>
            <p className="text-sm text-white/90">Phone: 03 5434 1744</p>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 glass-card p-6 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 mr-2 text-yellow-400" />
            <h3 className="text-xl font-bold text-yellow-400">Event Schedule</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {schedule.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 py-2">
                <span className="text-xs font-bold text-yellow-400">{item.time}</span>
                <span className="text-xs text-white/90">{item.event}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 glass-card p-6 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >

        </motion.div>
      </div>
    </motion.div>
  )
}
