import { useMemo, useState } from 'react'
import { Detail } from './Detail'
import { month, PROJECTS, type Project, type Status } from './projects'

type SortKey = 'title' | 'date' | 'status'

const STATUS_COLOR: Record<Status, string> = {
  live: 'text-cold',
  'in progress': 'text-warm',
  placeholder: 'text-ink-dim',
}

const ALL_STACK = [...new Set(PROJECTS.flatMap((p) => p.stack))].sort()

export default function App() {
  const [search, setSearch] = useState('')
  const [stack, setStack] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [isReversed, setIsReversed] = useState(true)
  const [open, setOpen] = useState<string | null>(null)

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase()
    const filtered = PROJECTS.filter(
      (p) =>
        (term === '' ||
          p.title.toLowerCase().includes(term) ||
          p.role.toLowerCase().includes(term) ||
          p.stack.some((s) => s.toLowerCase().includes(term))) &&
        (stack.length === 0 || stack.every((s) => p.stack.includes(s))),
    )
    const direction = isReversed ? -1 : 1
    return [...filtered].sort((a, b) => {
      const va = a[sortKey]
      const vb = b[sortKey]
      if (typeof va === 'number' && typeof vb === 'number') {
        return (va - vb) * direction
      }
      return String(va).localeCompare(String(vb), 'en') * direction
    })
  }, [search, stack, sortKey, isReversed])

  const selected = PROJECTS.find((p) => p.slug === open) ?? null

  function sortColumn(key: SortKey) {
    if (sortKey === key) {
      setIsReversed((value) => !value)
    } else {
      setSortKey(key)
      setIsReversed(key === 'date')
    }
  }

  return (
    <div className="min-h-dvh">
      <header className="border-line border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-8 gap-y-2 px-6 py-4">
          <a href="#work" className="text-base text-ink uppercase tracking-[0.3em]">
            Goldy
          </a>
          <nav className="flex gap-6 text-[11px] text-ink-dim uppercase tracking-[0.2em]">
            <a className="text-cold" href="#work">Work</a>
            <a className="hover:text-ink" href="#about">About</a>
            <a className="hover:text-ink" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {selected ? (
        <main className="mx-auto max-w-6xl px-6 py-8">
          <Detail project={selected} back={() => setOpen(null)} />
        </main>
      ) : (
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-[13rem_1fr]">
        <aside className="space-y-6">
          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-[11px] text-ink-dim uppercase tracking-[0.18em]"
            >
              Search
            </label>
            <input
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="title, role, stack"
              className="w-full border border-line bg-surface px-2 py-1.5 text-ink outline-none placeholder:text-ink-dim/60 focus:border-cold/50"
            />
          </div>

          <fieldset>
            <legend className="mb-2 text-[11px] text-ink-dim uppercase tracking-[0.18em]">
              Stack
            </legend>
            <ul>
              {ALL_STACK.map((s) => {
                const isSelected = stack.includes(s)
                const count = PROJECTS.filter((p) => p.stack.includes(s)).length
                return (
                  <li key={s}>
                    <label className="flex cursor-pointer items-center justify-between border-line border-b py-1 hover:text-cold">
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            setStack((value) =>
                              isSelected ? value.filter((x) => x !== s) : [...value, s],
                            )
                          }
                          className="accent-cold"
                        />
                        {s}
                      </span>
                      <span className="tnum text-ink-dim text-xs">{count}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </fieldset>

          {(stack.length > 0 || search !== '') && (
            <button
              type="button"
              onClick={() => {
                setStack([])
                setSearch('')
              }}
              className="text-ink-dim text-xs underline underline-offset-4 hover:text-ink"
            >
              Clear filters
            </button>
          )}
        </aside>

        <section id="work">
          <div className="mb-3 flex items-baseline justify-between">
            <h1 className="text-ink text-sm uppercase tracking-[0.2em]">Work</h1>
            <p className="tnum text-ink-dim text-xs">
              {rows.length} of {PROJECTS.length}
            </p>
          </div>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-line border-b text-[11px] text-ink-dim uppercase tracking-[0.18em]">
                <HeaderCell active={sortKey === 'title'} reversed={isReversed} onClick={() => sortColumn('title')}>
                  Title
                </HeaderCell>
                <HeaderCell active={sortKey === 'date'} reversed={isReversed} onClick={() => sortColumn('date')}>
                  Date
                </HeaderCell>
                <th className="px-2 py-2 font-normal">Role</th>
                <th className="px-2 py-2 font-normal">Stack</th>
                <HeaderCell active={sortKey === 'status'} reversed={isReversed} onClick={() => sortColumn('status')}>
                  Status
                </HeaderCell>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <Row key={p.slug} project={p} onClick={() => setOpen(p.slug)} />
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <p className="py-8 text-ink-dim">No rows. Turn off a filter.</p>
          )}
        </section>
      </main>
      )}

      <footer className="mx-auto max-w-6xl px-6 py-8 text-ink-dim text-xs">
        No bitmaps. The background is one radial gradient in CSS. Interactions
        stay under 100 ms.
      </footer>
    </div>
  )
}

function HeaderCell({
  children,
  active,
  reversed,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  reversed: boolean
  onClick: () => void
}) {
  return (
    <th className="px-2 py-2 font-normal" aria-sort={active ? (reversed ? 'descending' : 'ascending') : 'none'}>
      <button
        type="button"
        onClick={onClick}
        className={active ? 'text-cold uppercase tracking-[0.18em]' : 'uppercase tracking-[0.18em] hover:text-ink'}
      >
        {children}
        <span aria-hidden className="ml-1 opacity-60">
          {active ? (reversed ? '▾' : '▴') : ''}
        </span>
      </button>
    </th>
  )
}

function Row({ project: p, onClick }: { project: Project; onClick: () => void }) {
  const isPlaceholder = p.status === 'placeholder'
  return (
    <tr className={`border-line border-b hover:bg-surface-hi ${isPlaceholder ? 'opacity-45' : ''}`}>
      <td className="px-2 py-2">
        <button type="button" onClick={onClick} className="text-ink text-left hover:text-cold">
          {p.title}
        </button>
      </td>
      <td className="tnum px-2 py-2 text-ink-dim">{month(p.date)}</td>
      <td className="px-2 py-2 text-ink-dim">{p.role}</td>
      <td className="px-2 py-2">
        <span className="flex flex-wrap gap-1">
          {p.stack.map((s) => (
            <span key={s} className="border border-line px-1.5 py-0.5 text-[11px] text-ink-dim">
              {s}
            </span>
          ))}
        </span>
      </td>
      <td className={`px-2 py-2 text-xs ${STATUS_COLOR[p.status]}`}>{p.status}</td>
    </tr>
  )
}
