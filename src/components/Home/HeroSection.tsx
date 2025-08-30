import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Clock, Heart } from 'lucide-react'
import { useContent } from '../../hooks/useContent'
import Button from '../UI/Button'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  const { content } = useContent()

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/bg.jpg')` }}
      />
      
      {/* Black Overlay for Readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Organic Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative elements removed */}
        
        {/* Hand-drawn style decorative elements */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 border border-brand-beige/10 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 border border-brand-brown/15 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-brand-beige/8 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge with organic styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-brand-green/20 backdrop-blur-sm text-brand-beige px-6 py-3 rounded-full text-sm font-proxima-nova mb-8 border border-brand-beige/20"
          >
            <Heart className="w-4 h-4 text-brand-brown" />
            <span>{content.hero_badge_text || 'Transform Your Life Through Conscious Breathing'}</span>
          </motion.div>

          <h1 
            className="text-5xl md:text-7xl font-cormorant-bold text-brand-beige mb-8 leading-tight"
          >
            {content.hero_text || 'Breathe. Heal. Transform.'}
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-brand-beige/90 mb-10 max-w-4xl mx-auto leading-relaxed font-proxima-nova"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {content.hero_subtitle || 'Discover the transformative power of conscious breathing. Experience deep healing, stress relief, and inner peace through ancient wisdom and modern science.'}
          </motion.p>

          {/* Stats with organic styling */}
          <motion.div
            className="flex justify-center items-center space-x-8 mb-10 text-sm text-brand-beige/80 font-proxima-nova"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center space-x-2 bg-brand-green/10 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-green/20">
              <Users className="w-4 h-4 text-brand-brown" />
              <span>{content.hero_stats_clients || '500+'} {content.hero_stats_clients_text || 'Clients Transformed'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-brand-brown/10 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-brown/20">
              <Clock className="w-4 h-4 text-brand-green" />
              <span>{content.hero_stats_experience || '5+'} {content.hero_stats_experience_text || 'Years Experience'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-brand-green/10 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-green/20">
              <Star className="w-4 h-4 text-brand-brown" />
              <span>{content.hero_stats_rating || '4.9/5'} {content.hero_stats_rating_text || 'Rating'}</span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/sessions">
              <Button 
                variant="brand-green"
                size="lg"
                className="group shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {content.hero_cta_primary || 'Begin Journey'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators with organic styling */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-brand-beige/80 font-proxima-nova"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center space-x-2 bg-brand-green/5 backdrop-blur-sm px-3 py-2 rounded-full border border-brand-green/10">
              <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
              <span>{content.hero_trust_1 || 'Certified Breathwork Facilitator'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-brand-brown/5 backdrop-blur-sm px-3 py-2 rounded-full border border-brand-brown/10">
              <div className="w-2 h-2 bg-brand-green rounded-full"></div>
              <span>{content.hero_trust_2 || 'Evidence-Based Techniques'}</span>
            </div>
            <div className="flex items-center space-x-2 bg-brand-green/5 backdrop-blur-sm px-3 py-2 rounded-full border border-brand-green/10">
              <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
              <span>{content.hero_trust_3 || 'Safe & Supportive Environment'}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}