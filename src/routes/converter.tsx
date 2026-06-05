import { createFileRoute } from '@tanstack/react-router'
import UnitConverter from '../components/UnitConverter'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/converter')({
  head: () => ({
    meta: [
      { title: 'Unit Converter — Length, Weight, Temperature & More | TheCalcPro' },
      { name: 'description', content: 'Free online unit converter. Instantly convert between units of length (meters, feet, inches), weight (kg, lbs), temperature (°C, °F, K), volume, speed, and more with precise conversion formulas.' },
      { name: 'keywords', content: 'unit converter, length converter, weight converter, temperature converter, metric to imperial, kg to lbs, celsius to fahrenheit' },
    ],
  }),
  component: ConverterPage,
})

const FAQS = [
  {
    q: 'How do I convert Celsius to Fahrenheit?',
    a: 'Use the formula: °F = (°C × 9/5) + 32. For example, to convert 25°C: (25 × 9/5) + 32 = 45 + 32 = 77°F. To convert back from Fahrenheit to Celsius: °C = (°F − 32) × 5/9.',
  },
  {
    q: 'What is the difference between metric and imperial units?',
    a: 'The metric system (SI) uses base-10 units like meters, kilograms, and liters — widely used worldwide and in science. The imperial system uses units like feet, pounds, and gallons — primarily used in the United States. This converter bridges both systems with exact conversion factors.',
  },
  {
    q: 'How many centimeters are in an inch?',
    a: 'One inch equals exactly 2.54 centimeters. This conversion factor is defined by international agreement and is exact — not an approximation. To convert inches to centimeters, multiply by 2.54. To convert centimeters to inches, divide by 2.54.',
  },
  {
    q: 'How do I convert kilograms to pounds?',
    a: 'Multiply the weight in kilograms by 2.20462 to get pounds. For example, 70 kg × 2.20462 = 154.32 lbs. To convert pounds to kilograms, divide by 2.20462 (or multiply by 0.45359). These conversion factors are based on the international avoirdupois pound.',
  },
]

function ConverterPage() {
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
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Unit Converter</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Convert values between various scientific and everyday units.
        </p>
      </div>
      <UnitConverter />

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          How Unit Conversion Works
        </h2>
        <p className="leading-relaxed">
          Unit conversion is the process of expressing a measurement in a different unit while preserving
          the same physical quantity. It is essential in science, engineering, cooking, travel, and everyday
          life whenever information from different measurement systems must be compared. TheCalcPro's unit
          converter supports length, weight (mass), temperature, volume, speed, and area conversions
          between metric (SI) and imperial systems with exact conversion factors.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Key Conversion Formulas
        </h3>
        <div className="p-4 rounded-2xl font-mono text-sm space-y-1" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          <p><strong>Length:</strong> 1 inch = 2.54 cm | 1 foot = 0.3048 m | 1 mile = 1.60934 km</p>
          <p><strong>Weight:</strong> 1 kg = 2.20462 lbs | 1 oz = 28.3495 g</p>
          <p><strong>Temperature:</strong> °F = (°C × 9/5) + 32 | K = °C + 273.15</p>
          <p><strong>Volume:</strong> 1 gallon = 3.78541 liters | 1 cup = 236.588 mL</p>
        </div>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example: Converting 5 Miles to Kilometers
        </h3>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Identify the conversion factor:</strong> 1 mile = 1.60934 kilometers</li>
          <li><strong>Multiply:</strong> 5 miles × 1.60934 km/mile = <strong>8.047 km</strong></li>
          <li><strong>Verify:</strong> 8.047 km ÷ 1.60934 = 5 miles ✓</li>
        </ol>
        <p className="leading-relaxed">
          The dimensional analysis approach — multiplying by a conversion factor that equals 1 — guarantees
          that the physical quantity is preserved while the unit changes. This is the standard method
          taught in chemistry, physics, and engineering courses worldwide.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          When Do You Need Unit Conversion?
        </h3>
        <p className="leading-relaxed">
          Unit conversions are needed when traveling internationally (miles ↔ kilometers), following recipes
          from different countries (cups ↔ milliliters), comparing product specifications (kg ↔ lbs),
          working with scientific data (Kelvin ↔ Celsius), and in engineering projects that mix metric
          and imperial drawings. For percentage-based calculations, visit our
          <a href="/percentage" className="text-amber hover:underline"> Percentage Calculator</a>. For
          geometry measurements, explore the <a href="/geometry" className="text-amber hover:underline">Geometry Solver</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12">
        <FAQSection items={FAQS} title="Unit Converter FAQ" />
      </div>
    </div>
  )
}
