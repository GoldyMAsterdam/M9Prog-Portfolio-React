import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { AsciiKey } from '../AsciiKey'
import { AsciiMoon } from '../AsciiMoon'
import { Nav, pageTitle as title } from '../Nav'
import { NAME, PROJECTS, month } from '../projects'

/* Hallmark · macrostructure: split studio · genre: atmospheric · nav: N8 terminal command · footer: Ft5 statement */
/* Hallmark · pre-emit critique: P3 H4 E4 S3 R4 V4 */

const WORK = PROJECTS.filter((project) => project.status === 'live' && project.image)

const focus = 'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent'
const mono = 'font-mono text-[0.72rem] tracking-[0.08em] uppercase'
const section = 'm-auto max-w-[1400px] px-10 max-lap:px-6 max-phone:px-4'
const wrap = 'm-auto max-w-[1400px] px-10 max-lap:px-6 max-phone:px-4'

// Landing. The hero sits in the sky with the moon; the sections after it stay on the same sky, each in its own shape.
export default function Home() {
  return (
    <div className="relative z-[1]">
      <Nav />

      <main id="content">
        <section className={`${section} enter grid min-h-[calc(100svh-4rem)] grid-cols-[minmax(0,1fr)_auto] items-center gap-16 pt-12 pb-24 max-lap:grid-cols-[minmax(0,1fr)] max-lap:gap-12`}>
          <div className="stagger min-w-0">
            <h1 className="m-0 font-mono text-[clamp(4rem,9vw,9rem)]/[1] font-bold tracking-[-0.03em] text-bright uppercase [overflow-wrap:anywhere]">{NAME}</h1>
            <p className="m-0 mt-8 max-w-[46ch] text-[clamp(1.15rem,0.6vw+1rem,1.5rem)]/[1.5] text-ink" style={{ '--i': 1 } as React.CSSProperties}>
              Frontend developer. I design and build websites with Vite, React and Tailwind.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3" style={{ '--i': 2 } as React.CSSProperties}>
              <a className={`rounded-full bg-bright px-6 py-3.5 font-mono text-[0.9rem]/[1] whitespace-nowrap text-bg no-underline transition-colors duration-150 hover:bg-moon active:bg-link ${focus}`} href="#work">
                See my work
              </a>
              <a className={`glass pill rounded-full px-6 py-3.5 font-mono text-[0.9rem]/[1] whitespace-nowrap text-ink no-underline ${focus}`} href="#about-me">
                About me
              </a>
            </div>
          </div>

          <AsciiMoon className="text-[clamp(7px,1.05vh,13px)] max-lap:text-[7px] max-phone:text-[5px]" />
        </section>

        {/* After the hero every section takes its own shape: about hangs right, opposite the name; the work is one wide project and two side by side; contact closes in the middle. */}
        <section id="about-me" className={`${wrap} grid grid-cols-12 items-center py-24 max-lap:py-16`} aria-labelledby="about-title">
          <AsciiKey className="col-span-4 justify-self-center text-[clamp(9px,1.25vh,15px)] max-lap:hidden" />
          <div className="col-span-7 col-start-6 min-w-0 max-lap:col-span-12 max-lap:col-start-1">
            <h2 id="about-title" className={title}>
              About
            </h2>
            <p className="m-0 mt-8 max-w-[34ch] text-[clamp(1.4rem,1vw+1rem,2.1rem)]/[1.35] tracking-[-0.02em] text-bright">
              I'm {NAME}, 18. I study software development at MediaCollege Amsterdam, and next to school I build websites for clients.
            </p>
            <p className="m-0 mt-6 max-w-[56ch] text-[1.05rem]/[1.75] text-ink">
              For KeurVeilig, a tool inspection company working across the Netherlands, I built the site, the price calculator and the quote flow, and I still work on it. For Michel Visuals, a videographer, I designed and built a site to show his work.
            </p>
          </div>
        </section>

        <section className={`${wrap} py-24 max-lap:py-16`} aria-labelledby="work-title">
          {/* The heading is the way on to the full list, so there is no separate "all projects" link to place. */}
          <h2 id="work-title" className={title}>
            <a className={`group text-inherit no-underline hover:text-moon active:text-link ${focus}`} href="#work">
              Work
              <ArrowRight className="arrow ml-3 inline-block size-[0.62em] align-[0.04em] text-link group-hover:text-moon" strokeWidth={2.75} aria-hidden="true" />
              <span className="sr-only">, see all projects</span>
            </a>
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-16 max-lap:grid-cols-1 max-lap:gap-y-12">
            {WORK.map((project, index) => {
              const wide = index === 0
              return (
                <article key={project.slug} className={`lift min-w-0 ${wide ? 'col-span-2 grid grid-cols-12 items-end gap-x-10 gap-y-8 max-lap:col-span-1 max-lap:grid-cols-1' : ''}`}>
                  <a className={`block ${wide ? 'col-span-8 max-lap:col-span-1' : ''} ${focus}`} href={project.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                    <figure className="shot relative m-0 aspect-video rounded-3xl bg-panel max-phone:rounded-2xl">
                      <img className="block h-full w-full object-cover" src={project.image} alt="" loading="lazy" />
                    </figure>
                  </a>
                  <div className={`min-w-0 ${wide ? 'col-span-4 max-lap:col-span-1' : 'mt-6'}`}>
                    <p className={`m-0 text-muted ${mono}`}>
                      {project.role} · {month(project.date)}
                    </p>
                    <h3 className="m-0 mt-3 font-mono text-[clamp(1.6rem,1.6vw+0.9rem,2.5rem)]/[1.05] font-bold tracking-[-0.03em] text-bright uppercase [overflow-wrap:anywhere]">{project.title}</h3>
                    <p className="m-0 mt-4 max-w-[52ch] text-[1rem]/[1.7] text-ink">{project.summary}</p>
                    <p className={`m-0 mt-4 text-muted ${mono}`}>{project.stack.join(' · ')}</p>
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

        <footer id="contact-me" className={`${wrap} flex flex-col items-center pt-24 pb-16 text-center max-lap:pt-16`}>
          <h2 className={title}>Contact</h2>
          <p className="m-0 mt-6 max-w-[30ch] text-[clamp(1.4rem,1vw+1rem,2.1rem)]/[1.35] tracking-[-0.02em] text-bright">Want to talk about a website? Mail me.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a className={`rounded-full bg-bright px-6 py-3.5 font-mono text-[0.9rem]/[1] text-bg no-underline transition-colors duration-150 hover:bg-moon active:bg-link ${focus}`} href="mailto:tychoboom1@gmail.com">
              tychoboom1@gmail.com
            </a>
            <a className={`glass pill rounded-full px-6 py-3.5 font-mono text-[0.9rem]/[1] whitespace-nowrap text-ink no-underline ${focus}`} href="#github">
              GitHub
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
