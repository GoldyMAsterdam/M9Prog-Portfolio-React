import { ArrowLeft } from 'lucide-react'
import { NAME } from './projects'

const focus = 'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent'

// Inner pages only. The home page is one scroll and needs no nav.
export function Nav() {
  return (
    <nav className="m-auto max-w-[1400px] px-10 pt-8 max-lap:px-6 max-phone:px-4" aria-label="Main navigation">
      <a className={`glass pill inline-flex items-center gap-2 rounded-full py-2.5 pr-5 pl-4 font-mono text-[0.85rem]/[1] font-bold text-bright uppercase no-underline ${focus}`} href="#home">
        <ArrowLeft className="size-4" strokeWidth={2.5} aria-hidden="true" />
        {NAME}
        <span className="sr-only"> home</span>
      </a>
    </nav>
  )
}

export const pageTitle = 'm-0 min-w-0 font-mono text-[clamp(2.5rem,3.8vw,4.75rem)]/[1] font-bold tracking-[-0.03em] text-bright uppercase [overflow-wrap:anywhere]'
