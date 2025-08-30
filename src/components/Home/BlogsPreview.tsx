import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useBlogs } from '../../hooks/useBlogs'
import Card from '../UI/Card'
import LoadingSpinner from '../UI/LoadingSpinner'
import Button from '../UI/Button'

export default function BlogsPreview() {
  const { blogs, loading } = useBlogs()

  const latestBlogs = blogs.slice(0, 3)

  if (loading) return <LoadingSpinner />

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {/* Decorative elements removed */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-cormorant-bold text-brand-green mb-4">Latest Insights</h2>
          <p className="text-lg text-brand-green/80 max-w-2xl mx-auto font-proxima-nova">
            Explore articles about breathwork, mindfulness, and transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/blogs/${blog.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-brand-green/10 to-brand-brown/10">
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
                    <h3 className="text-xl font-cormorant-regular text-brand-green mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-brand-green/80 line-clamp-3 leading-relaxed font-proxima-nova">
                      {blog.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-brand-brown font-proxima-nova font-medium">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/blogs">
            <Button variant="brand-green" size="lg">
              <span>View All Blogs</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}