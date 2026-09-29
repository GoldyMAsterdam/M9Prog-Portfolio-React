import { useEffect, useRef } from 'react'

type Particle = { x: number; y: number; depth: number; angle: number; sway: number; phase: number }

const TAU = Math.PI * 2

function hash(x: number, y: number, seed: number) {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453
  return value - Math.floor(value)
}

function smooth(value: number) {
  return value * value * value * (value * (value * 6 - 15) + 10)
}

function noise(x: number, y: number, seed: number) {
  const x0 = Math.floor(x); const y0 = Math.floor(y)
  const tx = smooth(x - x0); const ty = smooth(y - y0)
  const top = hash(x0, y0, seed) * (1 - tx) + hash(x0 + 1, y0, seed) * tx
  const bottom = hash(x0, y0 + 1, seed) * (1 - tx) + hash(x0 + 1, y0 + 1, seed) * tx
  return top * (1 - ty) + bottom * ty
}

function fractalNoise(x: number, y: number, octaves: number, seed: number) {
  let value = 0; let amplitude = .5; let normalizer = 0
  for (let octave = 0; octave < octaves; octave += 1) {
    value += amplitude * noise(x, y, seed + octave * 17)
    normalizer += amplitude; amplitude *= .5
    const rotatedX = (x * .819 - y * .574) * 2.02 + 1.7
    y = (x * .574 + y * .819) * 2.02 - 3.1
    x = rotatedX
  }
  return value / normalizer
}

export function moonTexture(size: number) {
  const texture = document.createElement('canvas')
  texture.width = size
  texture.height = size
  const context = texture.getContext('2d')
  if (!context) return texture
  const image = context.createImageData(size, size)
  const half = size / 2
  const feather = 5 / half
  const craterX = -.26
  const craterY = .3
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = (x - half + .5) / half
      const ny = (y - half + .5) / half
      const radius = Math.sqrt(nx * nx + ny * ny)
      const index = (y * size + x) * 4
      if (radius > 1 + feather) continue

      let brightness = radius < .2
        ? .940 + (.895 - .940) * (radius / .2)
        : .895 + (.995 - .895) * smoothstep(.2, .92, radius)
      const inner = 1 - smoothstep(.86, 1, radius)
      const maria = smoothstep(.30, .80, fractalNoise(nx * 1.9 + 9, ny * 1.9 - 4, 4, 21)) * .115
        + smoothstep(.40, .84, fractalNoise(nx * 3.1 - 6, ny * 3.1 + 2, 3, 44)) * .080
        + smoothstep(.36, .88, fractalNoise(nx * 6.4 - 2, ny * 6.4 + 6, 4, 88)) * .062
      brightness -= maria * inner

      const craterDistance = Math.sqrt((nx - craterX) ** 2 + (ny - craterY) ** 2)
      const spokes = fractalNoise(Math.cos(Math.atan2(ny - craterY, nx - craterX)) * 9 + 31, Math.sin(Math.atan2(ny - craterY, nx - craterX)) * 9 + 31, 3, 5)
      brightness += (1 - smoothstep(0, .70, craterDistance)) * .030 * smoothstep(.50, .98, spokes) * inner
      brightness += (1 - smoothstep(0, .055, craterDistance)) * .055
      brightness = Math.max(.74, Math.min(1, brightness))

      let tone = Math.max(0, Math.min(1, (brightness - .760) / (.990 - .760)))
      tone = smoothstep(0, 1, tone)
      image.data[index] = Math.round(190 + tone * 62)
      image.data[index + 1] = Math.round(206 + tone * 48)
      image.data[index + 2] = Math.round(228 + tone * 27)
      image.data[index + 3] = Math.round(255 * (1 - smoothstep(1 - feather, 1 + feather, radius)))
    }
  }
  context.putImageData(image, 0, 0)
  return texture
}

function smoothstep(start: number, end: number, value: number) {
  const normalized = Math.max(0, Math.min(1, (value - start) / (end - start)))
  return normalized * normalized * (3 - 2 * normalized)
}

function drawPetal(context: CanvasRenderingContext2D, size: number) {
  context.beginPath()
  context.moveTo(0, -size)
  context.bezierCurveTo(size * .9, -size * .4, size * .6, size * .65, 0, size)
  context.bezierCurveTo(-size * .6, size * .65, -size * .9, -size * .4, 0, -size)
  context.closePath()
}

export function Sky() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1
    let stars: Array<{ x: number; y: number; radius: number; phase: number }> = []
    let particles: Particle[] = []
    let motes: Array<{ x: number; y: number; top: boolean; speed: number; phase: number }> = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth || window.innerWidth
      height = canvas.clientHeight || window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = Array.from({ length: Math.round((width * height) / 7200) }, () => ({ x: Math.random(), y: Math.random(), radius: Math.random() * .9 + .22, phase: Math.random() * TAU }))
      particles = Array.from({ length: Math.round(Math.min(38, Math.max(16, width * height / 1400000))) }, () => ({ x: Math.random(), y: Math.random(), depth: Math.random(), angle: Math.random() * TAU, sway: Math.random() * .8 + .2, phase: Math.random() * TAU }))
      motes = Array.from({ length: Math.round(width / 2.2) }, () => ({ x: Math.random() * width, y: Math.random() * 72, top: Math.random() < .5, speed: .08 + Math.random() * .3, phase: Math.random() * TAU }))
    }

    const draw = (time: number) => {
      const breath = reduced ? 0 : Math.sin(time * .000055)
      // glow follows the ascii moon
      const anchor = document.getElementById('moon')?.getBoundingClientRect()
      // no moon on this page: light from the top right, no halo
      const radius = anchor ? anchor.width * .5 : width * .09
      const moonX = anchor ? anchor.left + anchor.width * .5 : width * 1.02
      const moonY = anchor ? anchor.top + anchor.height * .5 : -height * .15
      const sky = context.createRadialGradient(moonX, moonY, radius * .6, moonX, moonY, Math.max(width, height) * .6)
      sky.addColorStop(0, '#34608f'); sky.addColorStop(.05, '#2b4d7b'); sky.addColorStop(.14, '#264470'); sky.addColorStop(.26, '#1e365d'); sky.addColorStop(.5, '#121e3a'); sky.addColorStop(1, '#101b36')
      context.fillStyle = sky; context.fillRect(0, 0, width, height)
      const down = context.createLinearGradient(0, height * .45, 0, height)
      down.addColorStop(0, 'rgba(9,15,30,0)'); down.addColorStop(1, 'rgba(9,15,30,.62)')
      context.fillStyle = down; context.fillRect(0, 0, width, height)
      context.fillStyle = '#ddebfc'
      stars.forEach((star) => { context.globalAlpha = .22 * (reduced ? .75 : .3 + (Math.sin(time / 950 * .5 + star.phase) + 1) / 2 * .7); context.beginPath(); context.arc(star.x * width, star.y * height, star.radius, 0, TAU); context.fill() })
      context.globalAlpha = 1
      context.globalCompositeOperation = 'lighter'
      if (anchor) {
        const halo = context.createRadialGradient(moonX, moonY, radius * .7, moonX, moonY, radius * 2.6)
        halo.addColorStop(0, `rgba(120,196,230,${.22 + breath * .04})`); halo.addColorStop(.2, 'rgba(88,156,216,.1)'); halo.addColorStop(1, 'rgba(40,74,130,0)')
        context.fillStyle = halo; context.beginPath(); context.arc(moonX, moonY, radius * 2.6, 0, TAU); context.fill()
      }
      context.globalCompositeOperation = 'source-over'
      particles.forEach((particle) => {
        if (!reduced) { particle.y += (.0005 + particle.depth * .00165) * .42; particle.x += (.00055 + particle.depth * .0012) * .42 + Math.sin(time * .00019 + particle.phase) * .00022 * particle.sway; particle.angle += .002 * (.4 + particle.depth) }
        if (particle.y > 1.16) { particle.y = -.16; particle.x = Math.random() * 1.4 - .35 }
        const size = (1.4 + particle.depth * particle.depth * 8)
        context.save(); context.translate(particle.x * width, particle.y * height); context.rotate(particle.angle); context.globalAlpha = .62 - particle.depth * .28; context.fillStyle = particle.depth > .65 ? '#7edcff' : '#fafafb'; drawPetal(context, size); context.fill(); context.restore()
      })
      context.fillStyle = '#fafafb'
      motes.forEach((mote) => {
        if (!reduced) {
          mote.x += mote.speed * (Math.sin(time * .00016) * .35 + .65)
          if (mote.x > width + 4) mote.x = -4
        }
        const localDepth = Math.max(0, Math.min(1, mote.y / 72))
        const y = mote.top ? mote.y + Math.sin(time * .0004 + mote.phase) * 1.4 : height - mote.y - Math.sin(time * .0004 + mote.phase) * 1.4
        context.globalAlpha = (.54 - localDepth * .4) * (reduced ? 1 : .72 + Math.sin(time * .0006 + mote.phase) * .28)
        context.beginPath(); context.arc(mote.x, y, .3 + (1 - localDepth) * .7, 0, TAU); context.fill()
      })
      const vignette = context.createRadialGradient(width * .5, height * .5, Math.min(width, height) * .22, width * .5, height * .5, Math.max(width, height) * .78)
      vignette.addColorStop(0, 'rgba(4,7,15,0)'); vignette.addColorStop(.62, 'rgba(4,7,15,.22)'); vignette.addColorStop(1, 'rgba(4,7,15,.78)')
      context.fillStyle = vignette; context.fillRect(0, 0, width, height); context.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    resize(); window.addEventListener('resize', resize); frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}