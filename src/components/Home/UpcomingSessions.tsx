import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ArrowRight, Users, Star, Heart, DollarSign } from 'lucide-react'
import { useSessions } from '../../hooks/useSessions'
import { useContent } from '../../hooks/useContent'
import Button from '../UI/Button'
import Card from '../UI/Card'
import { Link } from 'react-router-dom'

export default function UpcomingSessions() {
  const { sessions, loading, error } = useSessions()
  const { content } = useContent()

  if (loading) {
    return (
      <section className="py-20 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-brand-green/20 rounded-lg mb-8 max-w-md mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Error loading sessions: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  const upcomingSessions = sessions
    .filter(session => {
      const isActive = session.is_active?.toLowerCase()
      return isActive === 'true' || isActive === '' || isActive === undefined
    })
    .slice(0, 3)

  if (upcomingSessions.length === 0) return null

  const getSessionIcon = (tag: string) => {
    switch (tag) {
      case 'Beginner':
        return <Heart className="w-5 h-5" />
      case 'Advanced':
        return <Star className="w-5 h-5" />
      case 'Corporate':
        return <Users className="w-5 h-5" />
      default:
        return <Heart className="w-5 h-5" />
    }
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Beginner':
        return 'bg-brand-green/10 text-brand-green border-brand-green/20'
      case 'Advanced':
        return 'bg-brand-brown/10 text-brand-brown border-brand-brown/20'
      case 'Corporate':
        return 'bg-brand-green/10 text-brand-green border-brand-green/20'
      default:
        return 'bg-brand-green/10 text-brand-green border-brand-green/20'
    }
  }

  return (
    <section className="py-20 bg-brand-beige relative overflow-hidden">
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
          <div className="inline-flex items-center space-x-2 bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-proxima-nova mb-4">
            <Calendar className="w-4 h-4" />
            <span>{content.sessions_badge_text || 'Join Our Next Sessions'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-cormorant-bold text-brand-green mb-4">
            {content.sessions_title || 'Upcoming Sessions'}
          </h2>
          <p className="text-xl text-brand-green/80 max-w-3xl mx-auto font-proxima-nova">
            {content.sessions_subtitle || 'Transform your life with our carefully crafted breathwork sessions. Each session is designed to help you release tension, process emotions, and connect with your authentic self.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {upcomingSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <div className="h-48 bg-gradient-to-br from-brand-green/10 to-brand-brown/10 flex items-center justify-center relative overflow-hidden">
                  {session.image_link ? (
                    <img
                      src={session.image_link}
                      alt={session.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-brand-green/20 text-6xl">🫁</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getTagColor(session.session_tag)}`}>
                      {getSessionIcon(session.session_tag)}
                      <span className="text-sm font-proxima-nova font-medium">{session.session_tag}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-brown/90 text-white">
                      {session.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-cormorant-regular text-brand-green mb-3 group-hover:text-brand-brown transition-colors">
                    {session.title}
                  </h3>
                  
                  <p className="text-brand-green/80 mb-4 line-clamp-3 leading-relaxed font-proxima-nova">
                    {session.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-brand-green/60 font-proxima-nova">
                      <Calendar className="w-4 h-4 mr-2 text-brand-brown" />
                      <span>{session.date || 'TBD'}</span>
                    </div>
                    <div className="flex items-center text-sm text-brand-green/60 font-proxima-nova">
                      <Clock className="w-4 h-4 mr-2 text-brand-brown" />
                      <span>{session.time || 'TBD'}</span>
                    </div>
                    <div className="flex items-center text-sm text-brand-green/60 font-proxima-nova">
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    {session.payment_link ? (
                      <Button 
                        variant="brand-green"
                        className="flex-1 group"
                        onClick={() => window.open(session.payment_link, '_blank')}
                      >
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Link to="/sessions" className="flex-1">
                        <Button 
                          variant="brand-green"
                          className="w-full group"
                        >
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    )}
                    {session.payment_link && (
                      <Button 
                        variant="outline"
                        className="px-4 border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-beige"
                        onClick={() => window.open(session.payment_link, '_blank')}
                      >
                        Pay
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/sessions">
            <Button 
              variant="outline"
              size="lg"
              className="inline-flex items-center space-x-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-beige"
            >
              {content.sessions_cta || 'View All Sessions'}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Additional info section */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-brand-brown" />
            </div>
            <h3 className="text-lg font-cormorant-regular text-brand-green mb-2">Personalized Approach</h3>
            <p className="text-brand-green/80 font-proxima-nova">Each session is tailored to your unique needs and goals.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-brand-green" />
            </div>
            <h3 className="text-lg font-cormorant-regular text-brand-green mb-2">Expert Guidance</h3>
            <p className="text-brand-green/80 font-proxima-nova">Learn from certified breathwork facilitators with years of experience.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-brown/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-brand-brown" />
            </div>
            <h3 className="text-lg font-cormorant-regular text-brand-green mb-2">Proven Results</h3>
            <p className="text-brand-green/80 font-proxima-nova">Join hundreds of clients who have transformed their lives.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}