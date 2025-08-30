import React from 'react'
import { motion } from 'framer-motion'
import { useContent } from '../../hooks/useContent'
import { Leaf } from 'lucide-react'

export default function AboutBreathship() {
  const { content } = useContent()

  return (
    <section className="py-24 bg-brand-beige relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
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
