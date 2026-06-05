import { createFileRoute } from '@tanstack/react-router'
import StatisticsCalculator from '../components/StatisticsCalculator'
import FAQSection from '../components/ui/FAQSection'

export const Route = createFileRoute('/statistics')({
  head: () => ({
    meta: [
      { title: 'Advanced Statistics & Probability Calculator — TheCalcPro' },
      { name: 'description', content: 'Free online statistics calculator. Instantly calculate mean, median, mode, standard deviation, variance, and distribution analysis. Supports bulk data pasting from Excel with automatic sanitization.' },
      { name: 'keywords', content: 'statistics calculator, standard deviation calculator, mean median mode, data analysis tool, probability solver, variance calculator' },
    ],
  }),
  component: StatisticsPage,
})

const FAQS = [
  {
    q: 'How do I import data from Excel?',
    a: 'Simply copy your data column from Excel and paste it into the statistics textarea. The engine automatically sanitizes tabs, commas, and spaces to build your dataset. You can also paste data from Google Sheets, CSV files, or any text source — the parser handles all common delimiters.',
  },
  {
    q: 'What is the difference between standard deviation and variance?',
    a: 'Variance is the average of the squared differences from the mean, while standard deviation is the square root of the variance. Standard deviation is more commonly used because it has the same unit as the original data, making it directly interpretable. For example, if exam scores have a standard deviation of 12 points, approximately 68% of students scored within 12 points of the mean.',
  },
  {
    q: 'When should I use population vs. sample standard deviation?',
    a: 'Use population standard deviation (σ, divides by N) when your dataset represents the entire population you are studying. Use sample standard deviation (s, divides by N−1) when your data is a subset drawn from a larger population — the N−1 denominator (Bessel\'s correction) produces an unbiased estimate of the true population spread.',
  },
  {
    q: 'What do mean, median, and mode each tell you?',
    a: 'The mean (average) is the sum of all values divided by the count — it is sensitive to outliers. The median is the middle value when data is sorted — it is robust against extreme values. The mode is the most frequently occurring value — it identifies the most common observation. Together, these three measures of central tendency provide a comprehensive picture of your data distribution.',
  },
]

function StatisticsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    "name": "TheCalcPro Statistics Engine",
    "operatingSystem": "All",
    "applicationCategory": "StatisticsApplication",
    "url": "https://thecalcpro.com/statistics",
    "description": "Professional-grade statistical analysis tool for processing datasets and visualizing frequency distributions.",
    "softwareVersion": "1.0.5",
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
          Statistics <span className="text-amber">Engine</span>
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Robust dataset analysis for descriptive statistics, frequency distribution, and core variability metrics.
        </p>
      </div>

      <div className="min-h-[600px]">
        <StatisticsCalculator />
      </div>

      {/* SEO Content Article */}
      <article className="mt-16 space-y-6 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          How to Analyze Data with Descriptive Statistics
        </h2>
        <p className="leading-relaxed">
          Descriptive statistics summarize the essential characteristics of a dataset — its center, spread,
          and shape — using a small set of numbers rather than requiring you to inspect every data point.
          TheCalcPro's statistics engine computes <strong>mean</strong>, <strong>median</strong>,
          <strong> mode</strong>, <strong>standard deviation</strong>, <strong>variance</strong>, range,
          minimum, maximum, and a frequency distribution chart from any numeric dataset. It runs entirely
          in your browser, so your data never leaves your device.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Core Statistical Formulas
        </h3>
        <div className="p-4 rounded-2xl font-mono text-sm space-y-1" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
          <p><strong>Mean:</strong> μ = Σxᵢ / N</p>
          <p><strong>Variance:</strong> σ² = Σ(xᵢ − μ)² / N</p>
          <p><strong>Standard Deviation:</strong> σ = √(σ²)</p>
          <p><strong>Sample SD:</strong> s = √(Σ(xᵢ − x̄)² / (N − 1))</p>
        </div>
        <p className="leading-relaxed">
          The <strong>mean</strong> (μ) is the arithmetic average. The <strong>variance</strong> (σ²) measures how
          far each value deviates from the mean on average, squared. The <strong>standard deviation</strong> (σ) is
          the square root of variance, restoring the original units for easier interpretation.
        </p>

        <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Step-by-Step Example
        </h3>
        <p className="leading-relaxed">
          Given the dataset: <strong>4, 8, 6, 5, 3, 8, 9, 7</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
          <li><strong>Count:</strong> N = 8 values</li>
          <li><strong>Mean:</strong> (4+8+6+5+3+8+9+7) / 8 = 50 / 8 = <strong>6.25</strong></li>
          <li><strong>Sort for median:</strong> 3, 4, 5, 6, 7, 8, 8, 9. Middle values are 6 and 7, so median = <strong>6.5</strong></li>
          <li><strong>Mode:</strong> 8 appears twice (most frequently) → mode = <strong>8</strong></li>
          <li><strong>Squared deviations from mean:</strong> (4−6.25)² + (8−6.25)² + … = <strong>31.50</strong></li>
          <li><strong>Population variance:</strong> 31.50 / 8 = <strong>3.9375</strong></li>
          <li><strong>Population standard deviation:</strong> √3.9375 ≈ <strong>1.984</strong></li>
        </ol>
        <p className="leading-relaxed">
          The standard deviation of ≈1.98 tells us that most data points are within about 2 units of the mean.
          This analysis is fundamental in quality control, academic grading curves, scientific experiments, and
          financial risk assessment. For percentage-based analysis, see our
          <a href="/percentage" className="text-amber hover:underline"> Percentage Calculator</a>.
        </p>
      </article>

      {/* FAQ Section */}
      <div className="mt-12 max-w-3xl">
        <FAQSection items={FAQS} title="Statistics Calculator FAQ" />
      </div>
    </div>
  )
}
