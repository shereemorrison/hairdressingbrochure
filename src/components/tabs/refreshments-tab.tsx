"use client"

import { motion } from "framer-motion"
import { Coffee, Utensils, Clock, Phone, Users, Heart } from "lucide-react"

const menuHighlights = [
  { category: "Hot Beverages", items: ["Barista coffee", "Premium teas", "Hot chocolate"] },
  { category: "Light Refreshments", items: ["Assorted pastries", "Fresh fruit platters", "Gourmet sandwiches"] },
  { category: "Sweet Treats", items: ["Celebration cake", "Mini desserts", "Local specialties"] },
]

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
            <p className="text-base sm:text-lg text-white/80 max-w-2xl">
              Join us for a delightful selection of refreshments and catering throughout our celebration event.
            </p>
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
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Service Times</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90">Morning Tea: 10:30 AM</p>
            <p className="text-xs sm:text-sm text-white/90">Lunch: 12:30 PM - 1:30 PM</p>
            <p className="text-xs sm:text-sm text-white/90">Afternoon Tea: 3:00 PM</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Dietary Options</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90">Vegetarian options available</p>
            <p className="text-xs sm:text-sm text-white/90">Gluten-free selections</p>
            <p className="text-xs sm:text-sm text-white/90">Please advise of allergies</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Catering Contact</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90">Event Coordinator</p>
            <p className="text-xs sm:text-sm text-white/90">Phone: 03 5434 1744</p>
            <p className="text-xs sm:text-sm text-white/90">Email: events@bendigotafe.edu.au</p>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 glass-card p-4 sm:p-6 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <Utensils className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
            <h3 className="text-base sm:text-xl font-bold text-yellow-400">Menu Highlights</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuHighlights.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h4 className="text-sm font-bold text-yellow-400 mb-3">{section.category}</h4>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span className="text-xs text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Beverage Station</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90 mb-2">
              Complimentary barista coffee and premium tea selection available throughout the event.
            </p>
            <p className="text-xs text-white/70">Located in the main foyer area for easy access between sessions.</p>
          </div>

          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Group Bookings</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90 mb-2">
              Special arrangements available for large groups and organizations.
            </p>
            <p className="text-xs text-white/70">Please contact us in advance to discuss your requirements.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
