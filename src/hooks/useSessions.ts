import { useState, useEffect } from 'react'
import { sessionsService } from '../services/googleSheets'

interface Session {
  id: string
  title: string
  description: string
  duration: string
  price: string
  image_link: string
  session_tag: string
  payment_link: string
  date: string
  time: string
  is_active: string
}

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSessions = async () => {
    try {
      setLoading(true)
      
      // Get sessions from Google Sheets
      const data = await sessionsService.getAll()
      console.log('🎯 Sessions hook received data:', data)
      setSessions(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching sessions:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch sessions')
      
      // Fallback to default sessions
      setSessions([
        {
          id: '1',
          title: 'Introduction to Breathwork',
          description: 'Perfect for beginners, this session introduces you to the fundamentals of conscious breathing and its benefits for stress relief and relaxation.',
          duration: '60 minutes',
          price: '$75',
          image_link: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
          session_tag: 'Beginner',
          payment_link: 'https://calendly.com/breathship/intro-session',
          date: '2024-02-15',
          time: '10:00 AM',
          is_active: 'TRUE'
        },
        {
          id: '2',
          title: 'Deep Healing Session',
          description: 'An intensive breathwork session designed to release deep-seated tension, trauma, and emotional blockages for profound healing.',
          duration: '90 minutes',
          price: '$120',
          image_link: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
          session_tag: 'Advanced',
          payment_link: 'https://calendly.com/breathship/deep-healing',
          date: '2024-02-20',
          time: '2:00 PM',
          is_active: 'TRUE'
        },
        {
          id: '3',
          title: 'Corporate Wellness Workshop',
          description: 'A group session designed for workplaces to reduce stress, improve focus, and enhance team collaboration through breathwork techniques.',
          duration: '120 minutes',
          price: '$500',
          image_link: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
          session_tag: 'Corporate',
          payment_link: 'https://calendly.com/breathship/corporate',
          date: '2024-02-25',
          time: '9:00 AM',
          is_active: 'TRUE'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  const getSessionsByTag = async (tag: string) => {
    try {
      const data = await sessionsService.getByTag(tag)
      return data
    } catch (err) {
      console.error('Error fetching sessions by tag:', err)
      return []
    }
  }

  return { 
    sessions, 
    loading, 
    error, 
    getSessionsByTag,
    refetch: fetchSessions
  }
}