import { createFileRoute } from '@tanstack/react-router'
import Calculator from '../components/Calculator'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 py-12"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #1f1a14 0%, #0e0e0e 60%)',
      }}
    >
      <header className="mb-8 text-center">
        <h1 className="text-[#3a3530] text-xs font-mono tracking-[0.3em] uppercase mb-1">
          Online Calculator
        </h1>
      </header>
      <Calculator />
    </div>
  )
}
