import { month, PROJECTS } from '../projects'

export function V2Middle() {
  return (
    <div
      className="min-h-dvh bg-field text-ink"
      style={{
        backgroundImage:
          'radial-gradient(110ch 70ch at 12% -12%, color-mix(in oklab, var(--color-glow) 36%, transparent), transparent 70%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <header className="border-line border-b">
        <div className="mx-auto flex max-w-5xl items-baseline gap-8 px-6 py-5">
          <span className="text-ink uppercase tracking-[0.32em]">Goldy</span>
          <nav className="flex gap-6 text-[11px] text-ink-dim uppercase tracking-[0.2em]">
            <a className="text-cold" href="#work">work</a>
            <a className="hover:text-ink" href="#about">about</a>
            <a className="hover:text-ink" href="#contact">contact</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-5 text-[11px] text-ink-dim uppercase tracking-[0.22em]">
          Work
        </h1>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-line border-b text-[11px] text-ink-dim uppercase tracking-[0.18em]">
              <th className="py-2.5 pr-4 font-normal">Title</th>
              <th className="py-2.5 pr-4 font-normal">Date</th>
              <th className="py-2.5 pr-4 font-normal">Role</th>
              <th className="py-2.5 pr-4 font-normal">Stack</th>
              <th className="py-2.5 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map((p) => (
              <tr key={p.slug} className="border-line border-b hover:bg-surface-hi">
                <td className="py-3 pr-4 text-ink">{p.title}</td>
                <td className="tnum py-3 pr-4 text-ink-dim">{month(p.date)}</td>
                <td className="py-3 pr-4 text-ink-dim">{p.role}</td>
                <td className="py-3 pr-4">
                  <span className="flex flex-wrap gap-1">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-line px-1.5 py-0.5 text-[11px] text-ink-dim"
                      >
                        {s}
                      </span>
                    ))}
                  </span>
                </td>
                <td className="py-3 text-[12px] text-cold">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
