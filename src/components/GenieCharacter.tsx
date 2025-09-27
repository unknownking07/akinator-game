'use client'

import { motion } from 'framer-motion'

export default function GenieCharacter() {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative"
    >
      <div className="text-8xl genie-glow">
        🧞‍♂️
      </div>
      
      {/* Magical sparkles around the genie */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-400"
          style={{
            left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 60}%`,
            top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 60}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  )
}