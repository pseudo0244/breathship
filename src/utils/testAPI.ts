// Test API functionality
import { contentAPI } from '../api/content'

export async function testContentAPI() {
  console.log('🧪 Testing Content API...')
  
  try {
    // Test 1: Get all content
    console.log('📋 Testing getAll...')
    const allContent = await contentAPI.getAll()
    console.log('✅ getAll successful:', allContent.length, 'items')
    
    if (allContent.length > 0) {
      const firstItem = allContent[0]
      console.log('📝 First item:', firstItem)
      
      // Test 2: Update first item
      console.log('✏️ Testing update...')
      const originalValue = firstItem.field_value
      const testValue = `Test update ${Date.now()}`
      
      const updateResult = await contentAPI.update(firstItem.id, { 
        field_value: testValue 
      })
      console.log('✅ Update successful:', updateResult)
      
      // Test 3: Verify update
      console.log('🔍 Verifying update...')
      const updatedContent = await contentAPI.getAll()
      const updatedItem = updatedContent.find(item => item.id === firstItem.id)
      console.log('✅ Verification:', updatedItem?.field_value === testValue)
      
      // Test 4: Revert change
      console.log('↩️ Reverting change...')
      await contentAPI.update(firstItem.id, { 
        field_value: originalValue 
      })
      console.log('✅ Revert successful')
    }
    
    console.log('🎉 All API tests passed!')
    return true
  } catch (error) {
    console.error('❌ API test failed:', error)
    return false
  }
}

// Test specific field update
export async function testFieldUpdate(fieldName: string, newValue: string) {
  console.log(`🧪 Testing field update: ${fieldName} = ${newValue}`)
  
  try {
    // Get all content
    const allContent = await contentAPI.getAll()
    const targetItem = allContent.find(item => item.field_name === fieldName)
    
    if (!targetItem) {
      console.error(`❌ Field '${fieldName}' not found`)
      return false
    }
    
    console.log('📝 Found item:', targetItem)
    
    // Update the field
    const updateResult = await contentAPI.update(targetItem.id, { 
      field_value: newValue 
    })
    console.log('✅ Update result:', updateResult)
    
    // Verify the update
    const updatedContent = await contentAPI.getAll()
    const updatedItem = updatedContent.find(item => item.id === targetItem.id)
    console.log('✅ Verification:', updatedItem?.field_value === newValue)
    
    return true
  } catch (error) {
    console.error('❌ Field update test failed:', error)
    return false
  }
}
