import { createFileRoute } from '@tanstack/react-router'
import AlgebraSolver from '../components/AlgebraSolver'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/algebra')({
  head: () => ({
    meta: [
      { title: 'Algebra Solver with Steps — CalcPro' },
      { name: 'description', content: 'Free online algebra solver with step-by-step solutions.' },
    ],
  }),
  component: AlgebraPage,
})

const FAQS = [
  { q: 'What types of equations can I solve?', a: 'CalcPro solves linear equations (ax + b = c) and quadratic equations (ax² + bx + c = 0).' },
  { q: 'How do I enter an exponent?', a: 'Use the ^ symbol for powers, e.g., x^2.' },
]

function AlgebraPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Algebra Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Enter a linear or quadratic equation and get instant step-by-step solutions.
        </p>
      </div>
      <AlgebraSolver />
      <div className="mt-12">
        <FAQSection items={FAQS} title="Algebra Solver FAQ" />
      </div>
    </div>
  )
}
