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
}

export const PROJECTS: Project[] = [
  {
    slug: 'keurveilig',
    title: 'Keurveilig',
    date: '2026-03-21 (Still actively working on)',
    role: 'Freelance',
    stack: ['React', 'Tailwind', 'Vite', 'Vercel'],
    status: 'live',
    url: 'https://keurveilig.nl',
    summary: 'Freelance job. Built and shipped on Vercel.',
  },
  {
    slug: 'michelvisuals',
    title: 'Michel Visuals',
    date: '2026-07-21 - 2026-08-15',
    role: 'Freelance',
    stack: ['React', 'React Router', 'Tailwind', 'Vite', 'Vercel'],
    status: 'live',
    url: 'https://michelvisuals.com',
    summary:
      'Freelance job for an editor.',
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
