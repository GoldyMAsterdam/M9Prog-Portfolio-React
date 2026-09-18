import { month, PROJECTS } from '../projects'
import { Sky } from './Sky'

export function V3Loud() {
  return (
    <div className="relative min-h-dvh bg-field text-ink">
      <div
        aria-hidden
        className="fixed inset-0"
        style={{
          backgroundImage:
            'radial-gradient(90ch 70ch at 78% -20%, color-mix(in oklab, var(--color-glow) 55%, transparent), transparent 68%)',
        }}
      />
      <Sky />

      <div className="relative">
        <header className="border-line/60 border-b backdrop-blur-[2px]">
          <div className="mx-auto flex max-w-5xl items-baseline gap-8 px-6 py-6">
            <span className="text-lg text-ink uppercase tracking-[0.4em]">Goldy</span>
            <nav className="flex gap-6 text-[11px] text-ink-dim uppercase tracking-[0.22em]">
              <a className="text-cold" href="#work">work</a>
              <a className="hover:text-ink" href="#about">about</a>
              <a className="hover:text-ink" href="#contact">contact</a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-14">
          <p className="mb-10 max-w-sm text-ink-dim leading-relaxed">
            Frontend developer. React and Tailwind. Two sites shipped as a
            freelancer, both live.
          </p>

          <h1 className="mb-4 text-[11px] text-ink-dim uppercase tracking-[0.24em]">
            Work
          </h1>

          <div className="border border-line/70 bg-[rgba(4,9,26,0.62)] backdrop-blur-[3px]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-line/70 border-b text-[11px] text-ink-dim uppercase tracking-[0.18em]">
                  <th className="px-4 py-3 font-normal">Title</th>
                  <th className="px-4 py-3 font-normal">Date</th>
                  <th className="px-4 py-3 font-normal">Role</th>
                  <th className="px-4 py-3 font-normal">Stack</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {PROJECTS.map((p) => (
                  <tr
                    key={p.slug}
                    className="border-line/50 border-b last:border-0 hover:bg-[rgba(24,78,150,0.16)]"
                  >
                    <td className="px-4 py-3.5 text-ink">{p.title}</td>
                    <td className="tnum px-4 py-3.5 text-ink-dim">{month(p.date)}</td>
                    <td className="px-4 py-3.5 text-ink-dim">{p.role}</td>
                    <td className="px-4 py-3.5">
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
                    <td className="px-4 py-3.5 text-[12px] text-warm">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[12px] text-ink-dim">
            Background is one canvas, no bitmaps. Particles respect
            prefers-reduced-motion.
          </p>
        </main>
      </div>
    </div>
  )
}
