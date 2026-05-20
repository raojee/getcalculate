import { useReducer, useEffect, useRef, useState, useCallback } from 'react'

interface State {
  display: string
  previousValue: string | null
  operation: string | null
  overwrite: boolean
}

type Action =
  | { type: 'ADD_DIGIT'; digit: string }
  | { type: 'CHOOSE_OPERATION'; operation: string }
  | { type: 'EVALUATE' }
  | { type: 'CLEAR' }
  | { type: 'DELETE_DIGIT' }
  | { type: 'PERCENT' }
  | { type: 'TOGGLE_SIGN' }

function evaluate(
  previousValue: string,
  currentValue: string,
  operation: string,
): string {
  const prev = parseFloat(previousValue)
  const current = parseFloat(currentValue)
  if (isNaN(prev) || isNaN(current)) return 'Error'

  let result: number
  switch (operation) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '/':
      if (current === 0) return 'Error'
      result = prev / current
      break
    default:
      return currentValue
  }

  // Production safeguard: eliminate floating-point representation bugs (e.g. 0.1 + 0.2)
  const safeResult = parseFloat(result.toPrecision(12))
  return String(safeResult)
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_DIGIT': {
      if (state.display === 'Error') {
        return { ...state, display: action.digit, overwrite: false }
      }
      if (state.overwrite) {
        return { ...state, display: action.digit === '.' ? '0.' : action.digit, overwrite: false }
      }
      if (action.digit === '.' && state.display.includes('.')) return state
      if (state.display === '0' && action.digit !== '.') {
        return { ...state, display: action.digit }
      }
      if (state.display.replace('-', '').replace('.', '').length >= 12) return state
      return { ...state, display: state.display + action.digit }
    }
    case 'CHOOSE_OPERATION': {
      if (state.display === 'Error') return state
      if (state.previousValue != null && !state.overwrite) {
        const result = evaluate(state.previousValue, state.display, state.operation!)
        return {
          display: result,
          previousValue: result,
          operation: action.operation,
          overwrite: true,
        }
      }
      return {
        ...state,
        previousValue: state.display,
        operation: action.operation,
        overwrite: true,
      }
    }
    case 'EVALUATE': {
      if (state.previousValue == null || state.operation == null || state.overwrite)
        return state
      const result = evaluate(state.previousValue, state.display, state.operation)
      return {
        display: result,
        previousValue: null,
        operation: null,
        overwrite: true,
      }
    }
    case 'CLEAR':
      return { display: '0', previousValue: null, operation: null, overwrite: false }
    case 'DELETE_DIGIT': {
      if (state.display === 'Error') {
        return { display: '0', previousValue: null, operation: null, overwrite: false }
      }
      if (state.overwrite) return { ...state, display: '0', overwrite: false }
      if (state.display.length === 1 || (state.display.length === 2 && state.display.startsWith('-'))) {
        return { ...state, display: '0' }
      }
      return { ...state, display: state.display.slice(0, -1) }
    }
    case 'PERCENT': {
      if (state.display === 'Error') return state
      const val = parseFloat(state.display)
      if (isNaN(val)) return state
      const result = parseFloat((val / 100).toPrecision(12))
      return { ...state, display: String(result), overwrite: false }
    }
    case 'TOGGLE_SIGN': {
      if (state.display === 'Error' || state.display === '0') return state
      return {
        ...state,
        display: state.display.startsWith('-')
          ? state.display.slice(1)
          : '-' + state.display,
      }
    }
    default:
      return state
  }
}

const initialState: State = {
  display: '0',
  previousValue: null,
  operation: null,
  overwrite: false,
}

function formatDisplay(value: string): string {
  if (value === 'Error') return value
  if (value.includes('.') && value.endsWith('.')) return value
  const negative = value.startsWith('-')
  const abs = negative ? value.slice(1) : value
  const num = parseFloat(abs)
  if (isNaN(num)) return value
  if (value.includes('.')) {
    const [int, dec] = abs.split('.')
    const formattedInt = parseInt(int || '0', 10).toLocaleString('en-US')
    return (negative ? '-' : '') + formattedInt + '.' + dec
  }
  return num.toLocaleString('en-US', { maximumFractionDigits: 10 })
}

function getDisplaySize(value: string): string {
  const len = formatDisplay(value).replace(/,/g, '').length
  if (len <= 6) return 'text-6xl'
  if (len <= 9) return 'text-5xl'
  if (len <= 12) return 'text-4xl'
  return 'text-3xl'
}

const OP_SYMBOLS: Record<string, string> = { '+': '+', '-': '−', '*': '×', '/': '÷' }

export default function StandardCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [pressedKey, setPressedKey] = useState<string | null>(null)

  const flash = useCallback((key: string) => {
    setPressedKey(key)
    setTimeout(() => setPressedKey(null), 120)
  }, [])

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        flash(e.key)
        dispatch({ type: 'ADD_DIGIT', digit: e.key })
      } else if (e.key === '.') {
        flash('.')
        dispatch({ type: 'ADD_DIGIT', digit: '.' })
      } else if (e.key === '+') {
        flash('+')
        dispatch({ type: 'CHOOSE_OPERATION', operation: '+' })
      } else if (e.key === '-') {
        flash('-')
        dispatch({ type: 'CHOOSE_OPERATION', operation: '-' })
      } else if (e.key === '*') {
        flash('*')
        dispatch({ type: 'CHOOSE_OPERATION', operation: '*' })
      } else if (e.key === '/') {
        e.preventDefault()
        flash('/')
        dispatch({ type: 'CHOOSE_OPERATION', operation: '/' })
      } else if (e.key === 'Enter' || e.key === '=') {
        flash('=')
        dispatch({ type: 'EVALUATE' })
      } else if (e.key === 'Escape') {
        flash('C')
        dispatch({ type: 'CLEAR' })
      } else if (e.key === 'Backspace') {
        flash('⌫')
        dispatch({ type: 'DELETE_DIGIT' })
      } else if (e.key === '%') {
        flash('%')
        dispatch({ type: 'PERCENT' })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [flash])

  const isActive = (op: string) => state.operation === op && state.overwrite

  const renderButton = (
    label: string,
    onClick: () => void,
    variant: 'number' | 'op' | 'fn' | 'equals' = 'number',
    extraClass = '',
  ) => {
    const isPressed = pressedKey === label ||
      (label === '÷' && pressedKey === '/') ||
      (label === '×' && pressedKey === '*') ||
      (label === '−' && pressedKey === '-')
    
    const base = 'relative rounded-full aspect-square text-2xl font-semibold select-none cursor-pointer transition-all duration-100 flex items-center justify-center overflow-hidden active:scale-95 group'
    
    // Apple color scheme styled with premium dark glassmorphic styling
    const variants: Record<string, string> = {
      number: 'bg-[#262626] text-[#f0ede8] hover:bg-[#323232] border border-white/5 shadow-inner',
      op: 'bg-[#ff9d2e] text-[#1a0f00] hover:bg-[#ffb055]',
      fn: 'bg-[#3e3b38] text-[#f0ede8] hover:bg-[#4a4744] border border-white/5',
      equals: 'bg-[#ff9d2e] text-[#1a0f00] hover:bg-[#ffb055]',
    }

    const activeOp = isActive(label === '÷' ? '/' : label === '×' ? '*' : label === '−' ? '-' : label)
      ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0e0e0e] scale-95'
      : ''
      
    const pressed = isPressed ? 'brightness-125 scale-90' : ''

    return (
      <button
        key={label}
        onClick={onClick}
        className={`${base} ${variants[variant]} ${activeOp} ${pressed} ${extraClass}`}
        aria-label={label}
      >
        <span className="relative z-10">{label}</span>
        <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition-opacity duration-75 rounded-full" />
      </button>
    )
  }

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto gap-4">
      {/* Calculator Body Container */}
      <div 
        className="w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#161616] border border-white/5 p-6 space-y-6"
        style={{ boxShadow: 'var(--shadow-elevated)' }}
      >
        {/* Apple Display */}
        <div className="px-3 pt-6 pb-2 rounded-2xl bg-[#0a0a0a] relative overflow-hidden border border-white/5">
          {/* Ambient Glow */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,157,46,0.12) 0%, transparent 60%)' }} 
          />

          {/* Previous Expression */}
          <div className="text-right min-h-[20px] text-xs font-mono tracking-wide text-[#6a6258] mb-1 truncate">
            {state.previousValue != null && state.operation
              ? `${formatDisplay(state.previousValue)} ${OP_SYMBOLS[state.operation] ?? state.operation}`
              : ' '}
          </div>

          {/* Main Display */}
          <div
            className={`text-right font-mono font-light tracking-tight text-[#f0ede8] transition-all duration-150 leading-none ${getDisplaySize(state.display)} ${state.display === 'Error' ? 'text-red-400' : ''}`}
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {formatDisplay(state.display)}
          </div>
        </div>

        {/* Buttons Grid: 4 columns */}
        <div className="grid grid-cols-4 gap-3.5">
          {renderButton('C', () => dispatch({ type: 'CLEAR' }), 'fn')}
          {renderButton('+/-', () => dispatch({ type: 'TOGGLE_SIGN' }), 'fn')}
          {renderButton('%', () => dispatch({ type: 'PERCENT' }), 'fn')}
          {renderButton('÷', () => dispatch({ type: 'CHOOSE_OPERATION', operation: '/' }), 'op')}

          {renderButton('7', () => dispatch({ type: 'ADD_DIGIT', digit: '7' }))}
          {renderButton('8', () => dispatch({ type: 'ADD_DIGIT', digit: '8' }))}
          {renderButton('9', () => dispatch({ type: 'ADD_DIGIT', digit: '9' }))}
          {renderButton('×', () => dispatch({ type: 'CHOOSE_OPERATION', operation: '*' }), 'op')}

          {renderButton('4', () => dispatch({ type: 'ADD_DIGIT', digit: '4' }))}
          {renderButton('5', () => dispatch({ type: 'ADD_DIGIT', digit: '5' }))}
          {renderButton('6', () => dispatch({ type: 'ADD_DIGIT', digit: '6' }))}
          {renderButton('−', () => dispatch({ type: 'CHOOSE_OPERATION', operation: '-' }), 'op')}

          {renderButton('1', () => dispatch({ type: 'ADD_DIGIT', digit: '1' }))}
          {renderButton('2', () => dispatch({ type: 'ADD_DIGIT', digit: '2' }))}
          {renderButton('3', () => dispatch({ type: 'ADD_DIGIT', digit: '3' }))}
          {renderButton('+', () => dispatch({ type: 'CHOOSE_OPERATION', operation: '+' }), 'op')}

          {renderButton('⌫', () => dispatch({ type: 'DELETE_DIGIT' }), 'fn')}
          {renderButton('0', () => dispatch({ type: 'ADD_DIGIT', digit: '0' }))}
          {renderButton('.', () => dispatch({ type: 'ADD_DIGIT', digit: '.' }))}
          {renderButton('=', () => dispatch({ type: 'EVALUATE' }), 'equals')}
        </div>
      </div>

      <p className="text-[#3e3b38] text-[9px] font-mono tracking-widest uppercase text-center mt-1">
        Esc · Clear &nbsp;|&nbsp; ⌫ · Backspace &nbsp;|&nbsp; Enter · Equals
      </p>
    </div>
  )
}
