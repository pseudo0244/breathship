import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { useBlogs } from '../hooks/useBlogs'
import LoadingSpinner from '../components/UI/LoadingSpinner'

export default function BlogDetail() {
  const { id } = useParams()
  const { blogs, loading } = useBlogs()

  const blog = blogs.find(b => b.id === id)

  if (loading) return <LoadingSpinner />

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
          <Link to="/blogs" className="text-[#3D2B2A] hover:underline">
            Return to blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link 
            to="/blogs"
            className="inline-flex items-center text-[#3D2B2A] hover:text-[#3D2B2A]/80 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Link>

          <div className="h-64 md:h-80 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-[#3D2B2A]/10 to-[#4D5442]/10">
            {blog.image_link ? (
              <img 
                src={blog.image_link} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">📝</div>
            )}
          </div>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3D2B2A] mb-4 leading-tight">
              {blog.title}
            </h1>
            <p className="text-gray-500">
              Published on {format(new Date(blog.created_at), 'MMMM dd, yyyy')}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  )
}