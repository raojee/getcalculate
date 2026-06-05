import { createFileRoute } from '@tanstack/react-router'
import TrigSolver from '../components/TrigSolver'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/trigonometry')({
  head: () => ({
    meta: [
      { title: 'Trigonometry Solver — Sin, Cos, Tan & Unit Circle | TheCalcPro' },
      { name: 'description', content: 'Free online trigonometry solver. Compute sine, cosine, tangent and their inverses in degrees or radians. Includes unit circle reference, SOH-CAH-TOA guide, and step-by-step trig calculations.' },
      { name: 'keywords', content: 'trigonometry solver, sin cos tan calculator, unit circle calculator, inverse trig functions, SOH-CAH-TOA, radian to degree converter' },
    ],
  }),
  component: TrigPage,
})

const FAQS = [
  {
    q: 'What does SOH-CAH-TOA mean?',
    a: 'SOH-CAH-TOA is a mnemonic for the three primary trigonometric ratios in a right triangle. SOH: Sine = Opposite / Hypotenuse. CAH: Cosine = Adjacent / Hypotenuse. TOA: Tangent = Opposite / Adjacent. These ratios relate the sides of a right triangle to its acute angles and form the foundation of all trigonometric calculations.',
  },
  {
    q: 'How do I convert between degrees and radians?',
    a: 'To convert degrees to radians, multiply by π/180. To convert radians to degrees, multiply by 180/π. Common conversions: 90° = π/2, 180° = π, 270° = 3π/2, 360° = 2π. The radian is the standard unit in calculus and physics because it simplifies many formulas (e.g., arc length s = rθ works directly in radians).',
  },
  {
    q: 'What are inverse trigonometric functions?',
    a: 'Inverse trigonometric functions (arcsin, arccos, arctan) reverse the standard trig functions. If sin(θ) = 0.5, then arcsin(0.5) = 30° (or π/6 radians). They are used to find an angle when you know the ratio of two sides. Note that inverse functions have restricted ranges to ensure a unique output: arcsin returns [−90°, 90°], arccos returns [0°, 180°], and arctan returns (−90°, 90°).',
  },
  {
    q: 'What is the unit circle and why is it important?',
    a: 'The unit circle is a circle with radius 1 centered at the origin of the coordinate plane. For any angle θ measured counterclockwise from the positive x-axis, the point on the unit circle is (cos θ, sin θ). This geometric interpretation makes it easy to determine exact values of trig functions at standard angles (0°, 30°, 45°, 60°, 90°, etc.) and to understand why sine and cosine are periodic with period 2π.',
  },
]

function TrigPage() {
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
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Trigonometry Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Compute sine, cosine, tangent and their inverses with degrees or radians.
        </p>
      </div>
      <TrigSolver />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Understanding Trigonometry
        </h2>
        <p className="leading-relaxed">
          Trigonometry is the branch of mathematics that studies relationships between the sides and
          angles of triangles. It is indispensable in fields ranging from architecture and civil
          engineering to astronomy, navigation, and computer graphics. TheCalcPro's trigonometry
          solver computes all six trigonometric functions — <strong>sine</strong>, <strong>cosine</strong>,
          <strong> tangent</strong>, <strong>cosecant</strong>, <strong>secant</strong>, and
          <strong> cotangent</strong> — in both degree and radian mode, with instant results and
          no server-side processing.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Core Trigonometric Ratios (Right Triangle)
        </h3>
        <p className="leading-relaxed">
          In a right triangle with an acute angle θ, the three primary ratios are defined as:
        </p>
        <div className="p-4 rounded-2xl font-mono text-sm space-y-1" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          <p>sin(θ) = Opposite / Hypotenuse</p>
          <p>cos(θ) = Adjacent / Hypotenuse</p>
          <p>tan(θ) = Opposite / Adjacent = sin(θ) / cos(θ)</p>
        </div>
        <p className="leading-relaxed">
          The reciprocal functions are: <strong>csc(θ) = 1/sin(θ)</strong>,
          <strong> sec(θ) = 1/cos(θ)</strong>, and <strong>cot(θ) = 1/tan(θ)</strong>.
          Together, these six functions completely describe the angular relationships in any triangle.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example: Finding the Height of a Building
        </h3>
        <p className="leading-relaxed">
          You stand <strong>30 meters</strong> from the base of a building. Using a clinometer,
          you measure the angle of elevation to the rooftop as <strong>55°</strong>. How tall is the building?
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Identify the triangle:</strong> The distance from you to the building is the adjacent side (30 m), and the height is the opposite side (unknown h).</li>
          <li><strong>Choose the right ratio:</strong> tan(θ) = Opposite / Adjacent, so tan(55°) = h / 30</li>
          <li><strong>Compute tan(55°):</strong> tan(55°) = <strong>1.4281</strong></li>
          <li><strong>Solve for h:</strong> h = 30 × 1.4281 = <strong>42.84 meters</strong></li>
        </ol>
        <p className="leading-relaxed">
          The building is approximately <strong>42.84 meters tall</strong>. This surveying technique is used
          by architects, land surveyors, and construction professionals worldwide. For more advanced function
          analysis, explore our <a href="/grapher" className="text-amber hover:underline">Function Plotter</a> to
          visualize trig functions graphically.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQSection items={FAQS} title="Trigonometry FAQ" />
      </div>
    </div>
  )
}
