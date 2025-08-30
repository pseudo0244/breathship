// Google Sheets Integration Service
// Replace database with Google Sheets

const CONTENT_SHEET_ID = '1SVk5WjWwiEVa00JbwpjEih7pSJPNrYhWHT7M6wYdN8g'
const SESSIONS_SHEET_ID = '15sMEHT9g7GF3HFuBEyeNqs6nrXjLBtwjpLmdo8fVCuA'
const BLOGS_SHEET_ID = '1IcvwfS4QEV_kU22BKCOY6OEH6NRvJ0RFum2XbiJ3W8Y'

// Helper function to convert Google Sheets data to objects
function sheetToObjects(sheetData: any[][]) {
  if (!sheetData || sheetData.length < 2) {
    console.log('⚠️ No data or insufficient rows in sheet:', sheetData)
    return []
  }
  
  const headers = sheetData[0]
  const rows = sheetData.slice(1)
  
  console.log('📋 Headers found:', headers)
  console.log('📊 Number of data rows:', rows.length)
  
  const objects = rows.map((row, index) => {
    const obj: any = {}
    headers.forEach((header, headerIndex) => {
      if (header && row[headerIndex] !== undefined) {
        const key = header.toLowerCase().replace(/\s+/g, '_')
        obj[key] = row[headerIndex]
      }
    })
    
    // Debug first few objects
    if (index < 2) {
      console.log(`📝 Object ${index + 1}:`, obj)
    }
    
    return obj
  })
  
  console.log('✅ Total objects created:', objects.length)
  return objects
}

// Fetch data from Google Sheets
async function fetchSheetData(sheetId: string, range: string = 'A:Z') {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&range=${range}`
    console.log('🔗 Fetching from URL:', url)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`)
    }
    
    const csvText = await response.text()
    console.log('📄 Raw CSV response (first 500 chars):', csvText.substring(0, 500))
    
    // Better CSV parsing that handles quoted fields with commas
    const rows: string[][] = []
    const lines = csvText.split('\n')
    
    for (const line of lines) {
      if (!line.trim()) continue
      
      const row: string[] = []
      let current = ''
      let inQuotes = false
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === ',' && !inQuotes) {
          row.push(current.trim().replace(/^"|"$/g, ''))
          current = ''
        } else {
          current += char
        }
      }
      
      // Add the last field
      row.push(current.trim().replace(/^"|"$/g, ''))
      rows.push(row)
    }
    
    console.log('📊 Parsed CSV rows:', rows.slice(0, 3)) // Show first 3 rows
    return sheetToObjects(rows)
  } catch (error) {
    console.error('Error fetching sheet data:', error)
    return []
  }
}

// Content Management
export const contentService = {
  async getAll() {
    const data = await fetchSheetData(CONTENT_SHEET_ID)
    return data.filter(item => item.is_active !== 'FALSE')
  },
  
  async getBySection(section: string) {
    const data = await fetchSheetData(CONTENT_SHEET_ID)
    return data.filter(item => 
      item.section === section && item.is_active !== 'FALSE'
    )
  }
}

// Sessions Management
export const sessionsService = {
  async getAll() {
    const data = await fetchSheetData(SESSIONS_SHEET_ID)
    console.log('🔍 All sessions from Google Sheets:', data)
    
    // More flexible filtering - include sessions that are TRUE, empty, or any value except FALSE
    const filteredData = data.filter(item => {
      const isActive = item.is_active?.toLowerCase()
      const shouldInclude = isActive !== 'false' && isActive !== 'f'
      console.log(`📋 Session "${item.title}": is_active="${item.is_active}" -> include=${shouldInclude}`)
      return shouldInclude
    })
    
    console.log('✅ Filtered sessions:', filteredData)
    return filteredData
  },
  
  async getByTag(tag: string) {
    const data = await fetchSheetData(SESSIONS_SHEET_ID)
    return data.filter(item => {
      const isActive = item.is_active?.toLowerCase()
      return item.session_tag === tag && isActive !== 'false' && isActive !== 'f'
    })
  }
}

// Blogs Management
export const blogsService = {
  async getAll() {
    const data = await fetchSheetData(BLOGS_SHEET_ID)
    console.log('📚 All blogs from Google Sheets:', data)
    
    // More flexible filtering - include blogs that are TRUE, empty, or any value except FALSE
    const filteredData = data.filter(item => {
      const isPublished = item.is_published?.toLowerCase()
      const shouldInclude = isPublished !== 'false' && isPublished !== 'f'
      console.log(`📝 Blog "${item.title}": is_published="${item.is_published}" -> include=${shouldInclude}`)
      return shouldInclude
    })
    
    console.log('✅ Filtered blogs:', filteredData)
    return filteredData
  },
  
  async getById(id: string) {
    const data = await fetchSheetData(BLOGS_SHEET_ID)
    return data.find(item => item.id === id)
  }
}
