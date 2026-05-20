import { useReducer, useEffect, useState, useCallback, useRef } from 'react'
import { evaluate as mathEvaluate } from 'mathjs'
import StepByStep from './ui/StepByStep'

interface State {
  display: string
  expr: string
  overwrite: boolean
}

type Action =
  | { type: 'ADD_DIGIT'; digit: string }
  | { type: 'ADD_OPERATOR'; op: string }
  | { type: 'ADD_FUNCTION'; fnName: string }
  | { type: 'ADD_CONSTANT'; constant: string }
  | { type: 'ADD_PARENTHESIS'; paren: string }
  | { type: 'EVALUATE' }
  | { type: 'CLEAR' }
  | { type: 'DELETE_DIGIT' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'SET_EXPR'; expr: string; display: string }

function cleanExpression(expr: string): string {
  // Cleans the expression for display or mathjs compilation
  return expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
}

function evaluate(expr: string, isDeg: boolean): string {
  try {
    let clean = cleanExpression(expr)
    if (isDeg) {
      // Modify trigonometry functions to receive degree conversion
      clean = clean
        .replace(/sin\(/g, 'sin(pi/180*')
        .replace(/cos\(/g, 'cos(pi/180*')
        .replace(/tan\(/g, 'tan(pi/180*')
    }
    const r = mathEvaluate(clean)
    if (typeof r === 'number') {
      if (!isFinite(r)) return 'Error'
      // Safeguard: eliminate floating-point representation bugs (e.g. 0.1 + 0.2 = 0.3)
      const safe = parseFloat(r.toPrecision(12))
      return String(safe)
    }
    if (typeof r === 'boolean') return String(r)
    return String(r)
  } catch {
    return 'Error'
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_DIGIT': {
      if (state.display === 'Error') {
        return { display: action.digit, expr: action.digit, overwrite: false }
      }
      if (state.overwrite) {
        return { display: action.digit === '.' ? '0.' : action.digit, expr: action.digit === '.' ? '0.' : action.digit, overwrite: false }
      }
      if (action.digit === '.' && state.display.endsWith('.')) return state
      
      const newDisplay = state.display === '0' && action.digit !== '.' ? action.digit : state.display + action.digit
      const newExpr = state.expr === '0' && action.digit !== '.' ? action.digit : state.expr + action.digit
      return { ...state, display: newDisplay, expr: newExpr }
    }
    case 'ADD_OPERATOR': {
      if (state.display === 'Error') return state
      const lastChar = state.expr.slice(-1)
      const ops = ['+', '-', '*', '/', '^']
      let newExpr = state.expr
      
      if (ops.includes(lastChar)) {
        newExpr = state.expr.slice(0, -1) + action.op
      } else {
        newExpr = state.expr + action.op
      }
      
      return {
        ...state,
        display: cleanExpression(newExpr),
        expr: newExpr,
        overwrite: false,
      }
    }
    case 'ADD_FUNCTION': {
      // sin(, cos(, tan(, log10(, log(, sqrt(
      const prefix = state.expr === '0' || state.overwrite ? '' : state.expr
      const newExpr = prefix + action.fnName
      return {
        display: cleanExpression(newExpr),
        expr: newExpr,
        overwrite: false,
      }
    }
    case 'ADD_CONSTANT': {
      const prefix = state.expr === '0' || state.overwrite ? '' : state.expr
      const newExpr = prefix + action.constant
      return {
        display: cleanExpression(newExpr),
        expr: newExpr,
        overwrite: false,
      }
    }
    case 'ADD_PARENTHESIS': {
      const prefix = state.expr === '0' || state.overwrite ? '' : state.expr
      const newExpr = prefix + action.paren
      return {
        display: cleanExpression(newExpr),
        expr: newExpr,
        overwrite: false,
      }
    }
    case 'EVALUATE':
      // Evaluated in the host component due to isDeg dependency
      return state
    case 'CLEAR':
      return { display: '0', expr: '0', overwrite: false }
    case 'DELETE_DIGIT': {
      if (state.display === 'Error') {
        return { display: '0', expr: '0', overwrite: false }
      }
      if (state.expr.length <= 1) {
        return { display: '0', expr: '0', overwrite: false }
      }
      
      // Delete function tokens if matched (e.g. sin(, cos(, log10(, sqrt()
      const fns = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(']
      for (const fn of fns) {
        if (state.expr.endsWith(fn)) {
          const cutExpr = state.expr.slice(0, -fn.length)
          const finalExpr = cutExpr === '' ? '0' : cutExpr
          return { display: cleanExpression(finalExpr), expr: finalExpr, overwrite: false }
        }
      }
      
      const newExpr = state.expr.slice(0, -1)
      return { display: cleanExpression(newExpr), expr: newExpr, overwrite: false }
    }
    case 'TOGGLE_SIGN': {
      if (state.display === 'Error' || state.display === '0') return state
      
      // Wrap entire expression in negative sign
      if (state.expr.startsWith('-(') && state.expr.endsWith(')')) {
        const unwrapped = state.expr.slice(2, -1)
        return { ...state, display: cleanExpression(unwrapped), expr: unwrapped }
      } else {
        const wrapped = `-(${state.expr})`
        return { ...state, display: cleanExpression(wrapped), expr: wrapped }
      }
    }
    case 'SET_EXPR':
      return { display: action.display, expr: action.expr, overwrite: true }
    default:
      return state
  }
}

const initialState: State = {
  display: '0',
  expr: '0',
  overwrite: false,
}

// Inline SVGs for UI
const BackspaceIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

export default function ScientificCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isDeg, setIsDeg] = useState(true)
  const [memory, setMemory] = useState<number>(0)
  const [result, setResult] = useState<string | null>(null)
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([])
  const [pressedKey, setPressedKey] = useState<string | null>(null)

  const flash = useCallback((key: string) => {
    setPressedKey(key)
    setTimeout(() => setPressedKey(null), 120)
  }, [])

  const triggerEvaluate = useCallback(() => {
    if (state.expr === '0' || state.expr === '') return
    const cleaned = state.expr.replace(/[+\-×÷*\/]$/, '')
    const evaluated = evaluate(cleaned, isDeg)
    
    setHistory(h => [{ expr: cleanExpression(cleaned), result: evaluated }, ...h].slice(0, 30))
    setResult(evaluated)
    dispatch({ type: 'SET_EXPR', expr: evaluated, display: evaluated })
  }, [state.expr, isDeg])

  // Keyboard binding support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const activeElement = document.activeElement
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        return // skip shortcuts if writing in contact page form
      }

      if (e.key >= '0' && e.key <= '9') {
        flash(e.key)
        dispatch({ type: 'ADD_DIGIT', digit: e.key })
      } else if (e.key === '.') {
        flash('.')
        dispatch({ type: 'ADD_DIGIT', digit: '.' })
      } else if (e.key === '+') {
        flash('+')
        dispatch({ type: 'ADD_OPERATOR', op: '+' })
      } else if (e.key === '-') {
        flash('-')
        dispatch({ type: 'ADD_OPERATOR', op: '-' })
      } else if (e.key === '*') {
        flash('*')
        dispatch({ type: 'ADD_OPERATOR', op: '*' })
      } else if (e.key === '/') {
        e.preventDefault()
        flash('/')
        dispatch({ type: 'ADD_OPERATOR', op: '/' })
      } else if (e.key === '^') {
        flash('^')
        dispatch({ type: 'ADD_OPERATOR', op: '^' })
      } else if (e.key === '(') {
        flash('(')
        dispatch({ type: 'ADD_PARENTHESIS', paren: '(' })
      } else if (e.key === ')') {
        flash(')')
        dispatch({ type: 'ADD_PARENTHESIS', paren: ')' })
      } else if (e.key === 'Enter' || e.key === '=') {
        flash('=')
        triggerEvaluate()
      } else if (e.key === 'Escape') {
        flash('C')
        dispatch({ type: 'CLEAR' })
        setResult(null)
      } else if (e.key === 'Backspace') {
        flash('⌫')
        dispatch({ type: 'DELETE_DIGIT' })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [flash, triggerEvaluate])

  const handleBtn = (btnName: string) => {
    setResult(null)
    switch (btnName) {
      case 'C':
        dispatch({ type: 'CLEAR' })
        break
      case '⌫':
        dispatch({ type: 'DELETE_DIGIT' })
        break
      case '=':
        triggerEvaluate()
        break
      case 'sin':
        dispatch({ type: 'ADD_FUNCTION', fnName: 'sin(' })
        break
      case 'cos':
        dispatch({ type: 'ADD_FUNCTION', fnName: 'cos(' })
        break
      case 'tan':
        dispatch({ type: 'ADD_FUNCTION', fnName: 'tan(' })
        break
      case 'log':
        dispatch({ type: 'ADD_FUNCTION', fnName: 'log10(' })
        break
      case 'ln':
        dispatch({ type: 'ADD_FUNCTION', fnName: 'log(' })
        break
      case '√':
        dispatch({ type: 'ADD_FUNCTION', fnName: 'sqrt(' })
        break
      case 'π':
        dispatch({ type: 'ADD_CONSTANT', constant: 'π' })
        break
      case 'e':
        dispatch({ type: 'ADD_CONSTANT', constant: 'e' })
        break
      case 'x²':
        // square operation
        dispatch({ type: 'ADD_OPERATOR', op: '^2' })
        break
      case 'xⁿ':
        dispatch({ type: 'ADD_OPERATOR', op: '^' })
        break
      case '1/x':
        dispatch({ type: 'ADD_OPERATOR', op: '^-1' })
        break
      case '±':
        dispatch({ type: 'TOGGLE_SIGN' })
        break
      case '(':
        dispatch({ type: 'ADD_PARENTHESIS', paren: '(' })
        break
      case ')':
        dispatch({ type: 'ADD_PARENTHESIS', paren: ')' })
        break
      case 'MC':
        setMemory(0)
        break
      case 'MR':
        dispatch({ type: 'SET_EXPR', expr: String(memory), display: String(memory) })
        break
      case 'M+': {
        const evalVal = parseFloat(evaluate(state.expr, isDeg))
        if (!isNaN(evalVal)) setMemory(m => m + evalVal)
        break
      }
      case 'M-': {
        const evalVal = parseFloat(evaluate(state.expr, isDeg))
        if (!isNaN(evalVal)) setMemory(m => m - evalVal)
        break
      }
      case '2nd':
        setIsDeg(d => !d)
        break
      case '+':
      case '−':
      case '×':
      case '÷':
        const opMap: Record<string, string> = { '+': '+', '−': '-', '×': '*', '÷': '/' }
        dispatch({ type: 'ADD_OPERATOR', op: opMap[btnName] || btnName })
        break
      default:
        dispatch({ type: 'ADD_DIGIT', digit: btnName })
        break
    }
  }

  // Premium grid keys mapping
  const BUTTONS_GRID = [
    ['MC', 'MR', 'M+', 'M-'],
    ['2nd', 'π', 'e', 'C', '⌫'],
    ['x²', '√', '(', ')', '÷'],
    ['sin', 'cos', 'tan', 'log', 'ln'],
    ['7', '8', '9', '×', 'xⁿ'],
    ['4', '5', '6', '−', '1/x'],
    ['1', '2', '3', '+', '='],
    ['±', '0', '.', '%', '']
  ]

  const fnKeys = new Set(['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'xⁿ', '1/x', 'π', 'e', '2nd', '(', ')'])
  
  const getBtnBg = (btn: string) => {
    if (btn === '=') return 'var(--amber)'
    if (btn === 'C') return '#ef4444'
    if (btn === '⌫') return 'var(--bg-surface-3)'
    if (['+', '−', '×', '÷'].includes(btn)) return 'var(--bg-surface-3)'
    if (fnKeys.has(btn)) return 'var(--bg-surface-2)'
    return 'var(--bg-surface-3)'
  }

  return (
    <div className="flex gap-8 flex-col lg:flex-row max-w-5xl mx-auto items-start">
      {/* Calculator Body */}
      <div className="w-full max-w-md mx-auto lg:mx-0">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono tracking-wider text-[#a0988a] uppercase">Trig Mode:</span>
          <button
            onClick={() => setIsDeg(d => !d)}
            className="px-3 py-1.5 rounded-lg text-xs font-black transition-all hover:scale-105 active:scale-95"
            style={{ background: 'var(--amber)', color: '#1a0f00' }}
          >
            {isDeg ? 'DEGREES' : 'RADIANS'}
          </button>
          {memory !== 0 && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono border border-amber/20" style={{ background: 'rgba(255, 157, 46, 0.05)', color: 'var(--amber)' }}>
              M = {parseFloat(memory.toPrecision(8))}
            </span>
          )}
        </div>

        <div 
          className="rounded-[2.5rem] overflow-hidden border p-5 space-y-5" 
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-elevated)' }}
        >
          {/* Scientific Display */}
          <div className="px-5 py-6 rounded-2xl relative overflow-hidden border" style={{ background: 'var(--bg-display)', borderColor: 'var(--border)' }}>
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,157,46,0.12) 0%, transparent 60%)' }} />
            
            <div className="text-right text-xs font-mono mb-2 truncate" style={{ color: 'var(--text-secondary)', minHeight: '16px' }}>
              {state.expr || '0'}
            </div>
            
            <div className={`text-right font-mono font-light leading-none transition-all ${state.display.length > 12 ? 'text-2xl' : state.display.length > 8 ? 'text-4xl' : 'text-5xl'}`}
              style={{ color: state.display === 'Error' ? '#f87171' : 'var(--text-primary)' }}>
              {state.display}
            </div>
          </div>

          {/* Grid Layout: 5 columns except for top MC/MR row */}
          <div className="flex flex-col gap-2">
            {BUTTONS_GRID.map((row, rIdx) => {
              const columnsCount = row.length
              return (
                <div key={rIdx} className={`grid ${columnsCount === 4 ? 'grid-cols-4' : 'grid-cols-5'} gap-2`}>
                  {row.map((btn, cIdx) => {
                    if (btn === '') return <div key={cIdx} />
                    const isEq = btn === '='
                    const bg = getBtnBg(btn)
                    return (
                      <button
                        key={`${btn}-${cIdx}`}
                        onClick={() => handleBtn(btn)}
                        className={`h-11 rounded-xl text-sm font-medium transition-all duration-75 active:scale-95 flex items-center justify-center border border-white/[0.02] hover:brightness-125`}
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
              )
            })}
          </div>
        </div>
      </div>

      {/* Explanations and History Sidebar */}
      <div className="flex-1 w-full space-y-6">
        {result && result !== 'Error' && (
          <StepByStep
            result={result}
            steps={[
              { label: 'Input Expression', expression: cleanExpression(state.expr), explanation: 'The parsed formula sent to the execution engine.' },
              { label: 'Evaluation Output', expression: `= ${result}`, explanation: `Result computed strictly${isDeg ? ' in degrees' : ' in radians'}, sanitized of floats.` },
            ]}
          />
        )}
        
        {history.length > 0 && (
          <div className="rounded-2xl overflow-hidden border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Scientific History</span>
              <button 
                onClick={() => setHistory([])} 
                className="flex items-center gap-1.5 text-xs font-semibold hover:text-white transition-colors" 
                style={{ color: 'var(--text-muted)' }}
              >
                <ClearIcon /> Clear
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y" style={{ borderColor: 'var(--border)' }}>
              {history.map((h, i) => (
                <div 
                  key={i} 
                  className="flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => dispatch({ type: 'SET_EXPR', expr: h.result, display: h.result })}
                >
                  <span className="text-xs font-mono truncate" style={{ color: 'var(--text-secondary)' }}>{h.expr}</span>
                  <span className="text-sm font-mono font-bold ml-4 shrink-0" style={{ color: 'var(--amber)' }}>= {h.result}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
