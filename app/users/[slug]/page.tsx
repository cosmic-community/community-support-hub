// app/users/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getUserBySlug, getUserBadges } from '@/lib/api'
import { MapPin, Globe, Calendar, Trophy, Award } from 'lucide-react'
import { format } from 'date-fns'
import UserAvatar from '@/components/UserAvatar'
import BadgeCard from '@/components/BadgeCard'
import type { Metadata } from 'next'

interface UserProfilePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: UserProfilePageProps): Promise<Metadata> {
  const { slug } = await params
  const user = await getUserBySlug(slug)
  
  if (!user) {
    return {
      title: 'User Not Found'
    }
  }

  return {
    title: `${user.metadata?.name || user.title} - Community Profile`,
    description: user.metadata?.bio || `View ${user.metadata?.name || user.title}'s profile and contributions to the community.`,
  }
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { slug } = await params
  const user = await getUserBySlug(slug)
  
  if (!user) {
    notFound()
  }

  const userBadges = await getUserBadges(user.id)
  
  const reputation = user.metadata?.reputation_score || 0
  const joinDate = user.metadata?.join_date ? new Date(user.metadata.join_date) : null
  const location = user.metadata?.location
  const website = user.metadata?.website
  const expertiseTags = user.metadata?.expertise_tags?.split(',').map(tag => tag.trim()) || []
  const bio = user.metadata?.bio || ''

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Header */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <UserAvatar user={user} size="xl" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {user.metadata?.name || user.title}
                </h1>
                <p className="text-lg text-gray-600">@{user.metadata?.username}</p>
              </div>
              
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span className="text-xl font-bold text-gray-900">{reputation}</span>
                <span className="text-gray-600">reputation</span>
              </div>
            </div>

            {/* Company/Role */}
            {user.metadata?.company_role && (
              <p className="text-lg text-gray-700 font-medium mb-4">
                {user.metadata.company_role}
              </p>
            )}

            {/* Bio */}
            {bio && (
              <p className="text-gray-600 mb-6">
                {bio}
              </p>
            )}

            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
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
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              
              {joinDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {format(joinDate, 'MMMM yyyy')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Tags */}
      {expertiseTags.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Expertise Areas</h2>
          <div className="flex flex-wrap gap-2">
            {expertiseTags.map((tag, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      {userBadges.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-900">Badges Earned</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userBadges.map((userBadge) => (
              <BadgeCard 
                key={userBadge.id} 
                userBadge={userBadge} 
                showEarnedDate 
              />
            ))}
          </div>
        </div>
      )}

      {userBadges.length === 0 && (
        <div className="card text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No badges yet</h3>
          <p className="text-gray-600">
            This user hasn't earned any badges yet. Badges are awarded for contributions and achievements.
          </p>
        </div>
      )}
    </div>
  )
}