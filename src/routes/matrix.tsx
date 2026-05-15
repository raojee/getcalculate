import { createFileRoute } from '@tanstack/react-router'
import MatrixCalculator from '../components/MatrixCalculator'

export const Route = createFileRoute('/matrix')({
  head: () => ({
    meta: [
      { title: 'Matrix Calculator — CalcPro' },
      { name: 'description', content: 'Perform matrix operations like addition, multiplication, determinant, and inverse.' },
    ],
  }),
  component: MatrixPage,
})

function MatrixPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Matrix Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Work with matrices up to 3x3 for various mathematical operations.
        </p>
      </div>
      <MatrixCalculator />
    </div>
  )
}
