import { createFileRoute } from '@tanstack/react-router'
import StatisticsCalculator from '../components/StatisticsCalculator'

export const Route = createFileRoute('/statistics')({
  head: () => ({
    meta: [
      { title: 'Statistics Calculator — CalcPro' },
      { name: 'description', content: 'Analyze data sets to find mean, median, mode, variance, and standard deviation.' },
    ],
  }),
  component: StatisticsPage,
})

function StatisticsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Statistics Calculator</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Enter your data set separated by commas to get a full statistical analysis.
        </p>
      </div>
      <StatisticsCalculator />
    </div>
  )
}
