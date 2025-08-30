import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle } from 'lucide-react'
import { useContent } from '../hooks/useContent'
import { submitCorporateInquiry } from '../api/forms'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'

interface CorporateForm {
  companyName: string
  contactName: string
  email: string
  phone: string
  preferredDate: string
  message: string
  companySize?: string
  programType?: string
}

export default function Corporate() {
  const { content } = useContent()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CorporateForm>()

  const onSubmit = async (data: CorporateForm) => {
    setSubmitting(true)
    setSubmitError('')
    
    try {
      const result = await submitCorporateInquiry({
        companyName: data.companyName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        companySize: data.companySize || 'Not specified',
        programType: data.programType || 'Not specified',
        message: data.message
      })
      
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
            {content.corporate_title || 'Corporate Wellness Programs'}
          </h1>
          <p className="text-lg text-brand-green/80 max-w-2xl mx-auto font-proxima-nova">
            {content.corporate_subtitle || 'Transform your workplace culture with evidence-based breathwork programs designed to reduce stress, improve focus, and enhance team collaboration.'}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Corporate Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 bg-white">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="text-brand-green w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-cormorant-bold text-brand-green mb-2">Thank You!</h3>
                  <p className="text-brand-green/80 font-proxima-nova">
                    Your corporate inquiry has been sent successfully. We'll get back to you within 24 hours to discuss your wellness program.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Company Name *
                    </label>
                    <input
                      {...register('companyName', { required: 'Company name is required' })}
                      type="text"
                      id="companyName"
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                      placeholder="Your company name"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600 font-proxima-nova">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Contact Name *
                    </label>
                    <input
                      {...register('contactName', { required: 'Contact name is required' })}
                      type="text"
                      id="contactName"
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                      placeholder="Your name"
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-sm text-red-600 font-proxima-nova">{errors.contactName.message}</p>
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
                      placeholder="your.email@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 font-proxima-nova">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Phone Number (Optional)
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Preferred Start Date (Optional)
                    </label>
                    <input
                      {...register('preferredDate')}
                      type="date"
                      id="preferredDate"
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                    />
                  </div>

                  <div>
                    <label htmlFor="companySize" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Company Size (Optional)
                    </label>
                    <select
                      {...register('companySize')}
                      id="companySize"
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="programType" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Program Type (Optional)
                    </label>
                    <select
                      {...register('programType')}
                      id="programType"
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                    >
                      <option value="">Select program type</option>
                      <option value="One-Time Workshop">One-Time Workshop</option>
                      <option value="Weekly Series">Weekly Series</option>
                      <option value="Ongoing Program">Ongoing Program</option>
                      <option value="Custom Program">Custom Program</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-green mb-2 font-proxima-nova">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova resize-none"
                      placeholder="Tell us about your team size, specific needs, or any questions you have..."
                    />
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
                        <span>Request Corporate Program</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}