import { cosmic, hasStatus } from './cosmic'
import type { User, Question, Answer, Badge, UserBadge, Kudos, CosmicResponse } from '@/types'

// Users API
export async function getUsers(): Promise<User[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('-metadata.reputation_score')
    
    return response.objects as User[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch users')
  }
}

export async function getUserBySlug(slug: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'users', slug })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object as User
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

// Questions API
export async function getQuestions(): Promise<Question[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'questions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects as Question[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch questions')
  }
}

export async function getQuestionBySlug(slug: string): Promise<Question | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'questions', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2)
    
    return response.object as Question
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch question')
  }
}

export async function getFeaturedQuestions(): Promise<Question[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'questions',
        'metadata.is_featured': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(5)
    
    return response.objects as Question[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured questions')
  }
}

// Answers API
export async function getAnswersByQuestionId(questionId: string): Promise<Answer[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'answers',
        'metadata.question': questionId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.helpful_count')
    
    return response.objects as Answer[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch answers')
  }
}

// Badges API
export async function getBadges(): Promise<Badge[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'badges' })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('metadata.badge_type')
    
    return response.objects as Badge[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch badges')
  }
}

export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'user-badges',
        'metadata.user': userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.earned_date')
    
    return response.objects as UserBadge[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch user badges')
  }
}

// Search API
export async function searchQuestions(query: string): Promise<Question[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'questions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    // Client-side filtering for now - in production, use Cosmic search
    const filteredQuestions = response.objects.filter((question: Question) => {
      const searchText = `${question.title} ${question.metadata?.content || ''} ${question.metadata?.tags || ''}`.toLowerCase()
      return searchText.includes(query.toLowerCase())
    })
    
    return filteredQuestions as Question[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to search questions')
  }
}