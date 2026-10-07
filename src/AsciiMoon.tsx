import { useEffect, useState } from 'react'
import { moonTexture } from './Sky'

const RAMP = ' .:;+ox#%@'
const COLS = 52
const ROWS = Math.round(COLS * 0.6)
const SIZE = 224

function render(pixels: Uint8ClampedArray, angle: number) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const half = SIZE / 2
  let out = ''
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      let tone = 0
      let alpha = 0
      for (let sy = 0; sy < 2; sy += 1) {
        for (let sx = 0; sx < 2; sx += 1) {
          const nx = ((col + (sx + 0.5) / 2) / COLS) * 2 - 1
          const ny = ((row + (sy + 0.5) / 2) / ROWS) * 2 - 1
          const x = Math.round(half + (nx * cos - ny * sin) * half)
          const y = Math.round(half + (nx * sin + ny * cos) * half)
          if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) continue
          const index = (y * SIZE + x) * 4
          tone += (pixels[index] - 190) / 62
          alpha += pixels[index + 3] / 255
        }
      }
      tone /= 4
      alpha /= 4
      const level = alpha < 0.2 ? 0 : Math.max(1, Math.min(RAMP.length - 1, Math.round(tone * alpha * (RAMP.length - 1))))
      out += RAMP[level]
    }
    out += '\n'
  }
  return out
}

export function AsciiMoon({ className = '' }: { className?: string }) {
  const [pixels] = useState(() => moonTexture(SIZE).getContext('2d')?.getImageData(0, 0, SIZE, SIZE).data)
  const [text, setText] = useState(() => (pixels ? render(pixels, 0) : ''))

  useEffect(() => {
    if (!pixels || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const start = performance.now()
    const timer = window.setInterval(() => setText(render(pixels, (performance.now() - start) * 0.000015)), 250)
    return () => window.clearInterval(timer)
  }, [pixels])

  return (
    <pre id="moon" aria-hidden="true" className={`m-0 w-fit font-mono leading-none text-moon select-none pointer-events-none [text-shadow:0_0_6px_var(--color-glow),0_0_22px_var(--color-link)] ${className}`}>
      {text}
    </pre>
  )
}
