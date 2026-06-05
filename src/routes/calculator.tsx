import { createFileRoute } from '@tanstack/react-router'
import StandardCalculator from '../components/StandardCalculator'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/calculator')({
  head: () => ({
    meta: [
      { title: 'Free Online Calculator — Basic Arithmetic & PEMDAS | TheCalcPro' },
      { name: 'description', content: 'Free online standard calculator for addition, subtraction, multiplication, and division. Supports order of operations (PEMDAS), keyboard input, and calculation history.' },
      { name: 'keywords', content: 'online calculator, basic calculator, free calculator, arithmetic calculator, PEMDAS calculator, math calculator' },
    ],
  }),
  component: BasicPage,
})

const FAQS = [
  {
    q: 'What is the order of operations (PEMDAS)?',
    a: 'PEMDAS stands for Parentheses, Exponents, Multiplication/Division (left to right), and Addition/Subtraction (left to right). It is the standard rule that determines which parts of a mathematical expression are evaluated first. For example, in 3 + 4 × 2 the multiplication is performed before the addition, yielding 11 — not 14.',
  },
  {
    q: 'Can I use my keyboard to enter calculations?',
    a: 'Yes. TheCalcPro\'s standard calculator supports full keyboard input. Use the number keys (0–9) for digits, +, −, *, / for operators, Enter or = to evaluate, Backspace to delete, and Escape or C to clear the display.',
  },
  {
    q: 'How does the calculator handle division by zero?',
    a: 'Dividing any number by zero is mathematically undefined. The calculator will display an "Error" message instead of a numeric result. This follows the standard mathematical convention that division by zero has no defined value.',
  },
  {
    q: 'What is the maximum number of digits supported?',
    a: 'The calculator uses JavaScript\'s native floating-point arithmetic (IEEE 754 double-precision), which provides approximately 15–17 significant decimal digits of precision. For most everyday calculations this is more than sufficient.',
  },
]

function BasicPage() {
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

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Standard Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Simple, fast, and responsive.
        </p>
      </div>
      <div className="flex justify-center">
        <StandardCalculator />
      </div>

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          What Is an Online Calculator?
        </h2>
        <p className="leading-relaxed">
          An online calculator is a browser-based tool that performs fundamental arithmetic operations — addition,
          subtraction, multiplication, and division — without requiring any software installation or sign-up.
          TheCalcPro's standard calculator is designed for students, professionals, and everyday users who need
          quick, accurate results for daily computations such as budgeting, shopping discounts, recipe scaling,
          and homework checks.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Core Formulas &amp; Operations
        </h3>
        <p className="leading-relaxed">
          Every arithmetic calculation relies on four fundamental operations. <strong>Addition</strong> (a + b)
          combines two quantities. <strong>Subtraction</strong> (a − b) finds the difference between them.
          <strong> Multiplication</strong> (a × b) computes the product, representing repeated addition.
          <strong> Division</strong> (a ÷ b) splits a quantity into equal parts. When an expression contains
          multiple operations, the <strong>order of operations</strong> (commonly remembered as
          <em> PEMDAS</em> — Parentheses, Exponents, Multiplication/Division, Addition/Subtraction) dictates
          the evaluation sequence.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example
        </h3>
        <p className="leading-relaxed">
          Suppose you are splitting a restaurant bill. The total is <strong>$84.50</strong>, and you want to
          add a <strong>20% tip</strong>, then divide the final amount equally among <strong>4 people</strong>.
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Calculate the tip:</strong> 84.50 × 0.20 = <strong>$16.90</strong></li>
          <li><strong>Add tip to the bill:</strong> 84.50 + 16.90 = <strong>$101.40</strong></li>
          <li><strong>Divide among 4 people:</strong> 101.40 ÷ 4 = <strong>$25.35 per person</strong></li>
        </ol>
        <p className="leading-relaxed">
          This three-step process demonstrates how a basic calculator transforms real-world financial
          questions into simple arithmetic. Enter each operation sequentially, or use the built-in
          memory functions to store intermediate results.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          When to Use a Standard Calculator
        </h3>
        <p className="leading-relaxed">
          A standard calculator is ideal for quick computations that don't require advanced functions like
          trigonometry or logarithms. Common use cases include balancing a checkbook, calculating grocery
          totals, converting currencies with a known exchange rate, computing simple interest, and verifying
          mental math during exams. For more complex mathematical needs, explore TheCalcPro's
          <a href="/scientific" className="text-amber hover:underline"> Scientific Calculator</a> or
          <a href="/algebra" className="text-amber hover:underline"> Algebra Solver</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQSection items={FAQS} title="Standard Calculator FAQ" />
      </div>
    </div>
  )
}
