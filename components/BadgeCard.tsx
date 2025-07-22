import { format } from 'date-fns'
import { Calendar } from 'lucide-react'
import type { UserBadge } from '@/types'

interface BadgeCardProps {
  userBadge: UserBadge
  showEarnedDate?: boolean
}

export default function BadgeCard({ userBadge, showEarnedDate = false }: BadgeCardProps) {
  const badge = userBadge.metadata?.badge
  const earnedDate = userBadge.metadata?.earned_date
  const reason = userBadge.metadata?.reason

  if (!badge) {
    return null
  }

  const badgeTypeColors = {
    'Company Team': 'badge-company',
    'Achievement': 'badge-achievement', 
    'Expertise': 'badge-expertise'
  }

  const badgeType = badge.metadata?.badge_type?.value || 'Achievement'
  const colorClass = badgeTypeColors[badgeType as keyof typeof badgeTypeColors] || 'badge-achievement'

  return (
    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
      {/* Badge Icon */}
      <div className="flex-shrink-0">
        {badge.metadata?.icon?.imgix_url ? (
          <img
            src={`${badge.metadata.icon.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
            alt={badge.metadata?.name || badge.title}
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={48}
          />
        ) : (
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: badge.metadata?.color || '#3b82f6' }}
          >
            🏆
          </div>
        )}
      </div>

      {/* Badge Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900">
            {badge.metadata?.name || badge.title}
          </h3>
          <span className={`badge text-xs ${colorClass}`}>
            {badgeType}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">
          {badge.metadata?.description}
        </p>

        {reason && (
          <p className="text-sm text-blue-600 italic mb-2">
            "{reason}"
          </p>
        )}

        {showEarnedDate && earnedDate && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Earned {format(new Date(earnedDate), 'MMM d, yyyy')}</span>
          </div>
        )}
      </div>
    </div>
  )
}