import React from 'react'

interface DebugInfoProps {
  sessions: any[]
  blogs: any[]
  content: any
}

export default function DebugInfo({ sessions, blogs, content }: DebugInfoProps) {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-md z-50">
      <h3 className="font-bold mb-2">🔍 Debug Info</h3>
      <div className="space-y-1">
        <div>Sessions: {sessions.length}</div>
        <div>Blogs: {blogs.length}</div>
        <div>Content Fields: {Object.keys(content).length}</div>
      </div>
      <details className="mt-2">
        <summary className="cursor-pointer">Sessions Data</summary>
        <pre className="text-xs mt-1 overflow-auto max-h-32">
          {JSON.stringify(sessions, null, 2)}
        </pre>
      </details>
    </div>
  )
}
