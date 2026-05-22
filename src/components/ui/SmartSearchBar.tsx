import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Sparkles, ArrowRight } from 'lucide-react'
import { parseSmartQuery } from '../../utils/smartParser'

export default function SmartSearchBar() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const result = parseSmartQuery(query)
    
    if (result.url) {
      setError('')
      setQuery('') // Clear query on success
      
      // Use standard router navigation, bypassing strict types if necessary since URL is dynamic
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigate({ to: result.url })
    } else {
      setError(result.error || 'No matching tool found')
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto group z-50">
      <form onSubmit={handleSearch} className="relative flex items-center">
        {/* Ambient Glow effect on focus */}
        <div className="absolute inset-0 bg-amber/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Omnibar Input Field */}
        <div className="relative w-full flex items-center backdrop-blur-2xl border rounded-full overflow-hidden focus-within:border-amber/50 transition-colors shadow-2xl" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}>
          <div className="pl-4 pr-2 text-amber animate-pulse">
            <Sparkles size={16} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (error) setError('')
            }}
            placeholder="Ask AI: 'find derivative of sin(x)'..."
            className="w-full bg-transparent border-none py-2.5 px-2 text-xs font-mono outline-none focus:ring-0"
            style={{ color: 'var(--text-primary)' }}
            autoComplete="off"
            spellCheck="false"
          />
          <button 
            type="submit"
            disabled={!query.trim()}
            className="p-1.5 mr-2 rounded-full hover:bg-amber/10 hover:text-amber transition-colors disabled:opacity-50 flex items-center justify-center"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Search"
          >
            <ArrowRight size={14} strokeWidth={3} />
          </button>
        </div>
      </form>
      
      {/* Error Message Tooltip */}
      {error && (
        <div className="absolute top-full left-0 mt-3 w-full flex justify-center animate-fade-in pointer-events-none">
          <div className="px-4 py-1.5 bg-red-950/80 backdrop-blur-md border border-red-500/30 rounded-full shadow-xl">
             <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
               {error}
             </span>
          </div>
        </div>
      )}
    </div>
  )
}
