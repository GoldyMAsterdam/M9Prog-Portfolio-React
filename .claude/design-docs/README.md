# PortfolioDesign

Design work for the M9PROG portfolio. Deliberately **outside** the code repo
`C:\MA\3e\1\Prog\Portfolio`, which stays code only.

```
PortfolioDesign/
├─ README.md                        status and log (this file)
├─ ASSETS.md                        third-party assets, terms, extraction method
├─ assignment.md                    full M9PROG requirements, from the course site
├─ ai-log.md                        graded AI reflection — REWRITE IN YOUR OWN WORDS
├─ .claude/skills/
│  ├─ portfolio-design/SKILL.md     the brief, the palette, the rejected list
│  └─ portfolio-antislop/SKILL.md   anti-AI-slop rules for this project
├─ .hallmark/log.json               design rotation memory
├─ concepts/                        artboards and mockups
│  ├─ blue-glass-moon.html          ← current direction
│  └─ particles.png                 3 sprites, © TYPE-MOON — see ASSETS.md
├─ tools/                           RomFS + BNTX extractors (see ASSETS.md)
├─ prototype/                       Vite + React + TS + Tailwind work index
└─ archive/                         rejected directions, kept not deleted
```

## Where we are — 2026-09-13

**Direction settled**, from Goldy's own Figma board after six rejected
attempts. Board:
<https://www.figma.com/design/VwDsSdfdzmvtlADN2Pbj5O/Untitled>

The layout, the palette and the reasoning all live in
`.claude/skills/portfolio-design/SKILL.md` under "THE BRIEF". That file is the
single source of truth — not this one.

In short: soft Tsukihime-style border bands top and bottom, a three-box left
rail (navigation · statistics · social) inside one outer box, a vndb-style
project record in the centre, the moon bleeding off the right edge, particles
drifting over everything, and the real extracted Tsukihime system palette
(`#111625`, `#080E1A`, `#1E2A4A`, `#56A5C2`, `#3DB2E3`, `#FAFAFB`).

The border is **not** a torn edge. That was a guess, and it was wrong. The
game's own `alphagradation` textures are a soft elliptical vignette falling
off on a raised cosine; see `ASSETS.md` for the measurements and for how they
were pulled out of the game.

Built to that brief: `concepts/blue-glass-moon.html` →
<https://claude.ai/code/artifact/b672c5bf-686c-4bc3-a960-eae01df6c29c>

## Next, in order

1. **Judge `blue-glass-moon.html`.** Rebuilt 2026-09-14 against the measured
   Figma geometry and the real game textures. Open questions on it: the stray
   `SPRITE` text layer at x318 y141 on the board (second sprite slot, or
   leftover?), and whether a character sprite goes in the right-hand slot at
   all — `sprite.png` next to the file fills it, nothing else needed.
2. **Real content.** Project write-ups, the true story for each, screenshots.
   Everything marked placeholder must go.
3. **Docker.** Mandatory and not started — WordPress + MariaDB + phpMyAdmin.
4. **`prompt.md`.** Graded, does not exist. `ai-log.md` exists but is written
   by Claude and must be rewritten in Goldy's words.
5. **Theme port.** Webpack + Sass, custom theme, `project` custom post type
   with archive and single templates.

## Log

**2026-09-13 — direction found.** Six attempts rejected: a VN title screen
("looks like a game"), five rotated macrostructures ("still looks very AIy"),
a vndb pastiche ("too vndb like"), a dense/sparse toggle study ("shit").
Goldy then made the Figma board and the direction came from him. Lesson
recorded in the skill file: build from the principles someone states, never
from a reference's surface features.

**2026-09-14 — built from the board, and from the game.** Read the Figma
board directly through Goldy's own Chrome and measured it instead of guessing:
frame 1280×832, bands at 0–88 and 738–832, rail x63–302, record x328–1153, and
the sprite ellipse at x1144 y224, 357×384 — clipped by the right edge and
vertically centred, not a bubble in the corner. Rebuilt the page to match.
Then pulled the real assets: AYN Thor over MTP → 22.3 GB base NSP → RomFS →
`allui.mrg` → `BORDER_PARTS` and `TITLE_PARTS`, decoded from BC7. That killed
the torn-border guess and replaced it with the game's actual cosine falloff.
Method and terms in `ASSETS.md`, tools in `tools/`.

**2026-09-13 — housekeeping.** Site copy switched to English. Stack tags for
both client sites corrected by reading the live sites rather than guessing
(Vercel + Vite + React + Tailwind, react-router on Michel Visuals).

## Archive

`archive/kagetsu/` — visual-novel title screen. Right atmosphere, wrong
costume. The canvas technique is still the reference for the particle field.

`archive/record/` — the vndb pastiche. Superseded, but Goldy put this panel
into the Figma board himself, so the record *concept* is live; only its skin
was wrong.
