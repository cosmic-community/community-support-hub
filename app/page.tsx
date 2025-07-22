import { Suspense } from 'react'
import { getQuestions, getFeaturedQuestions } from '@/lib/api'
import QuestionCard from '@/components/QuestionCard'
import FeaturedQuestions from '@/components/FeaturedQuestions'
import SearchBar from '@/components/SearchBar'
import QuestionCategories from '@/components/QuestionCategories'
import { ArrowRight, MessageCircle, Users, Trophy } from 'lucide-react'
import Link from 'next/link'

export default async function HomePage() {
  const [questions, featuredQuestions] = await Promise.all([
    getQuestions(),
    getFeaturedQuestions()
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Community Support Hub
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Ask questions, share knowledge, and build your reputation in our developer community. 
          Get help from experienced developers and earn badges for your contributions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/questions/ask" 
            className="btn-primary inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Ask a Question
          </Link>
          <Link 
            href="/questions" 
            className="btn-secondary inline-flex items-center gap-2"
          >
            Browse Questions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{questions.length}</h3>
          <p className="text-gray-600">Questions Asked</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">2</h3>
          <p className="text-gray-600">Community Members</p>
        </div>
        <div className="text-center">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">2</h3>
          <p className="text-gray-600">Badges Available</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Categories */}
      <div className="mb-12">
        <QuestionCategories />
      </div>

      {/* Featured Questions */}
      {featuredQuestions.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Questions</h2>
          <Suspense fallback={<div>Loading featured questions...</div>}>
            <FeaturedQuestions questions={featuredQuestions} />
          </Suspense>
        </div>
      )}

      {/* Recent Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
            <Link href="/questions" className="text-blue-600 hover:text-blue-700 font-medium">
              View all
            </Link>
          </div>
          
          {questions.length > 0 ? (
            <div className="space-y-4">
              {questions.slice(0, 10).map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
              <p className="text-gray-600 mb-6">Be the first to ask a question and help build our community knowledge base.</p>
              <Link href="/questions/ask" className="btn-primary">
                Ask the First Question
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">How to get help</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Be specific in your question title</li>
              <li>• Include relevant code snippets</li>
              <li>• Add appropriate tags</li>
              <li>• Search existing questions first</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Earn badges by</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Providing helpful answers</li>
              <li>• Asking good questions</li>
              <li>• Building reputation points</li>
              <li>• Contributing to the community</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}