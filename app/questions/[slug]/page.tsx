// app/questions/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getQuestionBySlug, getAnswersByQuestionId } from '@/lib/api'
import { formatDistanceToNow } from 'date-fns'
import { Eye, MessageCircle, CheckCircle, ThumbsUp } from 'lucide-react'
import UserAvatar from '@/components/UserAvatar'
import AnswerCard from '@/components/AnswerCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface QuestionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: QuestionPageProps): Promise<Metadata> {
  const { slug } = await params
  const question = await getQuestionBySlug(slug)
  
  if (!question) {
    return {
      title: 'Question Not Found'
    }
  }

  return {
    title: `${question.metadata?.title || question.title} - Community Support`,
    description: question.metadata?.content?.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { slug } = await params
  const question = await getQuestionBySlug(slug)
  
  if (!question) {
    notFound()
  }

  const answers = await getAnswersByQuestionId(question.id)
  const author = typeof question.metadata?.author === 'object' ? question.metadata.author : null
  const category = question.metadata?.category?.value || 'General'
  const status = question.metadata?.status?.value || 'Open'
  const viewsCount = question.metadata?.views_count || 0
  const tags = question.metadata?.tags?.split(',').map(tag => tag.trim()) || []

  const statusColors = {
    'Open': 'bg-blue-100 text-blue-800',
    'Answered': 'bg-green-100 text-green-800',
    'Solved': 'bg-purple-100 text-purple-800',
    'Closed': 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/questions" className="text-blue-600 hover:text-blue-700">
          Questions
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{question.metadata?.title || question.title}</span>
      </nav>

      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`badge ${statusColors[status as keyof typeof statusColors] || statusColors.Open}`}>
            {status === 'Solved' && <CheckCircle className="w-3 h-3" />}
            {status}
          </span>
          <span className="text-sm text-gray-500">{category}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {question.metadata?.title || question.title}
        </h1>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {viewsCount} views
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {answers.length} answers
            </div>
          </div>
          <time dateTime={question.created_at}>
            Asked {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}
          </time>
        </div>
      </div>

      {/* Question Content */}
      <div className="card mb-8">
        <div 
          className="prose prose-lg max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: question.metadata?.content || '' }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Question Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ThumbsUp className="w-4 h-4" />
            Helpful
          </button>

          {author && (
            <div className="flex items-center gap-3">
              <UserAvatar user={author} size="sm" />
              <div>
                <Link 
                  href={`/users/${author.slug}`}
                  className="text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  {author.metadata?.name || author.title}
                </Link>
                <p className="text-xs text-gray-500">
                  {author.metadata?.reputation_score || 0} reputation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Answers Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {answers.length} Answer{answers.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {answers.length > 0 ? (
          <div className="space-y-6">
            {answers.map((answer) => (
              <AnswerCard key={answer.id} answer={answer} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No answers yet</h3>
            <p className="text-gray-600 mb-6">
              Be the first to help by providing an answer to this question.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}