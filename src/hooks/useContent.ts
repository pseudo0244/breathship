import { useState, useEffect } from 'react'

interface ContentItem {
  section: string
  field_name: string
  field_value: string
  field_type: string
  display_order: number
  is_active: boolean
}

interface ContentData {
  [key: string]: string
}

export function useContent() {
  const [content, setContent] = useState<ContentData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = async () => {
    try {
      setLoading(true)
      
      // Replace with your Supabase URL and anon key
      const response = await fetch('/api/content', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch content')
      }

      const data: ContentItem[] = await response.json()
      
      // Transform the data into the expected format
      const transformedContent: ContentData = {}
      data.forEach(item => {
        if (item.is_active) {
          transformedContent[item.field_name] = item.field_value
        }
      })

      setContent(transformedContent)
      setError(null)
    } catch (err) {
      console.error('Error fetching content:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch content')
      
      // Fallback to mock data if API fails
      setContent({
        hero_text: 'Breathe. Heal. Transform.',
        hero_subtitle: 'Discover the transformative power of conscious breathing. Experience deep healing, stress relief, and inner peace through ancient wisdom and modern science.',
        hero_badge_text: 'Transform Your Life Through Conscious Breathing',
        hero_cta_primary: 'Start Your Journey',
        hero_cta_secondary: 'Watch Introduction',
        hero_stats_clients: '500+',
        hero_stats_clients_text: 'Clients Transformed',
        hero_stats_experience: '5+',
        hero_stats_experience_text: 'Years Experience',
        hero_stats_rating: '4.9/5',
        hero_stats_rating_text: 'Rating',
        hero_trust_1: 'Certified Breathwork Facilitator',
        hero_trust_2: 'Evidence-Based Techniques',
        hero_trust_3: 'Safe & Supportive Environment',
        about_me_title: 'About Me',
        about_me_content: 'I am a certified breathwork facilitator with over 5 years of experience helping people find peace and healing through conscious breathing.',
        about_me_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop',
        about_breathship_title: 'About Breathship',
        about_breathship_content: 'Breathship is more than just breathing exercises—it\'s a comprehensive approach to wellness that combines ancient wisdom with modern science.',
        sessions_title: 'Upcoming Sessions',
        sessions_subtitle: 'Transform your life with our carefully crafted breathwork sessions.',
        sessions_badge_text: 'Join Our Next Sessions',
        sessions_cta: 'View All Sessions',
        why_choose_title: 'Your Journey to Transformation',
        why_choose_subtitle: 'We combine ancient wisdom with modern science to create the most effective breathwork experience.',
        why_choose_badge_text: 'Why Choose Breathship',
        why_choose_cta_title: 'Ready to Begin Your Transformation?',
        why_choose_cta_subtitle: 'Join our community of healing and discover the profound benefits of conscious breathing.',
        why_choose_cta_primary: 'Book Your First Session',
        why_choose_cta_secondary: 'Learn More',
        testimonials_title: 'What Our Clients Say',
        testimonials_subtitle: 'Real stories from people who have transformed their lives through breathwork.',
        testimonials_badge_text: 'Client Success Stories',
        testimonials_stats_clients: '500+',
        testimonials_stats_clients_text: 'Clients Served',
        testimonials_stats_rating: '4.9/5',
        testimonials_stats_rating_text: 'Average Rating',
        testimonials_stats_sessions: '1000+',
        testimonials_stats_sessions_text: 'Sessions Completed',
        testimonials_stats_success: '95%',
        testimonials_stats_success_text: 'Success Rate',
        blogs_title: 'Latest Insights',
        blogs_subtitle: 'Explore articles about breathwork, mindfulness, and transformation.',
        contact_title: 'Get in Touch',
        contact_subtitle: 'Ready to begin your breathwork journey? Contact us to schedule your first session.',
        contact_email: 'hello@breathship.com',
        contact_phone: '+1 (555) 123-4567',
        contact_location: 'San Francisco, CA',
        contact_location_details: 'Sessions available in-person and online',
        contact_quote: 'Every breath is a new beginning. Take the first step towards your transformation today.',
        footer_description: 'Transform your life through the power of conscious breathing.',
        footer_copyright: '© 2024 Breathship. All rights reserved.',
        footer_privacy_link: '/privacy',
        footer_terms_link: '/terms',
        header_logo_alt: 'Breathship Logo',
        header_company_name: 'Breathship'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()

    // Listen for content updates from admin panel
    const handleContentUpdate = (event: CustomEvent) => {
      console.log('🔄 Content updated, refreshing...', event.detail)
      fetchContent()
    }

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener)

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener)
    }
  }, [])

  return { content, loading, error, refetch: fetchContent }
}