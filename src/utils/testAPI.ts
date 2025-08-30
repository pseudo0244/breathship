// API Test Utility
import { API_CONFIG } from '../config/api'

export const testAPIConnections = async () => {
  console.log('🧪 Testing API Connections...')
  
  // Test Supabase Connection
  try {
    const response = await fetch(`${API_CONFIG.SUPABASE.URL}/rest/v1/content?select=count`, {
      headers: {
        'apikey': API_CONFIG.SUPABASE.ANON_KEY,
        'Authorization': `Bearer ${API_CONFIG.SUPABASE.ANON_KEY}`,
      },
    })
    
    if (response.ok) {
      console.log('✅ Supabase connection successful')
    } else {
      console.log('❌ Supabase connection failed:', response.statusText)
    }
  } catch (error) {
    console.log('❌ Supabase connection error:', error)
  }
  
  // Test Getform.io Connection
  try {
    const response = await fetch(API_CONFIG.GETFORM.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: true,
        message: 'API connection test',
        timestamp: new Date().toISOString(),
      }),
    })
    
    if (response.ok) {
      console.log('✅ Getform.io connection successful')
    } else {
      console.log('❌ Getform.io connection failed:', response.statusText)
    }
  } catch (error) {
    console.log('❌ Getform.io connection error:', error)
  }
  
  console.log('🏁 API connection tests completed')
}
