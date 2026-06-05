import { createFileRoute } from '@tanstack/react-router'
import CalculusSolver from '../components/CalculusSolver'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/calculus')({
  head: () => ({
    meta: [
      { title: 'Derivative Calculator — Step-by-Step Differentiation | TheCalcPro' },
      { name: 'description', content: 'Free online derivative calculator with step-by-step solutions. Differentiate functions using the power rule, product rule, quotient rule, and chain rule. Supports polynomials, trig, exponential, and log functions.' },
      { name: 'keywords', content: 'derivative calculator, differentiation solver, calculus solver, power rule calculator, chain rule calculator, step by step derivative' },
    ],
  }),
  component: CalculusPage,
})

const FAQS = [
  {
    q: 'What is a derivative in calculus?',
    a: 'A derivative measures the instantaneous rate of change of a function with respect to its variable. Geometrically, it represents the slope of the tangent line to the function\'s graph at any point. It is formally defined as f′(x) = lim(h→0) [f(x+h) − f(x)] / h. Derivatives are fundamental to physics (velocity is the derivative of position), economics (marginal cost), and engineering (rate of change analysis).',
  },
  {
    q: 'What is the power rule for derivatives?',
    a: 'The power rule states that if f(x) = xⁿ, then f′(x) = n·xⁿ⁻¹. You bring the exponent down as a coefficient and reduce the exponent by 1. For example, the derivative of x⁵ is 5x⁴, and the derivative of x⁻² is −2x⁻³. This rule works for any real exponent n, including fractions and negative numbers.',
  },
  {
    q: 'When do I use the chain rule?',
    a: 'The chain rule is used when differentiating a composite function — a function nested inside another function. It states: d/dx [f(g(x))] = f′(g(x)) · g′(x). For example, to differentiate sin(x³), the outer function is sin(u) with derivative cos(u), and the inner function is u = x³ with derivative 3x². The result is 3x² · cos(x³).',
  },
  {
    q: 'What is the difference between the product rule and quotient rule?',
    a: 'The product rule differentiates a product of two functions: d/dx [u · v] = u′v + uv′. The quotient rule differentiates a ratio: d/dx [u/v] = (u′v − uv′) / v². A useful tip: the quotient rule can be derived from the product rule by writing u/v as u · v⁻¹ and applying the chain rule to v⁻¹.',
  },
]

function CalculusPage() {
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
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Calculus Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Enter a function f(x) to find its derivative with respect to x.
        </p>
      </div>
      <CalculusSolver />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          How to Differentiate Functions Step by Step
        </h2>
        <p className="leading-relaxed">
          Differentiation is the process of finding the derivative of a function — a fundamental operation
          in calculus that reveals how a quantity changes with respect to another. Whether you're analyzing
          the velocity of a moving object, the slope of a curve, or the rate of growth of an investment,
          derivatives provide the mathematical framework. TheCalcPro's calculus solver automates the
          differentiation process while showing every intermediate step, so you can learn the method
          and verify homework solutions simultaneously.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Essential Differentiation Rules
        </h3>
        <div className="p-4 rounded-2xl font-mono text-sm space-y-1" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          <p><strong>Power Rule:</strong> d/dx [xⁿ] = n·xⁿ⁻¹</p>
          <p><strong>Product Rule:</strong> d/dx [u·v] = u′v + uv′</p>
          <p><strong>Quotient Rule:</strong> d/dx [u/v] = (u′v − uv′) / v²</p>
          <p><strong>Chain Rule:</strong> d/dx [f(g(x))] = f′(g(x)) · g′(x)</p>
        </div>
        <p className="leading-relaxed">
          These four rules, combined with the derivatives of elementary functions
          (d/dx sin x = cos x, d/dx eˣ = eˣ, d/dx ln x = 1/x), are sufficient to differentiate
          virtually any expression encountered in undergraduate mathematics.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example: Differentiate f(x) = 3x⁴ − 2x² + 7
        </h3>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Apply the power rule to each term individually</strong> (the derivative of a sum is the sum of derivatives).</li>
          <li><strong>Term 1:</strong> d/dx [3x⁴] = 3 · 4x³ = <strong>12x³</strong></li>
          <li><strong>Term 2:</strong> d/dx [−2x²] = −2 · 2x¹ = <strong>−4x</strong></li>
          <li><strong>Term 3:</strong> d/dx [7] = <strong>0</strong> (the derivative of any constant is zero)</li>
          <li><strong>Combine:</strong> f′(x) = <strong>12x³ − 4x</strong></li>
        </ol>
        <p className="leading-relaxed">
          The derivative tells us the instantaneous rate of change of f at any point x. For instance,
          at x = 2: f′(2) = 12(8) − 4(2) = 96 − 8 = 88, meaning the function is increasing rapidly at that point.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Practical Applications
        </h3>
        <p className="leading-relaxed">
          Derivatives are used in physics to compute velocity and acceleration from position functions,
          in economics to analyze marginal cost and revenue, in machine learning for gradient descent optimization,
          and in engineering for control systems. To graph your functions and their derivatives visually,
          try our <a href="/grapher" className="text-amber hover:underline">Function Plotter</a>. For
          algebraic equation solving, visit the <a href="/algebra" className="text-amber hover:underline">Algebra Solver</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQSection items={FAQS} title="Calculus Solver FAQ" />
      </div>
    </div>
  )
}
