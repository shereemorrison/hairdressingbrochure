"use client"

import { useState, useEffect } from "react"
import { Users, Trophy, Clock, Film, Sparkles, ArrowLeft, Utensils, Camera } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Aurora from "./aurora"
import MagicBento from "./magic-bento"
import TeachersTab from "@/components/tabs/teachers-tab"
import CelebrateTab from "@/components/tabs/celebrate-tab"
import AwardsTab from "@/components/tabs/awards-tab"
import DecadesTab from "@/components/tabs/decades-tab"
import MovieTab from "@/components/tabs/movie-tab"
import GalleryTab from "@/components/tabs/gallery-tab"
import bendigoLogo from "@/assets/bendigoLogo.png"
import celebrate from "@/assets/celebrate.jpg"
import tafebuilding from "@/assets/tafebuilding.jpg"
import group1 from "@/assets/teachers/group1.jpg"
import award from "@/assets/award.jpg"
import food from "@/assets/food.jpg"
import gallery from "@/assets/gallery.jpg"
import RefreshmentsTab from "@/components/tabs/refreshments-tab"

export default function MainBrochure() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const iconSections = [
    {
      id: "teachers",
      icon: Users,
      title: "TEACHERS",
      description: "Meet our dedicated educators and staff members",
      label: "Educators",
      color: "rgba(0, 0, 0, 0.1)",
      backgroundImage: group1,
      component: TeachersTab,
      onClick: () => setActiveSection("teachers"),
    },
    {
      id: "awards",
      icon: Trophy,
      title: "AWARDS",
      description: "Recognition, achievements and accolades",
      label: "Recognition",
      color: "rgba(0, 0, 0, 0.1)",
      backgroundImage: award,
      component: AwardsTab,
      onClick: () => setActiveSection("awards"),
    },
    {
      id: "decades",
      icon: Clock,
      title: "HISTORY OF HAIRDRESSING",
      description: "Journey through the decades of hairdressing",
      label: "History",
      color: "rgba(0, 0, 0, 0.1)",
      backgroundImage: tafebuilding,
      component: DecadesTab,
      onClick: () => setActiveSection("decades"),
    },
    {
      id: "celebrate",
      icon: Sparkles,
      title: "EVENT DETAILS",
      description: "Main celebration content and event information",
      label: "Celebration",
      color: "rgba(0, 0, 0, 0.1)",
      backgroundImage: celebrate,
      component: CelebrateTab,
      onClick: () => setActiveSection("celebrate"),
    },
    {
      id: "food",
      icon: Utensils,
      title: "REFRESHMENTS",
      description: "Catering details and menu options",
      label: "Food",
      color: "rgba(0, 0, 0, 0.1)",
      backgroundImage: food,
      component: RefreshmentsTab,
      locked: false,
      onClick: () => setActiveSection("food"),
    },
    {
      id: "gallery",
      icon: Camera,
      title: "GALLERY",
      description: "Campus photos and building images",
      label: "Gallery",
      color: "rgba(0, 0, 0, 0.1)",
      backgroundImage: gallery,
      component: GalleryTab,
      onClick: () => setActiveSection("gallery"),
    },
    {
      id: "movie",
      icon: Film,
      title: "MOVIE",
      description: "Coming soon - exclusive content",
      label: "Documentary",
      color: "rgba(0, 0, 0, 0.4)",
      component: MovieTab,
      locked: true,
      onClick: () => setActiveSection("movie"),
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

      {/* Logo in top-right corner */}
      <div className="relative z-20 flex justify-end p-6">
        <img src={bendigoLogo || "/placeholder.svg"} alt="Bendigo TAFE" className="h-16 drop-shadow-lg" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-6 pb-6">
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
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackToLanding}
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
                duration: 0.5,
              }}
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
                ) : (
                  <activeComponent.component />
                )}
              </motion.div>

              {/* Floating Back Button - Hide when gallery modal is open */}
                {!isGalleryModalOpen && (
                  <motion.button
                    onClick={handleBackToLanding}
                    className="absolute top-4 right-4 z-[99998] flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 shadow-lg border border-yellow-500/50 bg-black/60 backdrop-blur-md text-yellow-400 hover:bg-black/80 hover:border-yellow-400 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-sm font-medium">Back</span>
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
