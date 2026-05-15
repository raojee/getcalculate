import { createFileRoute } from '@tanstack/react-router'
import StatisticsCalculator from '../components/StatisticsCalculator'

export const Route = createFileRoute('/statistics')({
  head: () => ({
    meta: [
      { title: 'Advanced Statistics & Probability Calculator — CalcPro' },
      { name: 'description', content: 'Instantly calculate mean, median, mode, standard deviation, and variance. Supports bulk data pasting from Excel or PDFs with robust distribution analysis.' },
      { name: 'keywords', content: 'statistics calculator, standard deviation calculator, mean median mode, data analysis tool, probability solver' },
    ],
  }),
  component: StatisticsPage,
})

function StatisticsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    "name": "CalcPro Statistics Engine",
    "operatingSystem": "All",
    "applicationCategory": "StatisticsApplication",
    "url": "https://calc.raotahir.online/statistics",
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
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I import data from Excel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply copy your data column from Excel and paste it into our statistics textarea. The engine automatically sanitizes tabs, commas, and spaces to build your dataset."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between standard deviation and variance?",
        "acceptedAnswer": {
          "@type": { "@type": "Answer", "text": "Variance is the average of the squared differences from the Mean, while Standard Deviation is the square root of the Variance, providing a measure of spread in the original units." }
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
          Statistics <span className="text-amber">Engine</span>
        </h1>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Robust dataset analysis for descriptive statistics, frequency distribution, and core variability metrics.
        </p>
      </div>

      <div className="min-h-[600px]">
        <StatisticsCalculator />
      </div>

      {/* CLS Stable Slot */}
      <div className="mt-20 h-[250px] w-full glass rounded-[2.5rem] border-dashed border-white/5 flex items-center justify-center bg-white/[0.01]">
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-20">Statistical Methodology Area</p>
      </div>
    </div>
  )
}
