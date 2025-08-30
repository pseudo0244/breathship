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

// Default content that will be used if no localStorage data exists
const defaultContent: ContentItem[] = [
  // Hero Section
  { section: 'hero', field_name: 'hero_text', field_value: 'Breathe. Heal. Transform.', field_type: 'text', display_order: 1, is_active: true },
  { section: 'hero', field_name: 'hero_subtitle', field_value: 'Discover the transformative power of conscious breathing. Experience deep healing, stress relief, and inner peace through ancient wisdom and modern science.', field_type: 'textarea', display_order: 2, is_active: true },
  { section: 'hero', field_name: 'hero_badge_text', field_value: 'Transform Your Life Through Conscious Breathing', field_type: 'text', display_order: 3, is_active: true },
  { section: 'hero', field_name: 'hero_cta_primary', field_value: 'Start Your Journey', field_type: 'text', display_order: 4, is_active: true },
  { section: 'hero', field_name: 'hero_cta_secondary', field_value: 'Watch Introduction', field_type: 'text', display_order: 5, is_active: true },
  { section: 'hero', field_name: 'hero_stats_clients', field_value: '500+', field_type: 'text', display_order: 6, is_active: true },
  { section: 'hero', field_name: 'hero_stats_clients_text', field_value: 'Clients Transformed', field_type: 'text', display_order: 7, is_active: true },
  { section: 'hero', field_name: 'hero_stats_experience', field_value: '5+', field_type: 'text', display_order: 8, is_active: true },
  { section: 'hero', field_name: 'hero_stats_experience_text', field_value: 'Years Experience', field_type: 'text', display_order: 9, is_active: true },
  { section: 'hero', field_name: 'hero_stats_rating', field_value: '4.9/5', field_type: 'text', display_order: 10, is_active: true },
  { section: 'hero', field_name: 'hero_stats_rating_text', field_value: 'Rating', field_type: 'text', display_order: 11, is_active: true },
  { section: 'hero', field_name: 'hero_trust_1', field_value: 'Certified Breathwork Facilitator', field_type: 'text', display_order: 12, is_active: true },
  { section: 'hero', field_name: 'hero_trust_2', field_value: 'Evidence-Based Techniques', field_type: 'text', display_order: 13, is_active: true },
  { section: 'hero', field_name: 'hero_trust_3', field_value: 'Safe & Supportive Environment', field_type: 'text', display_order: 14, is_active: true },

  // About Me Section
  { section: 'about_me', field_name: 'about_me_title', field_value: 'About Me', field_type: 'text', display_order: 1, is_active: true },
  { section: 'about_me', field_name: 'about_me_subtitle', field_value: 'Your Journey to Inner Peace Starts Here', field_type: 'text', display_order: 2, is_active: true },
  { section: 'about_me', field_name: 'about_me_description', field_value: 'I am a certified breathwork facilitator with over 5 years of experience helping people transform their lives through conscious breathing. My approach combines ancient wisdom with modern science to create powerful healing experiences.', field_type: 'textarea', display_order: 3, is_active: true },
  { section: 'about_me', field_name: 'about_me_image', field_value: 'src/public/pattern.jpg', field_type: 'image', display_order: 4, is_active: true },

  // About Breathship Section
  { section: 'about_breathship', field_name: 'about_breathship_title', field_value: 'What is Breathship?', field_type: 'text', display_order: 1, is_active: true },
  { section: 'about_breathship', field_name: 'about_breathship_subtitle', field_value: 'The Science of Conscious Breathing', field_type: 'text', display_order: 2, is_active: true },
  { section: 'about_breathship', field_name: 'about_breathship_description', field_value: 'Breathship is a comprehensive approach to breathwork that combines traditional techniques with modern understanding of the nervous system. Our sessions help you release stress, heal trauma, and access deeper states of consciousness.', field_type: 'textarea', display_order: 3, is_active: true },

  // Why Choose Us Section
  { section: 'why_choose_us', field_name: 'why_choose_us_title', field_value: 'Why Choose Breathship?', field_type: 'text', display_order: 1, is_active: true },
  { section: 'why_choose_us', field_name: 'why_choose_us_subtitle', field_value: 'Experience the Difference', field_type: 'text', display_order: 2, is_active: true },
  { section: 'why_choose_us', field_name: 'why_choose_us_feature_1_title', field_value: 'Certified Expertise', field_type: 'text', display_order: 3, is_active: true },
  { section: 'why_choose_us', field_name: 'why_choose_us_feature_1_description', field_value: 'Learn from certified breathwork facilitators with extensive training and experience.', field_type: 'textarea', display_order: 4, is_active: true },
  { section: 'why_choose_us', field_name: 'why_choose_us_feature_2_title', field_value: 'Evidence-Based', field_type: 'text', display_order: 5, is_active: true },
  { section: 'why_choose_us', field_name: 'why_choose_us_feature_2_description', field_value: 'Our techniques are backed by scientific research and proven to be effective.', field_type: 'textarea', display_order: 6, is_active: true },
  { section: 'why_choose_us', field_name: 'why_choose_us_feature_3_title', field_value: 'Safe Environment', field_type: 'text', display_order: 7, is_active: true },
  { section: 'why_choose_us', field_name: 'why_choose_us_feature_3_description', field_value: 'Create a safe, supportive space for your healing journey.', field_type: 'textarea', display_order: 8, is_active: true },

  // Header Section
  { section: 'header', field_name: 'header_company_name', field_value: 'Breathship', field_type: 'text', display_order: 1, is_active: true },
  { section: 'header', field_name: 'header_logo_alt', field_value: 'Breathship Logo', field_type: 'text', display_order: 2, is_active: true },

  // Footer Section
  { section: 'footer', field_name: 'footer_description', field_value: 'Transform your life through the power of conscious breathing. Experience deep healing, stress relief, and inner peace with our evidence-based breathwork programs.', field_type: 'textarea', display_order: 1, is_active: true },
  { section: 'footer', field_name: 'footer_copyright', field_value: '© 2024 Breathship. All rights reserved.', field_type: 'text', display_order: 2, is_active: true },
  { section: 'footer', field_name: 'footer_privacy_link', field_value: '/privacy', field_type: 'text', display_order: 3, is_active: true },
  { section: 'footer', field_name: 'footer_terms_link', field_value: '/terms', field_type: 'text', display_order: 4, is_active: true },
  { section: 'footer', field_name: 'contact_email', field_value: 'hello@breathship.com', field_type: 'text', display_order: 5, is_active: true },
  { section: 'footer', field_name: 'contact_phone', field_value: '+1 (555) 123-4567', field_type: 'text', display_order: 6, is_active: true },

  // Contact Section
  { section: 'contact', field_name: 'contact_title', field_value: 'Get in Touch', field_type: 'text', display_order: 1, is_active: true },
  { section: 'contact', field_name: 'contact_subtitle', field_value: 'Ready to Start Your Journey?', field_type: 'text', display_order: 2, is_active: true },
  { section: 'contact', field_name: 'contact_description', field_value: 'Book a session or ask us any questions. We are here to support your breathwork journey.', field_type: 'textarea', display_order: 3, is_active: true },
  { section: 'contact', field_name: 'contact_address', field_value: '123 Breathing Street, Peace City, PC 12345', field_type: 'text', display_order: 4, is_active: true },
  { section: 'contact', field_name: 'contact_email', field_value: 'hello@breathship.com', field_type: 'text', display_order: 5, is_active: true },
  { section: 'contact', field_name: 'contact_phone', field_value: '+1 (555) 123-4567', field_type: 'text', display_order: 6, is_active: true },

  // Corporate Section
  { section: 'corporate', field_name: 'corporate_title', field_value: 'Corporate Wellness Programs', field_type: 'text', display_order: 1, is_active: true },
  { section: 'corporate', field_name: 'corporate_subtitle', field_value: 'Transform your workplace culture with evidence-based breathwork programs designed to reduce stress, improve focus, and enhance team collaboration.', field_type: 'textarea', display_order: 2, is_active: true },
  { section: 'corporate', field_name: 'corporate_description', field_value: 'Our corporate wellness programs are designed to help your team manage stress, improve focus, and create a healthier workplace culture through the power of conscious breathing.', field_type: 'textarea', display_order: 3, is_active: true }
]

export function useContentLocal() {
  const [content, setContent] = useState<ContentData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = async () => {
    try {
      setLoading(true)
      
      // Get content from localStorage or use default
      const storedContent = localStorage.getItem('breathship_content')
      let contentItems: ContentItem[]
      
      if (storedContent) {
        contentItems = JSON.parse(storedContent)
      } else {
        // Initialize with default content
        contentItems = defaultContent
        localStorage.setItem('breathship_content', JSON.stringify(contentItems))
      }

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
      const transformedContent: ContentData = {}
      defaultContent.forEach(item => {
        if (item.is_active) {
          transformedContent[item.field_name] = item.field_value
        }
      })
      setContent(transformedContent)
    } finally {
      setLoading(false)
    }
  }

  const updateContent = async (fieldName: string, newValue: string) => {
    try {
      // Get current content from localStorage
      const storedContent = localStorage.getItem('breathship_content')
      let contentItems: ContentItem[] = storedContent ? JSON.parse(storedContent) : defaultContent

      // Update the specific field
      const updatedItems = contentItems.map(item => 
        item.field_name === fieldName 
          ? { ...item, field_value: newValue }
          : item
      )

      // Save back to localStorage
      localStorage.setItem('breathship_content', JSON.stringify(updatedItems))

      // Update local state
      setContent(prev => ({
        ...prev,
        [fieldName]: newValue
      }))

      // Dispatch event for real-time updates
      window.dispatchEvent(new CustomEvent('contentUpdated', {
        detail: { field: fieldName, value: newValue }
      }))

      return { success: true }
    } catch (err) {
      console.error('Error updating content:', err)
      return { success: false, message: 'Failed to update content' }
    }
  }

  const getAllContent = async () => {
    try {
      const storedContent = localStorage.getItem('breathship_content')
      return storedContent ? JSON.parse(storedContent) : defaultContent
    } catch (err) {
      console.error('Error getting all content:', err)
      return defaultContent
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

  return { 
    content, 
    loading, 
    error, 
    refetch: fetchContent,
    updateContent,
    getAllContent
  }
}
