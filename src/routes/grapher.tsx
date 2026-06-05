import { createFileRoute } from '@tanstack/react-router'
import GraphPlotter from '../components/GraphPlotter'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/grapher')({
  head: () => ({
    meta: [
      { title: 'Interactive Online Graphing Calculator — TheCalcPro' },
      { name: 'description', content: 'Free interactive graphing calculator. Visualize mathematical functions, plot multiple equations simultaneously, detect asymptotes, and explore domain and range with a high-performance 2D renderer.' },
      { name: 'keywords', content: 'graphing calculator, online plotter, function visualizer, plot math equations, interactive math graph, asymptote detector' },
    ],
  }),
  component: GrapherPage,
})

const FAQS = [
  {
    q: 'Can I plot multiple equations at once?',
    a: 'Yes. The graphing calculator supports plotting multiple simultaneous functions with unique color coding for each expression. Simply add additional input fields and enter separate equations. All functions render on the same coordinate plane, making it easy to find intersections and compare behaviors.',
  },
  {
    q: 'How does the tool handle asymptotes like 1/x?',
    a: 'The visualizer uses advanced discontinuity detection to break the line at asymptotes, preventing chart distortion. When the function value approaches infinity (such as at x = 0 for 1/x), the renderer stops the line segment and restarts on the other side of the discontinuity, ensuring mathematical accuracy in the visual output.',
  },
  {
    q: 'What is the domain and range of a function?',
    a: 'The domain is the set of all valid input (x) values for which the function is defined. The range is the set of all possible output (y) values the function can produce. For example, f(x) = √x has domain x ≥ 0 and range y ≥ 0, while f(x) = sin(x) has domain all real numbers and range [−1, 1]. The grapher visually illustrates these constraints.',
  },
  {
    q: 'How do I zoom and pan the graph?',
    a: 'Use your mouse scroll wheel (or pinch gesture on touch devices) to zoom in and out. Click and drag on the graph to pan across the coordinate plane. The axis labels and grid lines update dynamically as you navigate, so you can explore function behavior at any scale.',
  },
]

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
          Function <span className="text-amber">Plotter</span>
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          A high-precision engine for exploring mathematical behaviors, intersections, and limits in real-time.
        </p>
      </div>

      <div className="min-h-[700px]">
        <GraphPlotter />
      </div>

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          How to Use an Online Graphing Calculator
        </h2>
        <p className="leading-relaxed">
          A graphing calculator transforms algebraic expressions into visual representations, making it
          easier to understand function behavior, identify roots, locate maxima and minima, and explore
          asymptotic boundaries. TheCalcPro's interactive function plotter renders equations in real-time
          on a 2D coordinate plane with support for polynomials, trigonometric functions, exponentials,
          logarithms, and rational functions. Whether you're a student verifying homework or a teacher
          preparing visual aids, this tool provides publication-quality graphs with zero installation.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Understanding Function Graphs
        </h3>
        <p className="leading-relaxed">
          Every function <em>y = f(x)</em> maps input values (x) to output values (y), creating a curve
          on the Cartesian plane. Key features to analyze include:
        </p>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
          <li><strong>Roots (zeros):</strong> Points where f(x) = 0 — the graph crosses the x-axis.</li>
          <li><strong>Y-intercept:</strong> The value of f(0) — where the graph crosses the y-axis.</li>
          <li><strong>Extrema:</strong> Local maxima and minima — the peaks and valleys of the curve.</li>
          <li><strong>Asymptotes:</strong> Lines the function approaches but never reaches (vertical, horizontal, or oblique).</li>
          <li><strong>Symmetry:</strong> Even functions (f(−x) = f(x)) are symmetric about the y-axis; odd functions (f(−x) = −f(x)) have rotational symmetry about the origin.</li>
        </ul>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example: Graphing a Parabola
        </h3>
        <p className="leading-relaxed">
          Let's plot <em>f(x) = x² − 4x + 3</em> and identify its key features:
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Find the vertex:</strong> x = −b/2a = 4/2 = 2. So f(2) = 4 − 8 + 3 = −1. Vertex is at <strong>(2, −1)</strong>.</li>
          <li><strong>Find the roots:</strong> Factor x² − 4x + 3 = (x − 1)(x − 3) = 0, giving <strong>x = 1</strong> and <strong>x = 3</strong>.</li>
          <li><strong>Find the y-intercept:</strong> f(0) = 3, so the graph crosses the y-axis at <strong>(0, 3)</strong>.</li>
          <li><strong>Sketch the parabola:</strong> It opens upward (a = 1 &gt; 0), passes through (1, 0), dips to (2, −1), and rises through (3, 0).</li>
        </ol>
        <p className="leading-relaxed">
          Enter <code className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>x^2 - 4x + 3</code> into
          the plotter to see this parabola rendered instantly. Zoom in to examine the vertex or zoom out to
          see the function's long-range behavior. For derivative analysis of this function, visit our
          <a href="/calculus" className="text-amber hover:underline"> Calculus Solver</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12 max-w-3xl">
        <FAQSection items={FAQS} title="Graphing Calculator FAQ" />
      </div>
    </div>
  )
}
