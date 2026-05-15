import { createFileRoute } from '@tanstack/react-router'
import TrigSolver from '../components/TrigSolver'

export const Route = createFileRoute('/trigonometry')({
  head: () => ({
    meta: [
      { title: 'Trigonometry Solver — CalcPro' },
      { name: 'description', content: 'Solve trigonometric functions and explore the unit circle with step-by-step calculations.' },
    ],
  }),
  component: TrigPage,
})

function TrigPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Trigonometry Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Compute sine, cosine, tangent and their inverses with degrees or radians.
        </p>
      </div>
      <TrigSolver />
    </div>
  )
}
