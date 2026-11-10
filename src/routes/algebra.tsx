import { createFileRoute } from '@tanstack/react-router'
import AlgebraSolver from '../components/AlgebraSolver'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/algebra')({
  head: () => ({
    meta: [
      { title: 'Algebra & Quadratic Discriminant Calculator (Step-by-Step)' },
      {
        name: 'description',
        content:
          'Free Algebra Formula Solver & Quadratic Discriminant Calculator (D = b² − 4ac). Solve linear and quadratic equations step by step with discriminant analysis.',
      },
      {
        name: 'keywords',
        content:
          'algebra solver, algebra formula solver, quadratic equation solver, discriminant calculator, what is the discriminant of the quadratic equation, solving equations solver, linear equation solver, quadratic formula calculator',
      },
      { property: 'og:title', content: 'Algebra & Quadratic Discriminant Calculator (Step-by-Step) | TheCalcPro' },
      { property: 'og:url', content: 'https://thecalcpro.com/algebra' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    ],
  }),
  component: AlgebraPage,
})

const FAQS = [
  {
    q: 'What types of equations can I solve?',
    a: 'TheCalcPro solves linear equations of the form ax + b = c and quadratic equations of the form ax² + bx + c = 0. Linear equations are solved by isolating the variable through inverse operations. Quadratic equations are solved using the quadratic formula x = (−b ± √(b² − 4ac)) / 2a, with full discriminant analysis.',
  },
  {
    q: 'How do I enter an exponent?',
    a: 'Use the ^ symbol for powers. For example, enter x^2 for x², 3x^2 + 2x - 5 for a quadratic expression, or 2^10 for 2 raised to the 10th power. The solver automatically parses these notations and identifies the equation type.',
  },
  {
    q: 'What is the discriminant and why does it matter?',
    a: 'The discriminant is the expression D = b² − 4ac found under the square root in the quadratic formula. It determines the nature of the roots: if D > 0, there are two distinct real roots; if D = 0, there is exactly one repeated real root; if D < 0, the roots are complex conjugates (involving imaginary numbers). The solver displays the discriminant value and interprets it automatically.',
  },
  {
    q: 'Can the solver handle equations with fractions or decimals?',
    a: 'Yes. When fractional or decimal coefficients are detected, the solver processes them with full floating-point precision. For fraction inputs, the engine can multiply through by the least common denominator internally to simplify the working before applying the standard solution method.',
  },
]

function AlgebraPage() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Algebra & Quadratic Discriminant Calculator",
    "alternateName": [
      "Algebra Solver",
      "Algebra Formula Solver",
      "Quadratic Discriminant Calculator",
      "Quadratic Equation Solver",
      "Solving Equations Solver"
    ],
    "url": "https://thecalcpro.com/algebra",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Algebra Solver &amp; Quadratic Discriminant Calculator
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Free algebra formula solver for linear and quadratic equations with instant discriminant (D = b² − 4ac) and step-by-step solutions.
        </p>
      </div>
      <AlgebraSolver />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          How to Solve Algebraic Equations
        </h2>
        <p className="leading-relaxed">
          Algebra is the branch of mathematics that uses symbols (typically letters like <em>x</em>) to
          represent unknown quantities and establish relationships through equations. Solving an algebraic
          equation means finding the value(s) of the unknown variable that make the equation true.
          TheCalcPro's algebra solver handles two fundamental equation types: <strong>linear equations</strong> and
          <strong> quadratic equations</strong>, providing step-by-step solutions so you can learn the method,
          not just the answer.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          The Quadratic Formula
        </h3>
        <p className="leading-relaxed">
          The most important formula in introductory algebra is the <strong>quadratic formula</strong>, which
          solves any equation of the form <em>ax² + bx + c = 0</em>:
        </p>
        <div className="p-4 rounded-2xl text-center text-lg font-mono" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          x = (−b ± √(b² − 4ac)) / 2a
        </div>
        <p className="leading-relaxed">
          Here, <strong>a</strong> is the coefficient of x², <strong>b</strong> is the coefficient of x,
          and <strong>c</strong> is the constant term. The expression <em>b² − 4ac</em> is the
          <strong> discriminant</strong> (D), which determines whether the equation has two real solutions
          (D &gt; 0), one repeated solution (D = 0), or two complex solutions (D &lt; 0).
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example: Solving 2x² + 3x − 5 = 0
        </h3>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Identify coefficients:</strong> a = 2, b = 3, c = −5</li>
          <li><strong>Compute the discriminant:</strong> D = 3² − 4(2)(−5) = 9 + 40 = <strong>49</strong></li>
          <li><strong>Since D = 49 &gt; 0</strong>, there are two distinct real roots</li>
          <li><strong>Apply the formula:</strong> x = (−3 ± √49) / (2 × 2) = (−3 ± 7) / 4</li>
          <li><strong>Root 1:</strong> x = (−3 + 7) / 4 = 4 / 4 = <strong>1</strong></li>
          <li><strong>Root 2:</strong> x = (−3 − 7) / 4 = −10 / 4 = <strong>−2.5</strong></li>
        </ol>
        <p className="leading-relaxed">
          The solutions are x = 1 and x = −2.5. You can verify by substituting each value back into
          the original equation: 2(1)² + 3(1) − 5 = 2 + 3 − 5 = 0 ✓
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Worked Examples: Finding the Discriminant of a Quadratic Equation
        </h3>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
          <li>
            <strong>What is the discriminant of −x² + x + 5 = 0?</strong> Here a = −1, b = 1, c = 5.
            Using D = b² − 4ac: D = (1)² − 4(−1)(5) = 1 + 20 = <strong>21</strong>.
          </li>
          <li>
            <strong>What is the discriminant of x² + 2x + 2 = 0?</strong> Here a = 1, b = 2, c = 2.
            Using D = b² − 4ac: D = (2)² − 4(1)(2) = 4 − 8 = <strong>−4</strong> (two complex roots).
          </li>
          <li>
            <strong>What is the discriminant of −x² + x − 3 = 0?</strong> Here a = −1, b = 1, c = −3.
            Using D = b² − 4ac: D = (1)² − 4(−1)(−3) = 1 − 12 = <strong>−11</strong> (two complex roots).
          </li>
        </ul>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Applications of Algebra
        </h3>
        <p className="leading-relaxed">
          Algebraic equations model real-world scenarios in physics (projectile motion), finance
          (break-even analysis), engineering (circuit equations), and everyday problem solving. For
          calculus-level differentiation, visit our <a href="/calculus" className="text-amber hover:underline">Calculus Solver</a>.
          For systems of equations, explore the <a href="/equations" className="text-amber hover:underline">Equation Solver</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQSection items={FAQS} title="Algebra Solver FAQ" />
      </div>
    </div>
  )
}
