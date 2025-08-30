import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import ContentManagerProduction from './ContentManagerProduction'
import SessionsManager from './SessionsManager'
import BlogsManager from './BlogsManager'
import TestimonialsManager from './TestimonialsManager'

interface AdminDashboardProps {
  onLogout: () => void
}

const tabs = [
  { id: 'content', label: 'Home Content' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'testimonials', label: 'Testimonials' }
]

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('content')

  const renderContent = () => {
    switch (activeTab) {
      case 'content':
        return <ContentManagerProduction />
      case 'sessions':
        return <SessionsManager />
      case 'blogs':
        return <BlogsManager />
      case 'testimonials':
        return <TestimonialsManager />
      default:
        return <ContentManagerProduction />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-cormorant-bold text-brand-green">Breathship Admin</h1>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-brand-green transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-brand-green text-brand-green'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}