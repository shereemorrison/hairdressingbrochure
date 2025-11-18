"use client"

import { useState, useEffect } from "react"
import { Users, Trophy, Clock, Film, Sparkles, ArrowLeft, Utensils, Camera, PartyPopper } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Aurora from "./aurora"
import MagicBento from "./magic-bento"
import TeachersTab from "@/components/tabs/teachers-tab"
import CelebrateTab from "@/components/tabs/celebrate-tab"
import AwardsTab from "@/components/tabs/awards-tab"
import DecadesTab from "@/components/tabs/decades-tab"
import MovieTab from "@/components/tabs/movie-tab"
import GalleryTab from "@/components/tabs/gallery-tab"
import RefreshmentsTab from "@/components/tabs/refreshments-tab"
import AfterPartyTab from "@/components/tabs/after-party"


// COMMENTED OUT UNTIL READY TO IMPLEMENT - Enable when ready for scheduled release

const UNLOCK_SCHEDULE = {
  gallery: new Date('2025-10-09T00:00:00+11:00'),     // Friday 10 Oct - Locations/Gallery (Available immediately)
  teachers: new Date('2025-10-13T10:00:00+11:00'),   // Monday 13 Oct 10am - Teachers names
  decades: new Date('2025-10-15T10:00:00+11:00'),    // Wed 15 Oct 10am - Bendigo TAFE Hairdressing History
  food: new Date('2025-10-17T17:00:00+11:00'),       // Friday 17 Oct 5pm - Menu/Refreshments
  awards: new Date('2025-10-17T17:00:00+11:00'),     // Friday 17 Oct 5pm - Award Winners
  celebrate: new Date('2025-10-17T17:00:00+11:00'),  // Friday 17 Oct 5pm - Entertainment
  movie: new Date('2025-10-17T22:00:00+11:00'),      // Friday 17 Oct 10pm - Hair movie
}


// TEMPORARY: All tabs unlocked for development/testing
/*const UNLOCK_SCHEDULE = {
  teachers: new Date('2025-01-01T10:00:00+11:00'), // Available immediately
  celebrate: new Date('2025-01-02T10:00:00+11:00'), // 10am AEST
  food: new Date('2025-01-03T10:00:00+11:00'), // 10am AEST
  awards: new Date('2025-01-03T10:00:00+11:00'), // 10am AEST
  decades: new Date('2025-01-04T10:00:00+11:00'), // 10am AEST
  gallery: new Date('2025-10-08T18:10:00+11:00'), // 10am AEST
  movie: new Date('2025-10-17T21:00:00+11:00'), // 9pm AEST

}*/

export default function MainBrochure() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Update current date every minute to check for unlocks
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  // Function to check if a tab is unlocked
  const isTabUnlocked = (tabId: string): boolean => {
    const unlockDate = UNLOCK_SCHEDULE[tabId as keyof typeof UNLOCK_SCHEDULE]
    if (!unlockDate) return true
    return currentDate >= unlockDate
  }

  // Function to get time until unlock
  const getTimeUntilUnlock = (tabId: string): string => {
    const unlockDate = UNLOCK_SCHEDULE[tabId as keyof typeof UNLOCK_SCHEDULE]
    if (!unlockDate || currentDate >= unlockDate) return ''

    const diff = unlockDate.getTime() - currentDate.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `Unlocks in ${days} day${days !== 1 ? 's' : ''}`
    if (hours > 0) return `Unlocks in ${hours}h ${minutes}m`
    return `Unlocks in ${minutes}m`
  }

  // Function to get the next unlock date
  const getNextUnlockDate = (): Date | null => {
    const futureDates = Object.values(UNLOCK_SCHEDULE)
      .filter(date => date > currentDate)
      .sort((a, b) => a.getTime() - b.getTime())

    return futureDates.length > 0 ? futureDates[0] : null
  }

  // Function to format countdown to next unlock
  const getNextUnlockCountdown = (): string => {
    const nextUnlock = getNextUnlockDate()
    if (!nextUnlock) return 'All unlocked!'

    const diff = nextUnlock.getTime() - currentDate.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `Next in ${days}d ${hours}h`
    if (hours > 0) return `Next in ${hours}h ${minutes}m`
    return `Next in ${minutes}m`
  }

  const handleTabClick = (tabId: string) => {
    if (isTabUnlocked(tabId) || tabId === 'movie') {
      setActiveSection(tabId)
    }
  }

  const iconSections = [
    {
      id: "teachers",
      icon: Users,
      title: "TEACHERS",
      description: isTabUnlocked("teachers")
        ? "Meet our dedicated educators and staff members"
        : isMobile
          ? `Meet our dedicated educators and staff members • ${getTimeUntilUnlock("teachers")}`
          : getTimeUntilUnlock("teachers"),
      label: "Educators",
      color: isTabUnlocked("teachers") ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)",
      backgroundImage: "/assets/teachers/group1.webp",
      component: TeachersTab,
      locked: !isTabUnlocked("teachers"),
      onClick: () => handleTabClick("teachers"),
    },
    {
      id: "awards",
      icon: Trophy,
      title: "AWARDS",
      description: isTabUnlocked("awards")
        ? "Recognition, achievements and accolades"
        : getTimeUntilUnlock("awards"),
      label: "Recognition",
      color: isTabUnlocked("awards") ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)",
      backgroundImage: "/assets/award.webp",
      component: AwardsTab,
      locked: !isTabUnlocked("awards"),
      onClick: () => handleTabClick("awards"),
    },
    {
      id: "decades",
      icon: Clock,
      title: "HISTORY OF HAIRDRESSING",
      description: isTabUnlocked("decades")
        ? "Journey through the decades of hairdressing"
        : getTimeUntilUnlock("decades"),
      label: "History",
      color: isTabUnlocked("decades") ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)",
      backgroundImage: "/assets/tafebuilding.webp",
      component: DecadesTab,
      locked: !isTabUnlocked("decades"),
      onClick: () => handleTabClick("decades"),
    },
    {
      id: "celebrate",
      icon: Sparkles,
      title: "EVENT DETAILS",
      description: isTabUnlocked("celebrate")
        ? "Main celebration content and event information"
        : getTimeUntilUnlock("celebrate"),
      label: "Celebration",
      color: isTabUnlocked("celebrate") ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)",
      backgroundImage: "/assets/celebrate.webp",
      component: CelebrateTab,
      locked: !isTabUnlocked("celebrate"),
      onClick: () => handleTabClick("celebrate"),
    },
    {
      id: "food",
      icon: Utensils,
      title: "REFRESHMENTS",
      description: isTabUnlocked("food")
        ? "Catering details and menu options"
        : getTimeUntilUnlock("food"),
      label: "Food",
      color: isTabUnlocked("food") ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)",
      backgroundImage: "/assets/food.webp",
      component: RefreshmentsTab,
      locked: !isTabUnlocked("food"),
      onClick: () => handleTabClick("food"),
    },
    {
      id: "gallery",
      icon: Camera,
      title: "GALLERY",
      description: isTabUnlocked("gallery")
        ? "Campus photos and building images"
        : getTimeUntilUnlock("gallery"),
      label: "Gallery",
      color: isTabUnlocked("gallery") ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)",
      backgroundImage: "/assets/gallery.webp",
      component: GalleryTab,
      locked: !isTabUnlocked("gallery"),
      onClick: () => handleTabClick("gallery"),
    },
    {
      id: "movie",
      icon: Film, // Lock icon when locked, Film when unlocked
      title: "MOVIE",
      description: isTabUnlocked("movie")
        ? "Exclusive documentary content"
        : `${getTimeUntilUnlock("movie")} • Click to preview`,
      label: "Documentary",
      color: isTabUnlocked("movie") ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)",
      backgroundImage: "/assets/movie.webp",
      component: MovieTab,
      locked: !isTabUnlocked("movie"),
      specialBehavior: "clickable-preview", // Special flag for MagicBento to handle
      isActuallyLocked: !isTabUnlocked("movie"), // Track real lock status for counter
      onClick: () => handleTabClick("movie"),
    },
    {
      id: "afterparty",
      icon: PartyPopper,
      title: "AFTER PARTY",
      description: isTabUnlocked("afterparty")
        ? "Relive the celebration with post party snap shots"
        : getTimeUntilUnlock("afterparty"),
      label: "After Party",
      color: isTabUnlocked("afterparty") ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)",
      backgroundImage: "/assets/afterparty.webp",
      component: AfterPartyTab,
      locked: !isTabUnlocked("afterparty"),
      onClick: () => handleTabClick("afterparty"),
    },
  ]

  const handleBackToLanding = () => {
    setActiveSection(null)
  }

  const handleGalleryModalChange = (isOpen: boolean) => {
    setIsGalleryModalOpen(isOpen)
  }

  const activeComponent = iconSections.find((section) => section.id === activeSection)

  return (
    <div className={`relative flex flex-col min-h-screen`}>
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora colorStops={["#000000", "#FFD700", "#FFA225"]} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Header with Logo */}
      <div className="relative z-20 flex justify-end p-6">
        <img src="/assets/bendigoLogo.webp" alt="Bendigo TAFE" className="h-16 drop-shadow-lg" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Unlock Status Banner - Centered above bento */}
        <motion.div
          className="mb-6 px-3 sm:px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-yellow-500/30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 text-yellow-400 text-xs sm:text-sm font-medium">
            <span>
              {iconSections.filter(section =>
                section.id === 'movie' ? !section.isActuallyLocked : !section.locked
              ).length} of {iconSections.length} unlocked
            </span>
            <span className="text-yellow-400/60">•</span>
            <span className="text-yellow-400/80">
              {getNextUnlockCountdown()}
            </span>
          </div>
        </motion.div>

        <div className="w-full flex items-center justify-center">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={1000}
            particleCount={20}
            glowColor="255, 215, 0"
            cards={iconSections}
          />
        </div>
      </div>

      {/* Card-like Content Overlay */}
      <AnimatePresence>
        {activeSection && activeComponent && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackToLanding}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            />

            {/* Card Container */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden bg-black/80 backdrop-blur-md border border-yellow-500/30"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: isMobile ? 0.8 : 0.5,
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              {/* Aurora Background for Card */}
              <div className="absolute inset-0 z-0">
                <Aurora colorStops={["#000000", "#FFD700", "#FFA225"]} blend={0.5} amplitude={1.0} speed={0.5} />
              </div>

              {/* Subtle overlay for Card */}
              <div className="absolute inset-0 bg-black/40 z-10" />

              {/* Card Content */}
              <motion.div
                className="relative z-20 card-scroll-container card-content-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                  exit: { delay: 0, duration: 0.2 },
                }}
              >
                {activeSection === "gallery" ? (
                  <GalleryTab onModalStateChange={handleGalleryModalChange} />
                ) : activeSection === "movie" ? (
                  <MovieTab
                    isVideoReady={isTabUnlocked("movie")} // Automatically switches when unlocked
                    youtubeUrl="https://www.youtube.com/watch?v=G7ty1VMW0tg"
                    videoTitle="Decades of Excellence"
                  />
                ) : (
                  <activeComponent.component />
                )}
              </motion.div>


              {/* Floating Back Button - Hide when gallery modal is open */}
              {!isGalleryModalOpen && (
                <motion.button
                  onClick={handleBackToLanding}
                  className="absolute top-4 right-4 z-[99998] flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 shadow-lg border border-yellow-500/50  backdrop-blur-md text-yellow-400 hover:bg-black/80 hover:border-yellow-400 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-xs font-medium">Back</span>
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}