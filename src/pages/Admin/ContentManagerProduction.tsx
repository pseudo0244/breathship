import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Save, Edit, Eye, Trash2, Plus, X, Check, RefreshCw, Download, Upload, RotateCcw, Settings } from 'lucide-react'
import Button from '../../components/UI/Button'
import { useContentProduction } from '../../hooks/useContentProduction'

interface ContentItem {
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

export default function ContentManagerProduction() {
  const { getAllContent, updateContent, exportContent, importContent, resetToDefault } = useContentProduction()
  const [content, setContent] = useState<ContentSection>({})
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const data: ContentItem[] = await getAllContent()
      
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
      setMessage('Error loading content')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.field_name)
    setEditValue(item.field_value || '')
  }

  const handleSave = async (item: ContentItem) => {
    try {
      setSaving(true)
      const result = await updateContent(item.field_name, editValue)
      
      if (result.success) {
        setContent(prev => ({
          ...prev,
          [item.section]: prev[item.section].map(contentItem =>
            contentItem.field_name === item.field_name
              ? { ...contentItem, field_value: editValue }
              : contentItem
          )
        }))
        
        setEditingId(null)
        setMessage('Content updated successfully! Changes are live on the website.')
        setTimeout(() => setMessage(''), 5000)
      } else {
        setMessage('Error updating content. Please try again.')
      }
    } catch (error) {
      console.error('Error updating content:', error)
      setMessage('Error updating content. Please try again.')
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
      // For localStorage, we'll just update the local state
      setContent(prev => ({
        ...prev,
        [item.section]: prev[item.section].map(contentItem =>
          contentItem.field_name === item.field_name
            ? { ...contentItem, is_active: !item.is_active }
            : contentItem
        )
      }))
      
      setMessage(`Content ${!item.is_active ? 'activated' : 'deactivated'} successfully!`)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error updating content status:', error)
      setMessage('Error updating content status')
    }
  }

  const refreshContent = async () => {
    setRefreshing(true)
    await fetchContent()
    setRefreshing(false)
  }

  const handleExport = async () => {
    try {
      const result = await exportContent()
      if (result.success) {
        setMessage('Content exported successfully! Check your downloads folder.')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Error exporting content. Please try again.')
      }
    } catch (error) {
      console.error('Error exporting content:', error)
      setMessage('Error exporting content. Please try again.')
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const result = await importContent(file)
      if (result.success) {
        await fetchContent()
        setMessage('Content imported successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Error importing content. Please check the file format.')
      }
    } catch (error) {
      console.error('Error importing content:', error)
      setMessage('Error importing content. Please try again.')
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
      try {
        const result = await resetToDefault()
        if (result.success) {
          await fetchContent()
          setMessage('Content reset to default successfully!')
          setTimeout(() => setMessage(''), 3000)
        } else {
          setMessage('Error resetting content. Please try again.')
        }
      } catch (error) {
        console.error('Error resetting content:', error)
        setMessage('Error resetting content. Please try again.')
      }
    }
  }

  const getFieldTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <span className="text-blue-500">T</span>
      case 'textarea': return <span className="text-green-500">TA</span>
      case 'image': return <span className="text-purple-500">IMG</span>
      default: return <span className="text-gray-500">?</span>
    }
  }

  const getSectionDisplayName = (section: string) => {
    return section.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p className="text-brand-green font-proxima-nova">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-beige p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-cormorant-bold text-brand-green mb-2">
                Content Manager (Production Ready)
              </h1>
              <p className="text-brand-green/80 font-proxima-nova">
                Edit all website content. Changes are saved locally and can be exported/imported for backup.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Button>
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
          </div>
        </motion.div>

        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-6 bg-white rounded-lg shadow-sm border border-brand-green/10"
          >
            <h3 className="text-lg font-cormorant-regular text-brand-green mb-4">Content Management</h3>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleExport}
                variant="brand-green"
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Content</span>
              </Button>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Import Content</span>
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Default</span>
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <p className="text-sm text-brand-green/60 mt-2">
              Export your content to backup or transfer to another device. Import previously exported content files.
            </p>
          </motion.div>
        )}

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

        <div className="space-y-8">
          {Object.entries(content).map(([section, items]) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-brand-green/10"
            >
              <div className="p-6 border-b border-brand-green/10">
                <h2 className="text-xl font-cormorant-regular text-brand-green">
                  {getSectionDisplayName(section)} Section
                </h2>
                <p className="text-brand-green/60 font-proxima-nova text-sm mt-1">
                  {items.length} content items
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.field_name}
                      className="flex items-center justify-between p-4 bg-brand-beige/30 rounded-lg border border-brand-green/10"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getFieldTypeIcon(item.field_type)}
                          <span className="font-proxima-nova text-sm text-brand-green/80">
                            {item.field_name}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-proxima-nova ${
                            item.is_active 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {item.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        {editingId === item.field_name ? (
                          <div className="space-y-2">
                            {item.field_type === 'image' ? (
                              <div className="space-y-3">
                                <input
                                  type="url"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  placeholder="Paste image URL here (e.g., https://images.unsplash.com/...)"
                                  className="w-full p-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                                />
                                {editValue && (
                                  <div className="mt-2">
                                    <p className="text-sm text-brand-green/60 mb-2">Preview:</p>
                                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                      <img
                                        src={editValue}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none'
                                          e.currentTarget.nextElementSibling!.style.display = 'flex'
                                        }}
                                      />
                                      <div className="hidden absolute inset-0 flex items-center justify-center text-gray-500">
                                        <span>Image not found</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <div className="text-sm text-brand-green/60">
                                  <p>💡 Tip: You can use:</p>
                                  <ul className="list-disc list-inside ml-2 mt-1">
                                    <li>Unsplash URLs (https://images.unsplash.com/...)</li>
                                    <li>Cloudinary URLs (https://res.cloudinary.com/...)</li>
                                    <li>Any direct image URL</li>
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <textarea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full p-3 border border-brand-green/20 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green font-proxima-nova"
                                rows={3}
                              />
                            )}
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleSave(item)}
                                disabled={saving}
                                variant="brand-green"
                                className="flex items-center space-x-2"
                              >
                                <Save className="w-4 h-4" />
                                <span>{saving ? 'Saving...' : 'Save'}</span>
                              </Button>
                              <Button
                                onClick={handleCancel}
                                variant="outline"
                                className="flex items-center space-x-2"
                              >
                                <X className="w-4 h-4" />
                                <span>Cancel</span>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              {item.field_type === 'image' ? (
                                <div className="space-y-2">
                                  <p className="text-brand-green/90 font-proxima-nova text-sm break-all">
                                    {item.field_value || 'No image URL'}
                                  </p>
                                  {item.field_value && (
                                    <div className="relative w-32 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                      <img
                                        src={item.field_value}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none'
                                          e.currentTarget.nextElementSibling!.style.display = 'flex'
                                        }}
                                      />
                                      <div className="hidden absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                                        <span>Invalid URL</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <p className="text-brand-green/90 font-proxima-nova">
                                  {item.field_value || 'No content'}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleEdit(item)}
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                              </Button>
                              <Button
                                onClick={() => toggleActive(item)}
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                              >
                                {item.is_active ? <Eye className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                <span>{item.is_active ? 'Hide' : 'Show'}</span>
                              </Button>
                            </div>
                          </div>
                        )}
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
