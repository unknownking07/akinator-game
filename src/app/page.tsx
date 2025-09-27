'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Star, Crown, Trophy } from 'lucide-react'
import AkinatorGame from '@/components/AkinatorGame'
import GenieCharacter from '@/components/GenieCharacter'
import { gameData } from '@/data/gameData'

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-violet-300/20"
            animate={{
              y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 800],
              x: [Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400)],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          >
            <Sparkles size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity 
              }}
              className="text-8xl mb-4"
            >
              🧞‍♂️
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to</h1>
            <h2 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Akinator Genie
            </h2>
            <p className="text-violet-200 mt-4 text-lg">Think of someone famous, and I'll guess who it is!</p>
          </motion.div>
        ) : !gameStarted ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center max-w-md w-full"
          >
            <GenieCharacter />
            
            <div className="question-card mt-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                🔮 Akinator Genie
              </h1>
              <p className="text-violet-200 mb-6">
                Think of any famous person from these categories:
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                <div className="flex items-center text-violet-200">
                  <Crown className="w-4 h-4 mr-2" />
                  Richest People
                </div>
                <div className="flex items-center text-violet-200">
                  <Star className="w-4 h-4 mr-2" />
                  Anime Characters
                </div>
                <div className="flex items-center text-violet-200">
                  <Trophy className="w-4 h-4 mr-2" />
                  Crypto Founders
                </div>
                <div className="flex items-center text-violet-200">
                  <Sparkles className="w-4 h-4 mr-2" />
                  YouTubers & Athletes
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameStarted(true)}
                className="answer-button w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                🎲 Start the Magic! 🔮
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <AkinatorGame 
              onRestart={() => setGameStarted(false)}
              gameData={gameData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}