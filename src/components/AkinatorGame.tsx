'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Sparkles, Trophy, Star } from 'lucide-react'
import GenieCharacter from './GenieCharacter'
import { GameData, Question, Person } from '@/types/game'

interface AkinatorGameProps {
  onRestart: () => void
  gameData: GameData
}

export default function AkinatorGame({ onRestart, gameData }: AkinatorGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [possiblePeople, setPossiblePeople] = useState<Person[]>([])
  const [questionCount, setQuestionCount] = useState(0)
  const [gamePhase, setGamePhase] = useState<'playing' | 'guessing' | 'won' | 'lost'>('playing')
  const [finalGuess, setFinalGuess] = useState<Person | null>(null)
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set())

  // Utility function to shuffle array
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const askNextQuestion = (people: Person[], asked: Set<string>) => {
    if (people.length === 0) {
      setGamePhase('lost')
      return
    }

    // Check if we have a clear winner (high confidence)
    const topCandidate = people[0]
    const hasHighConfidence = (topCandidate.confidence || 1.0) > 0.8
    const significantGap = people.length > 1 ? 
      (topCandidate.confidence || 1.0) - (people[1].confidence || 1.0) > 0.3 : true

    // Only guess if we have high confidence AND significant gap from others
    if (people.length === 1 || (hasHighConfidence && significantGap) || questionCount >= 15) {
      setFinalGuess(topCandidate)
      setGamePhase('guessing')
      return
    }

    // Get available questions and shuffle them completely for randomness
    const availableQuestions = gameData.questions.filter(q => !asked.has(q.id))
    const shuffledQuestions = shuffleArray(availableQuestions)

    // Use a balanced approach: find questions that best split the remaining people
    let bestQuestion: Question | null = null
    let bestScore = Infinity

    for (const question of shuffledQuestions) {
      // Calculate how well this question splits the remaining people
      const yesCount = people.filter(person => 
        person.attributes[question.attribute] === question.expectedValue
      ).length
      
      const noCount = people.length - yesCount
      
      // Prefer questions that split people more evenly (better information gain)
      const balance = Math.abs(yesCount - noCount) / people.length
      
      // Avoid questions that eliminate everyone or keep everyone
      if (yesCount === 0 || noCount === 0) {
        continue // Skip questions that don't help narrow down
      }
      
      // Add small random factor for variety while keeping it smart
      const randomFactor = Math.random() * 0.1
      const finalScore = balance + randomFactor
      
      if (finalScore < bestScore) {
        bestQuestion = question
        bestScore = finalScore
      }
    }

    // Fallback: if no good splitting question found, pick any available question
    if (!bestQuestion && shuffledQuestions.length > 0) {
      bestQuestion = shuffledQuestions[0]
    }

    if (bestQuestion) {
      setCurrentQuestion(bestQuestion)
    } else {
      // No more questions, make a guess from shuffled people
      if (people.length > 0) {
        const shuffledPeople = shuffleArray(people)
        setFinalGuess(shuffledPeople[0])
        setGamePhase('guessing')
      } else {
        setGamePhase('lost')
      }
    }
  }

  useEffect(() => {
    // Initialize game with shuffled people and full confidence
    const shuffledPeople = shuffleArray([...gameData.people]).map(person => ({
      ...person,
      confidence: 1.0 // Start with 100% confidence for all
    }))
    setPossiblePeople(shuffledPeople)
    askNextQuestion(shuffledPeople, new Set())
  }, [gameData])

  const handleAnswer = (answer: 'yes' | 'no' | 'probably' | 'probably_not' | 'dont_know') => {
    if (!currentQuestion) return

    const newAsked = new Set([...askedQuestions, currentQuestion.id])
    setAskedQuestions(newAsked)
    setQuestionCount(prev => prev + 1)

    // Calculate confidence scores for each person based on their attributes
    const scoredPeople = possiblePeople.map(person => {
      const hasAttribute = person.attributes[currentQuestion.attribute] === currentQuestion.expectedValue
      let confidence = 0

      if (answer === 'yes') {
        confidence = hasAttribute ? 1.0 : 0.0 // Strong match or complete mismatch
      } else if (answer === 'probably') {
        confidence = hasAttribute ? 0.8 : 0.2 // Good match or unlikely
      } else if (answer === 'no') {
        confidence = hasAttribute ? 0.0 : 1.0 // Complete mismatch or strong match
      } else if (answer === 'probably_not') {
        confidence = hasAttribute ? 0.2 : 0.8 // Unlikely or good match
      } else if (answer === 'dont_know') {
        confidence = 0.5 // Neutral - keep everyone with reduced confidence
      }

      return {
        ...person,
        confidence: (person.confidence || 1.0) * confidence
      }
    })

    // Filter out people with very low confidence (less than 10%)
    const filteredPeople = scoredPeople.filter(person => person.confidence > 0.1)

    // Sort by confidence to prioritize most likely matches
    filteredPeople.sort((a, b) => (b.confidence || 0) - (a.confidence || 0))

    setPossiblePeople(filteredPeople)
    askNextQuestion(filteredPeople, newAsked)
  }

  const handleFinalAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setGamePhase('won')
    } else {
      setGamePhase('lost')
    }
  }

  const resetGame = () => {
    setCurrentQuestion(null)
    // Shuffle people and reset confidence scores for each new game
    const shuffledPeople = shuffleArray([...gameData.people]).map(person => ({
      ...person,
      confidence: 1.0 // Reset confidence to 100% for all
    }))
    setPossiblePeople(shuffledPeople)
    setQuestionCount(0)
    setGamePhase('playing')
    setFinalGuess(null)
    setAskedQuestions(new Set())
    askNextQuestion(shuffledPeople, new Set())
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="question-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-violet-200">Question {questionCount}/20</span>
          </div>
          <button
            onClick={onRestart}
            className="text-violet-200 hover:text-white transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <GenieCharacter />

        <AnimatePresence mode="wait">
          {gamePhase === 'playing' && currentQuestion && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                {currentQuestion.text}
              </h3>
              
              <div className="space-y-3">
                {[
                  { value: 'yes', label: '✅ Yes', color: 'from-green-600 to-green-500' },
                  { value: 'probably', label: '🤔 Probably', color: 'from-blue-600 to-blue-500' },
                  { value: 'dont_know', label: '🤷‍♂️ Don&apos;t know', color: 'from-gray-600 to-gray-500' },
                  { value: 'probably_not', label: '🙄 Probably not', color: 'from-orange-600 to-orange-500' },
                  { value: 'no', label: '❌ No', color: 'from-red-600 to-red-500' },
                ].map(({ value, label, color }) => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(value as any)}
                    className={`w-full bg-gradient-to-r ${color} text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300`}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {gamePhase === 'guessing' && finalGuess && (
            <motion.div
              key="guessing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                I think you&apos;re thinking of...
              </h3>
              
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 mb-4">
                <div className="text-4xl mb-2">{finalGuess.emoji}</div>
                <div className="text-xl font-bold text-white">{finalGuess.name}</div>
                <div className="text-sm text-yellow-100">{finalGuess.category}</div>
              </div>
              
              <p className="text-violet-200 mb-4">Am I right?</p>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFinalAnswer(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3 px-4 rounded-xl"
                >
                  🎉 Yes, that&apos;s correct!
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFinalAnswer(false)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-3 px-4 rounded-xl"
                >
                  ❌ No, try again
                </motion.button>
              </div>
            </motion.div>
          )}

          {gamePhase === 'won' && (
            <motion.div
              key="won"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                🎊 I Win Again! 🎊
              </h3>
              <p className="text-violet-200 mb-4">
                The magic of the genie never fails! 
                <br />Think of someone else?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="answer-button"
              >
                🔄 Play Again
              </motion.button>
            </motion.div>
          )}

          {gamePhase === 'lost' && (
            <motion.div
              key="lost"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 text-center"
            >
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                You Got Me!
              </h3>
              <p className="text-violet-200 mb-4">
                The genie&apos;s magic failed this time. 
                <br />Care to try again?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="answer-button"
              >
                🔄 Play Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {possiblePeople.length > 1 && gamePhase === 'playing' && (
          <div className="mt-4 text-center">
            <span className="text-violet-300 text-sm">
              🎯 {possiblePeople.length} possibilities remaining
            </span>
            {possiblePeople[0]?.confidence && (
              <div className="mt-2">
                <span className="text-yellow-300 text-xs">
                  🔮 Confidence: {Math.round((possiblePeople[0].confidence || 0) * 100)}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}