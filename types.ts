// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// User object type
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    name: string;
    username: string;
    email: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    company_role?: string;
    location?: string;
    website?: string;
    reputation_score?: number;
    join_date: string;
    expertise_tags?: string;
  };
}

// Question object type
export interface Question extends CosmicObject {
  type: 'questions';
  metadata: {
    title: string;
    content: string;
    author: User | string;
    tags?: string;
    category?: {
      key: string;
      value: string;
    };
    views_count?: number;
    status?: {
      key: string;
      value: string;
    };
    accepted_answer?: Answer;
    is_featured?: boolean;
  };
}

// Answer object type
export interface Answer extends CosmicObject {
  type: 'answers';
  metadata: {
    content: string;
    author: User | string;
    question: Question | string;
    is_accepted?: boolean;
    helpful_count?: number;
    code_snippets?: CodeSnippet[];
  };
}

// Badge object type
export interface Badge extends CosmicObject {
  type: 'badges';
  metadata: {
    name: string;
    description: string;
    icon?: {
      url: string;
      imgix_url: string;
    };
    badge_type: {
      key: string;
      value: string;
    };
    color?: string;
    points_required?: number;
    criteria?: string;
  };
}

// User Badge object type
export interface UserBadge extends CosmicObject {
  type: 'user-badges';
  metadata: {
    user: User;
    badge: Badge;
    earned_date: string;
    reason?: string;
  };
}

// Kudos object type
export interface Kudos extends CosmicObject {
  type: 'kudos';
  metadata: {
    user: User;
    target_type: {
      key: string;
      value: string;
    };
    target_id: string;
    vote_type: {
      key: string;
      value: string;
    };
  };
}

// Code snippet type
export interface CodeSnippet {
  language: string;
  code: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Select dropdown types
export type QuestionCategory = 'general' | 'technical' | 'feature' | 'bug' | 'integration';
export type QuestionStatus = 'open' | 'answered' | 'solved' | 'closed';
export type BadgeType = 'company' | 'achievement' | 'expertise';
export type VoteType = 'upvote' | 'helpful' | 'downvote';
export type TargetType = 'answer' | 'question' | 'user';

// Type guards
export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isQuestion(obj: CosmicObject): obj is Question {
  return obj.type === 'questions';
}

export function isAnswer(obj: CosmicObject): obj is Answer {
  return obj.type === 'answers';
}

export function isBadge(obj: CosmicObject): obj is Badge {
  return obj.type === 'badges';
}