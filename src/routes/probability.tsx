import { createFileRoute } from '@tanstack/react-router'
import ProbabilitySolver from '@/components/ProbabilitySolver'
import FAQSection from '@/components/ui/FAQSection'

export const Route = createFileRoute('/probability')({
  head: () => ({
    meta: [
      { title: 'Probability Calculator — Combinations (nCr) & Permutations (nPr) | TheCalcPro' },
      { name: 'description', content: 'Free online probability calculator. Calculate combinations (nCr), permutations (nPr), and factorials with step-by-step formulas and real-world examples. Learn when order matters in counting problems.' },
      { name: 'keywords', content: 'probability calculator, combinations calculator, permutations calculator, nCr calculator, nPr calculator, factorial calculator, counting principle' },
    ],
  }),
  component: ProbabilityPage,
})

const FAQS = [
  {
    q: 'What is the difference between nCr and nPr?',
    a: 'Combinations (nCr) are used when the order does not matter (e.g., picking a committee of 3 from 10 people). Permutations (nPr) are used when the order does matter (e.g., choosing 1st, 2nd, and 3rd place in a race). The formula for nCr = n! / (r!(n−r)!) and nPr = n! / (n−r)!. Since nCr divides by r!, it always gives a smaller or equal result than nPr.',
  },
  {
    q: 'Why is 0! equal to 1?',
    a: 'In mathematics, the empty product is defined as 1 by convention. This makes many formulas work consistently for edge cases. For example, nC0 = n! / (0! × n!) = 1, which correctly represents the fact that there is exactly one way to choose zero items from any set — by choosing nothing.',
  },
  {
    q: 'What are the limits for n and r?',
    a: 'The calculator works for any non-negative integers where n ≥ r. For very large numbers, results may be shown in scientific notation due to JavaScript\'s floating-point limits (factorials beyond 170! exceed the representable range). For practical purposes, the calculator handles all common probability homework and statistical applications.',
  },
  {
    q: 'When do I use combinations vs. permutations in real life?',
    a: 'Use combinations when selecting items from a group where the arrangement doesn\'t matter: lottery numbers, committee selection, pizza topping choices. Use permutations when the arrangement matters: password generation, seating arrangements, race placements, phone number sequences. Ask yourself: "Does the order of selection change the outcome?" If yes, use permutations.',
  },
]

function ProbabilityPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>Probability Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Calculate combinations and permutations instantly with professional formatting.
        </p>
      </div>
      <ProbabilitySolver />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Understanding Combinations and Permutations
        </h2>
        <p className="leading-relaxed">
          Combinations and permutations are fundamental concepts in combinatorics — the branch of
          mathematics that deals with counting arrangements. They form the backbone of probability
          theory and are used extensively in statistics, computer science, cryptography, and game theory.
          TheCalcPro's probability solver computes both <strong>nCr</strong> (combinations) and
          <strong> nPr</strong> (permutations) with step-by-step formula breakdowns so you can understand
          the counting logic, not just the final number.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          The Formulas
        </h3>
        <div className="p-4 rounded-2xl font-mono text-sm space-y-2" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          <p><strong>Permutations:</strong> P(n, r) = n! / (n − r)!</p>
          <p><strong>Combinations:</strong> C(n, r) = n! / (r! × (n − r)!)</p>
          <p><strong>Factorial:</strong> n! = n × (n−1) × (n−2) × … × 2 × 1</p>
        </div>
        <p className="leading-relaxed">
          Where <strong>n</strong> is the total number of items and <strong>r</strong> is the number being
          selected. The key difference: permutations count ordered arrangements, while combinations count
          unordered selections. Combinations divide by <em>r!</em> to remove duplicate orderings.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example: Lottery Odds
        </h3>
        <p className="leading-relaxed">
          A lottery requires you to pick <strong>6 numbers from 49</strong> (order doesn't matter).
          How many possible combinations exist?
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Identify the formula:</strong> Since order doesn't matter, use C(49, 6)</li>
          <li><strong>Apply the formula:</strong> C(49, 6) = 49! / (6! × 43!)</li>
          <li><strong>Simplify:</strong> = (49 × 48 × 47 × 46 × 45 × 44) / (6 × 5 × 4 × 3 × 2 × 1)</li>
          <li><strong>Compute numerator:</strong> 49 × 48 × 47 × 46 × 45 × 44 = 10,068,347,520</li>
          <li><strong>Compute denominator:</strong> 720</li>
          <li><strong>Divide:</strong> 10,068,347,520 / 720 = <strong>13,983,816</strong></li>
        </ol>
        <p className="leading-relaxed">
          There are <strong>13,983,816 possible combinations</strong>, giving odds of approximately
          1 in 14 million for any single ticket. This same C(n,r) formula applies to committee selection,
          card hand probabilities, and sampling problems in statistics. For statistical analysis of your
          data, explore our <a href="/statistics" className="text-amber hover:underline">Statistics Engine</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-16">
        <FAQSection items={FAQS} title="Probability FAQ" />
      </div>
    </div>
  )
}
