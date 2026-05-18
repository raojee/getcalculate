import { createFileRoute } from '@tanstack/react-router'
import PercentageCalculator from '../components/PercentageCalculator'

export const Route = createFileRoute('/percentage')({
  head: () => ({
    meta: [
      { title: 'Percentage Calculator — TheCalcPro' },
      { name: 'description', content: 'Quickly find percentages, percentage change, and percentage differences.' },
    ],
  }),
  component: PercentagePage,
})

function PercentagePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Percentage Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Quick tools for percentage of, change, and more.
        </p>
      </div>
      <PercentageCalculator />
    </div>
  )
}
