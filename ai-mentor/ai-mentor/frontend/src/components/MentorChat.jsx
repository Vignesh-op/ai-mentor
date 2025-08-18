import React, { useState } from 'react'

export default function MentorChat(){
  const [messages, setMessages] = useState([{role:'system', content:'You are an AI learning/career mentor.'}]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send(){
    if(!input.trim()) return;
    const next = [...messages, {role:'user', content: input}];
    setMessages(next); setInput(''); setLoading(true);

    try{
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
      const resp = await fetch(`${base}/api/ai/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      }).then(r=>r.json());
      setMessages(prev=>[...prev, {role:'assistant', content: resp.answer || JSON.stringify(resp)}]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 bg-white p-4 rounded shadow">
      <div className="h-64 overflow-auto border p-2 rounded mb-3">
        {messages.filter(m=>m.role!=='system').map((m,i)=> (
          <div key={i} className={m.role==='user' ? 'text-right' : 'text-left'}>
            <div className="inline-block p-2 my-1 rounded" style={{background: m.role==='user' ? '#e6f7ff' : '#f3f4f6'}}>{m.content}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="flex-1 border rounded p-2" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about courses, mock interviews, resumes..." />
        <button className="px-4 py-2 rounded bg-indigo-600 text-white" onClick={send} disabled={loading}>{loading? '...' : 'Send'}</button>
      </div>
    </div>
  )
}
