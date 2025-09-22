"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import LightRays from "./light-rays"
import { useState, useEffect } from "react"

interface AcknowledgmentPageProps {
  onEnterBrochure: () => void
}

// Custom typewriter hook
function useTypewriter(text: string, speed = 100) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return { displayText, isComplete }
}

export default function AcknowledgmentPage({ onEnterBrochure }: AcknowledgmentPageProps) {
  const [contentVisible, setContentVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)

  const titleText = "ACKNOWLEDGMENT OF COUNTRY"
  const { displayText: typewriterText, isComplete: titleComplete } = useTypewriter(titleText, 80)

  useEffect(() => {
    if (titleComplete) {
      // Show content after title completes
      const contentTimer = setTimeout(() => setContentVisible(true), 500)
      // Show button after content animation
      const buttonTimer = setTimeout(() => setButtonVisible(true), 2000)

      return () => {
        clearTimeout(contentTimer)
        clearTimeout(buttonTimer)
      }
    }
  }, [titleComplete])

  return (
    <div className="fixed inset-0 z-40">
      {/* Light Rays Background */}
      <div className="absolute inset-0 w-full h-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#d6b85c"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      {/* Content with swipe-up animation */}
      <motion.div
        className="fixed inset-0 bg-black flex items-center justify-center min-h-screen"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          duration: 0.8,
        }}
      >
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <div className="relative p-8 sm:p-12 rounded-2xl backdrop-blur-xl bg-black/20 border border-[#d6b85c]/20 shadow-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d6b85c]/10 via-transparent to-[#d6b85c]/5 pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-8 sm:mb-12">
                <div
                  className="flex justify-center space-x-4 sm:space-x-8 mb-6 sm:mb-8"
                  style={{ perspective: "2000px", perspectiveOrigin: "center center" }}
                >
                  {/* Aboriginal Flag */}
                  <motion.div
                    className="w-20 h-12 sm:w-32 sm:h-20 rounded-lg overflow-hidden relative group cursor-pointer"
                    initial={{ scale: 0, opacity: 0, rotateY: -90, translateZ: -200 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0, translateZ: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    whileHover={{
                      rotateY: 25,
                      rotateX: -15,
                      scale: 1.3,
                      translateZ: 100,
                      y: -20,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow: `
                        0 25px 80px rgba(214, 184, 92, 0.4),
                        0 40px 120px rgba(0, 0, 0, 0.6),
                        0 5px 20px rgba(214, 184, 92, 0.3),
                        inset 0 2px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -2px 0 rgba(0, 0, 0, 0.2)
                      `,
                    }}
                    whileInView={{
                      y: [0, -8, 0],
                      rotateY: [0, 3, -3, 0],
                      transition: {
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <div className="h-full flex relative">
                      <div className="w-1/2 bg-black relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-black to-gray-900" />
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-black/50 to-transparent" />
                      </div>
                      <div className="w-1/2 bg-red-600 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-600 to-red-900" />
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-red-900/50 to-transparent" />
                      </div>
                      {/* Enhanced yellow circle with 3D depth */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-3 h-3 sm:w-6 sm:h-6 rounded-full relative"
                          style={{
                            background: "radial-gradient(circle at 30% 30%, #ffd700, #ffed4e, #d4af37)",
                            boxShadow: `
                              0 0 10px rgba(255, 215, 0, 0.8),
                              inset 0 2px 4px rgba(255, 255, 255, 0.3),
                              inset 0 -2px 4px rgba(0, 0, 0, 0.2)
                            `,
                          }}
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-lg border-2 border-[#d6b85c]/30 group-hover:border-[#d6b85c]/60 transition-colors duration-300" />
                  </motion.div>

                  {/* Torres Strait Islander Flag */}
                  <motion.div
                    className="w-20 h-12 sm:w-32 sm:h-20 rounded-lg relative overflow-hidden group cursor-pointer"
                    initial={{ scale: 0, opacity: 0, rotateY: 90, translateZ: -200 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0, translateZ: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    whileHover={{
                      rotateY: -25,
                      rotateX: -15,
                      scale: 1.3,
                      translateZ: 100,
                      y: -20,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow: `
                        0 25px 80px rgba(214, 184, 92, 0.4),
                        0 40px 120px rgba(0, 0, 0, 0.6),
                        0 5px 20px rgba(214, 184, 92, 0.3),
                        inset 0 2px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -2px 0 rgba(0, 0, 0, 0.2)
                      `,
                    }}
                    whileInView={{
                      y: [0, -8, 0],
                      rotateY: [0, -3, 3, 0],
                      transition: {
                        duration: 6.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                      },
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col">
                      <div className="h-1/3 bg-gradient-to-br from-green-400 via-green-600 to-green-900 relative">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-green-900/50 to-transparent" />
                      </div>
                      <div className="h-1/3 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 relative">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-900/50 to-transparent" />
                      </div>
                      <div className="h-1/3 bg-gradient-to-br from-green-400 via-green-600 to-green-900 relative">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-green-900/50 to-transparent" />
                      </div>
                    </div>
                    {/* Enhanced 3D star with dramatic glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-white text-sm sm:text-xl font-bold relative"
                        style={{
                          textShadow: `
                            0 0 20px rgba(255, 255, 255, 0.8),
                            0 4px 8px rgba(0, 0, 0, 0.8),
                            0 0 40px rgba(255, 255, 255, 0.4)
                          `,
                          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))",
                        }}
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        ★
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 rounded-lg border-2 border-[#d6b85c]/30 group-hover:border-[#d6b85c]/60 transition-colors duration-300" />
                  </motion.div>
                </div>
              </div>

              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 leading-tight px-2 min-h-[2.5rem]">
                <span style={{ color: "hsl(45, 60%, 60%)" }}>{typewriterText}</span>
                {!titleComplete && (
                  <motion.span
                    className="inline-block w-0.5 h-6 sm:h-8 bg-[#d6b85c] ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                )}
              </div>

              <motion.div
                className="text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 px-2"
                style={{ color: "hsl(45, 60%, 60%)" }}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={
                  contentVisible
                    ? {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }
                    : {
                        opacity: 0,
                        y: 30,
                        filter: "blur(10px)",
                      }
                }
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.p
                  className="mb-4 sm:mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={contentVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  I would like to acknowledge our meeting/event/conference is being held on the lands of the Djaara people of the Dja Dja Wurrung and I wish to acknowledge them as the Traditional Owners.
                </motion.p>
                <motion.p
                  className="mb-4 sm:mb-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={contentVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  I pay my respects to their Elders, past and present along with other Aboriginal and Torres Strait Islander people present today.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                 We recognise their continuing connection to land, waters and culture.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={
                  buttonVisible
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                      }
                }
                transition={{ duration: 1, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onEnterBrochure}
                  className="relative bg-[#d6b85c] hover:bg-[#bf9b30] text-black font-bold py-3 px-8 sm:py-4 sm:px-12 text-lg sm:text-xl rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10">ENTER THE BROCHURE</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
