import Shell from './Shell'

const focus = 'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent'

export default function Contact() {
  return (
    <Shell title="Contact">
      <p className="m-0 max-w-[30ch] text-[clamp(1.4rem,1vw+1rem,2.1rem)]/[1.35] tracking-[-0.02em] text-bright">Want to talk about a website? Mail me.</p>
      <a className={`mt-10 inline-block rounded-full bg-bright px-6 py-3.5 font-mono text-[0.9rem]/[1] text-bg no-underline transition-colors duration-150 hover:bg-moon active:bg-link ${focus}`} href="mailto:tychoboom1@gmail.com">
        tychoboom1@gmail.com
      </a>
    </Shell>
  )
}
