'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cosmic } from '@/lib/cosmic'

interface QuestionFormData {
  title: string
  content: string
  tags: string
  category: string
}

const categories = [
  { key: 'general', value: 'General' },
  { key: 'technical', value: 'Technical Support' },
  { key: 'feature', value: 'Feature Request' },
  { key: 'bug', value: 'Bug Report' },
  { key: 'integration', value: 'Integration Help' }
]

export default function QuestionForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<QuestionFormData>({
    title: '',
    content: '',
    tags: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // For now, we'll simulate a submission since we don't have write access configured
      // In a real implementation, you would create the question in Cosmic CMS
      
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

      // Create question object structure
      const questionData = {
        title: formData.title,
        type: 'questions',
        status: 'published',
        metadata: {
          title: formData.title,
          content: formData.content,
          author: 'demo-user-id', // In real app, get from auth context
          tags: formData.tags,
          category: {
            key: formData.category,
            value: categories.find(cat => cat.key === formData.category)?.value || 'General'
          },
          views_count: 0,
          status: {
            key: 'open',
            value: 'Open'
          },
          is_featured: false
        }
      }

      console.log('Would create question:', questionData)

      // Show success message
      alert('Question submitted successfully! (Demo mode)')
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        tags: '',
        category: 'general'
      })

      // Redirect to questions page
      router.push('/questions')

    } catch (err) {
      console.error('Error submitting question:', err)
      setError('Failed to submit question. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Question Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Be specific and imagine you're asking a question to another person"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxLength={200}
        />
        <p className="text-sm text-gray-500 mt-1">
          {formData.title.length}/200 characters
        </p>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map(category => (
            <option key={category.key} value={category.key}>
              {category.value}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Question Details *
        </label>
        <textarea
          id="content"
          name="content"
          required
          value={formData.content}
          onChange={handleInputChange}
          rows={8}
          placeholder="Provide all the details someone would need to understand and answer your question. Include code, error messages, what you've tried, and what you expected to happen."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          placeholder="Add up to 5 tags separated by commas (e.g., react, javascript, api)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">
          Use tags that describe your technology stack, programming language, or the type of problem you're facing
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Ask Question'}
        </button>
      </div>

      {/* Demo Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Demo Mode:</strong> This form is currently in demonstration mode. In a production environment, 
          questions would be saved to Cosmic CMS with proper user authentication and validation.
        </p>
      </div>
    </form>
  )
}