import { ThumbsUp, CheckCircle, Code } from 'lucide-react'
import UserAvatar from './UserAvatar'
import type { Answer } from '@/types'
import Link from 'next/link'
import { formatTimeAgo } from '@/lib/utils'

interface AnswerCardProps {
  answer: Answer
}

export default function AnswerCard({ answer }: AnswerCardProps) {
  const author = typeof answer.metadata?.author === 'object' ? answer.metadata.author : null
  const isAccepted = answer.metadata?.is_accepted || false
  const helpfulCount = answer.metadata?.helpful_count || 0
  const codeSnippets = answer.metadata?.code_snippets || []

  return (
    <div className={`card ${isAccepted ? 'border-green-200 bg-green-50' : ''}`}>
      {/* Accepted Answer Badge */}
      {isAccepted && (
        <div className="flex items-center gap-2 mb-4 text-green-700">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Accepted Answer</span>
        </div>
      )}

      {/* Answer Content */}
      <div 
        className="prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: answer.metadata?.content || '' }}
      />

      {/* Code Snippets */}
      {codeSnippets.length > 0 && (
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Code className="w-4 h-4" />
            Code Examples
          </h4>
          <div className="space-y-4">
            {codeSnippets.map((snippet, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  {snippet.language}
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Answer Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm font-medium">Helpful ({helpfulCount})</span>
          </button>
        </div>

        {author && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500">
                answered {formatTimeAgo(answer.created_at)}
              </p>
            </div>
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
  )
}