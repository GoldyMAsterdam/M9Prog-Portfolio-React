# Third-party assets, and how they got here

Read this before deploying anything. It is the file to point a teacher, a
rights holder, or future-you at.

## What is shipped from someone else's work

| File | What it is | Source |
|---|---|---|
| `concepts/particles.png` | 192×64 atlas, three 64×64 particle sprites (white, azure `rgb(0,150,255)`, cyan `rgb(0,210,255)`) | `logoparticle_all` in `TITLE_PARTS.NXGZ`, inside `allui.mrg` | 
| `concepts/portrait.webp`, also inlined as a data URI in the page | 600×1000, an Arcueid Brunestud sprite turned away with the head looking back over the shoulder, cropped so the hair is cut by the frame’s top edge, mixed 26% toward the sky colour, and faded only over the last 15%. Fourth pass, 2026-09-14, after cross-referencing vndb.org’s own top-left figure: it is large rather than a cut-out head, cut by the top edge, ended by occlusion behind an opaque panel rather than a fade, and it faces into the page. Quality 90, lossless alpha, 55 KB | `ARU_A_07_00_N00_05_05.NXGZ` in `allpac.mrg` |

Both are from Tsukihime *-A piece of blue glass moon-* · © TYPE-MOON. That is
the whole list. Both are credited on the page itself, in the
`#credits` block at the bottom of `concepts/blue-glass-moon.html`, together
with a takedown address.

## Read this part before defending the choice

**TYPE-MOON's published terms prohibit exactly this.** From
<https://typemoon.com/copyright>:

> 「TYPE-MOON作品の画像、映像をコピー、取り込み等して使用することを禁止します」

Copying or importing images or video from their works is forbidden; tracing is
forbidden too. What they *do* allow is using their work as **reference** to
draw something new. So the procedural moon, sky and border on this page are
inside their guideline, and the two ripped files above are outside it. An
earlier version of this document argued the particles were fine on grounds of
scale, credit and non-commercial use. Against their actual written rule that
reasoning was wrong, and it is corrected here rather than quietly dropped.

Dutch law offers no cover either. The teaching exception (art. 16 Aw) is for
use *uitsluitend ter toelichting bij het onderwijs*, and carries a
*billijke vergoeding*; a public portfolio is not that. The quotation right
(art. 15a Aw) needs the use to serve an *aankondiging, beoordeling, polemiek
of wetenschappelijke verhandeling*; decoration is not a quotation. There is no
fair use in the Netherlands, and non-commercial use is not a defence, only a
factor in how much anyone cares.

**Goldy's decision, taken 2026-09-14 with the above in front of him.** He
accepts the risk, and accepts that a takedown means taking it down. Do not
re-litigate it; do keep the mitigations below working.

## Terms this is used under

Nothing grants permission here. What reduces the exposure to near zero:

- **Non-commercial.** Coursework for M9PROG. The site sells nothing, offers no
  services, quotes no rates, and carries no "available for hire".
- **Credited, unaltered, on the page** — not buried in a repo file.
- **Not affiliated or endorsed**, stated in the same place.
- **Removed on request, prominently.** The credits block carries a direct
  mailto with a Takedown subject line and a same-day promise. Removal is two
  edits, neither of which breaks anything else:
  - the portrait: delete the one `<img class="sprite">` line. Nothing else
    on the page references it.
  - the particles: delete `concepts/particles.png`. The page falls back to
    hand-drawn petals built from the same measurements; `spriteOK` stays
    false. Test by renaming the file.
- **Not indexed.** The page carries `<meta name="robots" content="noindex,
  nofollow">`, so it should not turn up in search. Keep that on any host.

Modifying the sprites would not have improved this. An edit of someone's
artwork is a derivative work and stays theirs; recolouring or cropping resets
nothing. The one real mitigation is scale, credit and non-commercial use,
which is what is above.

## What is *not* third-party, and why that matters

Everything else on the page is drawn at runtime on one `<canvas>`: the moon
and its two rim lights, the sky, the star field, the border falloff, the
vignette. No bitmaps.

The colours and curves were **measured** from the game, not copied out of it:

| Thing | Measurement | Where it came from |
|---|---|---|
| Border falloff | `0.5 + 0.5·cos(π · distance / half)` | Decoded `BORDER_PARTS` → `alphagradation_inv512`, alpha sampled down the centre: 1.00 0.90 0.65 0.34 0.09 0.00 |
| Border shape | Ellipse, dark all round — not two bars | Same texture, viewed composited |
| Band heights | 88 / 94 of an 832-high frame | Goldy's Figma board |
| Moon body | `#fcfefe` core → `#e3effd` → `#a8c6e6` → `#4a76ab` → `#16345f` | Radial samples across `title_bg2` |
| Particle colours and aspect | white 20×44, azure 22×31, cyan 19×32 | Bounding boxes in `logoparticle_all` |
| System palette | `#111625` `#080E1A` `#1E2A4A` `#56A5C2` `#3DB2E3` `#FAFAFB` | Goldy's own research, in the skill file |

Measurements of a work are facts about it. Facts are not the work. This is why
the page can look right without carrying anyone's pixels.

## How the extraction worked

Kept because it is the interesting engineering in this project, and because it
has to be explainable out loud.

1. **AYN Thor over USB-C.** Android exposes MTP — no drive letter, so no
   `cd`. Walked it with `Shell.Application` COM from PowerShell and copied off
   `prod.keys`, `title.keys` and `tsukihime_base.nsp` (22.3 GB).
2. **No hactoolnet.** `Thealexbarney/LibHac` is gone from GitHub — 404, no
   releases. Used `pip install nsz` instead, which is pure Python.
3. **nsz for headers only.** It parses the NSP and NCA fine, but its buffered
   decrypt layer is far too slow to walk a 20 GB RomFS — a 96-byte read did
   not return in five minutes. So it was used once, to print the numbers.
4. **`tools/direct.py`** then reads the container directly: PFS0 entry at file
   offset `0xF09`, RomFS section at `+0x1C000`, IVFC data level at `+0x299C000`,
   AES-CTR with the section key and a counter of `nonce ‖ BE64(offset >> 4)`.
   Both RomFS meta tables are slurped in one read each and parsed in memory.
5. **`allui.mrg`** is a flat archive: `.hed` is 8-byte records (offset and size
   in 0x800 sectors), `.nam` is 32-byte names. `BORDER_PARTS` and
   `TITLE_PARTS` came out of it by offset.
6. **`tools/bntx.py`** unwraps `NXGX` (16-byte header, then gzip) to a BNTX
   texture container, deswizzles Tegra block-linear tiling, and decodes.
   Format `0x20` is **BC7**, not ASTC — decoding it as ASTC gives flat magenta,
   which is how the mistake announced itself.

The 22 GB NSP and the keys live in `C:\Users\Gaming\Downloads\tsuki-extract`
and are **not** in this repo. Nothing there should ever be committed.
