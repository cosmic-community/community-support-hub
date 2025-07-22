import QuestionForm from '@/components/QuestionForm'

export default function AskQuestionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ask a Question</h1>
        <p className="mt-2 text-gray-600">
          Get help from our community by asking a detailed question
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Tips for asking a great question:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Be specific and clear about your problem</li>
          <li>• Include relevant code, error messages, or screenshots</li>
          <li>• Add appropriate tags to help others find your question</li>
          <li>• Search existing questions first to avoid duplicates</li>
        </ul>
      </div>

      <QuestionForm />
    </div>
  )
}