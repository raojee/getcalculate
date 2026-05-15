import { createFileRoute } from '@tanstack/react-router'
import EquationSolver from '../components/EquationSolver'

export const Route = createFileRoute('/equations')({
  head: () => ({
    meta: [
      { title: 'Equation Solver — CalcPro' },
      { name: 'description', content: 'Solve systems of linear equations and complex equations step-by-step.' },
    ],
  }),
  component: EquationsPage,
})

function EquationsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Equation Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Solve for variables in various types of equations.
        </p>
      </div>
      <EquationSolver />
    </div>
  )
}
