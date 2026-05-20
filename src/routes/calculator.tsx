import { createFileRoute } from '@tanstack/react-router'
import StandardCalculator from '../components/StandardCalculator'

export const Route = createFileRoute('/calculator')({
  head: () => ({
    meta: [
      { title: 'Basic Calculator — TheCalcPro' },
      { name: 'description', content: 'Simple and clean basic calculator for everyday use.' },
    ],
  }),
  component: BasicPage,
})

function BasicPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Standard Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Simple, fast, and responsive.
        </p>
      </div>
      <div className="flex justify-center">
        <StandardCalculator />
      </div>
    </div>
  )
}
