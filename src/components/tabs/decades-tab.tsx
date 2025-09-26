"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import hairdressing from "@/assets/hairdressing.jpg"
import hairdressingstudent from "@/assets/hairdressingstudent.jpeg"
import salon from "@/assets/salon.jpeg"
import students from "@/assets/students.jpeg"
import barber from "@/assets/barber.jpeg"
import scissors from "@/assets/scissors.jpg"
import colormix from "@/assets/colormix.jpg"
import curls from "@/assets/curls.jpg"

const decades = [
  {
    id: "70s",
    title: "1970's",
    description:
      "The era of feathered hair, shags, and the iconic Farrah Fawcett look. Natural textures and layered cuts dominated the decade.",
    features: [
      "Feathered hair and center parts",
      "Long, layered shag cuts",
      "Natural textures and movement",
      "Blow-dry styling techniques",
    ],
    images: [hairdressing, scissors],
    details:
      "The 1970s marked a revolutionary period in hairdressing with the introduction of precision cutting techniques and the rise of unisex salons. This decade saw the emergence of iconic stylists who would shape the industry for years to come.",
  },
  {
    id: "80s",
    title: "1980's",
    description:
      "Big hair, bold styles, and dramatic volume defined this decade. Perms, crimping, and hairspray were essential tools.",
    features: [
      "Voluminous permed styles",
      "Crimped and teased textures",
      "Bold geometric cuts",
      "Dramatic color contrasts",
    ],
    images: [barber, salon],
    details:
      "The 1980s brought technological advances in hair tools and products. The decade was characterized by experimentation with chemical processes and the development of new styling techniques that pushed creative boundaries.",
  },
  {
    id: "90s",
    title: "1990's",
    description:
      "Grunge-inspired cuts, face-framing layers, and the iconic 'Rachel' cut. Natural textures made a comeback.",
    features: [
      "Choppy, layered cuts",
      "Face-framing highlights",
      "Sleek, straight styles",
      "Natural, effortless looks",
    ],
    images: [colormix, curls],
    details:
      "The 1990s saw a shift towards more natural, lived-in styles. This period introduced advanced coloring techniques and the beginning of the modern salon experience with improved client consultation processes.",
  },
  {
    id: "2000s",
    title: "2000's",
    description:
      "Pin-straight hair, chunky highlights, and experimental colors. The flat iron became an essential styling tool.",
    features: [
      "Ultra-straight, sleek styles",
      "Chunky blonde highlights",
      "Side-swept bangs",
      "Bold color experimentation",
    ],
    images: [students, hairdressingstudent],
    details:
      "The 2000s revolutionized hair styling with advanced heat tools and chemical straightening treatments. This decade marked the beginning of social media's influence on hair trends and the globalization of beauty standards.",
  },
  {
    id: "2010s",
    title: "2010's",
    description:
      "Beach waves, ombre colors, and effortless styling. Social media influenced new trends and techniques.",
    features: ["Beachy, tousled waves", "Ombre and balayage coloring", "Long bob (lob) cuts", "Messy, textured styles"],
    images: [students, scissors],
    details:
      "The 2010s brought the rise of social media influencers and YouTube tutorials, democratizing hair education. This decade saw the perfection of balayage techniques and the emergence of sustainable beauty practices.",
  },
  {
    id: "2020s",
    title: "2020's",
    description:
      "Sustainable styling, creative colors, and personalized cuts. Technology and eco-consciousness shape modern hairdressing.",
    features: [
      "Sustainable styling practices",
      "Creative, artistic coloring",
      "Personalized, custom cuts",
      "Technology-assisted styling",
    ],
    images: [
      "https://images.unsplash.com/photo-1595475884218-d7fd1c2d9095?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
    ],
    details:
      "The 2020s represent the future of hairdressing with AI-assisted color matching, virtual consultations, and a strong focus on environmental responsibility. This era emphasizes personalization and inclusivity in beauty.",
  },
]

export default function DecadesTab() {
  const [selectedDecade, setSelectedDecade] = useState("70s")

  const currentDecade = decades.find((d) => d.id === selectedDecade) || decades[0]

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
             HISTORY OF
             <br />
             <span className="text-yellow-400">HAIRDRESSING</span>
           </h1>
         </motion.div>
       </div>

        {/* Decade Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {decades.map((decade) => (
            <Button
              key={decade.id}
              variant={selectedDecade === decade.id ? "default" : "outline"}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300 border border-yellow-400/50 backdrop-blur-sm ${
                selectedDecade === decade.id
                  ? "bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30"
                  : "bg-black/20 text-yellow-300 hover:bg-yellow-400/20 hover:text-yellow-400"
              }`}
              onClick={() => setSelectedDecade(decade.id)}
            >
              {decade.title}
            </Button>
          ))}
        </motion.div>

        {/* Decade Content */}
        <motion.div
          key={selectedDecade}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-yellow-400">{currentDecade.title}</h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
              {currentDecade.description}
            </p>
            <ul className="space-y-2 text-white/80 mb-4 sm:mb-6">
              {currentDecade.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Details section for larger screens */}
            <div className="hidden lg:block">
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{currentDecade.details}</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {currentDecade.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${currentDecade.title} hairstyle ${index + 1}`}
                  className="rounded-lg w-full h-24 sm:h-32 lg:h-36 object-cover shadow-lg border border-yellow-400/20"
                />
              ))}
            </div>

            {/* Details section for mobile - shown below images */}
            <div className="lg:hidden mt-4">
              <p className="text-xs text-white/70 leading-relaxed">{currentDecade.details}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
