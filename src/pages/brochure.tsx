"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import AcknowledgmentPage from "@/components/acknowledgment-page"
import MainBrochure from "@/components/main-brochure"

type Stage = "loading" | "acknowledgment" | "brochure"

export default function Page() {
  const [currentStage, setCurrentStage] = useState<Stage>("loading")

  const handleLoadingComplete = () => {
    setCurrentStage("acknowledgment")
  }

  const handleAcknowledgmentComplete = () => {
    setCurrentStage("brochure")
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentStage === "loading" && <LoadingScreen key="loading" onComplete={handleLoadingComplete} />}

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
