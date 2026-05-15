import { createFileRoute } from '@tanstack/react-router'
import ScientificCalculator from '../components/ScientificCalculator'

export const Route = createFileRoute('/scientific')({
  head: () => ({
    meta: [
      { title: 'Scientific Calculator — CalcPro' },
      { name: 'description', content: 'Advanced scientific calculator with support for functions, logarithms, and more.' },
    ],
  }),
  component: ScientificPage,
})

function ScientificPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Scientific Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Advanced functions for engineering and physics.
        </p>
      </div>
      <ScientificCalculator />
    </div>
  )
}
