"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import dynamic from "next/dynamic"
import beautyLoaderAnimation from "../lib/beauty-loader.json"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

// Custom ease function
const customEase = "power2.inOut"

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const topHalfRef = useRef<HTMLDivElement>(null)
  const bottomHalfRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<HTMLDivElement>(null)
  const cuttingLineRef = useRef<HTMLDivElement>(null)
  const loadingTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animation timeline
    const tl = gsap.timeline()

    tl.to(
      {},
      {
        duration: 3.5,
        delay: 1,
        onStart: () => {
          gsap.to(lottieRef.current, {
            x: "100vw",
            duration: 3.5,
            ease: customEase,
          })
          gsap.to(
            { progress: 0 },
            {
              progress: 100,
              duration: 3.5,
              ease: customEase,
              onUpdate: function () {
                setProgress(Math.round(this.targets()[0].progress))
              },
            },
          )
        },
      },
    )

    tl.to(topHalfRef.current, {
      y: window.innerWidth < 768 ? "-120%" : "-100%",
      duration: window.innerWidth < 768 ? 1.5 : 1,
      ease: customEase,
      onStart: () => {
        gsap.to(lottieRef.current, {
          opacity: 0,
          duration: 0.3,
        })
        gsap.to(cuttingLineRef.current, {
          opacity: 0,
          duration: 0.3,
        })
        gsap.to(loadingTextRef.current, {
          opacity: 0,
          duration: 0.3,
        })
      },
    }).to(
      bottomHalfRef.current,
      {
       y: window.innerWidth < 768 ? "120%" : "100%",
       duration: window.innerWidth < 768 ? 1.5 : 1,
        ease: customEase,
        onComplete: () => {
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => {
              if (onComplete) onComplete()
            }, 1000)
          }, 1000)
        },
      },
      "<",
    )

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div ref={topHalfRef} className="absolute top-0 left-0 w-full h-1/2 bg-black" />

          <div ref={bottomHalfRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-black" />

          <div
            ref={loadingTextRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-12 sm:-translate-y-16 lg:-translate-y-20 z-10 text-center"
          >
            <div className="flex items-center justify-center space-x-3">
             <span className="text-white text-sm sm:text-lg lg:text-xl font-light tracking-wider">LOADING</span>
             <span className="text-yellow-400 text-lg sm:text-2xl lg:text-3xl font-bold">{progress}%</span>
            </div>
          </div>

          <div ref={cuttingLineRef} className="absolute top-1/2 left-0 w-full h-px transform -translate-y-1/2 z-5">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-px border-t border-dashed border-yellow-400/40"></div>
          </div>

          <div
            ref={lottieRef}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10"
            style={{ transform: "translateY(-50%)" }}
          >
            <div className="w-16 h-16 drop-shadow-2xl" style={{ transform: "rotate(90deg)" }}>
              <Lottie
                animationData={beautyLoaderAnimation}
                loop={true}
                autoplay={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
