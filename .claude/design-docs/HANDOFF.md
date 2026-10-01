# Handoff — 2026-09-14, end of the wide-screen session

**Work is paused.** Goldy is finishing Tsukihime before continuing. Do not push
design rounds at him in the meantime.

## Read first

1. `.claude/skills/portfolio-design/SKILL.md` — the design constitution.
2. `.claude/skills/portfolio-antislop/SKILL.md` — the anti-slop rules.
3. `ASSETS.md` — the copyright position. Read it, do not reopen it.

## Spoiler boundary (standing)

Goldy has finished the Arcueid route and is on day 8 or 9 of the Ciel route.
Arcueid's sprite set is open. Ciel's set and the route-reveal character sets
are closed, and naming which ones those are is itself a spoiler. Sprite sets
are shared across routes, so an Arcueid pose may still come from a scene he has
not reached — say so plainly rather than implying a selection is safe. A folder
of all 205 Arcueid poses was rendered, contained spoilers, and has been deleted
at his request.

## State of `concepts/blue-glass-moon.html`

Holds together 1280 → 1920+, verified numerically at three widths.

- One centred frame, **1560**. `--frame` is the only place that number lives;
  `.page` uses `max-width: var(--frame)` and the canvas reads it off
  `getComputedStyle`. Do not reintroduce a second literal — that bug shipped
  twice in one day.
- **Three columns: figure | rail | record.** The portrait has her own column,
  so the nav is never over her. Rail and record share the top line at y118.
- Wordmark "Goldy", **solid**, 27px, absolutely placed inside the 118px the
  bands already reserve, costing the content no height.
- Credits close the record column.
- Sprite is `ARU_A_07_00`, 210px column.
- Semantics and accessibility done: `lang`, `<main>`, `<footer>`, skip link,
  viewport meta, heading order, `--dimmer` at 4.55:1.
- Slop test run: 7 gates fixed, 2 recorded as deliberate deviations.

**Banned, do not reintroduce:** side letterbox bands; a hard clip on the moon;
a feathered compositing layer for the moon; `.rail { margin-top: var(--sprite-h) }`;
the outlined wordmark; treating the Figma board's coordinates as a spec.

**Parked idea, his words, do not build yet:** sprite `63_00` bottom right with
the moon moved to top left.

**Still open, deliberately:** one project record instead of three, thin copy.

## How to verify

Never judge from the Claude preview pane. It downscales, serves stale
snapshots, and does not repaint the canvas after a resize. Use headless Chrome
for both numbers and pictures — the method is in the
`feedback-verify-at-real-viewport` memory. Use both; each caught bugs the other
missed.

## The actual assignment — where the grade is

The repo at `C:\MA\3e\1\Prog\Portfolio` is further along than the last handoff
claimed, but not far.

| | state |
|---|---|
| `docker-compose.yml` | exists |
| `themes/goldy-portfolio/` | `style.css`, `functions.php`, `index.php` — ~1.2 KB, a theme header and one `wp_enqueue_style` |
| `docs/prompt.md` | 0 lines, untracked |
| `docs/ai-log.md` | 2 lines, untracked |
| `header.php`, `footer.php` | missing |
| `project` post type, `archive-project.php`, `single-project.php` | missing |
| `package.json`, `webpack.config.js`, Sass | missing — and quoted verbatim in the marking scheme |
| live URL | none |

Git history is clean. The `claude` entry in the GitHub contributors sidebar is
a stale cache with no matching commit; it clears on the next push and cannot be
removed from any settings page.

**Priority order, his:** `prompt.md`, `ai-log.md`, Docker, custom theme, the
`project` CPT with real templates, the Sass/npm/Webpack build, live URL plus
README, then real content for keurveilig.nl and michelvisuals.com.

The concept page is a mockup, not the submission.
