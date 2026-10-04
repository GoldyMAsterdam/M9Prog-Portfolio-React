import { useEffect, useState } from 'react'
import { CURRENT_YEAR, loadYear, type Week } from './contributions'

const RAMP = ' .:;+ox#%@'
const COLS = 74
const ROWS = 40
// mono chars are ~0.6 as wide as they are tall
const CELL = 0.6

const RING = 0.82 // radius the bars stand on
const DEPTH = 0.1 // bar size along the radius
const TALL = 0.9 // height of the busiest month

type Vec = [number, number, number]

const box = (x: number, y: number, z: number, w: number, h: number, d: number) => {
  const qx = Math.abs(x) - w
  const qy = Math.abs(y) - h
  const qz = Math.abs(z) - d
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qy, qz), 0)
}

// one bar per month, standing in a ring. heights are 0-1
function ring([x, y, z]: Vec, heights: number[]) {
  const n = heights.length
  const step = (Math.PI * 2) / n
  const r = Math.hypot(x, z)
  const a = Math.atan2(z, x)
  const width = r * step * 0.3
  const nearest = Math.round(a / step)
  let d = Infinity
  // check the neighbours too, a ray can be closest to the next bar over
  for (let k = nearest - 1; k <= nearest + 1; k += 1) {
    const i = ((k % n) + n) % n
    const local = a - k * step
    const h = 0.03 + heights[i] * TALL
    d = Math.min(d, box(r * Math.cos(local) - RING, y - h / 2, r * Math.sin(local), DEPTH, h / 2, width))
  }
  return d
}

function render(turn: number, heights: number[]) {
  const tilt = -0.5
  const [cy, sy, ct, st] = [Math.cos(turn), Math.sin(turn), Math.cos(tilt), Math.sin(tilt)]
  const toRing = ([x, y, z]: Vec): Vec => {
    const y1 = y * ct + z * st
    const z1 = -y * st + z * ct
    return [x * cy - z1 * sy, y1 + TALL * 0.35, x * sy + z1 * cy]
  }
  const field = (p: Vec) => ring(toRing(p), heights)
  const light: Vec = [-0.45, 0.75, -0.5]
  const scale = 1.25
  let out = ''
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const u = ((col + 0.5) / COLS * 2 - 1) * scale * (COLS * CELL) / ROWS
      const v = -((row + 0.5) / ROWS * 2 - 1) * scale
      let z = -3
      let hit = false
      for (let step = 0; step < 64 && z < 3; step += 1) {
        const d = field([u, v, z])
        if (d < 0.004) { hit = true; break }
        z += d * 0.8
      }
      if (!hit) { out += ' '; continue }
      const e = 0.01
      const n: Vec = [
        field([u + e, v, z]) - field([u - e, v, z]),
        field([u, v + e, z]) - field([u, v - e, z]),
        field([u, v, z + e]) - field([u, v, z - e]),
      ]
      const length = Math.hypot(...n) || 1
      const lambert = Math.max(0, (n[0] * light[0] + n[1] * light[1] + n[2] * light[2]) / length / Math.hypot(...light))
      const tone = 0.3 + lambert * 0.7
      out += RAMP[Math.max(1, Math.min(RAMP.length - 1, Math.round(tone * (RAMP.length - 1))))]
    }
    out += '\n'
  }
  return out
}

// monthly totals scaled 0-1, square root so one busy month doesn't flatten the rest
function monthHeights(weeks: Week[]) {
  const totals = Array<number>(12).fill(0)
  for (const day of weeks.flatMap((week) => week.contributionDays)) totals[new Date(day.date).getUTCMonth()] += day.contributionCount
  const max = Math.max(1, ...totals)
  return totals.map((total) => Math.sqrt(total / max))
}

// a flat ring until the data is in, so nothing invented ever shows
const EMPTY = Array<number>(12).fill(0)

export function AsciiSkyline({ className = '' }: { className?: string }) {
  const [data, setData] = useState<{ heights: number[]; total: number } | null>(null)
  const heights = data?.heights ?? EMPTY
  const [turn, setTurn] = useState(0.4)

  useEffect(() => {
    loadYear(CURRENT_YEAR)
      .then((calendar) => setData({ heights: monthHeights(calendar.weeks), total: calendar.totalContributions }))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = performance.now()
    const timer = window.setInterval(() => setTurn(0.4 + (performance.now() - start) * 0.00012), 120)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <figure className={`m-0 flex flex-col items-center ${className}`}>
      <pre aria-hidden="true" className="m-0 w-fit font-mono leading-none text-moon select-none pointer-events-none [text-shadow:0_0_6px_var(--color-glow)]">
        {render(turn, heights)}
      </pre>
      <figcaption className="mt-6 font-mono text-[0.72rem] tracking-[0.08em] text-muted uppercase">
        {data ? `${data.total} contributions in ${CURRENT_YEAR}, one bar per month` : `${CURRENT_YEAR} on GitHub`}
      </figcaption>
    </figure>
  )
}
