"use client"

import { motion } from "framer-motion"
import { Coffee, Utensils, Clock, Phone, Users, Heart, List } from "lucide-react"

export default function RefreshmentsTab() {
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
              DELICIOUS
              <br />
              <span className="text-yellow-400">REFRESHMENTS</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl">A selection of elegant finger food will be served between 7.30pm and 9.30pm</p>
          </motion.div>
        </div>

        {/* Menu Section */}
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="glass-card p-4 sm:p-6 rounded-lg mb-6">
            <div className="flex items-center mb-4">
              <Utensils className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-yellow-400">Menu</h3>
            </div>


            <div className="space-y-4 text-sm text-white/90">
              <div>
                <strong className="text-yellow-400">1. Basil Bocconcini Bites (GF, V):</strong>
                <br />Delight in the fresh flavours of basil and bocconcini cheese & grape tomatoes, perfectly paired to create a bite-sized, savory treat.
              </div>
              <div>
                <strong className="text-yellow-400">2. Pumpkin & Parmesan Arancini Balls (GF, V):</strong>
                <br />Savor the rich taste of creamy pumpkin and the sharpness of Parmesan cheese, all encased in a crispy, golden arancini ball.
              </div>
              <div>
                <strong className="text-yellow-400">3. Beef & Pork Fennel Rolls:</strong>
                <br />Indulge in the hearty combination of beef and pork, seasoned with aromatic fennel, and wrapped in a flaky pastry for a satisfying, savory roll.
              </div>
              <div>
                <strong className="text-yellow-400">4. Mediterranean Quiche (V):</strong>
                <br />Exquisite flavours of black olives and vibrant capsicums, all enveloped in a delicate and flaky pastry crust.
              </div>
              <div>
                <strong className="text-yellow-400">5. Karaage Chicken-Cucumber Skewers:</strong>
                <br />Enjoy the delightful contrast of crispy karaage chicken paired with cool, refreshing cucumbers, all served on a bamboo skewer.
              </div>
              <div>
                <strong className="text-yellow-400">6. Rainbow Trout with Truffle Oil & Dill Crouton:</strong>
                <br />Tender trout drizzled with truffle oil, topped with dill served on a garlic crouton.
              </div>
              <div>
                <strong className="text-yellow-400">7. Something Sweet:</strong>
                <br />Treat your taste buds to a delicious sweet dessert canape surprise.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Beverages Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="glass-card p-4 sm:p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <Coffee className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-yellow-400">Beverages</h3>
            </div>
            <p className="text-sm text-white/90 py-4">Drinks available at bar prices</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
