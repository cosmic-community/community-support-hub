import { Suspense } from 'react'
import { searchQuestions } from '@/lib/api'
import QuestionCard from '@/components/QuestionCard'
import SearchBar from '@/components/SearchBar'
import { Search as SearchIcon } from 'lucide-react'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''
  const questions = query ? await searchQuestions(query) : []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Questions</h1>
        <SearchBar />
      </div>

      {/* Search Results */}
      <Suspense fallback={<div>Searching...</div>}>
        {query && (
          <div className="mb-6">
            <p className="text-gray-600">
              {questions.length > 0 
                ? `Found ${questions.length} result${questions.length !== 1 ? 's' : ''} for "${query}"`
                : `No results found for "${query}"`
              }
            </p>
          </div>
        )}

        {questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        ) : query ? (
          <div className="card text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Try different keywords or browse our categories to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="card text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Search our knowledge base</h3>
            <p className="text-gray-600">
              Enter keywords to search through questions, answers, and topics.
            </p>
          </div>
        )}
      </Suspense>
    </div>
  )
}