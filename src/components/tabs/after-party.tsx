"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface AfterPartyPhoto {
  src: string
  alt: string
  description?: string
}

const afterPartyPhotos: AfterPartyPhoto[] = [
  // Photos with names/companies - include descriptions
  {
    src: "/assets/afterparty/AlumiAlishaMcPhersonandKellieBloomfield.webp",
    alt: "Alumni - Alisha McPherson and Kellie Bloomfield",
  },

  {
    src: "/assets/afterparty/alumnikellybloomfieldjulieCandAlishaMcPherson.webp",
    alt: "Alumni - Kelly Bloomfield, Julie C, and Alisha McPherson",
  },
  {
    src: "/assets/afterparty/AlumniNardia Brown.webp",
    alt: "Alumni - Nardia Brown",
  },
  {
    src: "/assets/afterparty/Amy & Mischa Tanavich.webp",
    alt: "Amy and Mischa Tanavich",
  },

  {
    src: "/assets/afterparty/BeBendigo-HayleyTibbettAlisha Kent.webp",
    alt: "BeBendigo - Hayley Tibbett and Alisha Kent",
  },
  {
    src: "/assets/afterparty/BrittanyWhittenandneice.webp",
    alt: "Brittany Whitten and niece",
  },
  {
    src: "/assets/afterparty/cassie.webp",
    alt: "Cassie",
  },
  {
    src: "/assets/afterparty/cathyrichie.webp",
    alt: "Cathy Ritchie",
  },
  {
    src: "/assets/afterparty/CathyRitchieDave RichardsonKiraGwinDani Orchard.webp",
    alt: "Cathy Ritchie, Dave Richardson, Kira Gwin, and Dani Orchard",
  },
  {
    src: "/assets/afterparty/DanielleCameronandJasminOSullivan.webp",
    alt: "Danielle Cameron and Jasmin O'Sullivan",
  },
  {
    src: "/assets/afterparty/DaniJennyandKiera.webp",
    alt: "Dani, Jenny, and Kiera",
  },
  {
    src: "/assets/afterparty/DaniOandMaureenand Kiera.webp",
    alt: "Dani O, Maureen, and Kiera",
  },
  {
    src: "/assets/afterparty/DebPellandguest.webp",
    alt: "Deb Pell and guest",
  },
  {
    src: "/assets/afterparty/DomenicandHeikaCoia.webp",
    alt: "Domenic and Heika Coia",
  },
  {
    src: "/assets/afterparty/JeremyJamesandRenikstaff.webp",
    alt: "Jeremy James and Renik staff",
  },
  {
    src: "/assets/afterparty/JessCuttingandpartner.webp",
    alt: "Jess Cutting and partner",
  },
  {
    src: "/assets/afterparty/JudiAnneCantwellandJanineBourke.webp",
    alt: "Judi Anne Cantwell and Janine Bourke",
  },
  {
    src: "/assets/afterparty/Julie Curnow & Anthony Janssen.webp",
    alt: "Julie Curnow and Anthony Janssen",
  },
  {
    src: "/assets/afterparty/Julie Curnow & Mayor Andrea Metcalf.webp",
    alt: "Julie Curnow and Mayor Andrea Metcalf",
  },
  {
    src: "/assets/afterparty/Julieandstudents.JPG",
    alt: "Julie and students",
  },
  {
    src: "/assets/afterparty/JulieCurnowandSueHawkey.webp",
    alt: "Julie Curnow and Sue Hawkey",
  },
  {
    src: "/assets/afterparty/KieraGwinandDanicaOrchard.webp",
    alt: "Kiera Gwin and Danica Orchard",
  },
  {
    src: "/assets/afterparty/KimPerrowJacobyTouheyandBeckHicks.webp",
    alt: "Kim Perrow, Jacoby Touhey, and Beck Hicks",
  },
  {
    src: "/assets/afterparty/Leoniesdancesupportgroup.webp",
    alt: "Leonie's dance support group",
  },
  {
    src: "/assets/afterparty/LibbyBrandwickandpartner.webp",
    alt: "Libby Brandwick and partner",
  },
  {
    src: "/assets/afterparty/libbybrandwickandpartnerwebp.webp",
    alt: "Libby Brandwick and partner",
  },
  {
    src: "/assets/afterparty/lukeowens.webp",
    alt: "Luke Owens",
  },
  {
    src: "/assets/afterparty/MatrixSponsorsGeorgeandHamishCameron.webp",
    alt: "Matrix Sponsors - George and Hamish Cameron",
  },
  {
    src: "/assets/afterparty/PaigeandHairandHalostaffplusLeila.webp",
    alt: "Paige and Hair and Halo staff plus Leila",
  },
  {
    src: "/assets/afterparty/PaigeMartinandJulie MottandCassie SpearsandJennaElliotandAlishaWeekly.webp",
    alt: "Paige Martin, Julie Mott, Cassie Spears, Jenna Elliot, and Alisha Weekly",
  },
  {
    src: "/assets/afterparty/pastteachers1.webp",
    alt: "Past teachers",
  },
  {
    src: "/assets/afterparty/pastteachers2.webp",
    alt: "Past teachers",
  },
  {
    src: "/assets/afterparty/PreviousteacherSuzi PedrottiandJulieCandAlishaWeekly.webp",
    alt: "Previous teacher Suzi Pedrotti, Julie C, and Alisha Weekly",
  },
  {
    src: "/assets/afterparty/previousteacherWendy FitzpatrickandemployerJodieHannahandrepSimonPitt.webp",
    alt: "Previous teacher Wendy Fitzpatrick, employer Jodie Hannah, and rep Simon Pitt",
  },
  {
    src: "/assets/afterparty/SalonownerJodieHannahandstaff.webp",
    alt: "Salon owner Jodie Hannah and staff",
  },
  {
    src: "/assets/afterparty/sarahandemmashelton.webp",
    alt: "Sarah and Emma Shelton",
  },
  {
    src: "/assets/afterparty/TaraandToddCarringtonandHoneyeater salonstaff.webp",
    alt: "Tara and Todd Carrington and Honeyeater Salon staff",
  },
  {
    src: "/assets/afterparty/taraandtoddcarringtonandhoneyeatersalon.webp",
    alt: "Tara and Todd Carrington and Honeyeater Salon",
  },
  {
    src: "/assets/afterparty/teachergroup.webp",
    alt: "Teacher group",
  },
  {
    src: "/assets/afterparty/terryevansandsalonstaff.webp",
    alt: "Terry Evans and salon staff",
  },
  {
    src: "/assets/afterparty/toniridgeandhakkasalonstaff.webp",
    alt: "Toni Ridge and Hakka Salon staff",
  },
  {
    src: "/assets/afterparty/zoeandpartner.webp",
    alt: "Zoe and partner",
  },
  // Photos without names/companies - no descriptions
  {
    src: "/assets/afterparty/DSCF1113.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1114.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1124.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1127.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1145.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1148.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1154.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1160.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1184.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1195.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1380.JPG",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1386.JPG",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1388.JPG",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1425.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1430.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1435.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1464.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1478.webp",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1490.JPG",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/DSCF1494.JPG",
    alt: "Event photo",
  },
  {
    src: "/assets/afterparty/guests.webp",
    alt: "Event guests",
  },
  {
    src: "/assets/afterparty/hairshow1.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow2.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow3.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow4.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow5.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow6.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow7.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow8.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow9.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow10.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow11.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow12.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow13.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow14.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow15.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow16.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow17.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/hairshow18.webp",
    alt: "Hair show",
  },
  {
    src: "/assets/afterparty/staffgroupshot.webp",
    alt: "Staff group photo",
  },
  {
    src: "/assets/afterparty/vipgroupshot.webp",
    alt: "VIP group photo",
  },
]

export default function AfterPartyTab() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const minSwipeDistance = 50

  const openPhoto = (index: number) => {
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedIndex(null)
    touchStartX.current = null
    touchEndX.current = null
  }

  const navigateToNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % afterPartyPhotos.length)
  }

  const navigateToPrevious = () => {
    if (selectedIndex === null) return
    setSelectedIndex(
      selectedIndex === 0 ? afterPartyPhotos.length - 1 : selectedIndex - 1,
    )
  }

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        navigateToNext()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        navigateToPrevious()
      } else if (event.key === "Escape") {
        event.preventDefault()
        closeModal()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex])

  const handleTouchStart = (event: React.TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = event.targetTouches[0].clientX
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    touchEndX.current = event.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      navigateToNext()
    } else if (isRightSwipe) {
      navigateToPrevious()
    }
  }

  const currentPhoto =
    selectedIndex !== null ? afterPartyPhotos[selectedIndex] : null

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
              POST PARTY
              <br />
              <span className="text-yellow-400">SNAP SHOTS</span>
            </h1>
            <p className="text-sm sm:text-base font-bold text-white/90 max-w-2xl">
            Thank you for being a part of our 50 year celebrations. We loved having you attend.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 sm:mt-12 space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {afterPartyPhotos.map((photo, index) => (
              <motion.div
                key={photo.src}
                className="group relative overflow-hidden rounded-xl border border-yellow-500/20 bg-black/40 backdrop-blur-md cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                whileHover={{ y: -6 }}
                onClick={() => openPhoto(index)}
              >
                <div className="p-3 sm:p-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/60 flex items-center justify-center">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=400&text=After+Party"
                    }}
                  />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </div>
                {photo.alt && 
                 photo.alt !== "Event photo" && 
                 photo.alt !== "Hair show" && 
                 photo.alt !== "Event guests" && 
                 photo.alt !== "Staff group photo" && 
                 photo.alt !== "VIP group photo" && (
                  <div className="p-4 space-y-1 border-t border-yellow-500/10 bg-black/60 text-center">
                    <p className="text-sm font-semibold text-white drop-shadow-md">{photo.alt}</p>
                    {photo.description && (
                      <p className="text-xs text-white/70 leading-relaxed">{photo.description}</p>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && currentPhoto && (
          <motion.div
            className="fixed inset-0 z-[100010] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <button
              onClick={(event) => {
                event.stopPropagation()
                navigateToPrevious()
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[100011] p-2 sm:p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation()
                navigateToNext()
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[100011] p-2 sm:p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <motion.div
              className="relative w-full max-w-4xl max-h-[85vh] rounded-xl overflow-hidden bg-black/70 border border-yellow-500/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="absolute top-0 left-0 right-0 z-[100012] flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent">
                <span className="text-white/80 text-xs sm:text-sm">
                  {selectedIndex + 1} of {afterPartyPhotos.length}
                </span>
                <button
                  onClick={closeModal}
                  className="p-1.5 sm:p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  aria-label="Close gallery"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 pt-12 sm:pt-16">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  className="w-full max-h-[55vh] sm:max-h-[60vh] object-contain rounded-lg"
                />
              </div>

              {currentPhoto.alt && 
               currentPhoto.alt !== "Event photo" && 
               currentPhoto.alt !== "Hair show" && 
               currentPhoto.alt !== "Event guests" && 
               currentPhoto.alt !== "Staff group photo" && 
               currentPhoto.alt !== "VIP group photo" && (
                <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-1 border-t border-yellow-500/10 bg-black/70 text-center">
                  <p className="text-sm sm:text-base font-semibold text-white drop-shadow-sm">{currentPhoto.alt}</p>
                  {currentPhoto.description && (
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                      {currentPhoto.description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

