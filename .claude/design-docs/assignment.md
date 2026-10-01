# M9PROG — what the assignment requires

Source: <https://jheidebrink-ma.github.io/m9prog_opdrachtensite/> — `project_description`
and `lesbrief`, read 2026-09-13. If this file and the site disagree, the site wins.

---

## The product

A personal portfolio website, publicly online, aimed at internship companies
and clients. Built as a **custom WordPress theme from scratch**. No page
builders. No modifying an existing theme.

### Pages and features — all ten required

| # | Requirement |
|---|---|
| 1 | Responsive homepage with a clear introduction |
| 2 | About page, aimed at internship or employment |
| 3 | Project overview, **minimum 3 projects** |
| 4 | Project detail pages showing **role, techniques, results, and imagery** |
| 5 | A working contact mechanism |
| 6 | A Custom Post Type for projects, with **both** overview and detail views |
| 7 | Custom theme with at least `style.css`, `functions.php`, `header.php`, `footer.php`, plus templates |
| 8 | Frontend build using Bootstrap (or a **pre-approved** alternative), Sass, npm and Webpack |
| 9 | Git repository with a README covering local setup and building |
| 10 | Live on your own hosting or domain |

### Technical constraints

- **Local development runs in Docker** — WordPress, MariaDB and phpMyAdmin
  containers. This is required, not a suggestion.
- Mobile-first.
- Tested in Chrome, Safari, Firefox and Edge where available.
- Semantic HTML, accessible forms, readable code.
- **No passwords, API keys or other secrets in Git.**

---

## Documents you must produce

These are graded alongside the site. They are easy to lose and expensive to
reconstruct.

| File | Starts | What goes in it |
|---|---|---|
| `prompt.md` | Lesson 1 | Every prompt used and its result. Les 2 adds: the original Les 1 prompt plus any changes made since. Naming the model is NOT required — checked against the lesbrief 2026-09-15, that was my own embellishment |
| `ai-log.md` | Lesson 2 | Critical reflection: what AI produced, what you changed, why, and proof you own it |
| Deployment checklist | Lesson 11 | Steps for a safe publish, including rollback |
| Test list | Lesson 13 | Systematic verification record |
| Backlog | Lessons 9, 15, 16 | Prioritised follow-up work, minimum 3 items at the end |
| Live verification evidence | Lessons 12–13 | Screenshots or video proving it works in production |

---

## The AI rule — read this one twice

> "You deliver no AI-result that you cannot explain."

- AI is a tool. You own the code and the choices.
- Everything generated must be **verified, tested, and explained in your own words**.
- Prompts and results get logged in `prompt.md` and `ai-log.md`.
- The teaching pattern is: work alone 5 minutes, form a concrete question,
  then explain the solution afterwards. AI output is never the endpoint.

**This applies to this project.** Every session with Claude is material for
`ai-log.md`, and every file produced here is something you need to be able to
defend out loud.

---

## Assessment — the literal checklist

Both product *and* process are graded. The teacher asks for:

1. Live URL and Git repository
2. Working custom theme and working project CPT
3. **Proof of a Bootstrap/Sass/Webpack build**
4. Responsive, accessible baseline and a tested contact form
5. `prompt.md` and `ai-log.md` with critical AI reflection
6. Test list, deployment checklist, backlog
7. A short verbal demo, **5 minutes maximum**

Two checkpoints: **Lesson 9** (mid-course assessment) and **Lesson 16**
(final). At Lesson 9 the scope may be reduced if going live is at risk — but
**the live portfolio itself is the hard requirement** and is never dropped.

---

## Lesson-by-lesson

Nine weeks, one holiday week. Each lesson is 120 minutes, structured as:
check-in (10) → instruction and demo (15) → think-do-discuss in pairs (15) →
self-directed building with coaching (45) → peer review or debug (20) →
evidence capture and exit ticket (15).

| Les | Topic | Evidence you must leave behind |
|---|---|---|
| 1 | Portfolio & AI intro | Running Docker setup, WordPress installed, portfolio concept, `prompt.md`, `ai-log.md`, initial theme folder |
| 2 | Custom theme: AI → own code | Active custom theme, updated `ai-log.md`, a visible difference from the AI baseline |
| 3 | Theme structure | Working `front-page.php`, `page.php`, `functions.php`, a commit |
| 4 | Header, footer & loops | Two dynamic pages sharing header and footer |
| 5 | Sass, npm & Webpack | `package.json`, Webpack config, own Sass, working production build |
| 6 | Contact form | Tested contact mechanism with clear error messages |
| 7 | Design implementation | Responsive appearance, at least one piece of feedback addressed |
| 8 | Custom Post Type: projects | Three manageable project items, working archive and detail pages |
| **9** | **Mid-course assessment** | Feedback form, prioritised backlog, short demo |
| 10 | WP-CLI & SSH | Short command log with explanation, safe credential handling |
| 11 | Hosting preparation | Chosen hosting, reviewed deployment checklist |
| 12 | Deployment | Public URL, recorded live verification |
| 13 | Testing & release control | Test list, fixed bugs, retest proof |
| 14 | SEO & discoverability | Improved metadata, reviewed project copy |
| 15 | Presentation | ≤5-minute demo, peer feedback, updated backlog |
| **16** | **Final assessment** | Everything submitted, plus a backlog with ≥3 follow-up steps |

### Peer roles used throughout

- **Builder** — shares screen, names the goal, shows attempts
- **Coach** — asks questions first, reads errors together, explains before giving code
- **Watchkeeper** — checks output against the rubric

---

## Where our current plan sits against this

| Requirement | Status |
|---|---|
| Docker local environment | **Required and not started.** Was treated as optional until now. |
| Custom theme with the four named files | Not started. Planned. |
| Project CPT with archive + single templates | Not started. Design mockup exists. |
| Bootstrap vs Tailwind | **Tailwind chosen without pre-approval** (Goldy's call, 2026-09-13). Risk accepted. |
| Sass, npm, Webpack | Kept deliberately, to satisfy the build-proof criterion. Current prototype uses Vite — that has to change for the deliverable. |
| 3+ projects | Two real (keurveilig.nl, michelvisuals.com) plus this portfolio = 3. Tight but sufficient. |
| Detail pages: role, techniques, results, imagery | Layout designed. `result` and `imagery` still empty — no invented content. |
| Contact form | Not started. |
| `prompt.md`, `ai-log.md` | Not started. Should already exist as of Lesson 1–2. |
| Test list, deployment checklist, backlog | Not started. Due at lessons 13, 11 and 9. |
| Live URL | Not started. |

---

## Open questions to put to the teacher

1. Is **Tailwind** acceptable as the "pre-approved alternative" to Bootstrap?
   Currently being used without that approval.
2. Does "Sass" mean Bootstrap's Sass specifically, or is any `.scss` pipeline
   enough?
3. Is **React inside the theme** acceptable, given the curriculum is silent on
   JavaScript frameworks? Relevant because the interactive project table is
   the strongest piece of the design.
