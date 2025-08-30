import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ArrowRight, Users, Star, Heart } from 'lucide-react'
import { useSessions } from '../../hooks/useSessions'
import { useContentProduction } from '../../hooks/useContentProduction'
import Button from '../UI/Button'
import Card from '../UI/Card'

export default function UpcomingSessions() {
  const { sessions, loading } = useSessions()
  const { content } = useContentProduction()

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

  const upcomingSessions = sessions
    .filter(session => new Date(session.date) >= new Date())
    .slice(0, 3)

  if (upcomingSessions.length === 0) return null

  const getSessionIcon = (tag: string) => {
    switch (tag) {
      case 'One-on-One':
        return <Heart className="w-5 h-5" />
      case 'Group':
        return <Users className="w-5 h-5" />
      case 'Corporate':
        return <Users className="w-5 h-5" />
      case 'Workshop':
        return <Star className="w-5 h-5" />
      default:
        return <Heart className="w-5 h-5" />
    }
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'One-on-One':
        return 'bg-brand-brown/10 text-brand-brown border-brand-brown/20'
      case 'Group':
        return 'bg-brand-green/10 text-brand-green border-brand-green/20'
      case 'Corporate':
        return 'bg-brand-brown/10 text-brand-brown border-brand-brown/20'
      case 'Workshop':
        return 'bg-brand-green/10 text-brand-green border-brand-green/20'
      default:
        return 'bg-brand-green/10 text-brand-green border-brand-green/20'
    }
  }

  return (
    <section className="py-20 bg-brand-beige relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <img src="src/public/brownleaf.png" alt="" className="absolute top-10 right-10 w-16 h-16" />
        <img src="src/public/greenstar.png" alt="" className="absolute bottom-10 left-10 w-12 h-12" />
        <img src="src/public/brownsun.png" alt="" className="absolute top-1/3 left-1/4 w-20 h-20" />
        <img src="src/public/greenleaf.png" alt="" className="absolute bottom-1/3 right-1/4 w-14 h-14" />
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
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getTagColor(session.tag)}`}>
                      {getSessionIcon(session.tag)}
                      <span className="text-sm font-proxima-nova font-medium">{session.tag}</span>
                    </div>
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
                      <span className="font-medium">{session.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-brand-green/60 font-proxima-nova">
                      <Clock className="w-4 h-4 mr-2 text-brand-brown" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-brand-green/60 font-proxima-nova">
                      <MapPin className="w-4 h-4 mr-2 text-brand-brown" />
                      <span>Online & In-Person</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="brand-green"
                    className="w-full group"
                  >
                    Book Session
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
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
          <Button 
            variant="outline"
            size="lg"
            className="inline-flex items-center space-x-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-beige"
          >
            {content.sessions_cta || 'View All Sessions'}
            <ArrowRight className="h-5 w-5" />
          </Button>
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