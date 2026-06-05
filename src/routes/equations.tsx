import { createFileRoute } from '@tanstack/react-router'
import EquationSolver from '../components/EquationSolver'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/equations')({
  head: () => ({
    meta: [
      { title: 'System of Equations Solver — Step-by-Step Solutions | TheCalcPro' },
      { name: 'description', content: 'Free online equation solver. Solve systems of linear equations, simultaneous equations, and complex expressions step by step using substitution, elimination, and matrix methods.' },
      { name: 'keywords', content: 'equation solver, system of equations, simultaneous equations, linear equations solver, substitution method, elimination method' },
    ],
  }),
  component: EquationsPage,
})

const FAQS = [
  {
    q: 'What is a system of equations?',
    a: 'A system of equations is a set of two or more equations with the same variables. The solution is the set of values that satisfies all equations simultaneously. For example, the system {x + y = 10, 2x − y = 2} has the solution x = 4, y = 6, because both equations are true when these values are substituted.',
  },
  {
    q: 'What methods are used to solve systems of equations?',
    a: 'The three primary methods are: (1) Substitution — solve one equation for a variable and substitute into the other. (2) Elimination — add or subtract equations to eliminate one variable. (3) Matrix methods — express the system as Ax = b and solve using inverse matrices or row reduction. Each method gives the same answer; the choice depends on which is most convenient for the given system.',
  },
  {
    q: 'What if a system has no solution or infinitely many solutions?',
    a: 'A system with no solution is called "inconsistent" — the equations represent parallel lines (in 2D) that never intersect. A system with infinitely many solutions is called "dependent" — the equations represent the same line, so every point on that line is a solution. The solver automatically detects and reports these special cases.',
  },
  {
    q: 'Can this solver handle equations with fractions or decimals?',
    a: 'Yes. The equation solver processes coefficients in any numeric format — integers, decimals, or fractions. Internally, it normalizes all terms to a common representation before applying the solution algorithm, ensuring full precision regardless of the input format.',
  },
]

function EquationsPage() {
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
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Equation Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Solve for variables in various types of equations.
        </p>
      </div>
      <EquationSolver />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          How to Solve Systems of Equations
        </h2>
        <p className="leading-relaxed">
          A system of equations is a collection of two or more equations sharing common variables. Solving
          the system means finding the values of all variables that satisfy every equation simultaneously.
          Systems of equations appear throughout mathematics, physics, engineering, and economics —
          whenever multiple constraints must be satisfied at the same time. TheCalcPro's equation solver
          handles linear systems and provides step-by-step solutions so you can follow the logic behind
          each operation.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          The Elimination Method
        </h3>
        <p className="leading-relaxed">
          The <strong>elimination method</strong> (also called the addition method) works by adding or
          subtracting equations to eliminate one variable, reducing the system to a single equation
          in one unknown. The general process:
        </p>
        <ol className="list-decimal pl-6 space-y-1 leading-relaxed">
          <li>Align both equations with matching variable columns.</li>
          <li>Multiply one or both equations by constants so that one variable has opposite coefficients.</li>
          <li>Add the equations to eliminate that variable.</li>
          <li>Solve the resulting single-variable equation.</li>
          <li>Substitute back to find the remaining variable.</li>
        </ol>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example
        </h3>
        <p className="leading-relaxed">
          Solve the system: <strong>2x + 3y = 12</strong> and <strong>4x − y = 5</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Multiply Equation 2 by 3:</strong> 12x − 3y = 15</li>
          <li><strong>Add to Equation 1:</strong> (2x + 3y) + (12x − 3y) = 12 + 15 → 14x = 27</li>
          <li><strong>Solve for x:</strong> x = 27 / 14 ≈ <strong>1.929</strong></li>
          <li><strong>Substitute into Equation 2:</strong> 4(1.929) − y = 5 → 7.714 − y = 5 → y ≈ <strong>2.714</strong></li>
          <li><strong>Verify in Equation 1:</strong> 2(1.929) + 3(2.714) = 3.857 + 8.143 = 12 ✓</li>
        </ol>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Real-World Applications
        </h3>
        <p className="leading-relaxed">
          Systems of equations model situations with multiple constraints: balancing chemical equations,
          circuit analysis (Kirchhoff's laws), supply-and-demand equilibrium in economics, and traffic flow
          modeling. For single-variable equations, use our <a href="/algebra" className="text-amber hover:underline">Algebra Solver</a>.
          For matrix-based approaches to larger systems, explore the <a href="/matrix" className="text-amber hover:underline">Matrix Calculator</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQSection items={FAQS} title="Equation Solver FAQ" />
      </div>
    </div>
  )
}
