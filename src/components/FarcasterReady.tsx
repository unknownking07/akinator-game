'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface FarcasterReadyProps {
  onReady: () => void
  children: React.ReactNode
}

export default function FarcasterReady({ onReady, children }: FarcasterReadyProps) {
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initFarcaster = async () => {
      try {
        // Check if we're in Farcaster environment
        if (typeof window !== 'undefined' && window.farcaster) {
          console.log('Farcaster SDK detected, calling ready()...')
          await window.farcaster.ready()
          console.log('Farcaster ready() completed!')
        } else {
          console.log('Not in Farcaster environment, using fallback')
        }
        
        // Small delay to ensure everything is properly initialized
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setIsReady(true)
        setIsLoading(false)
        onReady()
      } catch (error) {
        console.error('Farcaster initialization error:', error)
        // Even if there's an error, continue with the app
        setIsReady(true)
        setIsLoading(false)
        onReady()
      }
    }

    initFarcaster()
  }, [onReady])

  if (isLoading || !isReady) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl mb-4"
          >
            🧞‍♂️
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Awakening the Genie...
          </h2>
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-violet-200"
          >
            Preparing your magical experience
          </motion.p>
          <div className="flex justify-center mt-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 bg-violet-400 rounded-full mx-1"
              />
            ))}
          </div>
        </motion.div>
      </main>
    )
  }

  return <>{children}</>
}