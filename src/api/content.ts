// API functions for content management
import { API_CONFIG } from '../config/api'

// Helper function to make API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_CONFIG.SUPABASE.URL}/rest/v1/${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'apikey': API_CONFIG.SUPABASE.ANON_KEY,
      'Authorization': `Bearer ${API_CONFIG.SUPABASE.ANON_KEY}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('API Error Details:', {
      status: response.status,
      statusText: response.statusText,
      url: url,
      responseText: errorText
    })
    throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`)
  }

  const responseText = await response.text()
  if (!responseText) {
    throw new Error('Empty response from API')
  }

  try {
    return JSON.parse(responseText)
  } catch (error) {
    console.error('JSON Parse Error:', {
      responseText,
      error
    })
    throw new Error(`Failed to parse JSON response: ${error}`)
  }
}

// Content API functions
export const contentAPI = {
  // Get all content
  getAll: async () => {
    return apiCall('content?select=*&order=section,display_order')
  },

  // Get content by section
  getBySection: async (section: string) => {
    return apiCall(`content?section=eq.${section}&select=*&order=display_order`)
  },

  // Update content item
  update: async (id: number, updates: any) => {
    return apiCall(`content?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    })
  },

  // Create new content item
  create: async (content: any) => {
    return apiCall('content', {
      method: 'POST',
      body: JSON.stringify(content)
    })
  },

  // Delete content item
  delete: async (id: number) => {
    return apiCall(`content?id=eq.${id}`, {
      method: 'DELETE'
    })
  }
}

// Sessions API functions
export const sessionsAPI = {
  // Get all sessions
  getAll: async () => {
    return apiCall('sessions?select=*&order=date,time')
  },

  // Get active sessions
  getActive: async () => {
    return apiCall('sessions?is_active=eq.true&select=*&order=date,time')
  },

  // Get session by ID
  getById: async (id: number) => {
    return apiCall(`sessions?id=eq.${id}&select=*`)
  },

  // Create new session
  create: async (session: any) => {
    return apiCall('sessions', {
      method: 'POST',
      body: JSON.stringify(session)
    })
  },

  // Update session
  update: async (id: number, updates: any) => {
    return apiCall(`sessions?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    })
  },

  // Delete session
  delete: async (id: number) => {
    return apiCall(`sessions?id=eq.${id}`, {
      method: 'DELETE'
    })
  }
}

// Blogs API functions
export const blogsAPI = {
  // Get all blogs
  getAll: async () => {
    return apiCall('blogs?select=*&order=created_at.desc')
  },

  // Get published blogs
  getPublished: async () => {
    return apiCall('blogs?is_published=eq.true&select=*&order=published_at.desc')
  },

  // Get blog by ID
  getById: async (id: number) => {
    return apiCall(`blogs?id=eq.${id}&select=*`)
  },

  // Create new blog
  create: async (blog: any) => {
    return apiCall('blogs', {
      method: 'POST',
      body: JSON.stringify(blog)
    })
  },

  // Update blog
  update: async (id: number, updates: any) => {
    return apiCall(`blogs?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    })
  },

  // Delete blog
  delete: async (id: number) => {
    return apiCall(`blogs?id=eq.${id}`, {
      method: 'DELETE'
    })
  }
}

// Testimonials API functions
export const testimonialsAPI = {
  // Get all testimonials
  getAll: async () => {
    return apiCall('testimonials?select=*&order=created_at.desc')
  },

  // Get active testimonials
  getActive: async () => {
    return apiCall('testimonials?is_active=eq.true&select=*&order=created_at.desc')
  },

  // Get featured testimonials
  getFeatured: async () => {
    return apiCall('testimonials?is_featured=eq.true&is_active=eq.true&select=*&order=created_at.desc')
  },

  // Get testimonial by ID
  getById: async (id: number) => {
    return apiCall(`testimonials?id=eq.${id}&select=*`)
  },

  // Create new testimonial
  create: async (testimonial: any) => {
    return apiCall('testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonial)
    })
  },

  // Update testimonial
  update: async (id: number, updates: any) => {
    return apiCall(`testimonials?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    })
  },

  // Delete testimonial
  delete: async (id: number) => {
    return apiCall(`testimonials?id=eq.${id}`, {
      method: 'DELETE'
    })
  }
}
