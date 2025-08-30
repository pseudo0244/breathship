import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useContentProduction } from '../../hooks/useContentProduction'

export default function Header() {
  const location = useLocation()
  const { content } = useContentProduction()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Sessions', href: '/sessions' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
    { name: 'Corporate', href: '/corporate' },
  ]

  return (
    <motion.header 
      className="bg-brand-beige/95 backdrop-blur-sm shadow-sm sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="src/public/logo.png" alt={content.header_logo_alt || "Breathship Logo"} className="h-8 w-auto" />
            <span className="text-xl font-cormorant-bold text-brand-green">
              {content.header_company_name || "Breathship"}
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-proxima-nova transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-brand-green bg-brand-green/10'
                    : 'text-brand-green/80 hover:text-brand-green hover:bg-brand-green/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button className="text-brand-green hover:text-brand-brown">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}