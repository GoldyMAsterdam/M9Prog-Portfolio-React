import keurveiligImage from './assets/images/keurveilig.jpg'
import senergyImage from './assets/images/senergy.jpg'
import michelVisualsImage from './assets/images/michelvisuals-hd.jpg'

export const NAME = import.meta.env.PROD ? 'Tycho' : 'Goldy'

export type Status = 'live' | 'in progress' | 'placeholder'

export type Project = {
  slug: string
  title: string
  date: string
  role: string
  stack: string[]
  status: Status
  url?: string
  summary?: string
  result?: string
  client?: string
  shipped?: string
  hosting?: string
  image?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'keurveilig',
    title: 'Keurveilig',
    date: '2026-03-21',
    shipped: 'March 2026, ongoing',
    role: 'Freelance',
    stack: ['React', 'Tailwind', 'Vite', 'Vercel'],
    status: 'live',
    url: 'https://keurveilig.nl',
    hosting: 'Vercel',
    image: keurveiligImage,
    summary: 'Tool inspection company working across the Netherlands. Site, pricing calculator and quote flow, built and shipped on Vercel. Still actively working on it.',
  },
  {
    slug: 'michelvisuals',
    title: 'Michel Visuals',
    date: '2026-07-21 - 2026-08-15',
    role: 'Freelance',
    stack: ['React', 'React Router', 'Tailwind', 'Vite', 'Vercel'],
    status: 'live',
    url: 'https://michelvisuals.com',
    client: 'Michel, videographer, Netherlands',
    shipped: 'July 2026',
    hosting: 'Vercel',
    image: michelVisualsImage,
    summary: 'A videographer who needed a modern, responsive website to show his work. My design, my build.',
  },
  {
    slug: 'senergy',
    title: 'Senergy',
    date: '2025-02-11',
    role: 'School, duo',
    stack: ['HTML', 'CSS', 'JavaScript', 'WeatherAPI', 'Arduino'],
    status: 'live',
    url: 'https://38436.hosts2.ma-cloud.nl/Senergy/',
    shipped: 'April 2025',
    image: senergyImage,
    summary: 'My first website, built with a classmate. A weather dashboard with live forecasts from WeatherAPI, plus a room temperature page meant to read from an Arduino DHT11 sensor.',
  },
  {
    slug: 'Portfolio',
    title: 'This portfolio',
    date: '2026-09',
    role: 'Own work',
    stack: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Canvas'],
    status: 'in progress',
    summary: 'My personal portfolio website.',
  },
  {
    slug: 'hoofdstuk-4',
    title: '—',
    date: '2026-09',
    role: '—',
    stack: [],
    status: 'placeholder',
  },
]

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

export function month(iso: string): string {
  const [year, m] = iso.split('-')
  const name = MONTHS[Number(m) - 1]
  return name ? `${name} ${year}` : iso
}
