import Link from 'next/link'
import { Search, User, MessageCircle, Trophy } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">Support Hub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/questions" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Questions
            </Link>
            <Link 
              href="/users" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Users
            </Link>
            <Link 
              href="/badges" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Badges
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/search"
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link 
              href="/questions/ask" 
              className="btn-primary text-sm"
            >
              Ask Question
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-4 py-2">
          <nav className="flex justify-around">
            <Link 
              href="/questions" 
              className="flex flex-col items-center py-2 text-gray-600 hover:text-gray-900"
            >
              <MessageCircle className="w-5 h-5 mb-1" />
              <span className="text-xs">Questions</span>
            </Link>
            <Link 
              href="/users" 
              className="flex flex-col items-center py-2 text-gray-600 hover:text-gray-900"
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">Users</span>
            </Link>
            <Link 
              href="/badges" 
              className="flex flex-col items-center py-2 text-gray-600 hover:text-gray-900"
            >
              <Trophy className="w-5 h-5 mb-1" />
              <span className="text-xs">Badges</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}