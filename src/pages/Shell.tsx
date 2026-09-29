import { pageTitle } from '../Nav'

export default function Shell({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <article>
      <h1 className={pageTitle}>{title}</h1>
      <div className="mt-10 text-[1.05rem]/[1.75] text-ink">{children}</div>
    </article>
  )
}
