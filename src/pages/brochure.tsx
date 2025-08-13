"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import AcknowledgmentPage from "@/components/acknowledgment-page"
import MainBrochure from "@/components/main-brochure"
import Preloader from "@/components/Preloader"

type Stage = "preloader" | "loading" | "acknowledgment" | "brochure"

export default function Brochure() {
  // Start with preloader
  const [currentStage, setCurrentStage] = useState<Stage>("preloader")

  // Preloader completion handler
  const handlePreloaderComplete = () => {
    setCurrentStage("loading")
  }

  const handleLoadingComplete = () => {
    setCurrentStage("acknowledgment")
  }

  const handleAcknowledgmentComplete = () => {
    setCurrentStage("brochure")
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Loading screen positioned behind preloader for reveal effect */}
      {(currentStage === "preloader" || currentStage === "loading") && (
        <div className="fixed inset-0 z-10">
          <LoadingScreen onComplete={handleLoadingComplete} />
        </div>
      )}

      {/* Preloader overlay that reveals loading screen underneath */}
      {currentStage === "preloader" && (
        <div className="fixed inset-0 z-50">
          <Preloader onComplete={handlePreloaderComplete} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentStage === "acknowledgment" && (
          <AcknowledgmentPage key="acknowledgment" onEnterBrochure={handleAcknowledgmentComplete} />
        )}

        {currentStage === "brochure" && (
          <motion.div
            key="brochure"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MainBrochure />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
