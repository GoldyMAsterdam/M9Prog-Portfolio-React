import { useEffect, useState } from 'react'
import { NAME } from './projects'

// Same ramp as the moon, so both read as one set of drawings.
const RAMP = ' .:;+ox#%@'
const COLS = 56
const ROWS = 30
// A monospace cell is about 0.6 of its line height wide; this keeps the key square.
const CELL = 0.6

// 5 x 7 capitals, only the letters the name can start with.
const GLYPHS: Record<string, string[]> = {
  G: ['01110', '10001', '10000', '10111', '10001', '10001', '01110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
}

type Vec = [number, number, number]

// A keycap: a rounded box that narrows towards the top.
function keycap(x: number, y: number, z: number) {
  const taper = 1 - 0.14 * Math.min(1, Math.max(0, (y + 0.5) / 1))
  const qx = Math.abs(x / taper) - 0.78
  const qy = Math.abs(y) - 0.3
  const qz = Math.abs(z / taper) - 0.78
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0))
  return (outside + Math.min(Math.max(qx, qy, qz), 0) - 0.2) * 0.8
}

function render(turn: number, letter: string[]) {
  const tilt = -0.62
  const [cy, sy, ct, st] = [Math.cos(turn), Math.sin(turn), Math.cos(tilt), Math.sin(tilt)]
  // View space to key space: undo the tilt, then the turn.
  const toKey = ([x, y, z]: Vec): Vec => {
    const y1 = y * ct + z * st
    const z1 = -y * st + z * ct
    return [x * cy - z1 * sy, y1, x * sy + z1 * cy]
  }
  const field = (p: Vec) => keycap(...toKey(p))
  const light: Vec = [-0.45, 0.75, -0.5]
  const scale = 1.3
  let out = ''
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const u = ((col + 0.5) / COLS * 2 - 1) * scale * (COLS * CELL) / ROWS
      const v = -((row + 0.5) / ROWS * 2 - 1) * scale
      let z = -3
      let hit = false
      for (let step = 0; step < 48 && z < 3; step += 1) {
        const d = field([u, v, z])
        if (d < 0.004) { hit = true; break }
        z += d
      }
      if (!hit) { out += ' '; continue }
      const e = 0.01
      const p: Vec = [u, v, z]
      const n: Vec = [
        field([u + e, v, z]) - field([u - e, v, z]),
        field([u, v + e, z]) - field([u, v - e, z]),
        field([u, v, z + e]) - field([u, v, z - e]),
      ]
      const length = Math.hypot(...n) || 1
      const lambert = Math.max(0, (n[0] * light[0] + n[1] * light[1] + n[2] * light[2]) / length / Math.hypot(...light))
      let tone = 0.12 + lambert * 0.88
      // The letter is printed on the top face: find where this point sits on it in key space.
      const [kx, ky, kz] = toKey(p)
      if (ky > 0.3) {
        const gx = Math.floor((kx + 0.42) / 0.84 * 5)
        const gz = Math.floor((0.55 - kz) / 1.1 * 7)
        if (letter[gz]?.[gx] === '1') tone *= 0.18
      }
      out += RAMP[Math.max(1, Math.min(RAMP.length - 1, Math.round(tone * (RAMP.length - 1))))]
    }
    out += '\n'
  }
  return out
}

// A keycap with the first letter of my name, drawn in the same glyphs as the moon.
export function AsciiKey({ className = '' }: { className?: string }) {
  const letter = GLYPHS[NAME[0]] ?? GLYPHS.G
  const [text, setText] = useState(() => render(0.3, letter))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = performance.now()
    // Sways a little either side instead of spinning, so the letter never turns away far enough to be unreadable.
    const timer = window.setInterval(() => setText(render(0.3 + Math.sin((performance.now() - start) * 0.0004) * 0.4, letter)), 120)
    return () => window.clearInterval(timer)
  }, [letter])

  return (
    <pre aria-hidden="true" className={`m-0 w-fit font-mono leading-none text-moon select-none [text-shadow:0_0_6px_var(--color-glow)] ${className}`}>
      {text}
    </pre>
  )
}
