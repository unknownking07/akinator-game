'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    farcaster?: {
      ready: () => Promise<void>
      user?: {
        fid: number
        username: string
        displayName: string
        pfpUrl: string
      }
    }
  }
}

export function useFarcaster() {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Wait for Farcaster SDK to load
        if (typeof window !== 'undefined' && window.farcaster) {
          await window.farcaster.ready()
          setIsReady(true)
          
          // Get user data if available
          if (window.farcaster.user) {
            setUser(window.farcaster.user)
          }
        } else {
          // Fallback for development/testing
          setTimeout(() => {
            setIsReady(true)
          }, 1000)
        }
      } catch (err) {
        console.error('Farcaster initialization error:', err)
        setError('Failed to initialize Farcaster')
        // Still set ready to true for fallback
        setIsReady(true)
      }
    }

    initializeFarcaster()
  }, [])

  return { isReady, user, error }
}