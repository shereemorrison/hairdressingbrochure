"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const sections = [
  {
    id: "origins",
    title: "Origins & Industry Support",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-white/90 leading-relaxed">
          Bendigo TAFE embarked on its journey to deliver professional training to Hairdressing apprentices in August 1975, marking a significant milestone not only for the institute, but also for the broader Bendigo region. This development was made possible through strong support from the local hairdressing industry, with notable leadership from Dominic Coia, who served as President of the Master Ladies Hairdressing Association – Bendigo branch.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          Their advocacy and collaboration highlighted the importance of accessible training for aspiring hairdressers within the community.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          Prior to 1975, regional hairdressing apprentices faced the considerable challenge of traveling to Melbourne to attend Flagstaff College (which is now known as Victoria University) for their off the job training. This requirement posed logistical and financial barriers for many young people in regional Victoria who wished to enter the hairdressing profession.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          By introducing hairdressing training locally, Bendigo became the first regional area in the State of Victoria to offer such a program. This pioneering move helped decentralise vocational education in the sector and provided unprecedented opportunities for apprentices to receive high-quality training closer to home.
        </p>
      </div>
    ),
  },
  {
    id: "institutional",
    title: "Institutional & Name Changes",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-white/90 leading-relaxed">
          Over the years, Bendigo TAFE itself underwent several changes in name and structure, reflecting its ongoing evolution and adaptation within the educational landscape.
        </p>
        <div className="space-y-3">
          {[
            { year: "1976", name: "Bendigo College of Advanced Education" },
            { year: "1981", name: "Bendigo Technical College" },
            { year: "1987-1990", name: "Loddon Campaspe Institute of TAFE" },
            { year: "1990-2009", name: "Bendigo Regional Institute of TAFE (BRIT)" },
            { year: "2009-2014", name: "Bendigo TAFE" },
            { year: "2014-Current", name: "Bendigo Kangan Institute - operating as Bendigo TAFE" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="text-yellow-400 font-mono text-sm min-w-[120px]">{item.year}</span>
              <span className="text-sm text-white/90">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "locations",
    title: "Location History",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-white/90 leading-relaxed">
          Since 1975, the Hairdressing Department has operated from five different locations:
        </p>
        <ul className="space-y-2 text-sm text-white/90">
          <li className="flex gap-2">
            <span className="text-yellow-400 mt-1">•</span>
            <span>The initial site was the Oakley Building on Mundy Street, Bendigo, near the intersection with McCrae Street.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400 mt-1">•</span>
            <span>A portable building located on the city campus grounds served as a temporary facility during the construction of the Ted Thompson Building (no photographs are available from this period).</span>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400 mt-1">•</span>
            <span>The department subsequently relocated to the second floor of the Ted Thompson Building at the corner of Mundy and Hargreaves Streets, Bendigo.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400 mt-1">•</span>
            <span>For twelve months, two large portable buildings on Charleston Road, Bendigo, housed four salons (two in each), while Building G at the Bendigo City Campus was under development.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400 mt-1">•</span>
            <span>The current premises are situated in Building G, Levels 1 and 3, at 154 Hargreaves Street, Bendigo, which features four spacious salons.</span>
          </li>
        </ul>

        <div className="mt-6 space-y-4">
          <h4 className="text-lg font-bold text-yellow-400">Building Details</h4>
          <p className="text-sm text-white/90 leading-relaxed">
            The Oakley Building comprised a ground-floor salon with 12 stations adjacent to the reception area, two classrooms and a teachers' office on the second floor, as well as a student tearoom toward the rear of the ground level. As the Hairdressing School was newly established in Bendigo, night classes were introduced to attract additional clients for apprentice assessments and continued for a number of years.
          </p>
          <p className="text-sm text-white/90 leading-relaxed">
            The Ted Thompson Building later known a Building C was officially opened by Governor-General Sir Ninian Stephen on July 26, 1983. The hairdressing department took up three quarters of the South wing on the second floor. It comprised of 3 large hairdressing salons, reception office with client seating, laundry and staff offices.
          </p>
          <p className="text-sm text-white/90 leading-relaxed">
            Building G at Bendigo City Campus was formally inaugurated in November 2021 by Victorian Premier Daniel Andrews MP and Gayle Tierney PM, Minister for Training, Skills & Higher Education. Hairdressing was located on Levels 1 and 3, at 154 Hargreaves Street, Bendigo, which features four spacious salons, each accommodating up to 18 students. Staff and students commenced classes in July of 2021.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "awards",
    title: "Award Ceremonies & Hair Shows",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-white/90 leading-relaxed">
          The first awards ceremony that was held for Hairdressing students was in late 1975 and was incorporated into the Trade awards at White Hills Technical College Hall. Medals were presented to the two top apprentice hairdressing.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          By 1976 the Awards Ceremony was again at the White Hills Technical College Hall – and was in the form of a sit down dinner dance.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          The Awards and Hair Shows evolved from this time onwards and was held at various venues over the years which included – McGillavray Hall, White Hills Technical College Hall, JB Osborne Theatre, Strathfieldsaye Sportsman Club, Capital Theatre, Bendigo Town Hall and most often at the All Seasons Resort. The Awards event featured up to 16 individual Hair Shows, set to music presented by apprentices. This was the highlight of the evening.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          Awards were presented for Most outstanding First, Second & Third year apprentices and also the prestigious perpetual trophy and the Top Assignment Award.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          The Christine Mitchell Julie-Arthur perpetual trophy commemorates two young hairdressers who died in a 1983 car accident. Their families donated the award in their memory.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          The last Bendigo TAFE Awards night & Hair Show was held in 2015 at the All Season's Resort and commemorate 40 years of Hairdressing. Domenic Coya presented Bendigo TAFE with a book commemorating his life in hairdressing.
        </p>
      </div>
    ),
  },
  {
    id: "training",
    title: "Training Delivery Changes",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-white/90 leading-relaxed">
          From 1975 to 2002 – hairdressing training featured lock step delivery where apprentices all started at the beginning of the year, studying the same subjects at the same time. After 2005 a flexible delivery commenced where apprentices enrolled throughout the year and completed when they had finished all of the required units. By 2019 Learning resources had changed to online text and videos.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          Although Bendigo TAFE hairdressing is best known for training Hairdressing apprentices in Certificate III in Hairdressing, they have also delivered training in Certificate II Hairdressing to students at Malmsbury & Tarrangower corrections facilities. Certificate III in Hairdressing was delivered to international students in China and Certificate IV in Hairdressing & Diploma of Salon Management were taught in Bendigo to student from China.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          In 2015 Bendigo TAFE merged with Kangan Institute, making it one of the largest training organisations in Victoria. Each part of the organisation continued to operate under their individual brands, Bendigo TAFE & Kangan Institute.
        </p>
        <p className="text-sm text-white/90 leading-relaxed">
          The 50 year anniversary of hairdressing training at Bendigo TAFE was recognised with a Gala red carpet event – Celebrate Hairdressing on 17 October, 2025.
        </p>
      </div>
    ),
  },
]

const timeline = [
  { year: "1975", title: "Foundation", description: "Start of local apprentice training" },
  { year: "1983", title: "New Building", description: "Ted Thompson Building Opens" },
  { year: "2015", title: "Merger", description: "Bendigo Kangan Institute Partnership" },
  { year: "2021", title: "New Home", description: "Building G Inauguration" },
  { year: "2025", title: "Celebration", description: "50-Year Anniversary Gala" },
]

export default function DecadesTab() {
  const [selectedSection, setSelectedSection] = useState("origins")

  const currentSection = sections.find((s) => s.id === selectedSection) || sections[0]

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
              THE HISTORY OF
              <br />
              <span className="text-yellow-400">HAIRDRESSING TRAINING AT BENDIGO TAFE</span>
            </h1>
          </motion.div>
        </div>

        {/* Timeline - Desktop Only */}
        <motion.div
          className="mb-8 sm:mb-12 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-24 sm:mb-32 text-center">Key Milestones</h2>
          <div className="py-4"></div>
          <div className="relative">
            {/* Desktop Timeline */}
            <div>
              <div className="relative">
                <div className="relative h-1 bg-white/20 rounded-full mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-yellow-400 rounded-full" />
                </div>
                <div className="flex justify-between">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-yellow-400 border-4 border-black -mt-[42px] mb-4" />
                      <div className="text-center">
                        <div className="text-sm font-mono text-yellow-400 mb-1">{item.year}</div>
                        <div className="text-sm text-white/80 max-w-[120px]">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    {i < timeline.length - 1 && <div className="w-px h-full bg-white/20 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-sm font-mono text-yellow-400 mb-1">{item.year}</div>
                    <div className="font-medium mb-1 text-white">{item.title}</div>
                    <div className="text-sm text-white/80">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={selectedSection === section.id ? "default" : "outline"}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-300 border border-yellow-400/50 backdrop-blur-sm ${selectedSection === section.id
                  ? "bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30"
                  : "bg-black/20 text-yellow-300 hover:bg-yellow-400/20 hover:text-yellow-400"
                }`}
              onClick={() => setSelectedSection(section.id)}
            >
              {section.title}
            </Button>
          ))}
        </motion.div>

        {/* Section Content */}
        <motion.div
          key={selectedSection}
          className="glass-card p-6 sm:p-8 rounded-lg border border-white/10"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-yellow-400">{currentSection.title}</h2>
          {currentSection.content}
        </motion.div>
      </div>
    </motion.div>
  )
}