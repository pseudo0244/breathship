import { useState, useEffect } from 'react'
import { testimonialsAPI } from '../api/content'
import type { Testimonial } from '../types'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const data = await testimonialsAPI.getAll()
      setTestimonials(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching testimonials:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch testimonials')
      
      // Fallback to mock data if API fails
      setTestimonials([
        {
          id: '1',
          name: 'Sarah Johnson',
          text: 'Breathwork has completely transformed my approach to stress management. I feel more centered and peaceful than ever before.',
          image_link: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          name: 'Michael Chen',
          text: 'After just three sessions, I noticed a significant improvement in my sleep quality and overall mood. Highly recommend!',
          image_link: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          created_at: '2024-01-14T14:30:00Z'
        },
        {
          id: '3',
          name: 'Emma Rodriguez',
          text: 'The corporate workshop was exactly what our team needed. We\'re all feeling more focused and less stressed at work.',
          image_link: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          created_at: '2024-01-13T16:45:00Z'
        },
        {
          id: '4',
          name: 'David Thompson',
          text: 'I was skeptical at first, but the results speak for themselves. My anxiety has decreased dramatically since starting breathwork.',
          image_link: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          created_at: '2024-01-12T11:20:00Z'
        },
        {
          id: '5',
          name: 'Lisa Park',
          text: 'The one-on-one sessions helped me work through some deep emotional blocks. I feel lighter and more free than ever.',
          image_link: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          created_at: '2024-01-11T13:15:00Z'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const addTestimonial = async (testimonialData: Omit<Testimonial, 'id' | 'created_at'>) => {
    try {
      const newTestimonial = await testimonialsAPI.create({
        ...testimonialData,
        is_active: true,
        is_featured: false
      })
      setTestimonials(prev => [newTestimonial, ...prev])
      return newTestimonial
    } catch (err) {
      console.error('Error adding testimonial:', err)
      throw err
    }
  }

  const updateTestimonial = async (id: string, testimonialData: Partial<Testimonial>) => {
    try {
      await testimonialsAPI.update(parseInt(id), testimonialData)
      setTestimonials(prev => prev.map(testimonial => 
        testimonial.id === id ? { ...testimonial, ...testimonialData } : testimonial
      ))
    } catch (err) {
      console.error('Error updating testimonial:', err)
      throw err
    }
  }

  const deleteTestimonial = async (id: string) => {
    try {
      await testimonialsAPI.delete(parseInt(id))
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id))
    } catch (err) {
      console.error('Error deleting testimonial:', err)
      throw err
    }
  }

  return { 
    testimonials, 
    loading, 
    error, 
    addTestimonial, 
    updateTestimonial, 
    deleteTestimonial,
    refetch: fetchTestimonials
  }
}