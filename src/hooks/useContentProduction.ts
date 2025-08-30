import { useState, useEffect } from 'react'
import { contentAPI } from '../api/content'

interface ContentItem {
  id: number
  section: string
  field_name: string
  field_value: string
  field_type: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ContentData {
  [key: string]: string
}

export function useContentProduction() {
  const [content, setContent] = useState<ContentData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = async () => {
    try {
      setLoading(true)
      
      // Get content from database
      const contentItems: ContentItem[] = await contentAPI.getAll()
      
      // Transform to key-value pairs
      const transformedContent: ContentData = {}
      contentItems.forEach(item => {
        if (item.is_active) {
          transformedContent[item.field_name] = item.field_value
        }
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
        hero_background_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
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

  const updateContent = async (fieldName: string, newValue: string) => {
    try {
      console.log(`🔄 Updating content: ${fieldName} = ${newValue}`)
      
      // Find the content item by field_name
      const contentItems: ContentItem[] = await contentAPI.getAll()
      const contentItem = contentItems.find(item => item.field_name === fieldName)
      
      if (!contentItem) {
        console.error(`❌ Content field '${fieldName}' not found`)
        return { success: false, message: `Content field '${fieldName}' not found` }
      }

      console.log(`📝 Found content item:`, contentItem)

      // Update the content in database
      const updateResult = await contentAPI.update(contentItem.id, { field_value: newValue })
      console.log(`✅ Database update result:`, updateResult)

      // Update local state
      setContent(prev => ({
        ...prev,
        [fieldName]: newValue
      }))

      console.log(`✅ Content updated successfully`)
      return { success: true }
    } catch (err) {
      console.error('❌ Error updating content:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      return { success: false, message: `Failed to update content: ${errorMessage}` }
    }
  }

  const getAllContent = async () => {
    try {
      return await contentAPI.getAll()
    } catch (err) {
      console.error('Error getting all content:', err)
      return []
    }
  }

  const exportContent = async () => {
    try {
      const contentItems = await getAllContent()
      const dataStr = JSON.stringify(contentItems, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const link = document.createElement('a')
      link.href = URL.createObjectURL(dataBlob)
      link.download = 'breathship-content.json'
      link.click()
      
      return { success: true }
    } catch (err) {
      console.error('Error exporting content:', err)
      return { success: false, message: 'Failed to export content' }
    }
  }

  const importContent = async (file: File) => {
    try {
      const text = await file.text()
      const contentItems = JSON.parse(text)
      
      // Validate the imported content
      if (!Array.isArray(contentItems)) {
        throw new Error('Invalid content format')
      }
      
      // Update each content item in the database
      for (const item of contentItems) {
        if (item.id && item.field_value !== undefined) {
          await contentAPI.update(item.id, { field_value: item.field_value })
        }
      }
      
      // Refresh content
      await fetchContent()
      
      return { success: true }
    } catch (err) {
      console.error('Error importing content:', err)
      return { success: false, message: 'Failed to import content' }
    }
  }

  const resetToDefault = async () => {
    try {
      // This would require implementing a reset function in the API
      // For now, we'll just refresh the content
      await fetchContent()
      return { success: true }
    } catch (err) {
      console.error('Error resetting content:', err)
      return { success: false, message: 'Failed to reset content' }
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return { 
    content, 
    loading, 
    error, 
    refetch: fetchContent,
    updateContent,
    getAllContent,
    exportContent,
    importContent,
    resetToDefault
  }
}
