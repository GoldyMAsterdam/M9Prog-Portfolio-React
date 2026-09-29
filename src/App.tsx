import { useEffect, useState } from 'react'
import { Nav } from './Nav'
import { Sky } from './Sky'
import About from './pages/about'
import Contact from './pages/contact'
import Github from './pages/github'
import Home from './pages/home'
import Work from './pages/work'

const ROUTES = { work: Work, about: About, github: Github, contact: Contact }

type Route = keyof typeof ROUTES | 'home'

// Sections that live on the home page; their hashes route home and then scroll to them.
const HOME_SECTIONS = ['about-me', 'contact-me']

// Hashes that are not routes (the skip link's #content) return null and leave the page alone.
function routeFromHash(): Route | null {
  const hash = window.location.hash.slice(1)
  if (!hash || hash === 'home' || HOME_SECTIONS.includes(hash)) return 'home'
  return hash in ROUTES ? (hash as Route) : null
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash() ?? 'home')

  useEffect(() => {
    const onHashChange = () => {
      const next = routeFromHash()
      if (!next) return
      setRoute(next)
      // Wait a frame so a section on a page that is only now mounting exists before scrolling to it.
      requestAnimationFrame(() => {
        const target = document.getElementById(window.location.hash.slice(1))
        if (target && HOME_SECTIONS.includes(target.id)) target.scrollIntoView()
        else window.scrollTo({ top: 0 })
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const skip = (
    <a
      className="absolute top-2 left-[-9999px] z-[5] rounded-full bg-bright px-4 py-2 font-mono text-[0.85rem] text-bg focus:left-2"
      href="#content"
    >
      Skip to content
    </a>
  )

  if (route === 'home') {
    return (
      <>
        <Sky />
        {skip}
        <Home />
      </>
    )
  }

  const Page = ROUTES[route]

  return (
    <>
      <Sky />
      {skip}
      <div className="relative z-[1]">
        <Nav current={`#${route}`} />
        <main id="content" className="m-auto min-h-[calc(100svh-4rem)] max-w-[1400px] px-10 pt-24 pb-24 max-lap:px-6 max-lap:pt-16 max-phone:px-4">
          {/* Keyed so every route change remounts and plays the entrance. */}
          <div key={route} className="enter">
            <Page />
          </div>
        </main>
      </div>
    </>
  )
}
