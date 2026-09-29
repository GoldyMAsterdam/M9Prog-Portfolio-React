import { NAME } from '../projects'
import Shell from './Shell'

export default function About() {
  return (
    <Shell title="About">
      <p className="m-0">
        I'm {NAME}, 18, from Heerhugowaard. I study software development at MediaCollege Amsterdam.
      </p>
      <p className="m-0 mt-3">
        I build frontends with Vite, React and Tailwind. Next to school I build sites for clients. KeurVeilig is a tool inspection company working across the Netherlands; I built their site, the price calculator and the quote flow, and I'm still working on it. Michel Visuals is a videographer who needed a modern site to show his work. My design, my build.
      </p>
    </Shell>
  )
}
