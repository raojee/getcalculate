import { createFileRoute } from '@tanstack/react-router'
import GeometrySolver from '../components/GeometrySolver'

export const Route = createFileRoute('/geometry')({
  head: () => ({
    meta: [
      { title: 'Geometry Solver — CalcPro' },
      { name: 'description', content: 'Calculate area, perimeter, and volume for various 2D and 3D shapes.' },
    ],
  }),
  component: GeometryPage,
})

function GeometryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Geometry Solver</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Solve for area, perimeter, and volume of circles, rectangles, triangles, and more.
        </p>
      </div>
      <GeometrySolver />
    </div>
  )
}
