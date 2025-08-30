import React from 'react'
import { motion } from 'framer-motion'
import { useContentProduction } from '../../hooks/useContentProduction'
import { Heart, Sparkles, Leaf } from 'lucide-react'

export default function AboutSections() {
  const { content } = useContentProduction()

  return (
    <section className="py-24 bg-brand-beige relative overflow-hidden">
      {/* Decorative Icons with organic movement */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <motion.img 
          src="src/public/brownleaf.png" 
          alt="" 
          className="absolute top-20 left-10 w-12 h-12"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.img 
          src="src/public/greenstar.png" 
          alt="" 
          className="absolute top-40 right-20 w-10 h-10"
          animate={{ 
            y: [0, 12, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.img 
          src="src/public/brownsun.png" 
          alt="" 
          className="absolute bottom-40 left-20 w-16 h-16"
          animate={{ 
            y: [0, -6, 0],
            rotate: [0, 2, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.img 
          src="src/public/greenleaf.png" 
          alt="" 
          className="absolute bottom-20 right-10 w-14 h-14"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -4, 0]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Hand-drawn style decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/8 w-40 h-40 border border-brand-green/8 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/8 w-32 h-32 border border-brand-brown/10 rounded-full opacity-15"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 border border-brand-green/6 rounded-full opacity-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative accent */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-brown/20 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-brand-brown" />
            </div>
            
            <h2 className="text-4xl font-cormorant-bold text-brand-green mb-8">About Me</h2>
            <p className="text-lg text-brand-green/80 leading-relaxed mb-8 font-proxima-nova">
              {content.about_me || `I'm a certified breathwork facilitator passionate about helping others discover 
              the transformative power of conscious breathing. Through years of practice and study, 
              I've witnessed how simple breathing techniques can create profound shifts in physical, 
              emotional, and spiritual well-being.`}
            </p>
            <p className="text-lg text-brand-green/80 leading-relaxed font-proxima-nova">
              My mission is to guide you on a journey of self-discovery through the ancient wisdom of breathwork, 
              helping you unlock your inner potential and find deeper peace and clarity.
            </p>
            
            {/* Organic accent line */}
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-brand-green/40 to-brand-brown/40 rounded-full"></div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-green/5 to-brand-brown/5 rounded-3xl transform rotate-1"></div>
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-green/10 to-brand-brown/10 rounded-3xl transform -rotate-1"></div>
            
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-green/10 to-brand-brown/10 relative">
              {content.about_me_image ? (
                <img 
                  src={content.about_me_image} 
                  alt="About Me"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-8xl">🧘‍♀️</div>
                </div>
              )}
              
              {/* Overlay with organic elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/20 to-transparent"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-brand-beige/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-brand-brown" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center max-w-5xl mx-auto relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 border border-brand-green/15 rounded-full opacity-30"></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 border border-brand-brown/12 rounded-full opacity-25"></div>
          
          <div className="inline-flex items-center space-x-2 bg-brand-green/10 backdrop-blur-sm text-brand-green px-6 py-3 rounded-full text-sm font-proxima-nova mb-6 border border-brand-green/20">
            <Leaf className="w-4 h-4" />
            <span>Our Story</span>
          </div>
          
          <h2 className="text-4xl font-cormorant-bold text-brand-green mb-8">About Breathship</h2>
          <p className="text-lg text-brand-green/80 leading-relaxed font-proxima-nova">
            {content.about_breathship || `Breathship is more than just a breathwork practice—it's a journey toward wholeness. 
            We believe that through conscious breathing, we can navigate life's challenges with greater ease, 
            access our innate wisdom, and cultivate a deeper connection to ourselves and others. 
            Each session is designed to create a safe space for exploration, healing, and transformation.`}
          </p>
          
          {/* Organic accent line */}
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-brand-green/30 to-brand-brown/30 rounded-full mx-auto"></div>
        </motion.div>
      </div>
    </section>
  )
}