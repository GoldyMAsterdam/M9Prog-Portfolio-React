import { useState } from 'react'

const focus = 'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent'
const field = 'glass field w-full rounded-2xl px-5 py-3.5 text-[1rem]/[1.5] text-ink placeholder:text-muted transition-[background-color,box-shadow] duration-150'
const label = 'font-mono text-[0.72rem] tracking-[0.08em] text-muted uppercase'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null)
    if (res?.ok) form.reset()
    setStatus(res?.ok ? 'sent' : 'error')
  }

  if (status === 'sent') return <p className="m-0 mt-10 text-[1.1rem] text-ink" role="status">Thanks, I'll get back to you soon.</p>

  return (
    <form className="mt-10 grid w-full max-w-[36rem] gap-5 text-left" onSubmit={submit}>
      <label className="grid gap-2">
        <span className={label}>Name</span>
        <input className={field} name="name" autoComplete="name" required maxLength={100} />
      </label>
      <label className="grid gap-2">
        <span className={label}>Email</span>
        <input className={field} name="email" type="email" autoComplete="email" required maxLength={200} />
      </label>
      <label className="grid gap-2">
        <span className={label}>Message</span>
        <textarea className={`${field} min-h-40 resize-y`} name="message" required maxLength={5000} />
      </label>
      {/* honeypot */}
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-4">
        <button
          className={`rounded-full bg-bright px-6 py-3.5 font-mono text-[0.9rem]/[1] text-bg transition-colors duration-150 select-none hover:bg-bright/85 active:bg-bright/70 disabled:opacity-60 ${focus}`}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {status === 'error' && (
          <p className="m-0 text-[0.95rem] text-ink" role="alert">
            That didn't send. Mail me at <a className="text-link" href="mailto:webtychoboom@gmail.com">webtychoboom@gmail.com</a>.
          </p>
        )}
      </div>
    </form>
  )
}
