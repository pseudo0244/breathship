import { useState, useEffect } from 'react'
import { sessionsAPI } from '../api/content'
import type { Session } from '../types'

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSessions = async () => {
    try {
      setLoading(true)
      const data = await sessionsAPI.getAll()
      setSessions(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching sessions:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch sessions')
      
      // Fallback to mock data if API fails
      setSessions([
        {
          id: '1',
          title: 'Introduction to Breathwork',
          date: '2024-02-15',
          time: '10:00 AM',
          tag: 'Group',
          payment_link: 'https://example.com/pay/intro',
          description: 'Perfect for beginners! Learn the fundamentals of conscious breathing and discover how it can transform your life.',
          image_link: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          title: 'Deep Healing Session',
          date: '2024-02-20',
          time: '2:00 PM',
          tag: 'One-on-One',
          payment_link: 'https://example.com/pay/healing',
          description: 'A personalized session focused on deep emotional healing through advanced breathwork techniques.',
          image_link: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
          created_at: '2024-01-16T14:30:00Z'
        },
        {
          id: '3',
          title: 'Corporate Wellness Workshop',
          date: '2024-02-25',
          time: '9:00 AM',
          tag: 'Corporate',
          payment_link: 'https://example.com/pay/corporate',
          description: 'Transform your workplace culture with stress-reducing breathwork techniques designed for busy professionals.',
          image_link: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
          created_at: '2024-01-17T09:15:00Z'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  const addSession = async (sessionData: Omit<Session, 'id' | 'created_at'>) => {
    try {
      const newSession = await sessionsAPI.create({
        ...sessionData,
        is_active: true
      })
      setSessions(prev => [newSession, ...prev])
      return newSession
    } catch (err) {
      console.error('Error adding session:', err)
      throw err
    }
  }

  const updateSession = async (id: string, sessionData: Partial<Session>) => {
    try {
      await sessionsAPI.update(parseInt(id), sessionData)
      setSessions(prev => prev.map(session => 
        session.id === id ? { ...session, ...sessionData } : session
      ))
    } catch (err) {
      console.error('Error updating session:', err)
      throw err
    }
  }

  const deleteSession = async (id: string) => {
    try {
      await sessionsAPI.delete(parseInt(id))
      setSessions(prev => prev.filter(session => session.id !== id))
    } catch (err) {
      console.error('Error deleting session:', err)
      throw err
    }
  }

  return { 
    sessions, 
    loading, 
    error, 
    addSession, 
    updateSession, 
    deleteSession,
    refetch: fetchSessions
  }
}