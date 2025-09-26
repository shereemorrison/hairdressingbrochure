"use client"

import { motion } from "framer-motion"
import { Lock, Film, Calendar, Star, Play, ExternalLink } from "lucide-react"

const comingSoonFeatures = [
  "Exclusive behind-the-scenes footage",
  "Interviews with legendary stylists",
  "Historical archive materials",
  "Student success stories",
  "Industry evolution timeline",
  "Special guest appearances",
]

interface MovieTabProps {
  // Automatically controlled by unlock schedule
  isVideoReady?: boolean
  // YouTube URL provided from main brochure when ready
  youtubeUrl?: string
  // Optional: Custom video title
  videoTitle?: string
}

export default function MovieTab({
  isVideoReady = false,
  youtubeUrl = "", // No default URL - only use what's passed from main brochure
  videoTitle = "Decades of Excellence"
}: MovieTabProps) {

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null

  // Only show video if BOTH conditions are met: unlocked schedule AND valid URL provided
  if (isVideoReady && videoId && youtubeUrl.trim() !== "") {
    // Show video when unlocked and URL is provided
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="py-4 sm:py-8 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Video Header */}
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
                {videoTitle}
              </h1>
            </div>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
              Watch our exclusive documentary celebrating decades of hairdressing excellence at Bendigo TAFE
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            className="glass-card p-3 sm:p-6 rounded-xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
                title={videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Video Details */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="glass-card p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3 sm:mb-4">Featured Content</h3>
              <div className="space-y-2 sm:space-y-3">
                {comingSoonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3 sm:mb-4">Watch Options</h3>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-xs sm:text-sm text-white/80">
                  Experience this documentary in full HD quality, showcasing the rich history and evolution of hairdressing education.
                </p>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors text-xs sm:text-sm"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // Show coming soon version (default)
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center py-8 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-4xl sm:text-6xl mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Film className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-yellow-400" />
        </motion.div>

        <motion.h1
          className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          DOCUMENTARY COMING SOON
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg mb-6 sm:mb-8 text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          This exclusive content will be available after the celebration event
        </motion.p>

        <motion.div
          className="glass-card p-4 sm:p-6 rounded-lg mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Film className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-400" />
            <h3 className="text-lg sm:text-xl font-bold text-yellow-400">What to Expect</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {comingSoonFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass-card p-4 sm:p-6 rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-400" />
            <h3 className="text-lg sm:text-xl font-bold text-yellow-400">Release Information</h3>
          </div>
          <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-white/80">
            Our documentary celebrating decades of hairdressing excellence will premiere during the October 2025
            celebration event.
          </p>
          <p className="text-xs sm:text-sm text-white/80">
            Attendees will be the first to experience this exclusive look at the evolution of hairdressing education at
            Bendigo TAFE.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}