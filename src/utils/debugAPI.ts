// Debug utility to test API connections
import { API_CONFIG } from '../config/api'

export const debugAPIConnection = async () => {
  console.log('🔍 Debugging API Connection...')
  console.log('Supabase URL:', API_CONFIG.SUPABASE.URL)
  console.log('Anon Key:', API_CONFIG.SUPABASE.ANON_KEY.substring(0, 20) + '...')

  // Test basic connection
  try {
    const response = await fetch(`${API_CONFIG.SUPABASE.URL}/rest/v1/`, {
      headers: {
        'apikey': API_CONFIG.SUPABASE.ANON_KEY,
        'Authorization': `Bearer ${API_CONFIG.SUPABASE.ANON_KEY}`,
      },
    })
    
    console.log('✅ Basic connection successful:', response.status)
    
    if (response.ok) {
      const data = await response.text()
      console.log('Response:', data.substring(0, 200) + '...')
    }
  } catch (error) {
    console.log('❌ Basic connection failed:', error)
  }

  // Test content table specifically
  try {
    const response = await fetch(`${API_CONFIG.SUPABASE.URL}/rest/v1/content?select=count`, {
      headers: {
        'apikey': API_CONFIG.SUPABASE.ANON_KEY,
        'Authorization': `Bearer ${API_CONFIG.SUPABASE.ANON_KEY}`,
      },
    })
    
    console.log('Content table test:', response.status, response.statusText)
    
    if (response.ok) {
      const data = await response.text()
      console.log('Content response:', data)
    } else {
      console.log('❌ Content table not found or access denied')
    }
  } catch (error) {
    console.log('❌ Content table test failed:', error)
  }

  // Test with proper error handling
  try {
    const response = await fetch(`${API_CONFIG.SUPABASE.URL}/rest/v1/content?select=*&limit=1`, {
      headers: {
        'apikey': API_CONFIG.SUPABASE.ANON_KEY,
        'Authorization': `Bearer ${API_CONFIG.SUPABASE.ANON_KEY}`,
      },
    })
    
    console.log('Detailed content test:', response.status, response.statusText)
    
    if (response.ok) {
      const data = await response.text()
      console.log('✅ Content table exists and accessible')
      console.log('Sample data:', data.substring(0, 200) + '...')
    } else {
      const errorText = await response.text()
      console.log('❌ Content table error:', errorText)
    }
  } catch (error) {
    console.log('❌ Detailed content test failed:', error)
  }
}

// Call this function to debug
if (typeof window !== 'undefined') {
  // Make it available in browser console
  (window as any).debugAPI = debugAPIConnection
}
