import { pageTitle } from '../Nav'

// Inner pages sit straight on the sky like the home page: a mono title, then the content, no box.
export default function Shell({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <article>
      <h1 className={pageTitle}>{title}</h1>
      <div className="mt-10 text-[1.05rem]/[1.75] text-ink">{children}</div>
    </article>
  )
}
