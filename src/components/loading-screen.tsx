"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Lanyard from "@/blocks/Components/Lanyard/Lanyard"
import VantaBirdsBackground from "@/components/VantaBirdsBackground"

interface LoadingScreenProps {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"idle" | "birds-only" | "lanyard-fall" | "lanyard-interactive" | "exiting">("idle")

  const lanyardRef = useRef<HTMLDivElement>(null)

  // Phase transitions
  useEffect(() => {
    if (phase === "idle") {
      setTimeout(() => setPhase("birds-only"), 200)
    }
    if (phase === "birds-only") {
      setTimeout(() => setPhase("lanyard-fall"), 4000)
    }
    if (phase === "lanyard-fall") {
      setTimeout(() => setPhase("lanyard-interactive"), 1000)
    }
    if (phase === "exiting") {
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 1500)
    }
  }, [phase, onComplete])

  const handleLanyardClick = () => {
    if (phase !== "lanyard-interactive") return
    setPhase("exiting")
  }

  const showMainScene = ["birds-only", "lanyard-fall", "lanyard-interactive", "exiting"].includes(phase)
  const showLanyard = ["lanyard-fall", "lanyard-interactive", "exiting"].includes(phase)
  const lanyardFallen = ["lanyard-interactive"].includes(phase)
  const isExiting = phase === "exiting"

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence>
        {/* Initial black screen */}
        {phase === "idle" && (
          <motion.div
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Main unified scene */}
        {showMainScene && (
          <motion.div
            className="fixed inset-0 overflow-hidden z-30"
            initial={{ opacity: 1, scale: 1 }}
            animate={isExiting ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={isExiting ? { duration: 1.5, ease: "easeInOut" } : { duration: 0.5 }}
          >
            <VantaBirdsBackground className="absolute inset-0" />

            {/* Left side text */}
            <div className="absolute inset-0 z-50 pointer-events-none">
              <motion.div
                className="absolute left-12 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isExiting
                    ? { opacity: 0, x: -150, scale: 0.7 }
                    : lanyardFallen
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -50 }
                }
                transition={isExiting ? { duration: 1.2, ease: "easeInOut" } : { duration: 0.8, delay: 1.2 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                  Celebrate
                  <br />
                  Hairdressing
                  <br />
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600 bg-clip-text text-transparent">
                    with us
                  </span>
                </h1>
              </motion.div>
            </div>

            {/* Right side text */}
            <div className="absolute inset-0 z-50 pointer-events-none">
              <motion.div
                className="absolute top-16 right-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isExiting
                    ? { opacity: 0, scale: 0.4, x: 150 }
                    : lanyardFallen
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                }
                transition={isExiting ? { duration: 1.2, ease: "easeInOut" } : { duration: 0.6, delay: 2.0 }}
              >
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-2xl">
                    Click your ticket
                    <br />
                    To Enter
                  </p>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-pink-400 ml-auto"></div>
                </div>
              </motion.div>
            </div>

            {/* Lanyard */}
            {showLanyard && (
              <motion.div
                ref={lanyardRef}
                className="absolute inset-0 z-20"
                initial={{ y: "-100%" }}
                animate={
                  isExiting
                    ? {
                        y: "-200%",
                        scale: 0.5,
                        rotate: 25,
                        opacity: 0,
                      }
                    : lanyardFallen
                      ? { y: 0 }
                      : { y: "-100%" }
                }
                transition={
                  isExiting
                    ? {
                        duration: 1.5,
                        ease: "easeIn",
                        type: "spring",
                        stiffness: 60,
                        damping: 10,
                      }
                    : { duration: 1.0, ease: "easeOut" }
                }
              >
                <Lanyard position={[-15, 0, 20]} gravity={[0, -40, 0]} onCardClick={handleLanyardClick} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
