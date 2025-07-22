import { getBadges } from '@/lib/api'
import BadgeGrid from '@/components/BadgeGrid'
import { Trophy } from 'lucide-react'

export const metadata = {
  title: 'Community Badges - Support Hub',
  description: 'Discover all the badges you can earn by contributing to our community support platform.',
}

export default async function BadgesPage() {
  const badges = await getBadges()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Badges</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Earn badges by contributing to our community, helping other developers, and building your reputation. 
          Each badge recognizes your valuable contributions and expertise.
        </p>
      </div>

      {/* Badge Categories */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Company Team</h3>
            <p className="text-sm text-gray-600">
              Official badges for verified team members and employees
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Achievement</h3>
            <p className="text-sm text-gray-600">
              Recognition for reaching milestones and helping others
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Expertise</h3>
            <p className="text-sm text-gray-600">
              Recognition for domain knowledge and specialized skills
            </p>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      {badges.length > 0 ? (
        <BadgeGrid badges={badges} />
      ) : (
        <div className="card text-center py-12">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No badges configured yet</h3>
          <p className="text-gray-600">
            Badges will appear here once they are created and configured by the administrators.
          </p>
        </div>
      )}
    </div>
  )
}