import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, X } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact TheCalcPro — Get in Touch' },
      { name: 'description', content: 'Have a question or feedback for TheCalcPro? Send us a message.' },
    ],
  }),
  component: ContactPage,
})

interface ToastState {
  show: boolean
  type: 'success' | 'error'
  message: string
}

function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  
  // Submit state handling
  const [submitting, setSubmitting] = useState(false)
  
  // Toast notifications state
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'success',
    message: '',
  })

  // Self-expiring Toast hook
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toast.show])

  const showNotification = (type: 'success' | 'error', msg: string) => {
    setToast({
      show: true,
      type,
      message: msg,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      showNotification('error', 'Please fill out all fields before submitting.')
      return
    }

    setSubmitting(true)

    try {
      // Fetch request directed to edge Cloudflare Pages Function
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Server rejected the submission. Please verify details.')
      }

      // Success
      showNotification('success', `Thank you, ${name}! Your inquiry has been sent successfully.`)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err: any) {
      console.error('Contact Form submission error:', err)
      showNotification('error', err.message || 'Transmission failed. Please check your network and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 relative min-h-screen">
      
      {/* Toast Alert Banner */}
      {toast.show && (
        <div 
          className="fixed top-8 right-8 z-50 flex items-center gap-3.5 px-5 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl animate-fade-in transition-all duration-300"
          style={{
            background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            borderColor: toast.type === 'success' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle size={20} className="text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle size={20} className="text-red-400 shrink-0" />
          )}
          
          <div className="flex-1 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {toast.message}
          </div>

          <button 
            onClick={() => setToast(prev => ({ ...prev, show: false }))}
            className="transition-colors cursor-pointer shrink-0 ml-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-amber-glow rounded-full filter blur-[100px] pointer-events-none -z-10 opacity-60" />

      {/* Header and Hero Title */}
      <div className="text-center mb-16 space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-amber/10 text-amber text-[10px] font-black uppercase tracking-[0.2em] border border-amber/20">
          Inquiries & Support
        </span>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[0.9]" style={{ color: 'var(--text-primary)' }}>
          Get In <span className="text-amber">Touch</span>
        </h1>
        <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Have a calculation inquiry, math feature suggestion, or developer feedback? Send us a secure message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Contact Info Sidebar (Left column) */}
        <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
          <GlassCard className="flex flex-col gap-6 p-7 flex-1 hover:translate-y-0 hover:shadow-none" hover={false}>
            <div className="space-y-2">
              <h3 className="text-lg font-black uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>Direct Lines</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>For immediate developer assistance or API licensing agreements, reach out below.</p>
            </div>

            <div className="space-y-4 flex-1 justify-center flex flex-col">
              <div className="flex items-center gap-4 p-4 rounded-2xl hover:border-amber/20 transition-all duration-300" style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-amber-glow text-amber border border-amber/10">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Email Support</div>
                  <a href="mailto:support@thecalcpro.com" className="text-sm font-semibold truncate block hover:text-amber transition-colors" style={{ color: 'var(--text-primary)' }}>
                    support@thecalcpro.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl hover:border-amber/20 transition-all duration-300" style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-amber-glow text-amber border border-amber/10">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Developer Forums</div>
                  <a href="#" className="text-sm font-semibold hover:text-amber transition-colors" style={{ color: 'var(--text-primary)' }}>
                    Join Discord Server
                  </a>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono tracking-widest uppercase border-t pt-4" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
              CF-EDGE SECURE CHANNEL
            </div>
          </GlassCard>
        </div>

        {/* Premium Glassmorphic Form Card (Right column) */}
        <div className="lg:col-span-8">
          <GlassCard className="p-8 sm:p-10" hover={false}>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name field */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-muted)' }}>
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    disabled={submitting}
                    className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all border focus:border-amber/40 focus:ring-2 focus:ring-amber-glow disabled:opacity-50 font-medium text-sm" 
                    style={{ background: 'var(--bg-surface-2)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                    placeholder="E.g., Nikola Tesla" 
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-muted)' }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    disabled={submitting}
                    className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all border focus:border-amber/40 focus:ring-2 focus:ring-amber-glow disabled:opacity-50 font-medium text-sm" 
                    style={{ background: 'var(--bg-surface-2)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                    placeholder="E.g., nikola@tesla.com" 
                  />
                </div>
              </div>

              {/* Message field */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-muted)' }}>
                  Message Details
                </label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required 
                  rows={5} 
                  disabled={submitting}
                  className="w-full px-4 py-3.5 rounded-2xl outline-none resize-none transition-all border focus:border-amber/40 focus:ring-2 focus:ring-amber-glow disabled:opacity-50 font-medium text-sm leading-relaxed" 
                  style={{ background: 'var(--bg-surface-2)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                  placeholder="How can we assist you with our calculation algorithms?"
                />
              </div>

              {/* Action Submit Button */}
              <button 
                type="submit" 
                disabled={submitting}
                className="amber-btn w-full flex items-center justify-center gap-2.5 py-4 transition-all duration-300 disabled:opacity-50 cursor-pointer text-sm font-bold uppercase tracking-widest shadow-lg hover:shadow-amber/15 group"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1a0f00]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Transmitting Inquiry...
                  </>
                ) : (
                  <>
                    <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    Transmit Secure Message
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
