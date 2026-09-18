import { useEffect, useRef } from 'react'

export function Sky() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0; let width = 0; let height = 0
    const stars = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + .2 }))
    const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, 2); width = window.innerWidth; height = window.innerHeight; canvas.width = width * dpr; canvas.height = height * dpr; context.setTransform(dpr, 0, 0, dpr, 0, 0) }
    const draw = (time: number) => {
      const moonX = width * .91 + (reduced ? 0 : Math.sin(time / 6000) * 8); const moonY = height * .47; const radius = Math.min(width, height) * .22
      const sky = context.createRadialGradient(moonX, moonY, radius, moonX, moonY, width * .7); sky.addColorStop(0, '#4074aa'); sky.addColorStop(.18, '#1e365d'); sky.addColorStop(1, '#101b36'); context.fillStyle = sky; context.fillRect(0, 0, width, height)
      context.fillStyle = '#ddebfc'; stars.forEach((star) => { context.globalAlpha = .15 + star.r / 5; context.beginPath(); context.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2); context.fill() })
      const glow = context.createRadialGradient(moonX, moonY, radius * .8, moonX, moonY, radius * 1.8); glow.addColorStop(0, 'rgba(220,248,255,.38)'); glow.addColorStop(1, 'rgba(90,170,225,0)'); context.fillStyle = glow; context.beginPath(); context.arc(moonX, moonY, radius * 1.8, 0, Math.PI * 2); context.fill()
      context.fillStyle = '#edf8ff'; context.globalAlpha = .9; context.beginPath(); context.arc(moonX, moonY, radius, 0, Math.PI * 2); context.fill(); context.globalAlpha = .12; context.fillStyle = '#6b93b4'
      for (let i = 0; i < 18; i += 1) { context.beginPath(); context.arc(moonX + Math.sin(i * 4.7) * radius * .65, moonY + Math.cos(i * 2.3) * radius * .65, radius * (.03 + (i % 4) * .018), 0, Math.PI * 2); context.fill() }
      context.globalAlpha = 1; frame = requestAnimationFrame(draw)
    }
    resize(); window.addEventListener('resize', resize); frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} aria-hidden className="sky-canvas" />
}