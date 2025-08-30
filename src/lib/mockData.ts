import type { Session, Blog, Testimonial, ContentItem } from '../types'

// Mock sessions data
export const mockSessions: Session[] = [
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
  },
  {
    id: '4',
    title: 'Advanced Pranayama',
    date: '2024-03-01',
    time: '6:00 PM',
    tag: 'Workshop',
    payment_link: 'https://example.com/pay/pranayama',
    description: 'Master advanced breathing techniques for enhanced energy, focus, and spiritual growth.',
    image_link: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    created_at: '2024-01-18T16:45:00Z'
  }
]

// Mock blogs data
export const mockBlogs: Blog[] = [
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
]

// Mock testimonials data
export const mockTestimonials: Testimonial[] = [
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
]

// Mock content data - Expanded with all editable fields
export const mockContent: Record<string, string> = {
  // Hero Section
  hero_text: 'Breathe. Heal. Transform.',
  hero_subtitle: 'Discover the transformative power of conscious breathing. Experience deep healing, stress relief, and inner peace through ancient wisdom and modern science.',
  hero_background_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
  hero_badge_text: 'Transform Your Life Through Conscious Breathing',
  
  // Hero Stats
  hero_stats_clients: '500+',
  hero_stats_clients_text: 'Clients Transformed',
  hero_stats_experience: '5+',
  hero_stats_experience_text: 'Years Experience',
  hero_stats_rating: '4.9/5',
  hero_stats_rating_text: 'Rating',
  
  // Hero Buttons
  hero_cta_primary: 'Start Your Journey',
  hero_cta_secondary: 'Watch Introduction',
  
  // Hero Trust Indicators
  hero_trust_1: 'Certified Breathwork Facilitator',
  hero_trust_2: 'Evidence-Based Techniques',
  hero_trust_3: 'Safe & Supportive Environment',
  
  // Main Quote
  main_quote: 'Breath is the bridge between body and mind.',
  
  // About Sections
  about_me: 'I am a certified breathwork facilitator with over 5 years of experience helping people find peace and healing through conscious breathing. My journey began when I discovered the transformative power of breathwork during a difficult period in my own life. Since then, I\'ve dedicated myself to sharing this ancient wisdom with others, helping them overcome stress, anxiety, and emotional blocks.',
  about_me_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop',
  about_breathship: 'Breathship is more than just breathing exercises—it\'s a comprehensive approach to wellness that combines ancient wisdom with modern science. Our sessions are designed to help you release tension, process emotions, and connect with your authentic self. Whether you\'re dealing with stress, seeking spiritual growth, or simply want to feel more alive, breathwork can be your gateway to transformation.',
  
  // Upcoming Sessions Section
  sessions_title: 'Upcoming Sessions',
  sessions_subtitle: 'Transform your life with our carefully crafted breathwork sessions. Each session is designed to help you release tension, process emotions, and connect with your authentic self.',
  sessions_badge_text: 'Join Our Next Sessions',
  sessions_cta: 'View All Sessions',
  
  // Why Choose Us Section
  why_choose_title: 'Your Journey to Transformation',
  why_choose_subtitle: 'We combine ancient wisdom with modern science to create the most effective breathwork experience for your healing and growth.',
  why_choose_badge_text: 'Why Choose Breathship',
  why_choose_cta_title: 'Ready to Begin Your Transformation?',
  why_choose_cta_subtitle: 'Join our community of healing and discover the profound benefits of conscious breathing. Your journey to inner peace starts with a single breath.',
  why_choose_cta_primary: 'Book Your First Session',
  why_choose_cta_secondary: 'Learn More',
  
  // Testimonials Section
  testimonials_title: 'What Our Clients Say',
  testimonials_subtitle: 'Real stories from people who have transformed their lives through breathwork. Join our community of healing and growth.',
  testimonials_badge_text: 'Client Success Stories',
  testimonials_stats_clients: '500+',
  testimonials_stats_clients_text: 'Clients Served',
  testimonials_stats_rating: '4.9/5',
  testimonials_stats_rating_text: 'Average Rating',
  testimonials_stats_sessions: '1000+',
  testimonials_stats_sessions_text: 'Sessions Completed',
  testimonials_stats_success: '95%',
  testimonials_stats_success_text: 'Success Rate',
  
  // Contact Section
  contact_image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  contact_quote: 'Every breath is a new beginning. Take the first step towards your transformation today.',
  contact_email: 'hello@breathship.com',
  contact_phone: '+1 (555) 123-4567',
  contact_location: 'San Francisco, CA',
  contact_location_details: 'Sessions available in-person and online',
  
  // Footer
  footer_description: 'Transform your life through the power of conscious breathing. Experience deep healing, stress relief, and inner peace with our evidence-based breathwork programs.',
  
  // Company Info
  company_name: 'Breathship',
  company_tagline: 'Breathe. Heal. Transform.',
  company_description: 'Professional breathwork services for healing and transformation.'
}
