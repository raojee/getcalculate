import { createFileRoute } from '@tanstack/react-router'
import LandingNav from '../components/layout/LandingNav'
import LandingFooter from '../components/layout/LandingFooter'

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy | TheCalcPro' },
      { name: 'description', content: 'Privacy Policy for TheCalcPro.' },
    ],
  }),
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <div className="landing-page" style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <LandingNav />
      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">Privacy Policy</h1>
        <div className="space-y-8 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>1. 100% Client-Side Application</h2>
            <p>TheCalcPro operates entirely within your browser. We do not transmit, store, or process any of your calculation data, mathematical inputs, or personal information on our servers. All computations are performed locally on your device.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>2. Third-Party Advertising and Cookies</h2>
            <p>We use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use cookies to serve ads based on your prior visits to our website or other websites.</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" className="text-amber hover:underline" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>3. Analytics</h2>
            <p>We may use standard analytics tools to measure website traffic and performance. These tools collect anonymized, aggregated data about page visits and interactions to help us improve our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>4. Changes to This Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          </section>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
