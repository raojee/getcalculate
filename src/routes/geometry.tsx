import { createFileRoute } from '@tanstack/react-router'
import GeometrySolver from '../components/GeometrySolver'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/geometry')({
  head: () => ({
    meta: [
      { title: 'Volume & Geometry Calculator (Free) — 3D Solids & Area' },
      {
        name: 'description',
        content:
          'Free Volume Calculator & Geometry Solver: calculate volume of a cylinder, sphere, tube/pipe, cone, ring, and irregular shapes with step-by-step formulas.',
      },
      {
        name: 'keywords',
        content:
          'volume calculator, volume of solid calculator, sphere volume calculator, cylinder volume calculator, volume of a tube, volume calculator tube, irregular shape volume calculator, capsule volume calculator, volume of a ring calculator, geometry simulator',
      },
      { property: 'og:title', content: 'Volume & Geometry Calculator (Free) — 3D Solids & Area' },
      { property: 'og:url', content: 'https://thecalcpro.com/geometry' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
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
    "@type": "SoftwareApplication",
    "name": "Geometry & Volume Calculator (Sphere, Cylinder & 3D Solids)",
    "alternateName": [
      "Sphere Volume Calculator",
      "Volume of a Sphere Calculator",
      "Geometric Solids Calculator",
      "Volumetric Calculator",
      "Volume Solver",
      "Geometry Visualizer",
      "Geometry Simulator",
      "Shape Visualiser"
    ],
    "operatingSystem": "All",
    "applicationCategory": "EducationalApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "url": "https://thecalcpro.com/geometry",
    "description": "Calculate sphere volume, cylinder volume, cone volume, area, perimeter, and surface area for 2D shapes and 3D geometric solids with step-by-step explanations.",
    "softwareVersion": "2.2.0",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thecalcpro.com" },
      { "@type": "ListItem", "position": 2, "name": "Volume & Geometry Calculator", "item": "https://thecalcpro.com/geometry" }
    ]
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
          Geometry &amp; <span className="text-amber">Volume Calculator</span>
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Free sphere volume calculator, cylinder volume solver, and interactive 3D geometric solids visualizer with step-by-step formulas.
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
          How to Calculate Sphere, Tube (Pipe), Capsule &amp; Ring Volume
        </h3>
        <p className="leading-relaxed">
          Our <strong>volume calculator</strong> supports all standard and composite 3D geometric solids:
        </p>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
          <li>
            <strong>Sphere Volume:</strong> <code>V = (4/3)πr³</code> — For radius r = 3 cm, V = 36π ≈ <strong>113.10 cm³</strong>.
          </li>
          <li>
            <strong>Tube / Pipe Volume (Hollow Cylinder):</strong> <code>V = π(R² − r²)h</code> — Subtract the inner radius squared (r²) from the outer radius squared (R²) and multiply by π and length h.
          </li>
          <li>
            <strong>Capsule Volume:</strong> <code>V = πr²((4/3)r + a)</code> — Combines a cylinder of length <em>a</em> with two hemispherical ends of radius <em>r</em>.
          </li>
          <li>
            <strong>Ring / Torus Volume:</strong> <code>V = 2π²Rr²</code> — Where <em>R</em> is the major radius (center of ring to center of tube) and <em>r</em> is the tube&apos;s cross-sectional radius.
          </li>
        </ul>

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
