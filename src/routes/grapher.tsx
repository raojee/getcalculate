import { createFileRoute } from '@tanstack/react-router'
import GraphPlotter from '../components/GraphPlotter'

export const Route = createFileRoute('/grapher')({
  head: () => ({
    meta: [
      { title: 'Graph Plotter — CalcPro' },
      { name: 'description', content: 'Visualize functions on an interactive 2D coordinate system.' },
    ],
  }),
  component: GrapherPage,
})

function GrapherPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Graph Plotter</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Plot functions and analyze their intersections and behavior.
        </p>
      </div>
      <GraphPlotter />
    </div>
  )
}
