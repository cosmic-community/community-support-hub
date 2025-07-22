import type { User } from '@/types'

interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function UserAvatar({ user, size = 'md', className = '' }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl'
  }

  const avatarUrl = user.metadata?.avatar?.imgix_url
  const name = user.metadata?.name || user.title
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  if (avatarUrl) {
    return (
      <img
        src={`${avatarUrl}?w=120&h=120&fit=crop&auto=format,compress`}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
        width={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 64 : 96}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 64 : 96}
      />
    )
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-blue-600 text-white font-medium flex items-center justify-center ${className}`}>
      {initials}
    </div>
  )
}