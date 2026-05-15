import { createFileRoute } from '@tanstack/react-router'
import { Mail, MessageSquare, Send } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact CalcPro — Get in Touch' },
      { name: 'description', content: 'Have a question or feedback for CalcPro? Send us a message.' },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>Contact Us</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          We'd love to hear from you. Send us your feedback or questions.
        </p>
      </div>

      <div className="surface-card p-8 stagger">
        <form name="contact" method="POST" data-netlify="true" className="space-y-5 animate-fade-in">
          <input type="hidden" name="form-name" value="contact" />
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5 ml-1" style={{ color: 'var(--text-muted)' }}>Name</label>
            <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} placeholder="Your Name" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5 ml-1" style={{ color: 'var(--text-muted)' }}>Email</label>
            <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} placeholder="your@email.com" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1.5 ml-1" style={{ color: 'var(--text-muted)' }}>Message</label>
            <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl outline-none resize-none" style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} placeholder="How can we help?"></textarea>
          </div>

          <button type="submit" className="amber-btn w-full flex items-center justify-center gap-2 py-4">
            <Send size={18} /> Send Message
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--amber-glow)', color: 'var(--amber)' }}>
               <Mail size={20} />
            </div>
            <div>
               <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Email</div>
               <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>support@calcpro.com</div>
            </div>
         </div>
         <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--amber-glow)', color: 'var(--amber)' }}>
               <MessageSquare size={20} />
            </div>
            <div>
               <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Community</div>
               <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Discord Server</div>
            </div>
         </div>
      </div>
    </div>
  )
}
