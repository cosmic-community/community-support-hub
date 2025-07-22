import type { Badge } from '@/types'
import SingleBadgeCard from './SingleBadgeCard'

interface BadgeGridProps {
  badges: Badge[]
}

export default function BadgeGrid({ badges }: BadgeGridProps) {
  // Group badges by type
  const groupedBadges = badges.reduce((acc, badge) => {
    const type = badge.metadata?.badge_type?.value || 'Achievement'
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(badge)
    return acc
  }, {} as Record<string, Badge[]>)

  const badgeOrder = ['Company Team', 'Achievement', 'Expertise']

  return (
    <div className="space-y-12">
      {badgeOrder.map(type => {
        const typeBadges = groupedBadges[type] || []
        if (typeBadges.length === 0) return null

        return (
          <div key={type}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{type} Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {typeBadges.map((badge) => (
                <SingleBadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}