export default function Shell({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <article className="border border-line bg-surface/95">
      <header className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-b border-line bg-band px-[11px] py-1.5 max-phone:items-start max-phone:px-2.5 max-phone:py-[9px]">
        <h2 className="m-0 text-[clamp(1.25rem,1.2vw+0.9rem,1.75rem)]/[1.25] font-semibold tracking-[-0.04em] text-bright max-lap:min-w-0 max-lap:[overflow-wrap:anywhere] max-phone:w-full max-phone:text-[clamp(1.25rem,7vw,1.65rem)]">
          {title}
        </h2>
      </header>
      <div className="p-3 text-[0.84rem]/[1.75] text-[#c2cde0] max-phone:p-2.5">{children}</div>
    </article>
  )
}
