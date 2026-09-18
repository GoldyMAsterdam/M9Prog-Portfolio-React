import { useEffect, useRef } from 'react'

export function Sky({ closed = 90 }: { closed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stil = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function meet() {
      if (!canvas) return
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    meet()

    const parts = Array.from({ length: closed }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 0.8,
      f: Math.random() * Math.PI * 2,
    }))

    let busy = true
    let previous = performance.now()

    function sign(now: number) {
      if (!busy) return
      const dt = Math.min((now - previous) / 1000, 0.05)
      previous = now

      ctx!.clearRect(0, 0, width, height)

      const t = now / 1000
      const wind = 0.012 + Math.sin(t * 0.13) * 0.01

      for (const p of parts) {
        if (!stil) {
          p.x += wind * dt * p.z
          p.y += 0.004 * dt * p.z
          if (p.x > 1.05) p.x -= 1.1
          if (p.y > 1.05) p.y -= 1.1
        }

        const px = p.x * width + Math.sin(t * 0.4 + p.f) * 6 * p.z
        const py = p.y * height
        const r = 0.4 + p.z * 1.6

        ctx!.globalAlpha = 0.12 + p.z * 0.35
        ctx!.fillStyle = p.z > 0.75 ? 'rgb(255,196,224)' : 'rgb(206,246,255)'
        ctx!.beginPath()
        ctx!.arc(px, py, r, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1

      raf = requestAnimationFrame(sign)
    }

    let raf = requestAnimationFrame(sign)
    window.addEventListener('resize', meet)

    return () => {
      busy = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', meet)
    }
  }, [closed])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full"
    />
  )
}
