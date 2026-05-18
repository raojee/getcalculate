import { createFileRoute } from '@tanstack/react-router'
import GraphPlotter from '../components/GraphPlotter'

export const Route = createFileRoute('/grapher')({
  head: () => ({
    meta: [
      { title: 'Interactive Online Graphing Calculator — TheCalcPro' },
      { name: 'description', content: 'Visualize complex mathematical functions with our high-performance interactive graphing tool. Support for asymptotes, multiple equations, and 2D function analysis.' },
      { name: 'keywords', content: 'graphing calculator, online plotter, function visualizer, plot math equations, interactive math graph' },
    ],
  }),
  component: GrapherPage,
})

function GrapherPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TheCalcPro Graphing Visualizer",
    "operatingSystem": "All",
    "applicationCategory": "MathApplication",
    "url": "https://thecalcpro.com/grapher",
    "description": "High-performance interactive graphing tool for visualizing mathematical functions with asymptote detection and multi-equation support.",
    "softwareVersion": "1.4.2",
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
        "name": "Can I plot multiple equations at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our graphing calculator supports plotting multiple simultaneous functions with unique color coding for each expression."
        }
      },
      {
        "@type": "Question",
        "name": "How does the tool handle asymptotes like 1/x?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The visualizer uses advanced discontinuity detection to break the line at asymptotes, preventing chart distortion and ensuring mathematical accuracy."
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
          Function <span className="text-amber">Plotter</span>
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          A high-precision engine for exploring mathematical behaviors, intersections, and limits in real-time.
        </p>
      </div>

      <div className="min-h-[700px]">
        <GraphPlotter />
      </div>

      {/* CLS Stable Ad/Resource Area */}
      <div className="mt-20 h-[300px] w-full glass rounded-[2.5rem] border-dashed border-white/5 flex items-center justify-center bg-white/[0.01]">
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-20">Analytic Documentation Slot</p>
      </div>
    </div>
  )
}

