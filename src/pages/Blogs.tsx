import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useBlogs } from '../hooks/useBlogs'
import Card from '../components/UI/Card'
import LoadingSpinner from '../components/UI/LoadingSpinner'

export default function Blogs() {
  const { blogs, loading } = useBlogs()
  const [selectedBlog, setSelectedBlog] = useState<any>(null)

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
          {(() => {
            const publishedBlogs = blogs.filter(blog => {
              const isPublished = blog.is_published?.toLowerCase()
              const shouldShow = isPublished === 'true' || isPublished === '' || isPublished === undefined
              console.log(`📰 Blog "${blog.title}": is_published="${blog.is_published}" -> show=${shouldShow}`)
              return shouldShow
            })
            console.log('📰 Total blogs:', blogs.length, 'Published blogs:', publishedBlogs.length)
            return publishedBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="w-full text-left"
                >
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
                        Published
                      </p>
                    </div>
                  </Card>
                </button>
              </motion.div>
            ))
          })()}
        </div>

        {(() => {
          const publishedBlogs = blogs.filter(blog => {
            const isPublished = blog.is_published?.toLowerCase()
            return isPublished === 'true' || isPublished === '' || isPublished === undefined
          })
          return publishedBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts available yet. Check back soon!</p>
            </div>
          )
        })()}
      </div>

      {/* Blog Preview Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-cormorant-bold text-brand-green">
                {selectedBlog.title}
              </h2>
              <button
                onClick={() => setSelectedBlog(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Blog Image */}
              {selectedBlog.image_link && (
                <div className="mb-6">
                  <img 
                    src={selectedBlog.image_link} 
                    alt={selectedBlog.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Blog Excerpt */}
              <div className="mb-6">
                <p className="text-lg text-gray-600 font-proxima-nova leading-relaxed">
                  {selectedBlog.excerpt}
                </p>
              </div>

              {/* Blog Content */}
              <div 
                className="prose prose-lg max-w-none font-proxima-nova"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}