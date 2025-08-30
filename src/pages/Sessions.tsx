import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ExternalLink, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { useSessions } from '../hooks/useSessions'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import LoadingSpinner from '../components/UI/LoadingSpinner'

interface SessionModalProps {
  session: any
  isOpen: boolean
  onClose: () => void
}

function SessionModal({ session, isOpen, onClose }: SessionModalProps) {
  if (!isOpen || !session) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-64 bg-gradient-to-br from-[#3D2B2A]/10 to-[#4D5442]/10">
          {session.image_link ? (
            <img 
              src={session.image_link} 
              alt={session.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">🫁</div>
          )}
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-[#4D5442] text-white px-4 py-2 rounded-full text-sm font-medium">
              {session.tag}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <h2 className="text-3xl font-bold text-[#3D2B2A] mb-4">{session.title}</h2>
          
          <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{format(new Date(session.date), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{session.time}</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
            {session.description}
          </p>

          <div className="flex gap-4">
            {session.payment_link && (
              <a 
                href={session.payment_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Sessions() {
  const { sessions, loading } = useSessions()
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (session: any) => {
    setSelectedSession(session)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedSession(null)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#3D2B2A] mb-4">
            Breathwork Sessions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our variety of breathwork sessions designed to support your journey of healing and transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <div className="h-48 bg-gradient-to-br from-[#3D2B2A]/10 to-[#4D5442]/10">
                  {session.image_link ? (
                    <img 
                      src={session.image_link} 
                      alt={session.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">🫁</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#4D5442] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {session.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#3D2B2A] mb-3">{session.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{format(new Date(session.date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModal(session)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {session.payment_link && (
                      <a href={session.payment_link} target="_blank" rel="noopener noreferrer">
                        <Button size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Book
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {sessions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sessions scheduled yet. Check back soon!</p>
          </div>
        )}
      </div>

      <SessionModal 
        session={selectedSession}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </div>
  )
}