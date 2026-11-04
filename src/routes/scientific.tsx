import { createFileRoute } from '@tanstack/react-router'
import ScientificCalculator from '../components/ScientificCalculator'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/scientific')({
  head: () => ({
    meta: [
      { title: 'Scientific Calculator Online (Free) — Trig, Log & History' },
      {
        name: 'description',
        content:
          'Free Scientific Calculator Online with history tape, sin/cos/tan (DEG & RAD), inverse trig, logs (ln, log), exponents, roots & keyboard shortcuts. Instant & no sign-up.',
      },
      {
        name: 'keywords',
        content:
          'scientific calculator, scientific calculator online, free scientific calculator, online scientific calculator, scientific calculator with history, sin cos tan calculator, trigonometry calculator, logarithm calculator',
      },
      { property: 'og:title', content: 'Scientific Calculator Online (Free) — Trig, Log & History | TheCalcPro' },
      {
        property: 'og:description',
        content:
          'Free Scientific Calculator Online with history tape, keyboard shortcuts, DEG/RAD toggle, trig, logs, exponents, and factorials. Fast & 100% browser-based.',
      },
      { property: 'og:url', content: 'https://thecalcpro.com/scientific' },
      { name: 'twitter:title', content: 'Scientific Calculator Online (Free) — Trig, Log & History' },
      {
        name: 'twitter:description',
        content:
          'Free Scientific Calculator Online with calculation history, DEG/RAD trig functions, logs, and keyboard support.',
      },
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

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TheCalcPro Scientific Calculator Online",
    "url": "https://thecalcpro.com/scientific",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Trigonometric functions (sin, cos, tan, asin, acos, atan) in Degrees and Radians",
      "Logarithms (ln, log10) and exponential powers",
      "Calculation history tape with one-click recall",
      "Full keyboard shortcuts support",
      "Factorials (n!), square roots, percentage, and constants (π, e)"
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://thecalcpro.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Scientific Calculator Online",
        "item": "https://thecalcpro.com/scientific"
      }
    ]
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Scientific Calculator Online
        </h1>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Free full-screen scientific calculator with calculation history tape, keyboard shortcuts, DEG/RAD trigonometry, logarithms, exponents, and factorials.
        </p>

        {/* Jump-Link Navigation for Google Sitelinks */}
        <nav aria-label="Page sections" className="flex flex-wrap gap-2 text-xs">
          <a href="#calculator-functions" className="px-3 py-1 rounded-full glass hover:border-amber/40 transition-colors" style={{ color: 'var(--text-secondary)' }}>
            Functions Reference
          </a>
          <a href="#keyboard-shortcuts" className="px-3 py-1 rounded-full glass hover:border-amber/40 transition-colors" style={{ color: 'var(--text-secondary)' }}>
            Keyboard Shortcuts
          </a>
          <a href="#examples" className="px-3 py-1 rounded-full glass hover:border-amber/40 transition-colors" style={{ color: 'var(--text-secondary)' }}>
            Step-by-Step Example
          </a>
          <a href="#scientific-faq" className="px-3 py-1 rounded-full glass hover:border-amber/40 transition-colors" style={{ color: 'var(--text-secondary)' }}>
            FAQ
          </a>
        </nav>
      </div>
      <ScientificCalculator />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-8" style={{ color: 'var(--text-secondary)' }}>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            How to Use Our Free Scientific Calculator Online
          </h2>
          <p className="leading-relaxed">
            Whether you are solving high school math homework, college engineering equations, or physics formulas, our
            <strong> scientific calculator</strong> (available 100% free as a <strong>scientific calculator online</strong>)
            gives you instant, double-precision results directly in your browser. Unlike basic built-in search calculators,
            it features a persistent <strong>calculation history tape</strong>, <strong>inverse trigonometric functions</strong> (sin⁻¹, cos⁻¹, tan⁻¹),
            <strong> Degrees &amp; Radians toggle</strong>, <strong>logarithms</strong> (ln and log₁₀),
            <strong> exponents &amp; roots</strong> (x², x³, xʸ, √x), and <strong>factorials</strong> (n!).
          </p>
        </section>

        {/* Structured Function Reference Table for Featured Snippets */}
        <section id="calculator-functions" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Scientific Calculator Functions &amp; Buttons Reference
          </h2>
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                  <th className="py-3 px-4 font-bold">Button / Key</th>
                  <th className="py-3 px-4 font-bold">Function Name</th>
                  <th className="py-3 px-4 font-bold">Description &amp; Example</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-amber font-semibold">sin, cos, tan</td>
                  <td className="py-2.5 px-4">Trigonometric Ratios</td>
                  <td className="py-2.5 px-4">Computes sine, cosine, or tangent in DEG or RAD mode (e.g., sin(30°) = 0.5).</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-amber font-semibold">sin⁻¹, cos⁻¹, tan⁻¹</td>
                  <td className="py-2.5 px-4">Inverse Trigonometry (2nd)</td>
                  <td className="py-2.5 px-4">Finds the angle from a ratio: arcsin, arccos, arctan (e.g., sin⁻¹(0.5) = 30°).</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-amber font-semibold">ln / log</td>
                  <td className="py-2.5 px-4">Natural &amp; Common Logarithm</td>
                  <td className="py-2.5 px-4">ln computes base-e logarithm; log computes base-10 logarithm (log(100) = 2).</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-amber font-semibold">xʸ / x² / √x</td>
                  <td className="py-2.5 px-4">Exponents &amp; Square Root</td>
                  <td className="py-2.5 px-4">Raises x to power y, squares a number, or extracts the principal square root.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-amber font-semibold">n!</td>
                  <td className="py-2.5 px-4">Factorial</td>
                  <td className="py-2.5 px-4">Product of all positive integers up to n (e.g., 5! = 120, supports up to 170!).</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-amber font-semibold">π / e</td>
                  <td className="py-2.5 px-4">Mathematical Constants</td>
                  <td className="py-2.5 px-4">Inserts Pi (3.1415926535…) or Euler&apos;s number e (2.7182818284…).</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-mono text-amber font-semibold">DEG / RAD</td>
                  <td className="py-2.5 px-4">Angle Unit Mode</td>
                  <td className="py-2.5 px-4">Toggles angle evaluation between Degrees (360°) and Radians (2π).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Keyboard Shortcuts Table */}
        <section id="keyboard-shortcuts" className="space-y-4 scroll-mt-20">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Keyboard Shortcuts for Fast Calculation
          </h2>
          <p className="leading-relaxed">
            You can operate this scientific calculator online entirely from your keyboard without clicking buttons:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
              <strong className="text-amber font-mono">0–9, .</strong> — Enter numbers and decimal points
            </div>
            <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
              <strong className="text-amber font-mono">+, -, *, /</strong> — Basic arithmetic operators
            </div>
            <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
              <strong className="text-amber font-mono">Enter or =</strong> — Evaluate expression &amp; save to history
            </div>
            <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
              <strong className="text-amber font-mono">Backspace / Esc</strong> — Delete last digit or Clear All (AC)
            </div>
          </div>
        </section>

        <section className="space-y-4">
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
        </section>

        <section id="examples" className="space-y-4 scroll-mt-20">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Step-by-Step Example: Calculating Projectile Height
          </h3>
          <p className="leading-relaxed">
            In physics, the vertical component of a projectile&apos;s velocity is given by
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
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Related Math &amp; Engineering Calculators
          </h3>
          <p className="leading-relaxed">
            Scientific calculators are essential tools for high school and university students studying
            algebra, trigonometry, calculus, and physics. Need specialized solvers? Try our{' '}
            <a href="/algebra" className="text-amber hover:underline">Algebra Calculator</a>,{' '}
            <a href="/calculus" className="text-amber hover:underline">Calculus Derivative &amp; Integral Solver</a>,{' '}
            <a href="/trigonometry" className="text-amber hover:underline">Trigonometry Unit Circle Calculator</a>,{' '}
            <a href="/matrix" className="text-amber hover:underline">Matrix Calculator</a>, or{' '}
            <a href="/grapher" className="text-amber hover:underline">Interactive Graph Plotter</a>.
          </p>
        </section>
      </article>

      {/* FAQ Section */}
      <div id="scientific-faq" className="mt-12 scroll-mt-20">
        <FAQSection items={FAQS} title="Scientific Calculator FAQ" />
      </div>
    </div>
  )
}
