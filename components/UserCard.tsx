import Link from 'next/link'
import { MapPin, Globe, Calendar, Trophy } from 'lucide-react'
import UserAvatar from './UserAvatar'
import type { User } from '@/types'
import { formatDate } from '@/lib/utils'

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  const reputation = user.metadata?.reputation_score || 0
  const joinDate = user.metadata?.join_date
  const location = user.metadata?.location
  const website = user.metadata?.website
  const expertiseTags = user.metadata?.expertise_tags?.split(',').map(tag => tag.trim()) || []
  const bio = user.metadata?.bio || ''

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      {/* User Header */}
      <div className="text-center mb-4">
        <UserAvatar user={user} size="lg" className="mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900">
          <Link 
            href={`/users/${user.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {user.metadata?.name || user.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-2">@{user.metadata?.username}</p>
        
        {/* Reputation */}
        <div className="flex items-center justify-center gap-1 text-sm">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="font-medium text-gray-900">{reputation}</span>
          <span className="text-gray-500">reputation</span>
        </div>
      </div>

      {/* Company/Role */}
      {user.metadata?.company_role && (
        <p className="text-sm text-gray-600 text-center mb-3 font-medium">
          {user.metadata.company_role}
        </p>
      )}

      {/* Bio */}
      {bio && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {bio}
        </p>
      )}

      {/* Expertise Tags */}
      {expertiseTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {expertiseTags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {expertiseTags.length > 3 && (
            <span className="text-gray-500 text-xs">+{expertiseTags.length - 3}</span>
          )}
        </div>
      )}

      {/* User Info */}
      <div className="space-y-2 text-sm text-gray-600">
        {location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}
        
        {website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <a 
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 truncate"
            >
              {website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        
        {joinDate && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Joined {formatDate(joinDate)}</span>
          </div>
        )}
      </div>
    </div>
  )
}