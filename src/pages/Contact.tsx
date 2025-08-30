import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { useContentProduction } from '../hooks/useContentProduction'
import { submitContactForm } from '../api/forms'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'

interface ContactForm {
  name: string
  email: string
  phone?: string
  message: string
  sessionType?: string
}

export default function Contact() {
  const { content } = useContentProduction()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true)
    setSubmitError('')
    
    try {
      const result = await submitContactForm(data)
      
      if (result.success) {
        setSubmitted(true)
        reset()
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setSubmitError(result.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-beige pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-cormorant-bold text-brand-green mb-4">
            {content.contact_title || 'Get In Touch'}
          </h1>
          <p className="text-lg text-brand-green/80 max-w-2xl mx-auto font-proxima-nova">
            {content.contact_subtitle || 'Ready to begin your breathwork journey? Have questions? We\'d love to hear from you.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 bg-white">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="text-brand-green w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-cormorant-bold text-brand-green mb-2">Thank You!</h3>
                  <p className="text-brand-green/80 font-proxima-nova">
                    Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 font-proxima-nova">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
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
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 font-proxima-nova">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Phone (Optional)
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="sessionType" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Interested In (Optional)
                    </label>
                    <select
                      {...register('sessionType')}
                      id="sessionType"
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                    >
                      <option value="">Select an option</option>
                      <option value="one-on-one">One-on-One Session</option>
                      <option value="group">Group Session</option>
                      <option value="corporate">Corporate Program</option>
                      <option value="workshop">Workshop</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Message *
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova resize-none"
                      placeholder="Tell us about your breathwork journey or ask any questions..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 font-proxima-nova">{errors.message.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm font-proxima-nova">{submitError}</p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    variant="brand-green"
                    className="w-full flex items-center justify-center space-x-2"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-beige"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-cormorant-bold text-brand-green mb-6">
                Let's Connect
              </h2>
              <p className="text-lg text-brand-green/80 mb-8 font-proxima-nova leading-relaxed">
                {content.contact_quote || "Every breath is a new beginning. Take the first step towards your transformation today."}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand-brown" />
                </div>
                <div>
                  <h3 className="text-lg font-cormorant-regular text-brand-green">Email</h3>
                  <a 
                    href={`mailto:${content.contact_email || 'hello@breathship.com'}`}
                    className="text-brand-green/80 hover:text-brand-brown transition-colors font-proxima-nova"
                  >
                    {content.contact_email || 'hello@breathship.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-brand-brown" />
                </div>
                <div>
                  <h3 className="text-lg font-cormorant-regular text-brand-green">Phone</h3>
                  <a 
                    href={`tel:${content.contact_phone || '+1 (555) 123-4567'}`}
                    className="text-brand-green/80 hover:text-brand-brown transition-colors font-proxima-nova"
                  >
                    {content.contact_phone || '+1 (555) 123-4567'}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-brown" />
                </div>
                <div>
                  <h3 className="text-lg font-cormorant-regular text-brand-green">Location</h3>
                  <p className="text-brand-green/80 font-proxima-nova">{content.contact_location || 'San Francisco, CA'}</p>
                  <p className="text-brand-green/80 font-proxima-nova">{content.contact_location_details || 'Sessions available in-person and online'}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-brand-green/5 p-6 rounded-lg border border-brand-green/10">
              <h3 className="text-lg font-cormorant-regular text-brand-green mb-3">What to Expect</h3>
              <ul className="space-y-2 text-brand-green/80 font-proxima-nova">
                <li>• Response within 24 hours</li>
                <li>• Free consultation call</li>
                <li>• Personalized session recommendations</li>
                <li>• Flexible scheduling options</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}