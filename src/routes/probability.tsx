import { createFileRoute } from '@tanstack/react-router'
import ProbabilitySolver from '@/components/ProbabilitySolver'
import FAQSection from '@/components/ui/FAQSection'

export const Route = createFileRoute('/probability')({
  head: () => ({
    meta: [
      { title: 'Probability Calculator — Combinations & Permutations' },
      { name: 'description', content: 'Free online probability calculator. Calculate combinations (nCr) and permutations (nPr) with step-by-step formulas.' },
    ],
  }),
  component: ProbabilityPage,
})

const FAQS = [
  { q: 'What is the difference between nCr and nPr?', a: 'Combinations (nCr) are used when the order does not matter (e.g., picking a committee). Permutations (nPr) are used when the order does matter (e.g., a race or a password).' },
  { q: 'Why is 0! equal to 1?', a: 'In mathematics, the empty product is defined as 1. This convention makes many formulas (like nCr) work consistently for all cases.' },
  { q: 'What are the limits for n and r?', a: 'The calculator works for any non-negative integers where n ≥ r. For very large numbers, results may be shown in scientific notation.' },
]

function ProbabilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>Probability Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Calculate combinations and permutations instantly with professional formatting.
        </p>
      </div>
      <ProbabilitySolver />
      <div className="mt-16">
        <FAQSection items={FAQS} title="Probability FAQ" />
      </div>
    </div>
  )
}
