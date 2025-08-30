import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { useBlogs } from '../hooks/useBlogs'
import Card from '../components/UI/Card'
import LoadingSpinner from '../components/UI/LoadingSpinner'

export default function Blogs() {
  const { blogs, loading } = useBlogs()

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#3D2B2A] mb-4">
            Blog & Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dive deeper into the world of breathwork with our articles on healing, transformation, and mindful living.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/blogs/${blog.id}`}>
                <Card>
                  <div className="h-48 bg-gradient-to-br from-[#3D2B2A]/10 to-[#4D5442]/10">
                    {blog.image_link ? (
                      <img 
                        src={blog.image_link} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">📝</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#3D2B2A] mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(blog.created_at), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}