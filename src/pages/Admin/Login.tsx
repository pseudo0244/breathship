import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'
import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 4-digit password check
    if (password === '1234') {
      onLogin()
    } else {
      setError('Invalid password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-green to-brand-brown flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-brand-green mx-auto mb-4" />
            <h1 className="text-2xl font-cormorant-bold text-brand-green">Breathship Admin</h1>
            <p className="text-gray-600 mt-2">Enter your password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent text-center text-lg tracking-widest"
                  placeholder="Enter 4-digit code"
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <Button type="submit" className="w-full" variant="brand-green">
              Access Admin Panel
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Password: <code className="bg-gray-100 px-2 py-1 rounded">1234</code>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}