import Link from 'next/link'
import { MessageCircle, Eye, CheckCircle, User } from 'lucide-react'
import type { Question } from '@/types'
import UserAvatar from '@/components/UserAvatar'
import { formatTimeAgo } from '@/lib/utils'

interface QuestionCardProps {
  question: Question
  showAuthor?: boolean
}

export default function QuestionCard({ question, showAuthor = true }: QuestionCardProps) {
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
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`badge ${statusColors[status as keyof typeof statusColors] || statusColors.Open}`}>
            {status === 'Solved' && <CheckCircle className="w-3 h-3" />}
            {status}
          </span>
          <span className="text-sm text-gray-500">{category}</span>
        </div>
        
        {question.metadata?.is_featured && (
          <span className="badge bg-amber-100 text-amber-800">Featured</span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
        <Link href={`/questions/${question.slug}`}>
          {question.metadata?.title || question.title}
        </Link>
      </h3>

      <div 
        className="text-gray-600 text-sm mb-4 line-clamp-2"
        dangerouslySetInnerHTML={{ 
          __html: question.metadata?.content?.substring(0, 200) + '...' || '' 
        }}
      />

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-gray-500 text-xs">+{tags.length - 3} more</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        {showAuthor && author && (
          <div className="flex items-center gap-2">
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

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {viewsCount}
          </div>
          <time dateTime={question.created_at}>
            {formatTimeAgo(question.created_at)}
          </time>
        </div>
      </div>
    </div>
  )
}