import React from 'react'

export default function Dashboard(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Your Learning Path</h2>
        <p className="text-sm text-gray-600">Generate a personalized roadmap for your target role.</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Interview Practice</h2>
        <p className="text-sm text-gray-600">Practice questions and get AI feedback.</p>
      </div>
    </div>
  )
}
