import { useState, useCallback } from 'react'
import { evaluate } from 'mathjs'
import StepByStep from './ui/StepByStep'

const BUTTONS = [
  ['MC', 'MR', 'M+', 'M-'],
  ['2nd', 'π', 'e', 'C', '⌫'],
  ['x²', '√', '(', ')', '÷'],
  ['sin', 'cos', 'tan', 'log', 'ln'],
  ['7', '8', '9', '×', 'xⁿ'],
  ['4', '5', '6', '−', '1/x'],
  ['1', '2', '3', '+', 'n!'],
  ['±', '0', '.', '%', '='],
]

// Inline SVGs
const BackspaceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
    <line x1="18" y1="9" x2="12" y2="15"></line>
    <line x1="12" y1="9" x2="18" y2="15"></line>
  </svg>
)

const ClearIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
    <path d="M3 3v5h5"></path>
  </svg>
)

function factorial(n: number): number {
  if (n < 0) throw new Error('Negative factorial')
  if (n === 0 || n === 1) return 1
  let r = 1; for (let i = 2; i <= n; i++) r *= i; return r
}

function computeExpr(expr: string, isDeg: boolean): string {
  try {
    let e = expr
      .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
      .replace(/π/g, 'pi').replace(/n!/g, '')
    if (isDeg) {
      e = e
        .replace(/sin\(/g, 'sin(pi/180*')
        .replace(/cos\(/g, 'cos(pi/180*')
        .replace(/tan\(/g, 'tan(pi/180*')
    }
    const r = evaluate(e)
    if (typeof r === 'number') {
      if (!isFinite(r)) return 'Error'
      return parseFloat(r.toPrecision(12)).toString()
    }
    return String(r)
  } catch { return 'Error' }
}

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0')
  const [expr, setExpr] = useState('')
  const [memory, setMemory] = useState(0)
  const [isDeg, setIsDeg] = useState(true)
  const [result, setResult] = useState<string | null>(null)
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([])

  const append = (val: string) => {
    setResult(null)
    if (display === '0' && !['(', 'sin', 'cos', 'tan', 'log', 'ln', '√', 'π', 'e'].includes(val)) {
      setDisplay(val); setExpr(val)
    } else {
      setDisplay(d => d + val); setExpr(e => e + val)
    }
  }

  const handleBtn = useCallback((btn: string) => {
    switch (btn) {
      case 'C': setDisplay('0'); setExpr(''); setResult(null); break
      case '⌫': {
        const nd = display.length > 1 ? display.slice(0, -1) : '0'
        setDisplay(nd); setExpr(nd)
        break
      }
      case '=': {
        const trimmed = expr.replace(/[+\-×÷*\/]$/, '')
        const res = computeExpr(trimmed, isDeg)
        setHistory(h => [{ expr: trimmed, result: res }, ...h].slice(0, 30))
        setResult(res)
        setDisplay(res)
        setExpr(res)
        break
      }
      case 'π': append('π'); break
      case 'e': append('e'); break
      case 'x²': append('²'); setExpr(e => `(${e})^2`); break
      case 'xⁿ': append('^'); break
      case '√': append('sqrt('); break
      case '1/x': setDisplay(d => { const v = parseFloat(d); return isNaN(v) ? 'Error' : String(1/v) }); break
      case 'n!': {
        const n = parseInt(display)
        try { setDisplay(String(factorial(n))); setExpr(String(factorial(n))) }
        catch { setDisplay('Error') }
        break
      }
      case 'sin': append('sin('); break
      case 'cos': append('cos('); break
      case 'tan': append('tan('); break
      case 'log': append('log10('); break
      case 'ln':  append('log(');   break
      case '2nd': setIsDeg(d => !d); break
      case '±': {
        const nd = display.startsWith('-') ? display.slice(1) : '-' + display
        setDisplay(nd); setExpr(nd)
        break
      }
      case 'MC': setMemory(0); break
      case 'MR': { const s = String(memory); setDisplay(s); setExpr(s); break }
      case 'M+': setMemory(m => m + parseFloat(display || '0')); break
      case 'M-': setMemory(m => m - parseFloat(display || '0')); break
      default: append(btn); break
    }
  }, [display, expr, isDeg, memory])

  const VARIANT: Record<string, string> = {
    '=':   'var(--amber)',
    'C':   '#ef4444',
    '⌫':  'var(--amber)',
    '+':   'var(--bg-surface-3)',
    '−':   'var(--bg-surface-3)',
    '×':   'var(--bg-surface-3)',
    '÷':   'var(--bg-surface-3)',
  }
  const fnKeys = new Set(['sin','cos','tan','log','ln','√','x²','xⁿ','1/x','n!','π','e','2nd','(', ')'])

  return (
    <div className="flex gap-6 flex-col lg:flex-row">
      <div className="w-full max-w-sm mx-auto lg:mx-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Mode:</span>
          <button
            onClick={() => setIsDeg(d => !d)}
            className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
            style={{ background: 'var(--amber)', color: '#1a0f00' }}
          >
            {isDeg ? 'DEG' : 'RAD'}
          </button>
          {memory !== 0 && (
            <span className="px-2 py-1 rounded-lg text-xs font-mono" style={{ background: 'var(--bg-surface-3)', color: 'var(--amber)' }}>M={memory}</span>
          )}
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-elevated)' }}>
          <div className="px-5 pt-6 pb-4" style={{ background: 'var(--bg-display)' }}>
            <div className="text-right text-xs font-mono mb-1 truncate" style={{ color: 'var(--text-muted)' }}>{expr || '0'}</div>
            <div className={`text-right font-mono font-light leading-none transition-all ${display.length > 12 ? 'text-2xl' : display.length > 8 ? 'text-4xl' : 'text-5xl'}`}
              style={{ color: display === 'Error' ? '#f87171' : 'var(--text-primary)' }}>
              {display}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1.5 p-3">
            {BUTTONS.flat().map((btn, i) => {
              const bg = VARIANT[btn] || (fnKeys.has(btn) ? 'var(--bg-surface-2)' : 'var(--bg-surface-3)')
              const isEq = btn === '='
              return (
                <button
                  key={`${btn}-${i}`}
                  onClick={() => handleBtn(btn)}
                  className="h-12 rounded-xl text-sm font-medium transition-all duration-75 active:scale-95 flex items-center justify-center"
                  style={{
                    background: bg,
                    color: isEq ? '#1a0f00' : fnKeys.has(btn) ? 'var(--text-secondary)' : 'var(--text-primary)',
                    fontSize: btn.length > 3 ? '10px' : undefined,
                  }}
                >
                  {btn === '⌫' ? <BackspaceIcon /> : btn}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {result && result !== 'Error' && (
          <StepByStep
            result={result}
            steps={[
              { label: 'Expression', expression: expr, explanation: 'Your input expression.' },
              { label: 'Evaluated', expression: `= ${result}`, explanation: `Result computed${isDeg ? ' in degree mode' : ' in radian mode'}.` },
            ]}
          />
        )}
        {history.length > 0 && (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>History</span>
              <button onClick={() => setHistory([])} className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}><ClearIcon />Clear</button>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y" style={{ borderColor: 'var(--border)' }}>
              {history.map((h, i) => (
                <div key={i} className="flex justify-between items-center px-4 py-2.5 cursor-pointer hover:bg-[var(--bg-surface-2)]"
                  onClick={() => { setDisplay(h.result); setExpr(h.result); setResult(null) }}>
                  <span className="text-xs font-mono truncate" style={{ color: 'var(--text-muted)' }}>{h.expr}</span>
                  <span className="text-sm font-mono font-semibold ml-3 shrink-0" style={{ color: 'var(--amber)' }}>= {h.result}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
