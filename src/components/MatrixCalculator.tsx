import { useState } from 'react'
import { matrix, add, multiply, det, inv, transpose } from 'mathjs'

export default function MatrixCalculator() {
  const [size, setSize] = useState(2)
  const [matrixA, setMatrixA] = useState<number[][]>([[1, 2], [3, 4]])
  const [matrixB, setMatrixB] = useState<number[][]>([[5, 6], [7, 8]])
  const [result, setResult] = useState<any>(null)
  const [op, setOp] = useState<string>('multiply')

  const updateSize = (newSize: number) => {
    setSize(newSize)
    const newA = Array(newSize).fill(0).map(() => Array(newSize).fill(0))
    const newB = Array(newSize).fill(0).map(() => Array(newSize).fill(0))
    setMatrixA(newA)
    setMatrixB(newB)
    setResult(null)
  }

  const handleCompute = () => {
    try {
      const A = matrix(matrixA)
      const B = matrix(matrixB)
      let res
      if (op === 'add') res = add(A, B)
      else if (op === 'multiply') res = multiply(A, B)
      else if (op === 'detA') res = det(A)
      else if (op === 'detB') res = det(B)
      else if (op === 'invA') res = inv(A)
      else if (op === 'transposeA') res = transpose(A)
      
      setResult(res)
    } catch (e) {
      setResult('Error')
    }
  }

  const renderMatrixInput = (m: number[][], setM: any) => (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
      {m.map((row, i) => row.map((val, j) => (
        <input
          key={`${i}-${j}`}
          type="number"
          value={val}
          onChange={e => {
            const newM = [...m]
            newM[i][j] = Number(e.target.value)
            setM(newM)
          }}
          className="w-full h-12 text-center rounded-lg font-mono"
          style={{ background: 'var(--bg-display)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}
        />
      )))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {[2, 3, 4].map(s => (
              <button key={s} onClick={() => updateSize(s)} className={`w-8 h-8 rounded-lg text-xs font-bold ${size === s ? 'bg-amber text-[#1a0f00]' : 'bg-surface-3 text-secondary'}`} style={{ background: size === s ? 'var(--amber)' : 'var(--bg-surface-3)', color: size === s ? '#1a0f00' : 'var(--text-secondary)' }}>
                {s}x{s}
              </button>
            ))}
          </div>
          <select value={op} onChange={e => setOp(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm bg-surface-3 outline-none" style={{ background: 'var(--bg-surface-3)', color: 'var(--text-primary)' }}>
            <option value="multiply">A × B</option>
            <option value="add">A + B</option>
            <option value="detA">Determinant(A)</option>
            <option value="transposeA">Transpose(A)</option>
            <option value="invA">Inverse(A)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div>
              <h4 className="text-[10px] uppercase tracking-widest text-muted mb-2 text-center">Matrix A</h4>
              {renderMatrixInput(matrixA, setMatrixA)}
           </div>
           <div>
              <h4 className="text-[10px] uppercase tracking-widest text-muted mb-2 text-center">Matrix B</h4>
              {renderMatrixInput(matrixB, setMatrixB)}
           </div>
        </div>

        <button onClick={handleCompute} className="amber-btn mt-6 w-full">Compute Matrix →</button>
      </div>

      {result && (
        <div className="rounded-2xl p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Result</h3>
          <div className="flex justify-center">
             {typeof result === 'number' ? (
                <div className="text-3xl font-bold font-mono" style={{ color: 'var(--amber)' }}>{parseFloat(result.toPrecision(8))}</div>
             ) : result === 'Error' ? (
                <div className="text-red-400 font-mono">Error: Invalid Matrix Operation</div>
             ) : (
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result.size()[1]}, 1fr)` }}>
                   {result.toArray().map((row: any[], i: number) => row.map((val: any, j: number) => (
                      <div key={`${i}-${j}`} className="w-16 h-12 flex items-center justify-center rounded-lg font-mono text-sm" style={{ background: 'var(--bg-surface-3)', color: 'var(--amber)' }}>
                         {typeof val === 'number' ? parseFloat(val.toPrecision(4)) : val}
                      </div>
                   )))}
                </div>
             )}
          </div>
        </div>
      )}
    </div>
  )
}
