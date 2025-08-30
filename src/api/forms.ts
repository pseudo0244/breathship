// Forms API for getform.io integration
import { API_CONFIG } from '../config/api'

// Contact form submission
export const submitContactForm = async (formData: {
  name: string
  email: string
  phone?: string
  message: string
  sessionType?: string
  preferredDate?: string
}) => {
  try {
    const response = await fetch(API_CONFIG.GETFORM.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        source: 'Breathship Website',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to submit form')
    }

    return { success: true, message: 'Form submitted successfully!' }
  } catch (error) {
    console.error('Error submitting form:', error)
    return { success: false, message: 'Failed to submit form. Please try again.' }
  }
}

// Newsletter subscription
export const subscribeNewsletter = async (email: string) => {
  try {
    const response = await fetch(API_CONFIG.GETFORM.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        type: 'newsletter_subscription',
        source: 'Breathship Website',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to subscribe')
    }

    return { success: true, message: 'Successfully subscribed to newsletter!' }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return { success: false, message: 'Failed to subscribe. Please try again.' }
  }
}

// Session booking form
export const bookSession = async (formData: {
  name: string
  email: string
  phone: string
  sessionType: string
  preferredDate: string
  preferredTime: string
  message?: string
}) => {
  try {
    const response = await fetch(API_CONFIG.GETFORM.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        type: 'session_booking',
        source: 'Breathship Website',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to book session')
    }

    return { success: true, message: 'Session booking request submitted successfully!' }
  } catch (error) {
    console.error('Error booking session:', error)
    return { success: false, message: 'Failed to book session. Please try again.' }
  }
}

// Corporate inquiry form
export const submitCorporateInquiry = async (formData: {
  companyName: string
  contactName: string
  email: string
  phone: string
  companySize: string
  programType: string
  message: string
}) => {
  try {
    const response = await fetch(API_CONFIG.GETFORM.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        type: 'corporate_inquiry',
        source: 'Breathship Website',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to submit corporate inquiry')
    }

    return { success: true, message: 'Corporate inquiry submitted successfully!' }
  } catch (error) {
    console.error('Error submitting corporate inquiry:', error)
    return { success: false, message: 'Failed to submit inquiry. Please try again.' }
  }
}
