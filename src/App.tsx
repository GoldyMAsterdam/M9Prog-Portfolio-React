import { PROJECTS } from './projects'
import { Sky } from './Sky'

const project = PROJECTS.find((item) => item.slug === 'michelvisuals') ?? PROJECTS[0]

export default function App() {
  const domain = project.url?.replace(/^https?:\/\//, '') ?? 'portfolio.local'

  return (
    <>
      <Sky />
      <a className="skip" href="#record">Skip to content</a>

      <div className="page-shell">
        <aside className="rail" aria-label="Sidebar navigation">
          <Panel title="Navigation">
            <nav className="nav-list" aria-label="Main navigation">
              <a href="#record" aria-current="page">Work</a>
              <a href="#techniques" className="sub">› Websites</a>
              <a href="#techniques" className="sub">› School</a>
              <a href="#techniques">Techniques</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </Panel>

          <Panel title="Statistics">
            <dl className="stats">
              <div>
                <dt>Projects</dt>
                <dd>{PROJECTS.length}</dd>
              </div>
              <div>
                <dt>Live</dt>
                <dd>{PROJECTS.filter((item) => item.status === 'live').length}</dd>
              </div>
              <div>
                <dt>Records here</dt>
                <dd>1</dd>
              </div>
            </dl>
          </Panel>

          <Panel title="Social media">
            <ul className="social">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
                <span>@goldy</span>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                <span>in/goldy</span>
              </li>
              <li>
                <a href="mailto:tychoboom1@gmail.com">Email</a>
                <span>mail</span>
              </li>
              <li>
                <a href="#contact">CV</a>
                <span>pdf</span>
              </li>
            </ul>
          </Panel>
        </aside>

        <main className="main-column">
          <article className="record" id="record">
            <header className="record-head">
              <h2>{project.title}</h2>
              <span>{domain}</span>
              <strong>{project.status}</strong>
            </header>

            <div className="record-body">
              <div>
                <div className="project-shot" role="img" aria-label="Michel Visuals project preview">
                  <span>
                    MICHEL
                    <br />
                    VISUALS
                  </span>
                </div>
              </div>

              <dl className="spec">
                <dt>Client</dt>
                <dd>Michel, videographer - Netherlands</dd>

                <dt>Role</dt>
                <dd>{project.role}. Design handed over, build mine.</dd>

                <dt>Shipped</dt>
                <dd>July 2026</dd>

                <dt>Built with</dt>
                <dd>{project.stack.join(', ')}</dd>

                <dt>Hosting</dt>
                <dd>Vercel</dd>

                <dt>Links</dt>
                <dd>
                  <a href={project.url}>live site</a>, <a href="#contact">build log</a>,{' '}
                  <a href="#contact">lighthouse</a>
                </dd>
              </dl>
            </div>

            <p className="blurb">
              An editor who needed a modern, responsive website to showcase his work. 
              Built with React and styled with Tailwind CSS.
            </p>

            <div className="techniques" id="techniques">
              <span>Techniques</span>
              <a href="#record">
                Client work <small>2</small>
              </a>
              <a href="#record">
                Video-led <small>1</small>
              </a>
              <a href="#record">
                Routing <small>1</small>
              </a>
              <a href="#record">
                Dutch <small>3</small>
              </a>
              <a href="#record">
                Handover <small>2</small>
              </a>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  )
}
