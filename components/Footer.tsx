import Link from 'next/link'

export default function Footer() {
  const COSMIC_BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG || 'your-bucket-slug'
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">Community Support</h3>
            <p className="text-gray-300 text-sm">
              A platform for developers to ask questions, share knowledge, and build their reputation through community engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/questions" className="text-gray-300 hover:text-white transition-colors">
                  Browse Questions
                </Link>
              </li>
              <li>
                <Link href="/questions/ask" className="text-gray-300 hover:text-white transition-colors">
                  Ask a Question
                </Link>
              </li>
              <li>
                <Link href="/users" className="text-gray-300 hover:text-white transition-colors">
                  Community Members
                </Link>
              </li>
              <li>
                <Link href="/badges" className="text-gray-300 hover:text-white transition-colors">
                  Available Badges
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Technical Support</li>
              <li>Integration Help</li>
              <li>Feature Requests</li>
              <li>Bug Reports</li>
              <li>General Discussion</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get Help</h3>
            <p className="text-gray-300 text-sm mb-4">
              Need assistance? Our community is here to help you succeed.
            </p>
            <Link 
              href="/questions/ask" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Community Support Hub. All rights reserved.
          </p>
          
          {/* Built with Cosmic */}
          <a
            href={`https://www.cosmicjs.com?utm_source=bucket_${COSMIC_BUCKET_SLUG}&utm_medium=referral&utm_campaign=app_footer&utm_content=built_with_cosmic`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 bg-cosmic-dark hover:bg-cosmic-dark-hover text-white px-4 py-2 rounded-md text-sm font-medium no-underline inline-flex items-center gap-2 transition-colors duration-200"
          >
            <img 
              src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg" 
              alt="Cosmic Logo" 
              className="w-5 h-5"
            />
            Built with Cosmic
          </a>
        </div>
      </div>
    </footer>
  )
}