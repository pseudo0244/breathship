import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Heart, Users, TrendingUp, Building2, Calendar, Mail, Phone } from 'lucide-react'
import { useContentProduction } from '../hooks/useContentProduction'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'

interface CorporateForm {
  companyName: string
  contactName: string
  email: string
  phone: string
  preferredDate: string
  message: string
}

const benefits = [
  {
    icon: Heart,
    title: 'Reduced Stress',
    description: 'Help your team manage stress and prevent burnout through powerful breathing techniques.'
  },
  {
    icon: Users,
    title: 'Team Building',
    description: 'Create deeper connections and improve collaboration through shared breathwork experiences.'
  },
  {
    icon: TrendingUp,
    title: 'Increased Productivity',
    description: 'Enhance focus, creativity, and overall performance with regular breathwork practice.'
  },
  {
    icon: Building2,
    title: 'Better Workplace Culture',
    description: 'Foster a culture of wellness and mindfulness that attracts and retains top talent.'
  }
]

export default function Corporate() {
  const { content } = useContentProduction()
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CorporateForm>()

  const onSubmit = async (data: CorporateForm) => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Corporate form submitted:', data)
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-cormorant-bold text-brand-green mb-6">
            {content.corporate_title || 'Corporate Wellness Programs'}
          </h1>
          <p className="text-xl text-brand-green/80 max-w-3xl mx-auto font-proxima-nova">
            {content.corporate_subtitle || 'Transform your workplace culture with evidence-based breathwork programs designed to reduce stress, improve focus, and enhance team collaboration.'}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="w-12 h-12 bg-[#3D2B2A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-[#3D2B2A]" />
              </div>
              <h3 className="text-lg font-semibold text-[#3D2B2A] mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {benefit.description}
              </p>
            </Card>
          ))}
        </motion.div>

        {/* Program Details */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-[#3D2B2A] mb-6">
              What We Offer
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#3D2B2A] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3D2B2A] mb-2">
                    Customized Programs
                  </h3>
                  <p className="text-gray-600">
                    Tailored breathwork sessions designed specifically for your team's needs and schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#3D2B2A] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3D2B2A] mb-2">
                    Flexible Scheduling
                  </h3>
                  <p className="text-gray-600">
                    Sessions available during lunch breaks, team meetings, or dedicated wellness time.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#3D2B2A] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3D2B2A] mb-2">
                    Ongoing Support
                  </h3>
                  <p className="text-gray-600">
                    Follow-up sessions and resources to help your team maintain their breathwork practice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#3D2B2A] mb-6">
              Program Formats
            </h2>
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#3D2B2A] mb-2">
                  One-Time Workshop
                </h3>
                <p className="text-gray-600 mb-3">
                  Perfect for introducing breathwork to your team or as part of a wellness day.
                </p>
                <p className="text-sm text-[#3D2B2A] font-medium">Duration: 60-90 minutes</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#3D2B2A] mb-2">
                  Weekly Series
                </h3>
                <p className="text-gray-600 mb-3">
                  Build lasting habits with regular sessions over 4-8 weeks.
                </p>
                <p className="text-sm text-[#3D2B2A] font-medium">Duration: 45-60 minutes per session</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#3D2B2A] mb-2">
                  Ongoing Program
                </h3>
                <p className="text-gray-600 mb-3">
                  Monthly or quarterly sessions to maintain wellness culture.
                </p>
                <p className="text-sm text-[#3D2B2A] font-medium">Duration: Flexible scheduling</p>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#3D2B2A] mb-4">
                Get Started Today
              </h2>
              <p className="text-lg text-gray-600">
                Ready to transform your workplace? Let's discuss how breathwork can benefit your team.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your inquiry has been sent successfully. We'll get back to you within 24 hours to discuss your corporate wellness program.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    {...register('companyName', { required: 'Company name is required' })}
                    type="text"
                    id="companyName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                    placeholder="Your company name"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    {...register('contactName', { required: 'Contact name is required' })}
                    type="text"
                    id="contactName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                    placeholder="Your name"
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Start Date
                  </label>
                  <input
                    {...register('preferredDate')}
                    type="date"
                    id="preferredDate"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                    placeholder="Tell us about your team size, specific needs, or any questions you have..."
                  />
                </div>

                <div className="md:col-span-2">
                  <Button type="submit" className="w-full">
                    Request Corporate Program
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}