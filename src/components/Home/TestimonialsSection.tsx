import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useTestimonials } from '../../hooks/useTestimonials'
import { useContentProduction } from '../../hooks/useContentProduction'
import Card from '../UI/Card'

export default function TestimonialsSection() {
  const { testimonials, loading } = useTestimonials()
  const { content } = useContentProduction()

  if (loading) {
    return (
      <section className="py-20 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-brand-beige/20 rounded-lg mb-8 max-w-2xl mx-auto"></div>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-brand-beige/10 rounded-lg p-6 h-48"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-brand-green relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <img src="src/public/brownleaf.png" alt="" className="absolute top-20 left-20 w-16 h-16" />
        <img src="src/public/greenstar.png" alt="" className="absolute bottom-20 right-20 w-12 h-12" />
        <img src="src/public/brownsun.png" alt="" className="absolute top-1/3 right-1/4 w-20 h-20" />
        <img src="src/public/greenleaf.png" alt="" className="absolute bottom-1/3 left-1/4 w-14 h-14" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-brand-beige/10 text-brand-beige px-4 py-2 rounded-full text-sm font-proxima-nova mb-4">
            <Star className="w-4 h-4" />
            <span>{content.testimonials_badge_text || 'Client Success Stories'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-cormorant-bold text-brand-beige mb-4">
            {content.testimonials_title || 'What Our Clients Say'}
          </h2>
          <p className="text-xl text-brand-beige/80 max-w-3xl mx-auto font-proxima-nova">
            {content.testimonials_subtitle || 'Real stories from people who have transformed their lives through breathwork. Join our community of healing and growth.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 bg-brand-beige/95 backdrop-blur-sm hover:bg-brand-beige transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonial.image_link}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-brown/20"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Quote className="w-5 h-5 text-brand-brown mr-2" />
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-brand-brown fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-brand-green mb-4 italic leading-relaxed font-proxima-nova">
                      "{testimonial.text}"
                    </p>
                    <p className="font-cormorant-regular text-brand-brown">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          className="mt-16 grid md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-3xl font-cormorant-bold text-brand-beige mb-2">
              {content.testimonials_stats_clients || '500+'}
            </div>
            <div className="text-brand-beige/80 font-proxima-nova">
              {content.testimonials_stats_clients_text || 'Clients Served'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-cormorant-bold text-brand-beige mb-2">
              {content.testimonials_stats_rating || '4.9/5'}
            </div>
            <div className="text-brand-beige/80 font-proxima-nova">
              {content.testimonials_stats_rating_text || 'Average Rating'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-cormorant-bold text-brand-beige mb-2">
              {content.testimonials_stats_sessions || '1000+'}
            </div>
            <div className="text-brand-beige/80 font-proxima-nova">
              {content.testimonials_stats_sessions_text || 'Sessions Completed'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-cormorant-bold text-brand-beige mb-2">
              {content.testimonials_stats_success || '95%'}
            </div>
            <div className="text-brand-beige/80 font-proxima-nova">
              {content.testimonials_stats_success_text || 'Success Rate'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}