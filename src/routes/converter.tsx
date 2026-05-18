import { createFileRoute } from '@tanstack/react-router'
import UnitConverter from '../components/UnitConverter'

export const Route = createFileRoute('/converter')({
  head: () => ({
    meta: [
      { title: 'Unit Converter — TheCalcPro' },
      { name: 'description', content: 'Convert between different units of length, weight, temperature, and more.' },
    ],
  }),
  component: ConverterPage,
})

function ConverterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Unit Converter</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Convert values between various scientific and everyday units.
        </p>
      </div>
      <UnitConverter />
    </div>
  )
}
