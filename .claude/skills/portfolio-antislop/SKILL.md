---
name: portfolio-antislop
description: Anti-AI-slop rules for the M9PROG portfolio. Load alongside [[portfolio-design]] BEFORE writing any markup, CSS, artboard or mockup for this project — including quick variants and throwaway sketches. Records the tells this project has already shipped, the bans that follow, and the pre-flight steps that were skipped the first time round.
---

# Anti-slop rules for this portfolio

The full catalogue lives in the `hallmark` skill
(`~/.claude/skills/hallmark/references/anti-patterns.md`, 418 lines, and its
58-gate slop test). **Load `hallmark` for any real design pass.** This file
only carries what is specific to this project: the tells already shipped here,
and the process steps that were skipped.

## Do this before drawing anything

Skipping these is what produced the first round of slop.

1. **Declare the genre out loud.** editorial / modern-minimal / atmospheric /
   playful. The genre decides which gates apply — a radial-gradient field is a
   critical tell for editorial and permitted for atmospheric. Undeclared genre
   means every gate is on.
2. **Pick a named macrostructure and say which one**, from
   `hallmark/references/macrostructures.md`. Not a vibe — a name.
3. **Pick a nav archetype and a footer archetype by code** (N1a-N13, Ft1-Ft8)
   from `hallmark/references/component-cookbook.md`.
4. **Check `.hallmark/log.json`** in this project root. The pick must differ
   from the last three entries. Append a new entry after building.
5. **State the picks in chat before writing code.** Picking on the page rather
   than in your head is the whole mechanism.

## Already shipped here — do not repeat

Audit of `concepts/` and `prototype/`, 2026-09-13: 3 critical, 3 major, 2 minor.

| Tell | Where it happened | Standing ban |
|---|---|---|
| Default-attractor sameness | 9 artboards sharing one nav, one table rhythm, one padding scale | Two directions that differ only in colour are one direction. Different concept = different macrostructure. |
| The AI nav | every artboard and all three prototype variants | **Banned outright in this project:** wordmark hard-left + inline links + full-width + hairline border-bottom. Pick a nav archetype by code instead. |
| One-font page | IBM Plex Sans + IBM Plex Mono everywhere | One superfamily is not a pairing. Needs a real display face against a body face. |
| Eyebrow on every section | SEARCH, STACK, WORK, NODES, MARKUP, WHY | Eyebrows are **default OFF**. Ordinal content only, 1-2 per page maximum. Never tag-left / heading-right. |
| Undeclared radial glow | all nine artboards | Allowed only under a declared atmospheric genre, and not in every direction at once. |
| Hover-only affordance | clickable table rows | Clickability needs a non-hover signal too. |

## Project-specific traps

- **Density is not a licence for sameness.** vndb.org and unknowncheats are
  dense *and* have a strong identity. A dense table with nothing else is not
  the reference — it is the absence of a decision.
- **The catalogue table is the content, not the design.** If the only thing
  distinguishing a direction is row height, no direction has been chosen.
- **Tabular numerals stay.** `font-variant-numeric: tabular-nums` on every
  column of dates or numbers. This one is already right — do not undo it.
- **Never pure black or pure white.** Existing surfaces are correctly off-black.
- **Every interactive element ships all 8 states** — default, hover,
  focus-visible, active, disabled, loading, error, success. Sort headers and
  filter checkboxes currently ship two.
- **Honest copy only.** No invented metrics, no "trusted by", no fabricated
  outcomes. This project has two real client sites and thin data; the design
  must survive that rather than paper over it. See [[portfolio-design]].

## Bans inherited from the rejected direction

- No italic headers, ever. Emphasis carries via weight, accent or a drawn rule.
- No fake browser chrome, phone frames or IDE windows. The devtools-inspector
  concept is the one exception and only because the inspector IS the subject —
  it must be the real page inspecting itself, never a drawn mock of one.
- No `transition-all`, no universal `hover:scale-105`, no bouncy overshoot on
  UI state, no cursor-follower, no scroll-triggered fade-up on everything.
- Straight quotes, double hyphens and three-period ellipses are all wrong.
  Use typographic characters.

## Before handing anything over

Run the 58-gate slop test from `hallmark/references/slop-test.md`. Every answer
must be no. Stamp the output with the macrostructure, genre and theme actually
used, and append the entry to `.hallmark/log.json`.
