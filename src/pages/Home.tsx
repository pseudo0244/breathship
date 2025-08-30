import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/Home/HeroSection'
import UpcomingSessions from '../components/Home/UpcomingSessions'
import AboutSections from '../components/Home/AboutSections'
import AboutBreathship from '../components/Home/AboutBreathship'
import TestimonialsSection from '../components/Home/TestimonialsSection'
import BlogsPreview from '../components/Home/BlogsPreview'
import WhyChooseUs from '../components/Home/WhyChooseUs'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <UpcomingSessions />
      <WhyChooseUs />
      <AboutSections />
      <AboutBreathship />
      <TestimonialsSection />
      <BlogsPreview />
    </motion.div>
  )
}