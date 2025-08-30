import React from 'react'
import { motion } from 'framer-motion'
import { useContent } from '../../hooks/useContent'
import { Quote, Sparkles } from 'lucide-react'

export default function QuoteSection() {
  const { content } = useContent()

  return (
    <motion.section
      className="py-24 bg-brand-green/5 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Decorative Icons with organic movement */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {/* Decorative elements removed */}
      </div>

      {/* Hand-drawn style decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 border border-brand-green/8 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/6 w-24 h-24 border border-brand-brown/10 rounded-full opacity-15"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-brand-green/6 rounded-full opacity-12"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Decorative frame */}
          <div className="absolute -inset-8 bg-gradient-to-br from-brand-green/5 to-brand-brown/5 rounded-3xl transform rotate-1"></div>
          <div className="absolute -inset-4 bg-gradient-to-br from-brand-green/10 to-brand-brown/10 rounded-3xl transform -rotate-1"></div>
          
          <div className="relative bg-brand-beige/80 backdrop-blur-sm rounded-2xl p-12 border border-brand-green/20 shadow-xl">
            {/* Quote icon with organic styling */}
            <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-green/20">
              <Quote className="h-8 w-8 text-brand-green" />
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-cormorant-regular text-brand-green italic leading-relaxed mb-6">
              "{content.main_quote || 'Breath is the bridge between body and mind.'}"
            </blockquote>
            
            {/* Decorative accent */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
              <div className="w-1 h-1 bg-brand-green rounded-full"></div>
              <div className="w-2 h-2 bg-brand-brown rounded-full"></div>
            </div>
            
            {/* Sparkle accent */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-brand-brown/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-brown" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}