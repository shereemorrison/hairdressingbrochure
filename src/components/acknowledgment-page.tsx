"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import LightRays from "./light-rays"
import { useState, useEffect } from "react"

interface AcknowledgmentPageProps {
  onEnterBrochure: () => void
}

export default function AcknowledgmentPage({ onEnterBrochure }: AcknowledgmentPageProps) {
  const [titleComplete, setTitleComplete] = useState(false)
  const [contentComplete, setContentComplete] = useState(false)
  const titleText = "ACKNOWLEDGMENT OF COUNTRY"

  useEffect(() => {
    // Title completes after typewriter (~2s)
    const titleTimer = setTimeout(() => setTitleComplete(true), 2500)
    // Content completes after grow animation
    const contentTimer = setTimeout(() => setContentComplete(true), 5000)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-40">
      {/* Light Rays Background - Always visible, no animation */}
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
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="mb-8 sm:mb-12">
            <div className="flex justify-center space-x-4 sm:space-x-8 mb-6 sm:mb-8">
              {/* Aboriginal Flag */}
              <motion.div
                className="w-20 h-12 sm:w-32 sm:h-20 rounded-lg overflow-hidden"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <div className="h-full flex">
                  <div className="w-1/2 bg-black"></div>
                  <div className="w-1/2 bg-red-600"></div>
                </div>
              </motion.div>

              {/* Torres Strait Islander Flag */}
              <motion.div
                className="w-20 h-12 sm:w-32 sm:h-20 rounded-lg bg-blue-600 relative overflow-hidden"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-1/3 bg-green-600"></div>
                  <div className="h-1/3 bg-blue-600"></div>
                  <div className="h-1/3 bg-green-600"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-sm sm:text-xl">★</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Title - ONLY Typewriter Effect */}
          <div
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 leading-tight px-2"
            style={{
              color: "hsl(45, 60%, 60%)",
            }}
          >
            {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.8 + index * 0.08,
                  duration: 0.1,
                }}
                style={{
                  display: "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Main content - GROW Effect */}
          <motion.div
            className="text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 px-2"
            style={{ color: "hsl(45, 60%, 60%)" }}
            initial={{
              scale: 0.05,
              opacity: 0,
            }}
            animate={
              titleComplete
                ? {
                    scale: 1,
                    opacity: 1,
                  }
                : {
                    scale: 0.05,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 2.5,
              ease: "easeOut",
            }}
          >
            <p className="mb-4 sm:mb-6">
              We acknowledge the Dja Dja Wurrung people as the Traditional Custodians of the lands and waters where
              Bendigo TAFE is located.
            </p>
            <p className="mb-4 sm:mb-6">
              We pay our respects to Elders past and present, and extend that respect to all Aboriginal and Torres
              Strait Islander peoples.
            </p>
            <p>
              We recognize their continuing connection to country and culture, and their contribution to the life of
              this region.
            </p>
          </motion.div>

          {/* Button - INVISIBLE until content completes, then GROW */}
          <motion.div
            initial={{
              scale: 0.05,
              opacity: 0,
            }}
            animate={
              contentComplete
                ? {
                    scale: 1,
                    opacity: 1,
                  }
                : {
                    scale: 0.05,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 2.0,
              ease: "easeOut",
            }}
          >
            <Button
              onClick={onEnterBrochure}
              className="bg-[#d6b85c] hover:bg-[#bf9b30] text-black font-bold py-3 px-8 sm:py-4 sm:px-12 text-lg sm:text-xl rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              ENTER THE BROCHURE
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
