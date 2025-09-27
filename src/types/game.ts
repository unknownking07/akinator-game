export interface Person {
  id: string
  name: string
  category: string
  emoji: string
  attributes: Record<string, any>
  confidence?: number
}

export interface Question {
  id: string
  text: string
  attribute: string
  expectedValue: any
}

export interface GameData {
  people: Person[]
  questions: Question[]
}