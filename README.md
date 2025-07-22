# Community Support Hub

![App Preview](https://imgix.cosmicjs.com/f5856950-a455-11ed-81f2-f50e185dd248-NRQV-hBF10M.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive community support platform built with Next.js and [Cosmic](https://www.cosmicjs.com) that enables users to ask questions, share knowledge, earn badges, and build reputation through community engagement.

## Features

- 🤝 **Community Q&A System** - Ask questions and provide detailed answers with rich text formatting
- 👤 **User Profiles & Reputation** - Track contributions, expertise, and community standing  
- 🏆 **Badge Achievement System** - Company team badges, achievement rewards, and expertise recognition
- 👍 **Kudos & Voting System** - Upvote helpful answers and show appreciation for contributors
- 🔍 **Advanced Search & Filtering** - Find questions by category, tags, status, or keywords
- 📱 **Responsive Design** - Optimized experience across desktop, tablet, and mobile devices
- 🚀 **SEO Optimized** - All content publicly accessible for maximum search engine visibility
- 💻 **Code Snippet Support** - Syntax-highlighted code blocks in answers

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=687fb464713abc4f2911fb05&clone_repository=687fb7b1713abc4f2911fb24)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to build a community site for my software business where anyone can ask questions and answer those questions and have a sophisticated search function to look for previous questions and answers. I want them to be able to create profiles and allow a kudos funtion to allow people to like users that help out a lot. I want badges so that our team can have a badge indidcating they work at the company and also our users can earn badges for helping a lot or knowing a particular topic. I want all of the information available with no paywall so that the seo of all of the questions will help bring people to our site. Do you think we can build this?"

### Code Generation Prompt

> Build a community support site where the users of my software can ask questions, answer others questions, create a profile to track their questions asked and answered, and give kudos to the answers and answerers they like. Add a badge system so we can have various badges like team member at our company, super answerer, etc. Have it all be publicly available in order for the SEO to bring new customers to the site as well.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Content Management**: [Cosmic](https://www.cosmicjs.com/docs)
- **TypeScript**: Full type safety with strict mode
- **Image Optimization**: Imgix integration for responsive images
- **Icons**: Lucide React for consistent iconography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A [Cosmic](https://www.cosmicjs.com) account and bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd community-support-hub
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetch Questions with Answers
```typescript
import { cosmic } from '@/lib/cosmic'

// Get questions with author and category data
const { objects: questions } = await cosmic.objects
  .find({
    type: 'questions',
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
  .sort('-created_at')
```

### Create a New Answer
```typescript
await cosmic.objects.insertOne({
  type: 'answers',
  title: 'Answer Title',
  metadata: {
    content: '<p>Answer content with HTML formatting</p>',
    author: authorId,
    question: questionId,
    is_accepted: false,
    helpful_count: 0,
    code_snippets: [
      {
        language: 'javascript',
        code: 'console.log("Hello World");'
      }
    ]
  }
})
```

### Award Badge to User
```typescript
await cosmic.objects.insertOne({
  type: 'user-badges',
  title: `${user.title} - ${badge.title}`,
  metadata: {
    user: userId,
    badge: badgeId,
    earned_date: new Date().toISOString().split('T')[0],
    reason: 'Achievement unlocked!'
  }
})
```

## Cosmic CMS Integration

This app uses the following Cosmic object types:

- **Users** - Community member profiles with reputation and expertise
- **Questions** - User-submitted questions with categories and tags  
- **Answers** - Responses to questions with voting and acceptance
- **Badges** - Achievement badges for recognition and gamification
- **User-Badges** - Junction table linking users to their earned badges
- **Kudos** - Voting system for questions, answers, and user recognition

All content is managed through the [Cosmic dashboard](https://app.cosmicjs.com) and delivered via the Cosmic API with automatic optimization and caching.

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Connect your repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically on every git push

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables

For production deployment, configure these environment variables:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

<!-- README_END -->