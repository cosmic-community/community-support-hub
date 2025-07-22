import Link from 'next/link'
import { MessageCircle, Settings, Plus, Bug, HelpCircle } from 'lucide-react'

const categories = [
  {
    key: 'general',
    name: 'General',
    icon: HelpCircle,
    description: 'General questions and discussions',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    key: 'technical',
    name: 'Technical Support',
    icon: Settings,
    description: 'Get help with technical issues',
    color: 'bg-green-100 text-green-700'
  },
  {
    key: 'integration',
    name: 'Integration Help',
    icon: MessageCircle,
    description: 'API integration and development help',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    key: 'feature',
    name: 'Feature Request',
    icon: Plus,
    description: 'Suggest new features and improvements',
    color: 'bg-amber-100 text-amber-700'
  },
  {
    key: 'bug',
    name: 'Bug Report',
    icon: Bug,
    description: 'Report bugs and issues',
    color: 'bg-red-100 text-red-700'
  }
]

export default function QuestionCategories() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Link
              key={category.key}
              href={`/questions?category=${category.key}`}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white"
            >
              <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}