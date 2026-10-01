# Handoff, Portfolio-React, 2026-09-29

Stack: React 19, Tailwind v4 (`@theme` in `src/index.css`), Vite, hash routing
in `src/App.tsx`. Nothing from this session is committed.

## Files and what they do now

- `src/App.tsx` — routes `home | work | about | github | contact`. `#home` (or
  empty hash) renders `pages/home.tsx` fullscreen with no side pane. Other
  routes render the two-pane layout: sticky left (moon links home, name,
  "Frontend developer", nav, socials) and `<main>`. Non-route hashes such as the
  skip link's `#content` are ignored. Each route change remounts a keyed
  `.enter` wrapper so the page fades in.
- `src/pages/home.tsx` — landing. Left: moon, name, subtitle, Work/About/CV/
  Contact, GitHub/LinkedIn/Email. Right: big screenshot of the active project
  (all previews stacked, crossfade), title, summary, then plain project-name
  buttons as a switcher. **This right side is a neutral placeholder** after two
  rejected directions; the next direction waits on Goldy's references.
- `src/pages/work.tsx` — no cards. Per live project: screenshot (links to live
  site), big title, "Visit site", one mono meta line, summary.
- `src/projects.ts` — Keurveilig, Michel Visuals, Senergy are `live` with
  images; "This portfolio" is `in progress` (hidden); `hoofdstuk-4` placeholder.
- `src/AsciiMoon.tsx` — 52 cols, rotates slowly unless reduced motion.
- `src/Sky.tsx` — canvas sky; glow anchored to `#moon`'s box; no moon disc, no
  letterbox bands; motes on the screen edges. Lint warning: exports
  `moonTexture` next to a component (fast refresh only).
- `src/index.css` — fonts (PP Neue Montreal 300/400/600/800 + Mono), tokens,
  motion: `.stagger`, `.enter`, `.link` underline draw, `.arrow`/`.arrow.out`,
  `.shot` glint on `.lift` hover. Unlayered CSS beats Tailwind utilities: never
  set `position` in `.shot`.
- Images in `src/assets/images/`: `keurveilig.jpg`, `michelvisuals-hd.jpg`,
  `senergy.jpg` (1280x720 headless-Chrome captures). `michelvisuals.jpg` is
  unused; ask before deleting.

## Rejected this session (do not rebuild)

Sprite column; moon overlapping the name; black top/bottom bands; LIVE labels;
boxed record cards with domain subtext; the "Statistics" box; "Two client sites
live, this one is the third" (false, he has built many sites); centred title
screen with `› Work ‹` hover; numbered save-slot rows; ASCII-rendered project
thumbnails. View Transitions API was dropped: in a non-painting tab each click
showed the previous page.

## Open, needs Goldy

1. Pinterest moodboard link or 2-3 reference sites with what he likes about
   each. Do this before any new landing direction.
2. One or two true sentences on why a company should take him; subtitle; the
   internship he wants; CV PDF; real name vs "Goldy".
3. Check Keurveilig summary ("site, pricing calculator and quote flow" was read
   off the live site, not confirmed).
4. Real copy for "This portfolio" if it should return (3-project minimum).

## Useful teacher guidance (not binding)

Home: name, professional subtitle, provable USP, featured work above the fold.
Project list links first to a project page (assignment, problem, approach,
hurdles, one improvement), then to live site and GitHub. CV as PDF, contact
form, custom 404. Source PDFs are in Downloads
(`les-1-uxd-portfolio-ideale-structuur-information-architecture.pdf`,
`rubrics.pdf`).

## Verify method

Headless Chrome: `chrome --headless=new --disable-gpu --hide-scrollbars
--virtual-time-budget=15000 --window-size=1920,1080 --screenshot=...`, plus DOM
numbers from the Claude browser pane with `resize_window`. The pane does not
paint frames (rAF count 0), so it cannot show motion.
