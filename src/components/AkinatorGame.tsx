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

  useEffect(() => {
    // Initialize game
    setPossiblePeople([...gameData.people])
    askNextQuestion([...gameData.people], new Set())
  }, [gameData])

  const askNextQuestion = (people: Person[], asked: Set<string>) => {
    if (people.length <= 1) {
      if (people.length === 1) {
        setFinalGuess(people[0])
        setGamePhase('guessing')
      } else {
        setGamePhase('lost')
      }
      return
    }

    if (questionCount >= 20) {
      // Make a guess with the most likely person
      const guess = people[0]
      setFinalGuess(guess)
      setGamePhase('guessing')
      return
    }

    // Find the best question that hasn't been asked
    let bestQuestion: Question | null = null
    let bestScore = -1

    for (const question of gameData.questions) {
      if (asked.has(question.id)) continue

      // Calculate how well this question splits the remaining people
      const yesCount = people.filter(person => 
        person.attributes[question.attribute] === question.expectedValue
      ).length
      
      const score = Math.abs(yesCount - (people.length - yesCount))
      
      if (bestQuestion === null || score < bestScore) {
        bestQuestion = question
        bestScore = score
      }
    }

    if (bestQuestion) {
      setCurrentQuestion(bestQuestion)
    } else {
      // No more questions, make a guess
      if (people.length > 0) {
        setFinalGuess(people[0])
        setGamePhase('guessing')
      } else {
        setGamePhase('lost')
      }
    }
  }

  const handleAnswer = (answer: 'yes' | 'no' | 'probably' | 'probably_not' | 'dont_know') => {
    if (!currentQuestion) return

    const newAsked = new Set([...askedQuestions, currentQuestion.id])
    setAskedQuestions(newAsked)
    setQuestionCount(prev => prev + 1)

    let filteredPeople = [...possiblePeople]

    if (answer === 'yes' || answer === 'probably') {
      const weight = answer === 'yes' ? 1.0 : 0.7
      filteredPeople = filteredPeople.filter(person => {
        const hasAttribute = person.attributes[currentQuestion.attribute] === currentQuestion.expectedValue
        return Math.random() < (hasAttribute ? weight : (1 - weight))
      })
    } else if (answer === 'no' || answer === 'probably_not') {
      const weight = answer === 'no' ? 1.0 : 0.7
      filteredPeople = filteredPeople.filter(person => {
        const hasAttribute = person.attributes[currentQuestion.attribute] === currentQuestion.expectedValue
        return Math.random() < (hasAttribute ? (1 - weight) : weight)
      })
    }
    // For "don't know", we keep all people but with reduced confidence

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
    setPossiblePeople([...gameData.people])
    setQuestionCount(0)
    setGamePhase('playing')
    setFinalGuess(null)
    setAskedQuestions(new Set())
    askNextQuestion([...gameData.people], new Set())
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
                  { value: 'dont_know', label: '🤷‍♂️ Don\'t know', color: 'from-gray-600 to-gray-500' },
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
                I think you're thinking of...
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
                  🎉 Yes, that's correct!
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
                The genie's magic failed this time. 
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
          </div>
        )}
      </div>
    </div>
  )
}