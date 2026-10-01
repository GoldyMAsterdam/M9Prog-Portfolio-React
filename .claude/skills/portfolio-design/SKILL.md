---
name: portfolio-design
description: Design constitution for Goldy's M9PROG portfolio. Load before ANY design, layout, color, type, motion, copy, or markup decision on this portfolio — new screens, prototypes, the WordPress theme, or reference/moodboard work. Holds the direction, fixed palette, type stack, motion budget, and the rejected-directions list so past decisions are not re-litigated.
---

# Portfolio design constitution

Project: Goldy's study portfolio (M9PROG, software development). Design work
lives here; code lives in `C:\MA\3e\1\Prog\Portfolio`.

## THE BRIEF (from Goldy's Figma board, read 2026-09-13)

This supersedes every earlier guess in this file. Board:
https://www.figma.com/design/VwDsSdfdzmvtlADN2Pbj5O/

### Layout — frame 1280x832

- **Border bands**, top and bottom. Goldy asked for "rough borders similar to
  the ones from actual tsukihime remake. The little white particles."
  **Settled 2026-09-14 by extracting the real textures — they are NOT torn.**
  `BORDER_PARTS.NXGZ` in `allui.mrg` holds `alphagradation020/064/080/128/
  256/512` plus `_inv` and `_2`: a soft elliptical vignette, dark all round,
  clearing toward the centre. The falloff is exactly
  `0.5 + 0.5·cos(π · distance / half)` — checked against the decoded BC7 and
  against a brightness profile off Goldy's own screenshot (a smooth ramp over
  40+ rows, no ragged cut). Do not redraw this as a torn or zigzag edge.
- **Left column, three stacked boxes:** Navigation/menu · Statistics (marked
  "Later") · social-media links.
- **Centre: the Record panel** — the vndb-style project entry from
  `archive/record/`. Goldy placed it in the board himself, so it is IN, not
  archived. Key/value spec rows, screenshot, technique bar.
- **A circle** labelled "SPRITE, MOON OR ART ETC". Goldy: "Similar to what
  vndb.org has, in the top right a sprite." Measured off the board
  (2026-09-13, via his Chrome): x 1144, y 224, 357 x 384, **clipped by the
  right edge of the frame and vertically centred** — not a bubble in the top
  corner. Only the left ~38% of it is ever on screen.
- **Little white particles** over the whole thing.

**The board is a sketch, not a spec — and not a set of coordinates.** Settled
2026-09-14 after building four rounds against its exact numbers: 63px left
gutter, 239px rail, 1280px frame, 118px of headroom. Those numbers starved the
composition — there was nowhere to put the name except a gap, and nowhere for
the portrait to show except behind the nav. Goldy: "you shouldn't hard limit
yourself to the precise positions of the figma board. It was just to get a
visual." Take the reading order and the relationships from it. Re-solve the
measurements against what the page actually needs. Current frame is **1400**,
left gutter 110, rail 260.

**The wordmark is set solid, not outlined.** The earlier rule in this file
("one display face, outlined, `-webkit-text-stroke`, no fill") was applied to
the name at 38px with 0.08em tracking and Goldy rejected it outright: "there's
no way you think that looks nice." Hollow letters read as thin and unfinished,
and the wordmark has to carry more weight than the panel headings under it,
not less. It is now `--lunar`, 700, 31px, near-zero tracking, heading the left
column with a hairline under it.

**The board is a layout, not a spec.** Goldy: "I don't want you to literally
copy everything 1:1 but the figma project shows a basic layout of which I
think stuff would look nice." Positions and reading order are his; the
rendering is mine.

**The right side is the title-screen moon** (decided 2026-09-13). Goldy
pointed at the `-A piece of blue glass moon-` key art and said that on the
right side "would be beautiful if done right".

**What that art actually is, decoded 2026-09-14 (`title_bg0` out of
`TITLE_PARTS.NXGZ`). Every earlier description of it in this file was wrong.**
It is not a vast moon bleeding off frame. It is a *small complete disc*, full
moon face on: centre at 0.498 x 0.250 of the frame, radius 0.055 of the frame
width. There is **no terminator, no rim light and no crimson-pink flare** —
the moon is lit flat and is limb-*brightened*, reading 239,245,251 at the core,
dipping to 228,239,250 near 0.2r, climbing to 252,254,254 past 0.55r. Blue-grey
maria cover most of the face (inside 0.9r the greyscale runs p5 196, median
246, p95 253) with a ray crater below and left of centre. A white-cyan bloom
sits on the limb and dissolves the disc's own edge. `title_bg1`-`bg4` are the
cloud layers that roll over it; the bright royal-blue sky of the composite is
those clouds, not the base.

The sky in `title_bg0` is one glow centred on the moon, falling to a floor of
16,27,54, plus a vertical darkening to 11,18,35 in the bottom corners. The
measured ramp is in the draw loop of `concepts/blue-glass-moon.html`.

**So the warm pink rim is now retired outright.** It was never in the key art;
it was invention. No pink anywhere.

**Placement comes from the board, surface comes from the art.** Settled
2026-09-14 after trying it the other way round and getting "a very
awkward/random position". The art's own numbers describe a small disc high in
an empty sky, which only works because its cloud layers fill the rest of the
frame; the page has no clouds, so a small disc just floats. The board's
geometry is used instead: ellipse x1144 y224, 357 x 384 in a 1280 x 832 frame,
so **vertically centred, radius 0.139 of the frame, centre off-frame right,
only the left 136px (0.106 of the frame) on screen**. The record's right edge
stops at x1153, just over the limb. What the art contributes is the surface:
limb brightening, blue-grey maria, the ray crater, the white-cyan bloom.

Goldy reviewed all six distinct moon looks in the game (title art; crisp disc
over a treeline; flat stylised cloud bands; heavy dramatic cloud; backlit
behind a figure; pale moon through a window) and found them all much of a
muchness — they are the same moon with different weather. So no cloud system
was built. If the right side ever reads empty, the flat stylised bands are
the one worth drawing procedurally.

Rest of the board, measured in frame units (1280 x 832):

| Element | Position |
|---|---|
| Top band | y 0-88 |
| Bottom band | y 738-832 |
| Rail, outer box round all three | x 63-302, y 112-713 |
| Record panel | x 328-1153, y 205-693 |
| Moon / sprite ellipse | x 1144, y 224, 357 x 384 |

The three rail boxes sit **inside one outer box**, they are not three loose
panels. Statistics was marked "Later" on the board — that was a placeholder
note, never a label to render.

### Palette — from Tsukihime Remake's actual system assets

Goldy researched these; they are extracted hex, not invented. The Near-Side
route ("A piece of blue glass moon") is the reference: sky blue and deep night
blue, cold tones, heavy moonlight, clear night skies.

| Role | Hex | RGB |
|---|---|---|
| Core dark navy base | `#111625` | 17, 22, 37 |
| Deep sapphire shadow | `#080E1A` | 8, 14, 26 |
| Muted royal blue accent | `#1E2A4A` | 30, 42, 74 |
| Night sky horizon | `#0E1B35` | 14, 27, 53 |
| Glowing cyan fog / moon haze | `#56A5C2` | 86, 165, 194 |
| Sharp lunar white | `#FAFAFB` | 250, 250, 251 |
| Dialogue text | `#FFFFFF` | 255, 255, 255 |
| System highlight / selected | `#3DB2E3` | 61, 178, 227 |

Muted royal blue is for unselected buttons, outline strokes and window
borders. Deep sapphire is for gradients and bottom-screen vignette.

**The warm pink/magenta rim is NOT a system colour.** It belongs to the key
art and to the Far-Side route (crimson, deep red, evening orange). Do not use
it as UI accent. The earlier palette in this file (`rgb(24,78,150)`,
`#cef6ff`, `#ffc4e0`) was my invention and is superseded.

## Direction

**One mode, not two.** A dense, ordinary-shaped website — nav, index, pages,
scroll — with atmosphere applied as a skin over it. Not a game, not a menu
you navigate with arrow keys.

Structure comes from vndb.org and unknowncheats.me: information is not
thinned out for strangers. Rows carry name, year, stack tags, role, status,
links, all scannable in one line. Sortable, filterable, faceted sidebar.
Project pages are spec sheets first, prose second. That reads as "engineer
who structures information".

Atmosphere is the procedural sky, the palette, the slowness, the sound — but
subordinate. It sits behind and around the content at low intensity. It never
becomes the interface.

Goldy studies software development and wants frontend work. Every decision
answers to that, not to "captivating" for its own sake.

## Fixed

**Color** — deep blue field, `rgb(24,78,150)` at the light source to
`rgb(4,9,26)` in the corners. Accent cold `206,246,255`, accent warm
`255,196,224`. Content surfaces are the same palette flattened: near-black
rows, hairline dividers, high contrast. Never a second theme.

**Type** — the game's own faces are Fontworks and unshippable; see
[[reference-tsukihime-fonts]] for what they are and what the Tsukihimates
patch actually does. `Zen Maru Gothic` stands in for the UI face. Also:
one display face, outlined (`-webkit-text-stroke`, no fill), for
the wordmark and section headings ONLY, used sparingly. Body and all data
use a real UI face at 13-14px with tabular numerals (Inter or IBM Plex Sans).
A garamond or mincho in a data table is unreadable and is not an option.

**Motion** — interactions are instant, under 100ms, no hover delay, no
staggered reveal on a table. Only page-level transitions and the ambient sky
are allowed to be slow. Honour `prefers-reduced-motion`.

**Sound** — at most one soft tone on a deliberate action. Default OFF, toggle
persisted. Never autoplay.

**Imagery** — procedural on `<canvas>`. One exception, granted 2026-09-14:
`concepts/particles.png`, the game's own three particle sprites, 6 KB,
credited on the page. Terms and the removal procedure are in `ASSETS.md`; the
page falls back to hand-drawn petals if the file is gone. Everything else is
drawn at runtime, with the technique kept in `archive/kagetsu/kagetsu.html`: sphere gradient plus
polar-coordinate noise so wisps radiate instead of blotch; a continuous arc
stroke with a conic gradient for rim light, three passes wide-and-faint to
narrow-and-hot; per-particle z with one shared wind and a slow gust (no
per-particle swirl — that read as a whirlpool). Reuse the technique, not the
composition.

**Content** — real shipped work only (keurveilig.nl, michelvisuals.com).
Never invent projects to fill space. Site copy is English.

**Make the engineering visible** — state what is generated rather than drawn
(everything but the 6 KB particle atlas), the file size,
the frame budget, the accessibility work, on the page. That converts the
visuals from decoration into a frontend demo.

## Stack (vastgelegd 2026-09-13)

Prototype draait op **Vite + React 19 + TypeScript + Tailwind v4**, in
`prototype/`. WordPress levert React al mee (`wp.element`, Gutenberg), dus
React is daar geen vreemde eend — de poort loopt via een block theme of via
de REST API.

- Palet en typografie staan als `@theme`-tokens in `src/index.css`. Kleuren
  nooit hardcoden in componenten; gebruik `text-cold`, `bg-surface`, enzovoort.
- Tabel is handwerk: `useMemo` met `sort` en `filter`. Geen tabelbibliotheek.
- Paginawissels via de View Transitions API, niet via een animatiebibliotheek.
- `motion` staat geinstalleerd maar wordt nog nergens gebruikt. Weghalen als
  het bij de oplevering nog steeds ongebruikt is.

### Harde eisen uit de opdracht (M9PROG)

Bron: https://jheidebrink-ma.github.io/m9prog_opdrachtensite/ — `project_description`
en `lesbrief`, gelezen 2026-09-13. Deze eisen winnen van elke ontwerpvoorkeur
hieronder.

- Eigen custom theme, met minimaal `style.css`, `functions.php`, `header.php`,
  `footer.php`. Geen page builders, geen bestaand thema.
- Eigen Custom Post Type voor projecten, met **overzichts- en detailweergave**.
  Dus echte templates (`archive-project.php`, `single-project.php`), geen
  client-side routing.
- Front-end build met **Bootstrap (of vooraf goedgekeurd alternatief), Sass,
  npm en Webpack**. Let op: de ontsnappingsclausule hangt alleen aan Bootstrap.
  Sass en Webpack staan er zonder alternatief.
- Beoordelingscriterium, letterlijk: "Bewijs van Bootstrap/Sass/Webpack-build."
- Minimaal 3 portfolio-items. Detailpagina toont rol, technieken, resultaat,
  beeld.
- Mobile-first, getest in Chrome, Safari, Firefox en Edge. Semantische HTML,
  toegankelijke formulieren.
- Live URL op een publieke server, plus Git-repo met README over lokaal
  draaien en bouwen.
- Ook beoordeeld: `prompt.md` en `ai-log.md` met kritische AI-reflectie,
  testlijst, deployment-checklist, backlog, en een korte mondelinge demo.
- "Je levert geen AI-resultaat op dat je niet kunt uitleggen." Alles wat hier
  gegenereerd wordt, moet Goldy zelf kunnen verdedigen.

**Gevolg voor de stack.** Vite + Tailwind (wat in `prototype/` staat) voldoet
niet als opgeleverd product. De route die wel werkt: **Webpack + Sass +
Tailwind**, met React als eilanden binnen PHP-templates.

**Besluit 2026-09-13 (Goldy): Tailwind in plaats van Bootstrap.** Goedkeuring
is niet gevraagd; Goldy neemt dat risico bewust. Niet opnieuw ter discussie
stellen. Sass, npm en Webpack blijven wel staan — aan die drie hangt geen
alternatief-clausule, en ze staan letterlijk in het beoordelingscriterium.
Tailwind draait dus door de Sass/Webpack-pijplijn, zodat het bouwbewijs er
hoe dan ook is.

`prototype/` blijft de ontwerpmockup, niet de inzending.

### WordPress is een schooleis, geen techniekkeuze

Goldy's eigen werkwijze is React + Tailwind; beide opgeleverde sites
(keurveilig.nl, michelvisuals.com) draaien Vite + React + Tailwind op Vercel,
zonder WordPress. WordPress moet er alleen zijn omdat de opdracht het vraagt.

**Oplossing: een WordPress-thema met React + Tailwind erin gecompileerd.**
Geen headless opzet.

- Vite bouwt met `base` naar `assets/` van het thema en `build.manifest: true`.
- `functions.php` leest de manifest en enqueue't de gehashte bundel als module.
- `front-page.php` rendert een `<div id="root">`; React mount daarin.
- Projecten worden een `project` post type. De data gaat naar de client via
  `wp_localize_script` of een `<script type="application/json">`, zodat de
  inhoud in wp-admin te bewerken blijft — dat is wat een WordPress-opdracht
  feitelijk toetst.
- Tailwind compileert het thema-stylesheet. Nooit via een CDN.

Headless (WordPress apart, React op Vercel) is afgevallen: valt waarschijnlijk
buiten de opdracht en verdubbelt de hosting zonder winst.

## What Goldy actually likes about vndb (and what that is NOT)

Archived 2026-09-13: a direct vndb pastiche (`archive/record/`) — 11px Verdana,
boxed panels with title bars, sidebar of counts, coloured inline links, tag bar,
illustrated banner. Goldy: "too vndb like", "eh ish". The navigation and overall
shape were fine; the skin was the problem.

**The mistake: copying the reference's surface instead of its principle.**
Verdana, hard borders and a tag bar are what vndb *looks like*. They are not
what Goldy likes about it. Never again build a direction by transcribing a
reference's visual features.

What Goldy actually said he likes, in his words:
- old, tacky, bloaty, "intimidating at first"
- "once you get used to it, it's rather nice to navigate"
- "everything you need is basically in one column"
- "the images, colors, etc" — the overall feel

So the principles worth carrying, which could look like almost anything:
1. **Rewards familiarity over first impression.** It may look like a lot on
   arrival. It must feel efficient on the third visit.
2. **Does not thin its content for strangers.** No progressive disclosure, no
   "learn more" — the information is just there.
3. **Everything reachable from one place.** One column, one index, no hunting.
4. **Images carry the mood**, not the layout or the palette.

The same four principles could be expressed in a visual language with nothing
in common with vndb. That is the brief.

## Rejected — do not repropose without new reason

- **Visual-novel title screen as the front page** (the kagetsu prototype,
  archived 2026-09-13). Full-bleed moon, stacked outlined capitals, arrow-key
  menu, "Chapter select" / "Config" / "Press any key". Read as a game and as
  odd for a software-development portfolio. Goldy: "it just looks like a
  game", "still wacky".
- **Game vocabulary anywhere in the UI.** Use WORK / ABOUT / CONTACT.
- Portfolio-as-database-entry as a literal vndb clone — take the density and
  the faceting, not the skin.
- Lagging custom cursor (antoineduten.framer.website).
- Spline "3D Text Animation Loop".
- Spline "Culture tree" — parked, Remix is paywalled. Revisit only with a
  free `.glb`.

## Open

- **Parked idea, 2026-09-14 (Goldy: "don't act on this yet but keep it an
  idea"). Sprite `63_00` bottom right, moon moved to top left.** `63_00` is
  Arcueid in the white dress with the blue flower, looking back over her
  shoulder to the **viewer's left** — so bottom-right points her into the
  content instead of out of the frame, which every corner placement tried so
  far has failed to do. It also turns the composition into a diagonal rather
  than everything stacked down the left edge. Its source is a bust crop, so it
  holds detail at small sizes. Do not build this until he says.


- Hand-drawn wordmark.
- Port to `themes/goldy-portfolio`: projects become a `project` post type,
  the ambient canvas becomes one `sky.js`.
- How loud the atmosphere is allowed to be. Unresolved. Prototype the work
  index plain first, add atmosphere after, and stop at the point where it
  starts competing with the content.

## Working notes

- Prototypes stay single self-contained files until they ship to the theme.
- Anti-slop rules live in [[portfolio-antislop]] and in the `hallmark` skill.
  Load both before any design pass. This file only holds project decisions.
- **The site copy is in English** (changed 2026-09-13). Earlier notes in this
  file said Dutch; that is superseded. Code comments follow suit.


## Extracted from the game — measurements, 2026-09-14

Facts measured off the real assets. Reuse these rather than re-deriving them;
the extraction cost a 22 GB transfer and a hand-written AES-CTR reader. Method
and provenance in `ASSETS.md`, tools in `tools/`.

| Thing | Value |
|---|---|
| Border falloff | `0.5 + 0.5·cos(π · d / half)`, elliptical, all four edges |
| Moon body | `#fcfefe` → `#e3effd` → `#a8c6e6` → `#4a76ab` → `#16345f` |
| Sky at the lit limb | `rgb(53,105,207)` |
| Particle white | 20×44, pure white |
| Particle azure | 22×31, `rgb(0,150,255)` |
| Particle cyan | 19×32, `rgb(0,210,255)` |

Also sitting in the UI pack, unused so far: `DISP_PARTS` (dialogue textbox
plates), `SAVE`/`MENU`/`CONF`/`SELECT`/`GALLERY` panels, `FocusLine`
(1920×128), `FallNote0-2` (falling-petal strips), `NOISE_PARTS` (grain, in an
`NXCX` container that still needs a decompressor), `title_bg0-4` (five moon
layers), `knife1.bfsar` (all audio).

**The copyright line.** Modifying game art does not clear it — an edit is a
derivative work. What makes the three sprites defensible is scale, credit,
non-commercial use and a removal path, all of which are in place. Do not add
more of their art without revisiting that, and never their characters. A
generated lookalike is safe as to style but pointless here: a bitmap moon
cannot respond to the viewport and kills the "nothing here is a photograph"
claim, which is the part that reads as frontend skill.

## Open on the current build

- ~~The stray `SPRITE` layer at x318 y141.~~ Settled 2026-09-14: it is a real
  slot. Goldy then moved it — it is pinned to the **top right of the frame**,
  not above the record. Drop `portrait.png` beside the html to fill it.
- Whether a character sprite goes in it at all.
- Goldy asked (2026-09-14) whether Stable Diffusion should generate the moon.
  Not done and not recommended: a generated bitmap has the same problems as
  shipping theirs (fixed resolution, cannot respond to the viewport) and adds
  a new one — AI-generated art in a portfolio whose whole claim is "I drew
  this at runtime". The measured rebuild above is the answer instead.

## The wide-screen problem (SETTLED 2026-09-14)

`concepts/blue-glass-moon.html` was built to a 1280 x 832 board and only held
together near that width. Cause was structural: `.page` capped at 1280 and
centred, while `#sky` placed the moon as a fraction of the **viewport** and
`.sprite` was fixed to the viewport corner, so the decoration drifted further
from the content the wider the window got.

**Option 1 was taken: the decoration is anchored to the content frame.** One
centred 1280 box is now the unit for everything.

- `--frame: 1280px` and `--gutter` in `:root`. `resize()` recomputes the
  gutter from `cv.clientWidth` (exact, scrollbar included) and writes it back
  to `documentElement`; the CSS `max(0px, (100vw - var(--frame)) / 2)` is only
  the pre-script fallback.
- `.sprite` is `left: var(--gutter)`, so the portrait sits in the frame's
  top-left corner, not the window's.
- The moon measures off the frame's right edge:
  `mx = (GUTTER + FRAME_CSS) * DPR - frameW * MOON_VIS + R`. Verified: the
  limb lands at frame-right minus 136 at 1280, 1600 and 1920.
- **No side letterbox bands, and no hard clip on the moon.** Both were tried
  2026-09-14 and both are banned. The clip cut the disc on a straight vertical
  line; the bands were added to disguise that by making the frame edge look
  real, and drew a black rectangle down each side of the page. Goldy: "the
  black stuff on the left and right is terrible... it's almost a rectangle."
  Anchoring the moon to the frame is the whole fix. The disc is allowed to be
  whole, and the elliptical vignette handles the edges.
- `.page` got `grid-template-rows: auto minmax(0, 1fr)` with the credit in
  row 2, `align-self: end`, so on a tall window the credit lands on the
  frame's floor instead of trailing the record.
- `--sprite-w` is `min(268px, 26vw)`, not `min(268px, 23vw)` — 23vw was 441px
  at 1920 and 588px at 2560, which is what read as oversized.

**`.rail { margin-top: var(--sprite-h) }` is gone and does not come back.**
Never move content to make room for decoration. The rail now starts at y118
at every width; the portrait passes behind it, which is where its bottom fade
resolves.

**Verify wide layouts numerically, never from the preview pane.** The pane
renders around 800px and silently downscales; it also fails to repaint the
canvas after a viewport change, so a pane screenshot is worthless for this.
Use `getBoundingClientRect()` on `.sprite`, `.rail`, `.record`, `.credit`
against `innerWidth`/`innerHeight`, and sample the canvas row at mid-height
for the moon's limb. See [[feedback-verify-at-real-viewport]].

Still open on this page, deliberately: one project record instead of three,
and thin site copy.
