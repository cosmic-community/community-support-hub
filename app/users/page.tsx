import { getUsers } from '@/lib/api'
import UserCard from '@/components/UserCard'
import { Users } from 'lucide-react'

export const metadata = {
  title: 'Community Members - Support Hub',
  description: 'Meet the community members who make our support hub a great place to get help and share knowledge.',
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Members</h1>
        <p className="text-gray-600">
          Meet the amazing people who make our community a great place to learn and grow.
        </p>
      </div>

      {/* Users Grid */}
      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users yet</h3>
          <p className="text-gray-600">
            Community members will appear here as they join and participate.
          </p>
        </div>
      )}
    </div>
  )
}