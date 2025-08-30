// API Configuration
// Updated with actual credentials

export const API_CONFIG = {
  // Supabase Configuration
  SUPABASE: {
    URL: 'https://uemamlkocdgqnkedjcou.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlbWFtbGtvY2RncW5rZWRqY291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MjQ3ODAsImV4cCI6MjA3MjEwMDc4MH0.gAB333dXumqfH1ybXtOQye69l4oBgfWOuR76G104KlM',
  },
  
  // Getform.io Configuration
  GETFORM: {
    ENDPOINT: 'https://getform.io/f/bdrdgvxb',
  },
  
  // App Configuration
  APP: {
    NAME: 'Breathship',
    DESCRIPTION: 'Transform your life through conscious breathing',
    VERSION: '1.0.0',
  }
}

// Helper function to validate configuration
export const validateConfig = () => {
  const errors: string[] = []
  
  if (!API_CONFIG.SUPABASE.URL || API_CONFIG.SUPABASE.URL === 'https://your-project.supabase.co') {
    errors.push('Supabase URL not configured')
  }
  
  if (!API_CONFIG.SUPABASE.ANON_KEY || API_CONFIG.SUPABASE.ANON_KEY === 'your-supabase-anon-key') {
    errors.push('Supabase anon key not configured')
  }
  
  if (!API_CONFIG.GETFORM.ENDPOINT || API_CONFIG.GETFORM.ENDPOINT === 'https://getform.io/f/your-form-endpoint') {
    errors.push('Getform.io endpoint not configured')
  }
  
  if (errors.length > 0) {
    console.warn('API Configuration Issues:', errors)
    console.warn('Please update src/config/api.ts with your actual credentials')
  } else {
    console.log('✅ API Configuration validated successfully')
  }
  
  return errors.length === 0
}
