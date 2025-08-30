import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import { format } from 'date-fns'
import { useBlogs } from '../../hooks/useBlogs'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import type { Blog } from '../../types'

export default function BlogsManager() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlogs()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Omit<Blog, 'id' | 'created_at'>>()

  const onSubmit = async (data: Omit<Blog, 'id' | 'created_at'>) => {
    if (editingId) {
      await updateBlog(editingId, data)
      setEditingId(null)
    } else {
      await addBlog(data)
      setShowForm(false)
    }
    reset()
  }

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id)
    setShowForm(true)
    setValue('title', blog.title)
    setValue('image_link', blog.image_link)
    setValue('excerpt', blog.excerpt)
    setValue('content', blog.content)
  }

  const handleCancel = () => {
    setEditingId(null)
    setShowForm(false)
    reset()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlog(id)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3D2B2A]">Blogs Manager</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#3D2B2A]">
              {editingId ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                placeholder="5 Benefits of Daily Breathwork"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image (Cloudinary URL)</label>
              <input
                {...register('image_link')}
                type="url"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                placeholder="https://res.cloudinary.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                {...register('excerpt', { required: 'Excerpt is required' })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent resize-none"
                placeholder="A brief summary of the blog post..."
              />
              {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows={12}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent resize-none"
                placeholder="Write your full blog post content here..."
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingId ? 'Update Blog' : 'Create Blog'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="p-6">
            <h3 className="text-lg font-semibold text-[#3D2B2A] mb-2 line-clamp-2">{blog.title}</h3>
            <p className="text-gray-600 mb-2 line-clamp-3">{blog.excerpt}</p>
            <p className="text-sm text-gray-500 mb-4">
              {format(new Date(blog.created_at), 'MMM dd, yyyy')}
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleEdit(blog)}
                className="flex-1"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDelete(blog.id)}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {blogs.length === 0 && !showForm && (
        <div className="text-center py-12">
          <p className="text-gray-500">No blog posts created yet. Click "Add Blog Post" to get started.</p>
        </div>
      )}
    </div>
  )
}