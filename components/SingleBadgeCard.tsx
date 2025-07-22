import type { Badge } from '@/types'

interface SingleBadgeCardProps {
  badge: Badge
}

export default function SingleBadgeCard({ badge }: SingleBadgeCardProps) {
  const badgeTypeColors = {
    'Company Team': 'border-green-200 bg-green-50',
    'Achievement': 'border-amber-200 bg-amber-50',
    'Expertise': 'border-blue-200 bg-blue-50'
  }

  const badgeType = badge.metadata?.badge_type?.value || 'Achievement'
  const colorClass = badgeTypeColors[badgeType as keyof typeof badgeTypeColors] || badgeTypeColors.Achievement
  const pointsRequired = badge.metadata?.points_required || 0

  return (
    <div className={`p-6 rounded-lg border-2 ${colorClass}`}>
      {/* Badge Icon */}
      <div className="flex justify-center mb-4">
        {badge.metadata?.icon?.imgix_url ? (
          <img
            src={`${badge.metadata.icon.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
            alt={badge.metadata?.name || badge.title}
            className="w-16 h-16 rounded-full object-cover"
            width={64}
            height={64}
          />
        ) : (
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: badge.metadata?.color || '#3b82f6' }}
          >
            🏆
          </div>
        )}
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {badge.metadata?.name || badge.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          {badge.metadata?.description}
        </p>

        {/* Requirements */}
        {pointsRequired > 0 && (
          <div className="bg-white bg-opacity-50 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium text-gray-700">
              Requires {pointsRequired} reputation points
            </p>
          </div>
        )}

        {/* Criteria */}
        {badge.metadata?.criteria && (
          <div className="text-left bg-white bg-opacity-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 font-medium mb-1">How to earn:</p>
            <p className="text-xs text-gray-600">
              {badge.metadata.criteria}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}