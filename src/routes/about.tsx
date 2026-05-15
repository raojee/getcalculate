import { createFileRoute } from '@tanstack/react-router'
import { Zap, Shield, Heart } from 'lucide-react'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About CalcPro — Our Mission' },
      { name: 'description', content: 'Learn more about CalcPro, the free all-in-one math solving platform designed for students and professionals.' },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>About CalcPro</h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Empowering everyone to master mathematics with free, professional tools.
        </p>
      </div>

      <div className="space-y-12">
        <section>
           <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap size={24} style={{ color: 'var(--amber)' }} /> Our Mission
           </h2>
           <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              CalcPro was created with a simple goal: to make advanced mathematical tools accessible to everyone for free. 
              We believe that education should not be hidden behind paywalls. Our platform provides high-quality solvers, 
              calculators, and graphers that help students understand the "how" behind the answer.
           </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <Shield size={32} className="mb-4" style={{ color: 'var(--amber)' }} />
              <h3 className="text-xl font-bold mb-2">Privacy First</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                 All calculations are performed right in your browser. We don't store your equations or results on our servers.
              </p>
           </div>
           <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <Heart size={32} className="mb-4" style={{ color: 'var(--amber)' }} />
              <h3 className="text-xl font-bold mb-2">Built for You</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                 Whether you're a high school student or an engineer, CalcPro is designed to be fast, responsive, and easy to use.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
