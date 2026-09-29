import { ArrowUpRight } from 'lucide-react'
import { pageTitle } from '../Nav'
import { PROJECTS, month, type Project } from '../projects'

const focus = 'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent'
const mono = 'font-mono text-[0.72rem] tracking-[0.08em] uppercase'

// Every project in the same two-up grid the home page uses, so the list reads as the full version of that section.
export default function Work() {
  return (
    <>
      <h1 className={pageTitle}>Work</h1>
      <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-16 max-lap:grid-cols-1 max-lap:gap-y-12">
        {PROJECTS.filter((project) => project.status === 'live').map((project) => (
          <Entry key={project.slug} project={project} />
        ))}
      </div>
    </>
  )
}

function Entry({ project }: { project: Project }) {
  return (
    <article className="lift min-w-0">
      {project.image && (
        <a className={`block ${focus}`} href={project.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
          <figure className="shot relative m-0 aspect-video rounded-3xl bg-panel max-phone:rounded-2xl">
            <img className="block h-full w-full object-cover" src={project.image} alt="" />
          </figure>
        </a>
      )}
      <p className={`m-0 mt-6 text-muted ${mono}`}>
        {project.role} · {month(project.date)}
      </p>
      <h2 className="m-0 mt-3 font-mono text-[clamp(1.6rem,1.6vw+0.9rem,2.5rem)]/[1.05] font-bold tracking-[-0.03em] text-bright uppercase [overflow-wrap:anywhere]">{project.title}</h2>
      {project.summary && <p className="m-0 mt-4 max-w-[52ch] text-[1rem]/[1.7] text-ink">{project.summary}</p>}
      <p className={`m-0 mt-4 text-muted ${mono}`}>{project.stack.join(' · ')}</p>
      {project.url && (
        <a className={`glass pill mt-6 inline-flex items-center gap-2 rounded-full py-3 pr-4 pl-5 font-mono text-[0.85rem]/[1] whitespace-nowrap text-ink no-underline ${focus}`} href={project.url} target="_blank" rel="noreferrer">
          Visit site
          <ArrowUpRight className="arrow out size-4" strokeWidth={2} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </article>
  )
}
