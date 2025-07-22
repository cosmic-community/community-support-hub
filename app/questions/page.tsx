import { Suspense } from 'react'
import { getQuestions } from '@/lib/api'
import QuestionCard from '@/components/QuestionCard'
import SearchBar from '@/components/SearchBar'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface QuestionsPageProps {
  searchParams: Promise<{ category?: string; status?: string }>
}

export default async function QuestionsPage({ searchParams }: QuestionsPageProps) {
  const params = await searchParams
  const questions = await getQuestions()

  // Filter questions based on search params
  const filteredQuestions = questions.filter(question => {
    if (params.category && question.metadata?.category?.key !== params.category) {
      return false
    }
    if (params.status && question.metadata?.status?.key !== params.status) {
      return false
    }
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Questions</h1>
          <p className="mt-2 text-gray-600">
            Browse all questions from our community members
          </p>
        </div>
        <Link href="/questions/ask" className="mt-4 sm:mt-0 btn-primary">
          Ask Question
        </Link>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/questions"
          className={`px-3 py-1 rounded-full text-sm ${!params.category && !params.status
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </Link>
        <Link
          href="/questions?status=open"
          className={`px-3 py-1 rounded-full text-sm ${params.status === 'open'
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Open
        </Link>
        <Link
          href="/questions?status=answered"
          className={`px-3 py-1 rounded-full text-sm ${params.status === 'answered'
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Answered
        </Link>
        <Link
          href="/questions?category=technical"
          className={`px-3 py-1 rounded-full text-sm ${params.category === 'technical'
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Technical
        </Link>
      </div>

      {/* Questions List */}
      <Suspense fallback={<div>Loading questions...</div>}>
        {filteredQuestions.length > 0 ? (
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {params.category || params.status ? 'No questions found' : 'No questions yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {params.category || params.status 
                ? 'Try adjusting your filters or search terms.'
                : 'Be the first to ask a question and help build our community knowledge base.'
              }
            </p>
            <Link href="/questions/ask" className="btn-primary">
              Ask a Question
            </Link>
          </div>
        )}
      </Suspense>
    </div>
  )
}