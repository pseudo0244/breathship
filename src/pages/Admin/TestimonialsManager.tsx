import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import { useTestimonials } from '../../hooks/useTestimonials'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import type { Testimonial } from '../../types'

export default function TestimonialsManager() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Omit<Testimonial, 'id' | 'created_at'>>()

  const onSubmit = async (data: Omit<Testimonial, 'id' | 'created_at'>) => {
    if (editingId) {
      await updateTestimonial(editingId, data)
      setEditingId(null)
    } else {
      await addTestimonial(data)
      setShowForm(false)
    }
    reset()
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setShowForm(true)
    setValue('name', testimonial.name)
    setValue('text', testimonial.text)
    setValue('image_link', testimonial.image_link)
  }

  const handleCancel = () => {
    setEditingId(null)
    setShowForm(false)
    reset()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      await deleteTestimonial(id)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#3D2B2A]">Testimonials Manager</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#3D2B2A]">
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                  placeholder="Aarya"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image (Cloudinary URL)</label>
                <input
                  {...register('image_link')}
                  type="url"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent"
                  placeholder="https://res.cloudinary.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Text</label>
              <textarea
                {...register('text', { required: 'Testimonial text is required' })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3D2B2A] focus:border-transparent resize-none"
                placeholder="Breathship helped me release stress and find clarity..."
              />
              {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>}
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingId ? 'Update Testimonial' : 'Create Testimonial'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                {testimonial.image_link ? (
                  <img 
                    src={testimonial.image_link} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-[#3D2B2A]">{testimonial.name}</h3>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-4">"{testimonial.text}"</p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleEdit(testimonial)}
                className="flex-1"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDelete(testimonial.id)}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && !showForm && (
        <div className="text-center py-12">
          <p className="text-gray-500">No testimonials created yet. Click "Add Testimonial" to get started.</p>
        </div>
      )}
    </div>
  )
}