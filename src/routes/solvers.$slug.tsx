import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { solversData } from '../config/solversData'
import GlassCard from '../components/ui/GlassCard'
import ResultActions from '../components/ui/ResultActions'
import { BookOpen, HelpCircle, ArrowRight, LayoutGrid, Code, Check, Copy, Share2 } from 'lucide-react'
import { useState } from 'react'
import AdSlot from '../components/ui/AdSlot'

// Lazy load heavy engine modules for optimal tree-shaking
import GeometrySolver from '../components/GeometrySolver'
import StatisticsCalculator from '../components/StatisticsCalculator'
import GraphPlotter from '../components/GraphPlotter'
import CalculusSolver from '../components/CalculusSolver'
import AlgebraSolver from '../components/AlgebraSolver'
import SolarPanelCalculator from '../components/SolarPanelCalculator'
import ElectricLoadCalculator from '../components/ElectricLoadCalculator'
import ConcreteSlabCalculator from '../components/ConcreteSlabCalculator'
import CashOnCashCalculator from '../components/CashOnCashCalculator'
import TDEECalculator from '../components/TDEECalculator'

export const Route = createFileRoute('/solvers/$slug')({
  loader: ({ params }) => {
    const data = solversData.find(s => s.slug === params.slug)
    if (!data) throw notFound()
    return data
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title || 'Math Solver'} — Free Step-by-Step Solver` },
      { name: 'description', content: loaderData?.description || '' },
      { name: 'keywords', content: loaderData?.keywords?.join(', ') || '' },
    ],
    links: [
      {
        rel: 'canonical',
        href: `https://thecalcpro.com/solvers/${loaderData?.slug || ''}`,
      },
    ],
  }),
  component: SolverPageComponent,
})

function SolverPageComponent() {
  const solver = Route.useLoaderData()
  const [embedCopied, setEmbedCopied] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)

  const getActiveExpression = () => {
    // 1. Specific solver inputs
    const primaryInput = document.querySelector('#algebra-input, #calculus-input') as HTMLInputElement
    if (primaryInput && primaryInput.value) return primaryInput.value

    // 2. Graph Plotter (multiple inputs)
    const graphInputs = document.querySelectorAll('input[placeholder*="Enter expression"]') as NodeListOf<HTMLInputElement>
    if (graphInputs.length > 0) {
      return Array.from(graphInputs).map(el => el.value).filter(v => v.trim()).join(',')
    }

    // 3. Statistics (textarea)
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement
    if (textArea && textArea.value) return textArea.value

    // 4. Geometry and others (fallback)
    const inputs = Array.from(document.querySelectorAll('input[type="text"], input[type="number"]')) as HTMLInputElement[]
    const activeVals = inputs.map(el => el.value).filter(val => val.trim().length > 0)
    return activeVals.join(',')
  }

  const handleShareResult = () => {
    const activeExpression = getActiveExpression()
    const sharedUrl = `${window.location.origin}${window.location.pathname}${activeExpression ? `?query=${encodeURIComponent(activeExpression)}` : ''}`
    navigator.clipboard.writeText(sharedUrl)
    setShareCopied(true)
    setTimeout(() => setShareCopied(false), 3000)
  }

  const handleCopyEmbed = () => {
    const embedCode = `<div style="text-align:center;"><a href="https://thecalcpro.com/solvers/${solver.slug}" target="_blank" style="font-family:sans-serif;color:#f97316;text-decoration:none;font-weight:bold;">${solver.title} by TheCalcPro</a></div>`
    navigator.clipboard.writeText(embedCode)
    setEmbedCopied(true)
    setTimeout(() => setEmbedCopied(false), 3000)
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": solver.schema.name,
    "operatingSystem": "All",
    "applicationCategory": solver.schema.category,
    "url": `https://thecalcpro.com/solvers/${solver.slug}`,
    "description": solver.schema.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": solver.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }

  // Map solver types to lazy-loaded components
  const renderSolver = () => {
    return (() => {
      switch (solver.type) {
        case 'geometry': return <GeometrySolver />
        case 'statistics': return <StatisticsCalculator />
        case 'grapher': return <GraphPlotter />
        case 'calculus': return <CalculusSolver />
        case 'algebra': return <AlgebraSolver />
        case 'utility': {
          switch (solver.slug) {
            case 'solar-panel-calculator':    return <SolarPanelCalculator />
            case 'electric-load-calculator':  return <ElectricLoadCalculator />
            case 'concrete-slab-calculator':  return <ConcreteSlabCalculator />
            case 'cash-on-cash-calculator':   return <CashOnCashCalculator />
            case 'tdee-calculator':           return <TDEECalculator />
            default: return null
          }
        }
        default: return (
          <div className="py-24 text-center glass rounded-[2.5rem] flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl glass-amber flex items-center justify-center mb-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--amber)' }}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
             <p className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--amber)' }}>Coming Soon</p>
             <p className="text-xs max-w-sm" style={{ color: 'var(--text-muted)' }}>This solver is currently being built. Check back soon for the full interactive experience.</p>
          </div>
        )
      }
    })()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16 animate-fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <div className="mb-16 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-end">
        <div className="space-y-6">
           {/* Breadcrumbs */}
           <div className="flex items-center gap-2 text-[10px] font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
              <Link to="/" className="hover:text-amber transition-colors">Home</Link>
              <span className="opacity-35">&gt;</span>
              <span>Solvers</span>
              <span className="opacity-35">&gt;</span>
              <span className="text-amber truncate">{solver.title}</span>
           </div>

          <div className="flex items-center gap-3">
             <span className="px-4 py-1 rounded-full bg-amber/10 text-amber text-[10px] font-black uppercase tracking-widest border border-amber/20">
               {solver.category}
             </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.9]" style={{ color: 'var(--text-primary)' }}>
            {solver.title.split(' ').slice(0, -1).join(' ')} <span className="text-amber">{solver.title.split(' ').pop()}</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {solver.subtitle}. {solver.description}
          </p>
        </div>
        
        <GlassCard className="hidden lg:flex items-center justify-between p-8 border-amber/20 bg-amber/[0.02]">
           <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Ready to Export</p>
             <p className="text-sm font-bold">LaTeX & Result Actions</p>
           </div>
           <ResultActions latex="\text{Ready}" result={solver.title} />
        </GlassCard>
      </div>

      {/* Main Solver Engine with Suspense Boundary */}
      <div className="mb-12">
         {renderSolver()}
      </div>

      {/* Share & Embed Panel */}
      <div className="mb-16 max-w-2xl mx-auto">
         <GlassCard className="p-6 relative overflow-hidden group border-amber/10">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber/40 to-transparent" />
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl glass-amber flex items-center justify-center shrink-0">
                 <Share2 size={24} className="text-amber" />
               </div>
               <div>
                 <h3 className="text-lg font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>Share &amp; Embed</h3>
                 <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Share your exact result or embed this tool.</p>
               </div>
             </div>
             
             <div className="flex flex-col gap-3 w-full sm:w-auto">
               <button
                 onClick={handleShareResult}
                 className="flex items-center justify-center sm:justify-start gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 border"
                 style={{ 
                   background: shareCopied ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-surface-2)',
                   color: shareCopied ? '#4ade80' : 'var(--text-primary)',
                   borderColor: shareCopied ? 'rgba(34, 197, 94, 0.2)' : 'var(--border)'
                 }}
               >
                 {shareCopied ? <Check size={16} /> : <Share2 size={16} />}
                 {shareCopied ? 'Result Copied!' : 'Share Active Result'}
               </button>
               
               <button
                 onClick={handleCopyEmbed}
                 className="flex items-center justify-center sm:justify-start gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 border"
                 style={{ 
                   background: embedCopied ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-surface-2)',
                   color: embedCopied ? '#4ade80' : 'var(--text-primary)',
                   borderColor: embedCopied ? 'rgba(34, 197, 94, 0.2)' : 'var(--border)'
                 }}
               >
                 {embedCopied ? <Check size={16} /> : <Code size={16} />}
                 {embedCopied ? 'Embed Copied!' : 'Copy Embed Code'}
               </button>
             </div>
           </div>
           
           {/* Toast Notifications */}
           {shareCopied && (
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/30 backdrop-blur-md animate-fade-in z-50 shadow-2xl whitespace-nowrap">
               Result link copied!
             </div>
           )}
           {embedCopied && (
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/30 backdrop-blur-md animate-fade-in z-50 shadow-2xl whitespace-nowrap">
               Embed code copied!
             </div>
           )}
         </GlassCard>
      </div>

      {/* Programmatic Ad Slot below engine output */}
      <div className="flex justify-center mb-16">
         <AdSlot format="rectangle" />
      </div>

      {/* pSEO Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step-by-Step Explanation */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-2xl glass-amber flex items-center justify-center">
                 <BookOpen size={20} className="text-amber" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Solution Methodology</h2>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {solver.steps.map((step, i) => (
                <GlassCard key={i} className="hover:border-amber/20 transition-all">
                   <div className="flex gap-4">
                      <span className="text-3xl font-black text-amber/20 italic">{String(i+1).padStart(2, '0')}</span>
                      <div className="space-y-1">
                         <h4 className="text-sm font-black uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>{step.title}</h4>
                         <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.content}</p>
                      </div>
                   </div>
                </GlassCard>
              ))}
           </div>
        </div>

        {/* FAQ Sidebar */}
        <div className="space-y-6">
           <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
                 <HelpCircle size={20} style={{ color: 'var(--text-secondary)' }} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Common Questions</h2>
           </div>
           <div className="space-y-4">
              {solver.faqs.map((faq, i) => (
                <details key={i} className="group glass rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                   <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                      <span className="text-[11px] font-black uppercase tracking-wide pr-4" style={{ color: 'var(--text-secondary)' }}>{faq.question}</span>
                      <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} className="group-open:rotate-90 transition-transform" />
                   </summary>
                   <div className="px-5 pb-5 text-xs leading-relaxed border-t pt-4" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                      {faq.answer}
                   </div>
                </details>
              ))}
           </div>
        </div>
      </div>

      {/* CLS-Stable Ad Slot Placeholder */}
      <div className="mt-20 flex justify-center">
         <AdSlot format="rectangle" />
      </div>
    </div>
  )
}

