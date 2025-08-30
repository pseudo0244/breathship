import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

import { useContent } from '../../hooks/useContent'
import Card from '../UI/Card'

export default function TestimonialsSection() {
  const { content } = useContent()

  // Static testimonials data
  const testimonials = [
    {
      id: '1',
      name: 'Rajeshwari Iyer',
      location: 'Chennai',
      text: 'Breathship\'s breathwork program has been life-changing. I struggled with burnout and emotional overwhelm for years. After just a few weeks of sessions, I feel a renewed sense of purpose and balance in my life. The techniques are simple yet incredibly powerful. I wholeheartedly recommend Breathship to anyone seeking inner peace and well-being.'
    },
    {
      id: '2',
      name: 'Ravi Sharma',
      location: 'Bengaluru',
      text: 'Breathship has been a transformative experience for me. The guided breathwork sessions have helped me manage my stress and anxiety levels like never before. I feel more grounded and connected to my inner self, and it\'s incredible how something as simple as conscious breathing can make such a profound impact. Thank you, Breathship, for this journey of self-discovery!'
    },
    {
      id: '3',
      name: 'Aarti Mehta',
      location: 'Mumbai',
      text: 'I joined Breathship during a challenging phase of my life, and it has been a beacon of hope. The sessions are deeply calming and rejuvenating. I sleep better, feel more energized, and am able to approach my day with clarity and focus. I am so grateful to the team for making such an essential practice accessible to everyone!'
    }
  ]

  return (
    <section className="py-20 bg-brand-green relative overflow-hidden">
              {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          {/* Decorative elements removed */}
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-8 bg-brand-beige/95 backdrop-blur-sm hover:bg-brand-beige transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                <div className="relative">
                  {/* Quote icon at top */}
                  <div className="absolute -top-3 -left-2">
                    <div className="w-8 h-8 bg-brand-brown/10 rounded-full flex items-center justify-center">
                      <Quote className="w-4 h-4 text-brand-brown" />
                    </div>
                  </div>
                  
                  {/* Testimonial text */}
                  <div className="pt-4">
                    <p className="text-brand-green leading-relaxed font-proxima-nova text-lg mb-6">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Author info */}
                    <div className="border-t border-brand-brown/20 pt-4">
                      <p className="font-cormorant-bold text-brand-brown text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-brand-green/70 font-proxima-nova text-sm">
                        {testimonial.location}
                      </p>
                    </div>
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