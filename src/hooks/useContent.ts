import { useState, useEffect } from 'react'
import { contentService } from '../services/googleSheets'

interface ContentItem {
  field_name: string
  section: string
  value: string
  type: string
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
      
      // Get content from Google Sheets
      const contentItems: ContentItem[] = await contentService.getAll()
      
      // Transform to key-value pairs
      const transformedContent: ContentData = {}
      contentItems.forEach(item => {
        transformedContent[item.field_name] = item.value
      })

      setContent(transformedContent)
      setError(null)
    } catch (err) {
      console.error('Error loading content:', err)
      setError(err instanceof Error ? err.message : 'Failed to load content')
      
      // Fallback to default content
      const defaultContent: ContentData = {
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
        about_me_subtitle: 'Your Journey to Inner Peace Starts Here',
        about_me_description: 'I am a certified breathwork facilitator with over 5 years of experience helping people transform their lives through conscious breathing. My approach combines ancient wisdom with modern science to create powerful healing experiences.',
        about_me_image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
        about_breathship_title: 'What is Breathship?',
        about_breathship_subtitle: 'The Science of Conscious Breathing',
        about_breathship_description: 'Breathship is a comprehensive approach to breathwork that combines traditional techniques with modern understanding of the nervous system. Our sessions help you release stress, heal trauma, and access deeper states of consciousness.',
        why_choose_us_title: 'Why Choose Breathship?',
        why_choose_us_subtitle: 'Experience the Difference',
        why_choose_us_feature_1_title: 'Certified Expertise',
        why_choose_us_feature_1_description: 'Learn from certified breathwork facilitators with extensive training and experience.',
        why_choose_us_feature_2_title: 'Evidence-Based',
        why_choose_us_feature_2_description: 'Our techniques are backed by scientific research and proven to be effective.',
        why_choose_us_feature_3_title: 'Safe Environment',
        why_choose_us_feature_3_description: 'Create a safe, supportive space for your healing journey.',
        header_company_name: 'Breathship',
        header_logo_alt: 'Breathship Logo',
        footer_description: 'Transform your life through the power of conscious breathing. Experience deep healing, stress relief, and inner peace with our evidence-based breathwork programs.',
        footer_copyright: '© 2024 Breathship. All rights reserved.',
        footer_privacy_link: '/privacy',
        footer_terms_link: '/terms',
        contact_email: 'hello@breathship.com',
        contact_phone: '+1 (555) 123-4567',
        contact_title: 'Get in Touch',
        contact_subtitle: 'Ready to Start Your Journey?',
        contact_description: 'Book a session or ask us any questions. We are here to support your breathwork journey.',
        contact_address: '123 Breathing Street, Peace City, PC 12345',
        corporate_title: 'Corporate Wellness Programs',
        corporate_subtitle: 'Transform your workplace culture with evidence-based breathwork programs designed to reduce stress, improve focus, and enhance team collaboration.',
        corporate_description: 'Our corporate wellness programs are designed to help your team manage stress, improve focus, and create a healthier workplace culture through the power of conscious breathing.'
      }
      setContent(defaultContent)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return { 
    content, 
    loading, 
    error, 
    refetch: fetchContent
  }
}