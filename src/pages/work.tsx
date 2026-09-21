import michelVisualsImage from '../assets/images/michelvisuals.jpg'
import { PROJECTS } from '../projects'

const project = PROJECTS.find((item) => item.slug === 'michelvisuals') ?? PROJECTS[0]

const dt = 'py-1 border-t border-[#16203677] first-of-type:border-t-0 text-muted max-phone:pb-0 max-phone:border-t-0 max-phone:text-[0.75rem] max-phone:uppercase max-phone:tracking-[0.06em]'
const dd = 'm-0 py-1 border-t border-[#16203677] first-of-type:border-t-0 max-phone:pt-0 max-phone:pb-2'

export default function Work() {
  const domain = project.url?.replace(/^https?:\/\//, '') ?? 'portfolio.local'

  return (
    <article className="border border-line bg-surface/95" id="work">
      <header className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-b border-line bg-band px-[11px] py-1.5 max-phone:items-start max-phone:px-2.5 max-phone:py-[9px]">
        <h2 className="m-0 text-[clamp(1.25rem,1.2vw+0.9rem,1.75rem)]/[1.25] font-semibold tracking-[-0.04em] text-bright max-lap:min-w-0 max-lap:[overflow-wrap:anywhere] max-phone:w-full max-phone:text-[clamp(1.25rem,7vw,1.65rem)]">
          {project.title}
        </h2>
        <span className="text-[0.76rem] text-muted max-phone:max-w-full max-phone:[overflow-wrap:anywhere]">{domain}</span>
      </header>

      <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,8fr)] gap-[18px] p-3 max-phone:grid-cols-[minmax(0,1fr)] max-phone:gap-[14px] max-phone:p-2.5">
        <div>
          <div
            className="grid aspect-video place-items-center overflow-hidden border border-line bg-[linear-gradient(135deg,#16223c_0%,#355b70_38%,#0a1322_100%)]"
            role="img"
            aria-label="Michel Visuals project preview"
          >
            <img className="block h-full w-full object-cover" src={michelVisualsImage} alt="Michel Visuals project preview" />
          </div>
        </div>

        <dl className="m-0 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-[14px] gap-y-0 text-[0.82rem]/[1.55] max-phone:grid-cols-[minmax(0,1fr)] max-phone:gap-0">
          <dt className={dt}>Client</dt>
          <dd className={dd}>Michel, videographer - Netherlands</dd>

          <dt className={dt}>Role</dt>
          <dd className={dd}>{project.role}. Design handed over, build mine.</dd>

          <dt className={dt}>Shipped</dt>
          <dd className={dd}>July 2026</dd>

          <dt className={dt}>Built with</dt>
          <dd className={dd}>{project.stack.join(', ')}</dd>

          <dt className={dt}>Hosting</dt>
          <dd className={dd}>Vercel</dd>

          <dt className={dt}>Links</dt>
          <dd className={dd}>
            <a className="text-link hover:text-accent" href={project.url} target="_blank" rel="noreferrer">live site</a>,{' '}
            <a className="text-link hover:text-accent" href="#contact">build log</a>,{' '}
            <a className="text-link hover:text-accent" href="#contact">lighthouse</a>
          </dd>
        </dl>
      </div>

      <p className="m-0 max-w-[68ch] border-t border-line p-3 text-[0.84rem]/[1.75] text-[#c2cde0]">
        An editor who needed a modern, responsive website to showcase his work.<br />
        Built with React and styled with Tailwind CSS.
      </p>
    </article>
  )
}
