import { Fragment, useEffect, useState } from 'react'
// the GitHub fetch, real code doing an ordinary job. not a file from api/:
// vercel dev sends every /api/ request to the functions, so importing one breaks the page
import source from './contributions.ts?raw'

const COLS = 74
const ROWS = 40

const LINES = source.split(/\r?\n/).map((line) => line.replace(/\t/g, '  '))
// open on the fetch, not the types
const START = Math.max(0, LINES.findIndex((line) => line.startsWith('export function loadYear')))

const LEVELS = ['opacity-35', 'opacity-65', '']

// the source, scrolling, with a band of light moving across it.
// the text itself stays put: bending it on a character grid tears words apart
function render(time: number) {
  const scroll = Math.floor(time * 0.7)
  const chars: string[][] = []
  const light: number[][] = []

  for (let row = 0; row < ROWS; row += 1) {
    const line = LINES[(START + scroll + row) % LINES.length]
    chars.push(Array.from({ length: COLS }, (_, col) => line[col] ?? ' '))
    light.push(Array.from({ length: COLS }, (_, col) => {
      const band = Math.cos(col * 0.06 + row * 0.1 - time * 0.9)
      return band > 0.4 ? 2 : band > -0.3 ? 1 : 0
    }))
  }

  // group neighbouring characters with the same brightness into one span
  return chars.map((row, r) => {
    const runs: [string, number][] = []
    row.forEach((char, c) => {
      const last = runs[runs.length - 1]
      if (last && last[1] === light[r][c]) last[0] += char
      else runs.push([char, light[r][c]])
    })
    return runs
  })
}

export function AsciiCode({ className = '' }: { className?: string }) {
  // a still with the light partway across for reduced motion
  const [time, setTime] = useState(1.2)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = performance.now()
    const timer = window.setInterval(() => setTime(1.2 + (performance.now() - start) / 1000), 120)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <pre aria-hidden="true" className={`m-0 w-fit font-mono leading-none text-moon select-none pointer-events-none [text-shadow:0_0_6px_var(--color-glow)] ${className}`}>
      {render(time).map((runs, r) => (
        <Fragment key={r}>
          {runs.map(([text, level], i) => (
            <span key={i} className={LEVELS[level]}>{text}</span>
          ))}
          {'\n'}
        </Fragment>
      ))}
    </pre>
  )
}
