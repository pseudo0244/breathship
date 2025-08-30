import { useState, useEffect } from 'react'
import type { Blog } from '../types'

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        
        const response = await fetch('/api/blogs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }

        const data = await response.json()
        setBlogs(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching blogs:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs')
        
        // Fallback to mock data if API fails
        setBlogs([
          {
            id: '1',
            title: 'The Science Behind Breathwork',
            image_link: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
            excerpt: 'Discover the fascinating research that proves how conscious breathing can transform your physical and mental health.',
            content: `
              <h2>The Science Behind Breathwork</h2>
              <p>Breathwork isn't just a spiritual practice—it's backed by solid scientific research. Studies have shown that conscious breathing can:</p>
              <ul>
                <li>Reduce cortisol levels by up to 23%</li>
                <li>Increase oxygen saturation in the blood</li>
                <li>Activate the parasympathetic nervous system</li>
                <li>Improve cognitive function and focus</li>
              </ul>
              <p>When we breathe consciously, we're essentially hacking our nervous system to promote relaxation and healing.</p>
            `,
            created_at: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            title: '5 Simple Breathing Techniques for Daily Stress Relief',
            image_link: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            excerpt: 'Learn five powerful breathing techniques you can use anywhere, anytime to reduce stress and find calm.',
            content: `
              <h2>5 Simple Breathing Techniques for Daily Stress Relief</h2>
              <p>Stress is an inevitable part of modern life, but you don't have to let it control you. Here are five simple breathing techniques you can use throughout your day:</p>
              
              <h3>1. Box Breathing (4-4-4-4)</h3>
              <p>Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 5-10 times.</p>
              
              <h3>2. 4-7-8 Breathing</h3>
              <p>Inhale for 4, hold for 7, exhale for 8. This technique is especially effective for falling asleep.</p>
              
              <h3>3. Belly Breathing</h3>
              <p>Place your hand on your belly and breathe deeply, feeling your belly rise and fall.</p>
              
              <h3>4. Alternate Nostril Breathing</h3>
              <p>Close one nostril, inhale through the other, then switch and exhale. This balances the nervous system.</p>
              
              <h3>5. Sigh Breathing</h3>
              <p>Take a deep breath and let out a long, audible sigh. This releases tension immediately.</p>
            `,
            created_at: '2024-01-10T14:30:00Z'
          },
          {
            id: '3',
            title: 'How Breathwork Changed My Life',
            image_link: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
            excerpt: 'A personal journey from chronic anxiety to inner peace through the power of conscious breathing.',
            content: `
              <h2>How Breathwork Changed My Life</h2>
              <p>Three years ago, I was struggling with chronic anxiety that was affecting every aspect of my life. I couldn't sleep, my relationships were suffering, and I felt like I was constantly on edge.</p>
              
              <p>That's when I discovered breathwork. At first, I was skeptical. How could something as simple as breathing differently make such a profound difference?</p>
              
              <p>But within just a few weeks of daily practice, I began to notice changes:</p>
              <ul>
                <li>My anxiety levels decreased significantly</li>
                <li>I was sleeping better than I had in years</li>
                <li>I felt more present and connected to others</li>
                <li>My overall sense of well-being improved dramatically</li>
              </ul>
              
              <p>Today, breathwork is an essential part of my daily routine. It's not just a practice—it's a way of life that has transformed how I experience the world.</p>
            `,
            created_at: '2024-01-05T09:15:00Z'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return { blogs, loading, error }
}