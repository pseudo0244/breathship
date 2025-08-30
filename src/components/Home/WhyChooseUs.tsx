import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Shield, Users, Star, Clock, Award, Sparkles } from 'lucide-react'
import { useContent } from '../../hooks/useContent'
import Card from '../UI/Card'
import Button from '../UI/Button'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: Heart,
    title: 'Personalized Approach',
    description: 'Every session is tailored to your unique needs and goals, ensuring the most effective healing experience.',
    color: 'brand-brown'
  },
  {
    icon: Shield,
    title: 'Safe & Supportive',
    description: 'Our certified facilitators create a nurturing environment where you can feel completely safe to explore and heal.',
    color: 'brand-green'
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    description: 'Learn from experienced breathwork practitioners with years of training and hundreds of successful sessions.',
    color: 'brand-brown'
  },
  {
    icon: Star,
    title: 'Proven Results',
    description: 'Join hundreds of clients who have experienced profound transformation through our breathwork programs.',
    color: 'brand-green'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Choose from morning, afternoon, or evening sessions that fit your lifestyle and schedule.',
    color: 'brand-brown'
  },
  {
    icon: Award,
    title: 'Certified Programs',
    description: 'All our programs are based on evidence-based techniques and certified by leading breathwork organizations.',
    color: 'brand-green'
  }
]

export default function WhyChooseUs() {
  const { content } = useContent()

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'brand-green':
        return 'bg-brand-green/10 text-brand-green border-brand-green/20'
      case 'brand-brown':
        return 'bg-brand-brown/10 text-brand-brown border-brand-brown/20'
      default:
        return 'bg-brand-green/10 text-brand-green border-brand-green/20'
    }
  }

  return (
    <section className="py-24 bg-brand-beige relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Decorative elements removed */}
      </div>

      {/* Hand-drawn style decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/8 w-40 h-40 border border-brand-green/8 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/8 w-32 h-32 border border-brand-brown/10 rounded-full opacity-15"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 border border-brand-green/6 rounded-full opacity-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-brand-green/10 backdrop-blur-sm text-brand-green px-6 py-3 rounded-full text-sm font-proxima-nova mb-6 border border-brand-green/20">
            <Sparkles className="w-4 h-4" />
            <span>{content.why_choose_badge_text || 'Why Choose Breathship'}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-cormorant-bold text-brand-green mb-6">
            {content.why_choose_title || 'Your Journey to Transformation'}
          </h2>
          <p className="text-xl text-brand-green/80 max-w-4xl mx-auto font-proxima-nova leading-relaxed">
            {content.why_choose_subtitle || 'We combine ancient wisdom with modern science to create the most effective breathwork experience for your healing and growth.'}
          </p>
          
          {/* Organic accent line */}
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-brand-green/30 to-brand-brown/30 rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white relative group">
                {/* Decorative accent */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-green/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className={`w-20 h-20 ${getColorClasses(feature.color)} rounded-full flex items-center justify-center mx-auto mb-8 border-2`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-cormorant-regular text-brand-green mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-brand-green/80 text-center leading-relaxed font-proxima-nova">
                  {feature.description}
                </p>
                
                {/* Organic accent line */}
                <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-brand-green/20 to-brand-brown/20 rounded-full mx-auto"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-brand-green/10 to-brand-brown/10 backdrop-blur-sm rounded-3xl p-12 max-w-5xl mx-auto border border-brand-green/20 relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-brown/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-brown" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-brand-green/20 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-brand-green" />
            </div>
            
            <h3 className="text-3xl font-cormorant-bold text-brand-green mb-6">
              {content.why_choose_cta_title || 'Ready to Begin Your Transformation?'}
            </h3>
            <p className="text-brand-green/80 mb-8 max-w-3xl mx-auto font-proxima-nova leading-relaxed">
              {content.why_choose_cta_subtitle || 'Join our community of healing and discover the profound benefits of conscious breathing. Your journey to inner peace starts with a single breath.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/sessions">
                <Button variant="brand-green" size="lg" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  {content.why_choose_cta_primary || 'Book Your First Session'}
                </Button>
              </Link>
              <Link to="/blogs">
                <Button variant="outline" size="lg" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-beige shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  {content.why_choose_cta_secondary || 'Learn More'}
                </Button>
              </Link>
            </div>
            
            {/* Organic accent line */}
            <div className="mt-8 w-48 h-1 bg-gradient-to-r from-brand-green/20 to-brand-brown/20 rounded-full mx-auto"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
