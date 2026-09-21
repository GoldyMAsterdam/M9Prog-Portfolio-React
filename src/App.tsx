import { useEffect, useState } from 'react'
import { PROJECTS } from './projects'
import { Sky } from './Sky'
import About from './pages/about'
import Contact from './pages/contact'
import Github from './pages/github'
import Work from './pages/work'

const ROUTES = { work: Work, about: About, github: Github, contact: Contact }

const NAV: { route: Route; label: string }[] = [
  { route: 'work', label: 'Work' },
  { route: 'about', label: 'About' },
  { route: 'contact', label: 'Contact' },
]

type Route = keyof typeof ROUTES

function currentRoute(): Route {
  const hash = window.location.hash.slice(1)
  return hash in ROUTES ? (hash as Route) : 'work'
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [route, setRoute] = useState<Route>(currentRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const Page = ROUTES[route]

  return (
    <>
      <Sky />
      <a
        className="absolute top-2 left-[-9999px] z-[5] border border-accent bg-panel px-2.5 py-[7px] text-bright focus:left-2"
        href="#work"
      >
        Skip to content
      </a>

      <div className="relative z-[1] m-auto grid min-h-screen max-w-[1560px] grid-cols-[210px_260px_minmax(0,1fr)] gap-7 pt-[118px] pr-[120px] pb-20 pl-10 max-wide:grid-cols-[190px_230px_minmax(0,1fr)] max-wide:gap-5 max-wide:pr-10 max-lap:flex max-lap:flex-col max-lap:gap-[14px] max-lap:px-6 max-lap:pt-5 max-lap:pb-14 max-phone:px-[14px] max-phone:pt-3 max-phone:pb-10">
        <div className="hidden max-lap:relative max-lap:z-[4] max-lap:flex max-lap:items-center max-lap:justify-end max-lap:gap-4 max-lap:border-b max-lap:border-line max-lap:pt-2.5 max-lap:pb-[9px]">
          <button
            className="inline-flex min-h-9 cursor-pointer items-center gap-2.5 border-0 bg-transparent py-1.5 pl-2.5 text-[0.8rem] text-ink hover:text-accent focus-visible:text-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-rail"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? 'Close' : 'Browse'}</span>
            <span className="relative block h-3 w-3" aria-hidden="true">
              <span className={`absolute top-[5px] left-px h-px w-2.5 bg-current transition-transform duration-200 ${menuOpen ? 'rotate-45' : ''}`} />
              <span className={`absolute top-[5px] left-px h-px w-2.5 bg-current transition-transform duration-200 ${menuOpen ? '-rotate-45' : 'rotate-90'}`} />
            </span>
          </button>
        </div>

        <aside
          className={`col-start-2 flex flex-col gap-4 self-start border border-line bg-[#0a111ea6] p-[14px] backdrop-blur-[2px] max-lap:fixed max-lap:inset-y-0 max-lap:right-0 max-lap:left-auto max-lap:z-[3] max-lap:col-auto max-lap:max-h-screen max-lap:w-[min(340px,82vw)] max-lap:overflow-y-auto max-lap:px-[14px] max-lap:pt-[72px] max-lap:pb-6 max-lap:shadow-[-18px_0_40px_#02050dcc] max-phone:pt-16 ${menuOpen ? 'max-lap:flex' : 'max-lap:hidden'}`}
          id="site-rail"
          aria-label="Sidebar navigation"
        >
          <Panel title="Navigation">
            <nav className="flex flex-col gap-1.5" aria-label="Main navigation">
              {NAV.map(({ route: key, label }) => (
                <a
                  key={key}
                  className="block w-fit max-w-full text-base/[1.45] text-ink no-underline hover:text-accent aria-[current=page]:text-bright"
                  href={`#${key}`}
                  aria-current={route === key ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </Panel>

          <Panel title="Statistics">
            <dl className="m-0 flex flex-col gap-1.5">
              <div className="flex justify-between gap-2.5">
                <dt className="text-muted">Projects</dt>
                <dd className="m-0 text-ink">{PROJECTS.length}</dd>
              </div>
              <div className="flex justify-between gap-2.5">
                <dt className="text-muted">Live</dt>
                <dd className="m-0 text-ink">{PROJECTS.filter((item) => item.status === 'live').length}</dd>
              </div>
              <div className="flex justify-between gap-2.5">
                <dt className="text-muted">Records here</dt>
                <dd className="m-0 text-ink">1</dd>
              </div>
            </dl>
          </Panel>

          <Panel title="Social media">
            <ul className="m-0 grid list-none gap-0 p-0">
              <Social href="#github" label="GitHub" meta="@GoldyMAsterdam" />
              <Social href="https://linkedin.com" label="LinkedIn" meta="in/goldy" external />
              {/* Placeholder, later replaced with a contact form */}
              <Social href="mailto:tychoboom1@gmail.com" label="Email" meta="mail" />
              <Social href="#contact" label="CV" meta="pdf" />
            </ul>
          </Panel>
        </aside>

        <main className="col-start-3 min-w-0 max-lap:col-auto max-lap:w-full">
          <Page />
        </main>
      </div>
    </>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-line bg-panel/75">
      <h2 className="m-0 border-b border-line bg-[#131d33aa] px-2.5 py-1.5 text-[0.72rem]/[1.45] font-medium tracking-[0.08em] text-bright uppercase">
        {title}
      </h2>
      <div className="flex flex-col gap-1.5 px-2.5 py-[9px]">{children}</div>
    </section>
  )
}

function Social({ href, label, meta, external }: { href: string; label: string; meta: string; external?: boolean }) {
  return (
    <li className="flex justify-between gap-2.5 border-t border-[#16203699] py-[5px] first:border-t-0 max-phone:gap-2">
      <a
        className="text-lg text-link hover:text-accent"
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {label}
      </a>
      <span className="text-base text-muted">{meta}</span>
    </li>
  )
}
