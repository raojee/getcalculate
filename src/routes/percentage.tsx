import { createFileRoute } from '@tanstack/react-router'
import PercentageCalculator from '../components/PercentageCalculator'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/percentage')({
  head: () => ({
    meta: [
      { title: 'Percentage Calculator — Find %, Change & Difference | TheCalcPro' },
      { name: 'description', content: 'Free online percentage calculator. Quickly find what percent one number is of another, calculate percentage change, percentage difference, and apply discounts or tax.' },
      { name: 'keywords', content: 'percentage calculator, percent change calculator, percentage difference, discount calculator, tax calculator, what percent of' },
    ],
  }),
  component: PercentagePage,
})

const FAQS = [
  {
    q: 'How do I calculate what percentage one number is of another?',
    a: 'Use the formula: Percentage = (Part ÷ Whole) × 100. For example, if you scored 42 out of 50 on a test, your percentage is (42 ÷ 50) × 100 = 84%. This formula works for any situation where you need to express a part as a fraction of a total.',
  },
  {
    q: 'What is the difference between percentage change and percentage difference?',
    a: 'Percentage change measures how much a value has increased or decreased relative to its original value: ((New − Old) / Old) × 100%. Percentage difference compares two values symmetrically using their average as the reference: |V1 − V2| / ((V1 + V2) / 2) × 100%. Use percentage change when there is a clear "before" and "after"; use percentage difference when comparing two independent measurements.',
  },
  {
    q: 'How do I calculate a discount price?',
    a: 'To find the discounted price, calculate the discount amount first: Discount = Original Price × (Discount % ÷ 100). Then subtract: Sale Price = Original Price − Discount. For example, a $120 item at 25% off: Discount = 120 × 0.25 = $30, so the sale price is $120 − $30 = $90.',
  },
  {
    q: 'How do I add sales tax to a price?',
    a: 'Multiply the pre-tax price by (1 + Tax Rate / 100). For example, if an item costs $45.00 and the sales tax is 8.5%, the total is 45 × 1.085 = $48.83. This single-step formula gives you the tax-inclusive price directly.',
  },
]

function PercentagePage() {
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
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Percentage Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Quick tools for percentage of, change, and more.
        </p>
      </div>
      <PercentageCalculator />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          How to Calculate Percentages
        </h2>
        <p className="leading-relaxed">
          A percentage represents a number as a fraction of 100. The word itself comes from the Latin
          <em> per centum</em>, meaning "by the hundred." Percentages are used everywhere — from
          grading exams and calculating tips, to analyzing financial returns and interpreting
          statistical data. TheCalcPro's percentage calculator handles the three most common scenarios:
          finding what percent a number is of another, calculating percentage change between two values,
          and computing the percentage difference between any two quantities.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          The Three Core Percentage Formulas
        </h3>
        <ul className="list-disc pl-6 space-y-3 leading-relaxed">
          <li>
            <strong>Percentage of a number:</strong> P = (Part ÷ Whole) × 100.
            Variables: <em>Part</em> is the value you're measuring, <em>Whole</em> is the total reference value.
          </li>
          <li>
            <strong>Percentage change:</strong> ΔP = ((New Value − Old Value) ÷ Old Value) × 100%.
            A positive result indicates an increase; a negative result indicates a decrease.
          </li>
          <li>
            <strong>Percentage difference:</strong> D = |V₁ − V₂| ÷ ((V₁ + V₂) / 2) × 100%.
            This symmetric formula uses the average as the denominator, making it ideal for comparing
            two independent measurements.
          </li>
        </ul>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Real-World Example: Calculating a Salary Raise
        </h3>
        <p className="leading-relaxed">
          Suppose your annual salary increased from <strong>$52,000</strong> to <strong>$56,160</strong>.
          What percentage raise did you receive?
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Find the difference:</strong> $56,160 − $52,000 = <strong>$4,160</strong></li>
          <li><strong>Divide by the original:</strong> $4,160 ÷ $52,000 = <strong>0.08</strong></li>
          <li><strong>Multiply by 100:</strong> 0.08 × 100 = <strong>8%</strong></li>
        </ol>
        <p className="leading-relaxed">
          Your salary increased by <strong>8%</strong>. This same formula applies to price increases,
          investment returns, population growth, and any other scenario involving relative change.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Common Applications
        </h3>
        <p className="leading-relaxed">
          Percentages are essential in finance (interest rates, ROI), retail (discounts, markups, sales tax),
          academics (exam scores, GPA calculation), health (body fat percentage, nutrient daily values),
          and data science (accuracy metrics, error rates). Whether you're a student checking homework or a
          business owner calculating margins, this tool delivers instant, accurate results. For more advanced
          statistical analysis, try our <a href="/statistics" className="text-amber hover:underline">Statistics Engine</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQSection items={FAQS} title="Percentage Calculator FAQ" />
      </div>
    </div>
  )
}
