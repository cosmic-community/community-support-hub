import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Community Support Hub - Ask Questions, Share Knowledge',
  description: 'Join our community support platform to ask questions, share knowledge, earn badges, and help fellow developers succeed.',
  keywords: 'community support, Q&A, software help, developer community, badges, reputation',
  openGraph: {
    title: 'Community Support Hub',
    description: 'Ask questions, share knowledge, and build your reputation in our developer community.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}