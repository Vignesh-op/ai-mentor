import React from 'react'
import MentorChat from './components/MentorChat'
import Dashboard from './pages/Dashboard'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Mentor — Smart Learning & Career Companion</h1>
        <Dashboard />
        <MentorChat />
      </div>
    </div>
  )
}
