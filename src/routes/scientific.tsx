import { createFileRoute } from '@tanstack/react-router'
import ScientificCalculator from '../components/ScientificCalculator'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/scientific')({
  head: () => ({
    meta: [
      { title: 'Free Scientific Calculator Online — Trig, Log, Exponents | TheCalcPro' },
      { name: 'description', content: 'Free online scientific calculator with trigonometric functions (sin, cos, tan), logarithms (ln, log₁₀), exponents, factorials, and constants (π, e). Supports degrees and radians.' },
      { name: 'keywords', content: 'scientific calculator, online scientific calculator, trigonometry calculator, logarithm calculator, factorial calculator, sin cos tan calculator' },
    ],
  }),
  component: ScientificPage,
})

const FAQS = [
  {
    q: 'What is the difference between degrees and radians?',
    a: 'Degrees and radians are two units for measuring angles. A full circle is 360° or 2π radians. To convert degrees to radians, multiply by π/180. For example, 90° = π/2 ≈ 1.5708 radians. Most scientific calculators — including this one — let you toggle between the two modes so trigonometric functions return values in your preferred unit.',
  },
  {
    q: 'What base does the "log" button use?',
    a: 'On this calculator, "log" computes the common logarithm (base 10), while "ln" computes the natural logarithm (base e ≈ 2.71828). To compute a logarithm with a custom base b, use the change-of-base formula: log_b(x) = ln(x) / ln(b).',
  },
  {
    q: 'What is the largest factorial this calculator can compute?',
    a: 'The calculator uses JavaScript\'s floating-point arithmetic, which can represent values up to approximately 1.8 × 10³⁰⁸. This means factorials up to about 170! can be computed exactly. Beyond that, the result exceeds the representable range and returns Infinity.',
  },
  {
    q: 'How do I enter scientific notation?',
    a: 'Use the EXP or × 10ˣ button to enter numbers in scientific notation. For example, to enter 6.022 × 10²³ (Avogadro\'s number), type 6.022, press EXP, then type 23. The calculator will store and compute with the full-precision value.',
  },
]

function ScientificPage() {
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
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Scientific Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Advanced functions for engineering and physics.
        </p>
      </div>
      <ScientificCalculator />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          What Is a Scientific Calculator?
        </h2>
        <p className="leading-relaxed">
          A scientific calculator extends basic arithmetic with advanced mathematical functions used across
          science, engineering, and mathematics. Unlike a standard calculator, it supports
          <strong> trigonometric functions</strong> (sin, cos, tan and their inverses),
          <strong> logarithms</strong> (natural log ln and common log log₁₀),
          <strong> exponentiation</strong> (powers and roots), <strong>factorials</strong> (n!),
          and mathematical constants such as <strong>π</strong> (3.14159…) and <strong>e</strong> (2.71828…).
          TheCalcPro's scientific calculator runs entirely in your browser — no downloads, no sign-ups,
          and no data sent to any server.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Key Formulas &amp; Functions
        </h3>
        <p className="leading-relaxed">
          The trigonometric functions relate angles to side ratios in a right triangle.
          For an angle θ: <strong>sin(θ) = opposite / hypotenuse</strong>,
          <strong> cos(θ) = adjacent / hypotenuse</strong>, and
          <strong> tan(θ) = opposite / adjacent</strong>. Logarithmic functions are the inverse
          of exponentiation: if <em>b<sup>y</sup> = x</em>, then <em>log<sub>b</sub>(x) = y</em>.
          The natural logarithm uses base <em>e</em>, while the common logarithm uses base 10.
          Factorials, written as <em>n!</em>, compute the product of all positive integers up to n:
          for example, <strong>5! = 5 × 4 × 3 × 2 × 1 = 120</strong>.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example: Calculating Projectile Height
        </h3>
        <p className="leading-relaxed">
          In physics, the vertical component of a projectile's velocity is given by
          <em> v<sub>y</sub> = v₀ · sin(θ)</em>. Suppose a ball is launched at
          <strong> v₀ = 25 m/s</strong> at an angle of <strong>θ = 40°</strong>.
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Set the calculator to degree mode</strong> (ensure DEG is selected).</li>
          <li><strong>Compute sin(40°):</strong> sin(40) = <strong>0.6428</strong></li>
          <li><strong>Multiply by initial velocity:</strong> 25 × 0.6428 = <strong>16.07 m/s</strong></li>
          <li><strong>Find maximum height:</strong> Using h = v<sub>y</sub>² / (2g) where g = 9.81 m/s²:
            h = 16.07² / (2 × 9.81) = 258.24 / 19.62 ≈ <strong>13.16 meters</strong></li>
        </ol>
        <p className="leading-relaxed">
          This demonstrates how a scientific calculator bridges the gap between raw formulas and
          practical answers — a workflow used daily by engineering students and physics professionals.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Who Uses a Scientific Calculator?
        </h3>
        <p className="leading-relaxed">
          Scientific calculators are essential tools for high school and university students studying
          algebra, trigonometry, calculus, and physics. Engineers use them to verify quick calculations
          on-site. Data analysts rely on logarithmic and exponential functions for growth modeling. If
          you need matrix operations, try our <a href="/matrix" className="text-amber hover:underline">Matrix Calculator</a>.
          For graphing capabilities, explore the <a href="/grapher" className="text-amber hover:underline">Function Plotter</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQSection items={FAQS} title="Scientific Calculator FAQ" />
      </div>
    </div>
  )
}
