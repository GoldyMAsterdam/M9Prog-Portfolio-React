import { month, PROJECTS } from '../projects.ts'

export function V1Quiet() {
  return (
    <div className="min-h-dvh bg-[#05070d] text-[13px] text-ink">
      <header className="border-line/70 border-b">
        <div className="mx-auto flex max-w-5xl items-baseline gap-6 px-5 py-2.5">
          <span className="font-medium text-ink">Goldy</span>
          <nav className="flex gap-4 text-[12px] text-ink-dim">
            <a className="text-ink" href="#work">work</a>
            <a className="hover:text-ink" href="#about">about</a>
            <a className="hover:text-ink" href="#contact">contact</a>
          </nav>
          <span className="ml-auto text-[12px] text-ink-dim">
            frontend - Netherlands
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-5">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-line/70 border-b text-[11px] text-ink-dim">
              <th className="py-1.5 pr-3 font-normal">title</th>
              <th className="py-1.5 pr-3 font-normal">date</th>
              <th className="py-1.5 pr-3 font-normal">role</th>
              <th className="py-1.5 pr-3 font-normal">stack</th>
              <th className="py-1.5 font-normal">status</th>
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map((p) => (
              <tr key={p.slug} className="border-line/40 border-b hover:bg-[#0b1120]">
                <td className="py-1.5 pr-3">{p.title}</td>
                <td className="tnum py-1.5 pr-3 text-ink-dim">{month(p.date)}</td>
                <td className="py-1.5 pr-3 text-ink-dim">{p.role}</td>
                <td className="py-1.5 pr-3 text-ink-dim">{p.stack.join(', ') || '—'}</td>
                <td className="py-1.5 text-ink-dim">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 text-[12px] text-ink-dim">
          {PROJECTS.length} rows. Sort on any column, filter by stack.
        </p>
      </main>
    </div>
  )
}
