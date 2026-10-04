import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { AsciiCode } from '../AsciiCode'
import { AsciiMoon } from '../AsciiMoon'
import ContactForm from '../ContactForm'
import { pageTitle as title } from '../Nav'
import { NAME, PROJECTS, month } from '../projects'

const WORK = PROJECTS.filter((project) => project.status === 'live' && project.image)
// only link when the work page has more
const HAS_MORE = PROJECTS.filter((project) => project.status === 'live').length > WORK.length

const focus = 'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent'
const mono = 'font-mono text-[0.72rem] tracking-[0.08em] uppercase'
const wrap = 'm-auto max-w-[1400px] px-10 max-lap:px-6 max-phone:px-4'

export default function Home() {
  return (
    <div className="relative z-[1]">
      <main id="content">
        <section className={`${wrap} enter grid min-h-[calc(100svh-7.5rem)] grid-cols-[minmax(0,1fr)_auto] items-center gap-16 py-16 max-lap:grid-cols-[minmax(0,1fr)] max-lap:gap-12`}>
          <div className="stagger min-w-0">
            <h1 className="m-0 font-mono text-[clamp(4rem,9vw,9rem)]/[1] font-bold tracking-[-0.03em] text-bright uppercase [overflow-wrap:anywhere]">{NAME}</h1>
            <p className="m-0 mt-8 max-w-[46ch] text-[clamp(1.15rem,0.6vw+1rem,1.5rem)]/[1.5] text-ink" style={{ '--i': 1 } as React.CSSProperties}>
              Software development student at MediaCollege Amsterdam. I design and build websites for clients in React.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3" style={{ '--i': 2 } as React.CSSProperties}>
              <a className={`rounded-full bg-bright px-6 py-3.5 font-mono text-[0.9rem]/[1] whitespace-nowrap text-bg no-underline transition-colors duration-150 select-none hover:bg-bright/85 active:bg-bright/70 ${focus}`} href="#my-work">
                See my work
              </a>
              <a className={`glass pill rounded-full px-6 py-3.5 font-mono text-[0.9rem]/[1] whitespace-nowrap text-ink no-underline ${focus}`} href="#contact-me">
                Contact
              </a>
            </div>
          </div>

          <AsciiMoon className="text-[clamp(7px,1.05vh,13px)] max-lap:text-[7px] max-phone:text-[5px]" />
        </section>

        <section id="my-work" className={`${wrap} pt-8 pb-24 max-lap:pb-16`} aria-labelledby="work-title">
          <h2 id="work-title" className={title}>
            {HAS_MORE ? (
              <a className={`group text-inherit no-underline hover:text-moon active:text-link ${focus}`} href="#work">
                Work
                <ArrowRight className="arrow ml-3 inline-block size-[0.62em] align-[0.04em] text-link group-hover:text-moon" strokeWidth={2.75} aria-hidden="true" />
                <span className="sr-only">, see all projects</span>
              </a>
            ) : 'Work'}
          </h2>

          <div className="mt-12 grid gap-y-24 max-lap:gap-y-12">
            {WORK.map((project, index) => {
              // every other row puts the text left
              const flip = index % 2 === 1
              return (
                <article key={project.slug} className="lift grid min-w-0 grid-cols-12 items-end gap-x-10 gap-y-8 max-lap:grid-cols-1">
                  <a className={`block col-span-8 max-lap:col-span-1 ${flip ? 'col-start-5 max-lap:col-start-1' : ''} ${focus}`} href={project.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                    <figure className="shot relative m-0 aspect-video rounded-3xl bg-panel max-phone:rounded-2xl">
                      <img className="block h-full w-full object-cover select-none" draggable={false} src={project.image} alt="" loading="lazy" />
                    </figure>
                  </a>
                  <div className={`min-w-0 col-span-4 max-lap:col-span-1 ${flip ? 'col-start-1 row-start-1 max-lap:row-start-2' : ''}`}>
                    <p className={`m-0 text-muted ${mono}`}>
                      {project.role} · {month(project.date)}
                    </p>
                    <h3 className="m-0 mt-3 font-mono text-[clamp(1.6rem,1.6vw+0.9rem,2.5rem)]/[1.05] font-bold tracking-[-0.03em] text-bright uppercase [overflow-wrap:anywhere]">{project.title}</h3>
                    <p className="m-0 mt-4 max-w-[52ch] text-[1rem]/[1.7] text-ink">{project.summary}</p>
                    <p className={`m-0 mt-4 text-muted ${mono}`}>{project.stack.join(' - ')}</p>
                    <a className={`glass pill mt-6 inline-flex items-center gap-2 rounded-full py-3 pr-4 pl-5 font-mono text-[0.85rem]/[1] whitespace-nowrap text-ink no-underline ${focus}`} href={project.url} target="_blank" rel="noreferrer">
                      Visit site
                      <ArrowUpRight className="arrow out size-4" strokeWidth={2} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="about-me" className={`${wrap} grid grid-cols-12 items-center py-24 max-lap:py-16`} aria-labelledby="about-title">
          <AsciiCode className="col-span-4 justify-self-center text-[clamp(7px,0.94vh,11px)] max-lap:hidden" />
          <div className="col-span-7 col-start-6 min-w-0 max-lap:col-span-12 max-lap:col-start-1">
            <h2 id="about-title" className={title}>
              About
            </h2>
            <p className="m-0 mt-8 max-w-[34ch] text-[clamp(1.4rem,1vw+1rem,2.1rem)]/[1.35] tracking-[-0.02em] text-bright">
              I'm {NAME}, 18. I take a site from first idea to live: design, build, launch, and keeping it running after.
            </p>
          </div>
        </section>

        <footer id="contact-me" className={`${wrap} flex flex-col items-center pt-24 pb-16 text-center max-lap:pt-16`}>
          <h2 className={title}>Contact</h2>
          <ContactForm />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a className={`glass pill rounded-full px-6 py-3.5 font-mono text-[0.9rem]/[1] whitespace-nowrap text-ink no-underline ${focus}`} href="#github">
              GitHub
            </a>
            <a className={`glass pill inline-flex items-center gap-2 rounded-full py-3.5 pr-5 pl-6 font-mono text-[0.9rem]/[1] whitespace-nowrap text-ink no-underline ${focus}`} href="https://www.linkedin.com/in/tycho-boom-139a72415/" target="_blank" rel="noreferrer">
              LinkedIn
              <ArrowUpRight className="arrow out size-4" strokeWidth={2} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <p className={`m-0 mt-20 text-muted ${mono}`}>
            &copy; {new Date().getFullYear()} {NAME}
          </p>
        </footer>
      </main>
    </div>
  )
}
