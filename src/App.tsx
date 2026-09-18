import michelVisualsImage from './assets/images/michelvisuals.jpg'
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
              <a href="#record">About</a>
              <a href="mailto:tychoboom1@gmail.com">Contact</a>
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
                <a className="text-lg" href="https://github.com/GoldyMAsterdam" target="_blank" rel="noreferrer">GitHub</a>
                <span className="text-base">@GoldyMAsterdam</span>
              </li>
              <li>
                <a className="text-lg" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
                <span className="text-base">in/goldy</span>
              </li>
              <li> {/* Placeholder, later replaced with a contact form */}
                <a className="text-lg" href="mailto:tychoboom1@gmail.com">Email</a>
                <span className="text-base">mail</span>
              </li>
              <li>
                <a className="text-lg" href="#contact">CV</a>
                <span className="text-base">pdf</span>
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
                  <img src={michelVisualsImage} alt="Michel Visuals project preview" />
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
