import { createFileRoute } from '@tanstack/react-router'
import LandingNav from '../components/layout/LandingNav'
import LandingFooter from '../components/layout/LandingFooter'

export const Route = createFileRoute('/terms-of-service')({
  head: () => ({
    meta: [
      { title: 'Terms of Service | TheCalcPro' },
      { name: 'description', content: 'Terms of Service for TheCalcPro.' },
    ],
  }),
  component: TermsOfServicePage,
})

function TermsOfServicePage() {
  return (
    <div className="landing-page" style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <LandingNav />
      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">Terms of Service</h1>
        <div className="space-y-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>1. Acceptance of Terms</h2>
            <p>By accessing and using TheCalcPro, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-red-500">2. Limitation of Liability & Disclaimer of Warranties</h2>
            <p className="font-bold">ALL CALCULATORS AND TOOLS PROVIDED ON THIS WEBSITE ARE FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY.</p>
            <p className="mt-4">TheCalcPro assumes absolutely no liability for any real-world construction, financial, engineering, medical, or other professional decisions made using these tools. While we strive for mathematical accuracy, we make no warranties or representations regarding the reliability, completeness, or suitability of the calculations.</p>
            <p className="mt-4">Users must independently verify all results with certified professionals (e.g., licensed engineers, financial advisors, contractors) before applying them to real-world scenarios. Under no circumstances shall TheCalcPro, its creators, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, the platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>3. Intellectual Property</h2>
            <p>The service and its original content, features, and functionality are and will remain the exclusive property of TheCalcPro and its licensors. The website is protected by copyright, trademark, and other laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>4. Termination</h2>
            <p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          </section>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
