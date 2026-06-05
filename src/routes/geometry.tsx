import { createFileRoute } from '@tanstack/react-router'
import GeometrySolver from '../components/GeometrySolver'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/geometry')({
  head: () => ({
    meta: [
      { title: 'Interactive Geometry Solver & 3D Visualizer — TheCalcPro' },
      { name: 'description', content: 'Free online geometry calculator. Calculate area, perimeter, volume, and surface area for circles, triangles, rectangles, cylinders, spheres, and cones with step-by-step KaTeX explanations and 3D models.' },
      { name: 'keywords', content: 'geometry solver, area calculator, volume calculator, 3d shape visualizer, circle area, cylinder volume, surface area calculator' },
    ],
  }),
  component: GeometryPage,
})

const FAQS = [
  {
    q: 'How do I calculate the volume of a cylinder?',
    a: 'The volume of a cylinder is calculated using the formula V = πr²h, where r is the radius of the circular base and h is the height. This formula works because a cylinder is essentially a stack of circular cross-sections, each with area πr², extending through the height h. Enter radius and height into the solver to get instant results.',
  },
  {
    q: 'What is Heron\'s formula?',
    a: 'Heron\'s formula calculates the area of a triangle when all three side lengths (a, b, c) are known: Area = √(s(s−a)(s−b)(s−c)), where s = (a+b+c)/2 is the semi-perimeter. This is useful when the height of the triangle is not directly available, such as in surveying or construction.',
  },
  {
    q: 'What is the difference between area and surface area?',
    a: 'Area refers to the space enclosed by a 2D shape (like a circle or rectangle). Surface area is the total area of all the faces of a 3D shape (like a cylinder or sphere). For example, a cylinder has two circular faces (2πr²) plus a curved lateral surface (2πrh), giving a total surface area of 2πr(r+h).',
  },
  {
    q: 'How do I find the area of an irregular shape?',
    a: 'Break the irregular shape into simpler geometric primitives (rectangles, triangles, circles) whose areas you can calculate individually. Sum the areas of the component shapes, subtracting any overlapping regions. For complex boundaries, advanced methods like numerical integration or the shoelace formula for polygons can be used.',
  },
]

function GeometryPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Geometry Solver & Visualizer",
    "operatingSystem": "All",
    "applicationCategory": "EducationalApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "url": "https://thecalcpro.com/geometry",
    "description": "Calculate area, perimeter, volume, and surface area for standard shapes with step-by-step KaTeX explanations and responsive 3D visual models.",
    "softwareVersion": "2.1.0",
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
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="mb-10 px-4 sm:px-0">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Geometry <span className="text-amber">Visualizer</span>
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Analyze 2D and 3D primitives with real-time vector rendering and parametric recalculation.
        </p>
      </div>

      <div className="min-h-[600px]">
        <GeometrySolver />
      </div>

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Essential Geometry Formulas Explained
        </h2>
        <p className="leading-relaxed">
          Geometry is the branch of mathematics concerned with the properties and measurements of shapes,
          surfaces, and solids. Whether you're calculating the area of a room for flooring, the volume
          of a water tank, or the surface area of packaging material, geometry formulas are the tools
          that translate physical dimensions into actionable numbers. TheCalcPro's geometry solver covers
          both <strong>2D shapes</strong> (circles, triangles, rectangles, trapezoids) and
          <strong> 3D solids</strong> (cylinders, spheres, cones, prisms) with step-by-step explanations
          rendered in beautiful KaTeX notation.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Commonly Used Formulas
        </h3>
        <div className="p-4 rounded-2xl font-mono text-sm space-y-1" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          <p><strong>Circle Area:</strong> A = πr²</p>
          <p><strong>Triangle Area:</strong> A = ½ × base × height</p>
          <p><strong>Cylinder Volume:</strong> V = πr²h</p>
          <p><strong>Sphere Volume:</strong> V = (4/3)πr³</p>
          <p><strong>Cone Volume:</strong> V = (1/3)πr²h</p>
        </div>
        <p className="leading-relaxed">
          In these formulas, <strong>r</strong> is the radius, <strong>h</strong> is the height, and
          <strong> π</strong> (pi) ≈ 3.14159. The solver handles all unit conversions internally, so you
          can enter measurements in centimeters, meters, inches, or feet.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example: Volume of a Cylinder
        </h3>
        <p className="leading-relaxed">
          A water tank has a <strong>radius of 1.5 meters</strong> and a <strong>height of 3 meters</strong>.
          How much water can it hold?
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Write the formula:</strong> V = πr²h</li>
          <li><strong>Substitute values:</strong> V = π × (1.5)² × 3</li>
          <li><strong>Compute r²:</strong> (1.5)² = 2.25</li>
          <li><strong>Multiply:</strong> V = π × 2.25 × 3 = π × 6.75</li>
          <li><strong>Evaluate:</strong> V = 3.14159 × 6.75 ≈ <strong>21.21 cubic meters</strong></li>
          <li><strong>Convert to liters:</strong> 21.21 m³ × 1000 = <strong>21,206 liters</strong></li>
        </ol>
        <p className="leading-relaxed">
          The tank holds approximately <strong>21,206 liters</strong> of water. This calculation is
          routinely used in construction, plumbing, and industrial engineering. For more complex
          algebraic calculations involving these measurements, visit our
          <a href="/algebra" className="text-amber hover:underline"> Algebra Solver</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12 max-w-3xl">
        <FAQSection items={FAQS} title="Geometry Calculator FAQ" />
      </div>
    </div>
  )
}
