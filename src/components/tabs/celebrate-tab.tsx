"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Phone, Music } from "lucide-react"

const eventHighlights = [
    //Maybe add more highlights once confirmed with Julie/Zeb
]

const entertainment = [
  {
    category: "Music",
    items: [
      { performer: "Luke Owens", era: "Guitar & Vocals" },
    ],
  },
  {
    category: "Hair Show - 8.30pm - 8.45pm",
    items: [
      { performer: "Rikki Blake", era: "1970's" },
      { performer: "Emily Eliades & Tia Webb", era: "1980's" },
      { performer: "Julianne Shelton", era: "1990's" },
    ],
  },
  {
    category: "Hairdressers of the Future",
    items: [
      { performer: "Bella Mills & Ellie West", era: "The Future (Mentored by Lauren McIlrath)" },
    ],
  },
]

export default function CelebrateTab() {
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
              COME JOIN US TO CELEBRATE
              <br />
              <span className="text-yellow-400">HAIRDRESSING</span>
            </h1>

            <div className="space-y-2 sm:space-y-4">
              {eventHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-white/90 font-semibold drop-shadow-md">{highlight}</span>
                </div>
              ))}
            </div>
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
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">When</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90">Friday 17 October 2025</p>
            <p className="text-xs mt-1 text-white/70">Save the date for this special celebration</p>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Where</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90">Bendigo TAFE Restaurant, <br /> Building E<br /> 154 Hargreaves Street <br /> Bendigo <br />VIC 3552</p>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-lg sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">Contact</h3>
            </div>
            <p className="text-xs sm:text-sm text-white/90">Julie Curnow</p>
            <p className="text-xs sm:text-sm text-white/90">Phone: 03 5434 1744</p>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 glass-card p-4 sm:p-6 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <Music className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0" />
            <h3 className="text-base sm:text-xl font-bold text-yellow-400">Entertainment</h3>
          </div>
          <div className="space-y-4">
            {entertainment.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h4 className="text-sm font-bold text-yellow-400 mb-2">{section.category}</h4>
                <div className="grid grid-cols-1 gap-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between py-1">
                      <span className="text-xs text-white/90">{item.performer}</span>
                      {item.era && <span className="text-xs text-yellow-400/70">{item.era}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
