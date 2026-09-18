import { month, type Project } from './projects'

export function Detail({ project, back }: { project: Project; back: () => void }) {
  return (
    <article>
      <button
        type="button"
        onClick={back}
        className="mb-6 text-[11px] text-ink-dim uppercase tracking-[0.18em] hover:text-cold"
      >
        &larr; Back to work
      </button>

      <h1 className="text-ink text-2xl">{project.title}</h1>

      {project.summary ? (
        <p className="mt-3 max-w-prose text-ink-dim leading-relaxed">{project.summary}</p>
      ) : (
        <Empty>Summary still to write.</Empty>
      )}

      <dl className="mt-8 grid max-w-xl grid-cols-[8rem_1fr] gap-y-0 border-line border-t">
        <Row term="Date">
          <span className="tnum">{month(project.date)}</span>
        </Row>
        <Row term="Role">{project.role}</Row>
        <Row term="Stack">
          {project.stack.length > 0 ? (
            <span className="flex flex-wrap gap-1">
              {project.stack.map((s) => (
                <span key={s} className="border border-line px-1.5 py-0.5 text-[11px]">
                  {s}
                </span>
              ))}
            </span>
          ) : (
            '—'
          )}
        </Row>
        <Row term="Status">{project.status}</Row>
        <Row term="Live">
          {project.url ? (
            <a href={project.url} className="text-cold hover:underline">
              {project.url.replace(/^https:\/\//, '')}
            </a>
          ) : (
            '—'
          )}
        </Row>
      </dl>

      <h2 className="mt-10 text-[11px] text-ink-dim uppercase tracking-[0.18em]">Result</h2>
      {project.result ? (
        <p className="mt-2 max-w-prose text-ink leading-relaxed">{project.result}</p>
      ) : (
        <Empty>
          Still to write. No invented numbers — only what can be checked.
        </Empty>
      )}

      <h2 className="mt-10 text-[11px] text-ink-dim uppercase tracking-[0.18em]">Imagery</h2>
      <Empty>
        Still to add. The assignment requires imagery on the detail page; a
        screenshot of the live site is enough.
      </Empty>
    </article>
  )
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="border-line border-b py-2 text-[11px] text-ink-dim uppercase tracking-[0.18em]">
        {term}
      </dt>
      <dd className="border-line border-b py-2 text-ink">{children}</dd>
    </>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 max-w-prose border border-line border-dashed px-3 py-2 text-ink-dim text-xs">
      {children}
    </p>
  )
}
