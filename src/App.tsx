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

// Sections
const HOME_SECTIONS = ['my-work', 'about-me', 'contact-me']

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
      // wait a frame so the home page is mounted before scrolling
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
        <Nav />
        <main id="content" className="m-auto min-h-[calc(100svh-4rem)] max-w-[1400px] px-10 pt-24 pb-24 max-lap:px-6 max-lap:pt-16 max-phone:px-4">
          <div key={route} className="enter">
            <Page />
          </div>
        </main>
      </div>
    </>
  )
}
