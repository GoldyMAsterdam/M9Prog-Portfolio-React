import { useState } from 'react'
import App from './App'
import { V1Quiet } from './variants/v1quiet'
import { V2Middle } from './variants/v2middle.tsx'
import { V3Loud } from './variants/v3loud.tsx'

const VARIANTS = [
  { id: 'v1', label: '1 · silent', node: <V1Quiet /> },
  { id: 'v2', label: '2 · moderate', node: <V2Middle /> },
  { id: 'v3', label: '3 · loud', node: <V3Loud /> },
  { id: 'app', label: 'working index', node: <App /> },
]

export function Compare() {
  const [active, setActive] = useState('v1')
  const current = VARIANTS.find((v) => v.id === active) ?? VARIANTS[0]

  return (
    <>
      <div className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 gap-1 border border-line bg-[rgba(4,9,26,0.92)] p-1 backdrop-blur">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActive(v.id)}
            className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] ${
              v.id === active ? 'bg-cold text-field' : 'text-ink-dim hover:text-ink'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      {current.node}
    </>
  )
}
