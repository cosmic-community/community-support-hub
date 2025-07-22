import QuestionCard from './QuestionCard'
import type { Question } from '@/types'

interface FeaturedQuestionsProps {
  questions: Question[]
}

export default function FeaturedQuestions({ questions }: FeaturedQuestionsProps) {
  if (questions.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  )
}