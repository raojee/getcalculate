import { createFileRoute } from '@tanstack/react-router'
import CalculusSolver from '../components/CalculusSolver'

export const Route = createFileRoute('/calculus')({
  head: () => ({
    meta: [
      { title: 'Calculus Solver — TheCalcPro' },
      { name: 'description', content: 'Differentiate functions instantly with step-by-step solutions and AI hints.' },
    ],
  }),
  component: CalculusPage,
})

function CalculusPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Calculus Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Enter a function f(x) to find its derivative with respect to x.
        </p>
      </div>
      <CalculusSolver />
    </div>
  )
}
