import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Edit, Eye, Trash2, Plus, X, Check, RefreshCw } from 'lucide-react'
import Button from '../../components/UI/Button'
import { contentAPI } from '../../api/content'

interface ContentItem {
  id: number
  section: string
  field_name: string
  field_value: string
  field_type: string
  display_order: number
  is_active: boolean
}

interface ContentSection {
  [key: string]: ContentItem[]
}

export default function ContentManager() {
  const [content, setContent] = useState<ContentSection>({})
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const data: ContentItem[] = await contentAPI.getAll()
      
      // Group content by section
      const groupedContent: ContentSection = {}
      data.forEach(item => {
        if (!groupedContent[item.section]) {
          groupedContent[item.section] = []
        }
        groupedContent[item.section].push(item)
      })
      
      setContent(groupedContent)
      setMessage('Content loaded successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error fetching content:', error)
      setMessage('⚠️ Database not set up yet. Please execute the database schema in Supabase first.')
      setTimeout(() => setMessage(''), 8000)
      
      // Show sample content structure for reference
      const sampleContent: ContentSection = {
        'hero': [
          { id: 1, section: 'hero', field_name: 'hero_title', field_value: 'Sample Title', field_type: 'text', display_order: 1, is_active: true }
        ],
        'about': [
          { id: 2, section: 'about', field_name: 'about_description', field_value: 'Sample description', field_type: 'textarea', display_order: 1, is_active: true }
        ]
      }
      setContent(sampleContent)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id)
    setEditValue(item.field_value || '')
  }

  const handleSave = async (item: ContentItem) => {
    try {
      setSaving(true)
      await contentAPI.update(item.id, { field_value: editValue })
      
      // Update local state immediately
      setContent(prev => ({
        ...prev,
        [item.section]: prev[item.section].map(contentItem =>
          contentItem.id === item.id
            ? { ...contentItem, field_value: editValue }
            : contentItem
        )
      }))
      
      setEditingId(null)
      setMessage('Content updated successfully! Changes are live on the website.')
      setTimeout(() => setMessage(''), 5000)
      
      // Trigger a global content refresh for the main website
      window.dispatchEvent(new CustomEvent('contentUpdated', { 
        detail: { section: item.section, field: item.field_name, value: editValue }
      }))
      
    } catch (error) {
      console.error('Error updating content:', error)
      setMessage('⚠️ Database not set up yet. Please execute the database schema in Supabase first.')
      setTimeout(() => setMessage(''), 8000)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditValue('')
  }

  const toggleActive = async (item: ContentItem) => {
    try {
      await contentAPI.update(item.id, { is_active: !item.is_active })
      
      // Update local state immediately
      setContent(prev => ({
        ...prev,
        [item.section]: prev[item.section].map(contentItem =>
          contentItem.id === item.id
            ? { ...contentItem, is_active: !item.is_active }
            : contentItem
        )
      }))
      
      setMessage(`Content ${!item.is_active ? 'activated' : 'deactivated'} successfully!`)
      setTimeout(() => setMessage(''), 3000)
      
      // Trigger a global content refresh
      window.dispatchEvent(new CustomEvent('contentUpdated', { 
        detail: { section: item.section, field: item.field_name, active: !item.is_active }
      }))
      
    } catch (error) {
      console.error('Error updating content status:', error)
      setMessage('⚠️ Database not set up yet. Please execute the database schema in Supabase first.')
      setTimeout(() => setMessage(''), 8000)
    }
  }

  const refreshContent = async () => {
    setRefreshing(true)
    await fetchContent()
    setRefreshing(false)
  }

  const getFieldTypeIcon = (fieldType: string) => {
    switch (fieldType) {
      case 'image':
        return '🖼️'
      case 'textarea':
        return '📝'
      case 'number':
        return '🔢'
      case 'boolean':
        return '✅'
      default:
        return '📄'
    }
  }

  const getSectionDisplayName = (section: string) => {
    const sectionNames: { [key: string]: string } = {
      hero: 'Hero Section',
      about_me: 'About Me',
      about_breathship: 'About Breathship',
      sessions: 'Sessions',
      why_choose_us: 'Why Choose Us',
      testimonials: 'Testimonials',
      blogs: 'Blogs',
      contact: 'Contact',
      footer: 'Footer',
      header: 'Header'
    }
    return sectionNames[section] || section
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-beige p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-brand-green/20 rounded-lg mb-8 max-w-md"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg p-6 h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-beige p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-cormorant-bold text-brand-green mb-2">
                Content Manager
              </h1>
              <p className="text-brand-green/80 font-proxima-nova">
                Edit all website content. Changes are reflected immediately on the main website.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={refreshContent}
              disabled={refreshing}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </motion.div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-100 text-red-700 border border-red-200' 
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Content Sections */}
        <div className="space-y-8">
          {Object.entries(content).map(([section, items], sectionIndex) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Section Header */}
              <div className="bg-brand-green/5 px-6 py-4 border-b border-brand-green/10">
                <h2 className="text-xl font-cormorant-bold text-brand-green">
                  {getSectionDisplayName(section)}
                </h2>
                <p className="text-brand-green/60 text-sm font-proxima-nova">
                  {items.length} content items • {items.filter(item => item.is_active).length} active
                </p>
              </div>

              {/* Section Content */}
              <div className="p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        item.is_active
                          ? 'border-brand-green/20 bg-brand-green/5'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">
                              {getFieldTypeIcon(item.field_type)}
                            </span>
                            <span className="font-proxima-nova font-medium text-brand-green">
                              {item.field_name.replace(/_/g, ' ')}
                            </span>
                            <span className="text-xs text-brand-green/60 bg-brand-green/10 px-2 py-1 rounded">
                              {item.field_type}
                            </span>
                            {!item.is_active && (
                              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                                Inactive
                              </span>
                            )}
                          </div>

                          {editingId === item.id ? (
                            <div className="space-y-3">
                              {item.field_type === 'textarea' ? (
                                <textarea
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full p-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green resize-none"
                                  rows={4}
                                />
                              ) : (
                                <input
                                  type={item.field_type === 'number' ? 'number' : 'text'}
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full p-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
                                />
                              )}
                              
                              <div className="flex space-x-2">
                                <Button
                                  variant="brand-green"
                                  size="sm"
                                  onClick={() => handleSave(item)}
                                  disabled={saving}
                                  className="flex items-center space-x-1"
                                >
                                  <Check className="w-4 h-4" />
                                  <span>Save</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={handleCancel}
                                  className="flex items-center space-x-1"
                                >
                                  <X className="w-4 h-4" />
                                  <span>Cancel</span>
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="text-brand-green/80 font-proxima-nova">
                                {item.field_type === 'image' ? (
                                  <div className="flex items-center space-x-2">
                                    <span>Image URL:</span>
                                    <a
                                      href={item.field_value}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-brand-brown hover:underline"
                                    >
                                      {item.field_value}
                                    </a>
                                  </div>
                                ) : (
                                  <div className="whitespace-pre-wrap">
                                    {item.field_value || 'No content'}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(item)}
                                  className="flex items-center space-x-1"
                                >
                                  <Edit className="w-4 h-4" />
                                  <span>Edit</span>
                                </Button>
                                
                                <Button
                                  variant={item.is_active ? "brand-brown" : "brand-green"}
                                  size="sm"
                                  onClick={() => toggleActive(item)}
                                  className="flex items-center space-x-1"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span>{item.is_active ? 'Active' : 'Inactive'}</span>
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}