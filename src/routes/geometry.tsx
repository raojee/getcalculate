import { createFileRoute } from '@tanstack/react-router'
import GeometrySolver from '../components/GeometrySolver'

export const Route = createFileRoute('/geometry')({
  head: () => ({
    meta: [
      { title: 'Interactive Geometry Solver & 3D Visualizer — CalcPro' },
      { name: 'description', content: 'Calculate area, perimeter, volume, and surface area for standard shapes with step-by-step KaTeX explanations and responsive 3D visual models.' },
      { name: 'keywords', content: 'geometry solver, area calculator, volume calculator, 3d shape visualizer, circle area, cylinder volume' },
    ],
  }),
  component: GeometryPage,
})

function GeometryPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Geometry Solver & Visualizer",
    "operatingSystem": "All",
    "applicationCategory": "EducationalApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "url": "https://calc.raotahir.online/geometry",
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
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate the volume of a cylinder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The volume of a cylinder is calculated using the formula V = πr²h, where r is the radius of the base and h is the height."
        }
      },
      {
        "@type": "Question",
        "name": "What is Heron's formula?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Heron's formula is used to find the area of a triangle when all three side lengths are known: Area = √(s(s-a)(s-b)(s-c)), where s is the semi-perimeter."
        }
      }
    ]
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

      {/* Placeholder for SEO Content / Ads to prevent CLS */}
      <div className="mt-20 h-[250px] w-full glass rounded-[2.5rem] border-dashed border-white/5 flex items-center justify-center bg-white/[0.01]">
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-20">Educational Resources Area</p>
      </div>
    </div>
  )
}

