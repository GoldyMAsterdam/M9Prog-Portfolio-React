import { NAME } from './projects'

const focus = 'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent'

const LINKS = [
  ['#work', '--work'],
  ['#about-me', '--about'],
  ['#contact-me', '--contact'],
]

export function Nav({ current }: { current?: string }) {
  return (
    <nav className="m-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-1 px-10 pt-8 font-mono text-[0.9rem] text-muted max-lap:px-6 max-phone:px-4" aria-label="Main navigation">
      <a className={`no-underline text-muted hover:text-accent active:text-link ${focus}`} href="#home">
        ~/{NAME.toLowerCase()} $<span className="sr-only"> home</span>
      </a>
      <ul className="m-0 flex list-none flex-wrap gap-x-4 p-0">
        {LINKS.map(([href, label]) => (
          <li key={href}>
            <a className={`link pb-0.5 whitespace-nowrap text-ink no-underline hover:text-accent active:text-link aria-[current=page]:text-bright ${focus}`} href={href} aria-current={current === href ? 'page' : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export const pageTitle = 'm-0 min-w-0 font-mono text-[clamp(2.5rem,3.8vw,4.75rem)]/[1] font-bold tracking-[-0.03em] text-bright uppercase [overflow-wrap:anywhere]'
