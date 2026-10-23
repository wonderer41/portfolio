# Gerardo Lazo — Portfolio Build Spec

> **Handoff document.** Everything Claude Code needs to build a production repo
> from the design prototype in `Portfolio Blueprint System.html`.
> Source-of-truth for design, content, and behavior is that HTML file.

---

## 0 · Project at a glance

A single-page personal portfolio for **Gerardo Lazo Arones** — software-engineering
student (BS, Ensign College, '27) and former pastry chef (Le Cordon Bleu, '17).

**Aesthetic:** "Cyanotype blueprint" — a deep prussian-blue PCB schematic with
animated circuit traces, citron-yellow accents, a Newsreader italic serif used like
a tasting-menu header, and JetBrains Mono for the technical annotations.

**Sections** (single page, scroll-through, each ~100vh):
1. **Hero** — name lockup + meta row (course / class / building / status)
2. **Selected Works** — horizontal-scroll card carousel + sticky Index sidebar
3. **Contact** — "Open a Channel" — intro + form ("Send a transmission")

---

## 1 · Tech stack (recommended)

- **Next.js 15** (App Router) + **TypeScript** — matches Gerardo's existing stack (Bonanza is built on this)
- **Tailwind CSS** for styling (but keep raw CSS custom properties for the design tokens — see §2)
- **anime.js v3.2.2** for the PCB trace draw-in / pulse animation
- **No CMS** — content is hand-edited TS objects in `/content`
- **Deploy:** Vercel

### File structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # composes <Hero/> <SelectedWorks/> <Contact/>
│   └── globals.css           # design tokens + base styles
├── components/
│   ├── pcb/
│   │   ├── PCBGrid.tsx       # blueprint grid background
│   │   ├── PCBTraces.tsx     # SVG trace network (per section)
│   │   └── usePCBAnimation.ts # anime.js wiring
│   ├── hero/
│   │   ├── Hero.tsx
│   │   ├── NameLockup.tsx
│   │   └── MetaRow.tsx
│   ├── works/
│   │   ├── SelectedWorks.tsx
│   │   ├── CardCarousel.tsx
│   │   ├── ProjectModule.tsx
│   │   └── IndexSidebar.tsx
│   └── contact/
│       ├── Contact.tsx
│       └── ContactForm.tsx
├── content/
│   ├── projects.ts           # 3 projects + a "more soon" placeholder
│   ├── meta.ts               # hero meta row
│   └── contact.ts            # email, links, phone
└── lib/
    └── usePulses.ts          # the continuous "signal traveling" effect
```

---

## 2 · Design tokens

Drop these into `globals.css` as CSS custom properties on `:root`. They are the
exact values used in the prototype.

```css
:root {
  /* Surface */
  --bg:        #0a1a45;
  --bg-deep:   #061030;
  --grid:      rgba(255,255,255,0.035);
  --grid-mid:  rgba(255,255,255,0.08);

  /* PCB */
  --trace:        rgba(155,202,240,0.45);
  --trace-bright: #e8f4ff;
  --pad:          #4af0ff;
  --pad-warm:     #d7c742;

  /* Accent + ink */
  --citron:        #d7c742;
  --vellum:        #f1ead2;
  --vellum-dim:    rgba(241,234,210,0.55);
  --vellum-faint:  rgba(241,234,210,0.28);
  --hair:          rgba(241,234,210,0.14);

  /* Substrate (module body) */
  --module-grad-1: #081846;
  --module-grad-2: #061338;
  --module-grad-3: #040d28;
}
```

### Type pairing

| Use | Family | Weights |
|---|---|---|
| Display + body italic (the "menu" voice) | **Newsreader** | 300, 400, 500, 600, italic 400, italic 500 |
| Technical / annotation / labels | **JetBrains Mono** | 300, 400, 500, 600 |

Both from Google Fonts.

### Type scale (final values from the prototype)

| Element | Size | Family | Notes |
|---|---|---|---|
| Hero name `.name` | `clamp(72px, 11vw, 168px)` | Newsreader 300 | `letter-spacing: -0.025em` |
| Hero menu-label | 14px | Newsreader italic | uppercase, `letter-spacing: 0.32em`, rule lines either side |
| Hero meta values | **21px** | Newsreader italic | center-aligned grid, `gap: 80px` |
| Hero meta `.v.code` | **15px** | JetBrains Mono | citron color, `letter-spacing: 0.1em` |
| Hero meta labels `.k` | 11px | JetBrains Mono | uppercase, `letter-spacing: 0.16em` |
| Module title `h3` | **60px** | Newsreader 400 | `line-height: 0.98`, `word-break: break-word` |
| Module sub | 20px | Newsreader italic | dim |
| Module tl;dr | **28px** | Newsreader italic | vellum, dashed-bottom rule |
| Module body `p` | **19px** | Newsreader | `max-width: 64ch` |
| Module-id idx | 14px | JetBrains Mono | citron, uppercase |
| Module-id when | 11px | JetBrains Mono | faint |
| Chip | **13px** | JetBrains Mono | flat rectangle, no border, no radius |
| Index title | 13px | Newsreader italic | citron, uppercase, `letter-spacing: 0.26em`, leading rule |
| Index li-name | 16px | Newsreader | dim until active |
| Contact h2 | 64px | Newsreader 400 | italic em in citron |

### Module / chip silhouette

- **Border radius:** `56px 3px 56px 3px` (TL + BR rounded, TR + BL sharp — SMD-pad shape)
- **Background:** `linear-gradient(180deg, var(--module-grad-1) 0%, var(--module-grad-2) 55%, var(--module-grad-3) 100%)`
- **Border:** 1px hairline, top edge slightly brighter, bottom edge slightly darker
- **Shadow:** NONE — depth comes from the tonal shift only
- **Top-left registration dot:** 6px citron circle at `top: 26px; left: 26px;` with a soft `box-shadow: 0 0 6px rgba(215,199,66,0.6)`
- **Chips inside modules:** flat rectangles, `padding: 7px 16px`, `background: rgba(155,202,240,0.10)` (or `rgba(74,240,255,0.20)` for `.hot`). NO border, NO border-radius.

### Index sidebar (recessed variant)

Override on top of the module base:
```css
.index {
  background: rgba(8, 20, 56, 0.25);
  border: 1px solid rgba(155,202,240,0.08);
  box-shadow: none;
  padding: 26px 24px;
  position: sticky; top: 24px;
}
```

---

## 3 · Sections

### 3.1 · Hero

**Layout:** full-viewport. `padding: 56px 80px`. Three vertical rows via CSS grid `grid-template-rows: auto 1fr auto`:

1. **Top bar** — 3-column: `[FOLIO № 01 · BLUEPRINT] [— Tasting Menu —] [REV. 0.x · DATE]`. The middle item is the menu-label voice (citron italic). The left item has a pulsing cyan status dot.
2. **Center** (flex column, centered) —
   - menu-label "Software · Engineering · Folio" with rule lines
   - giant Newsreader name lockup (`Gerardo` regular, `Lazo` italic citron, `Arones` italic citron — break with `<br>` between Lazo and Arones)
   - menu-sub "a tasting menu of *things made in the open*"
   - tag paragraph (the bio line)
3. **Meta row** — 4 cells, auto-width, centered, gap 80px, max-width 1280px:
   - COURSE → "B.S. *Software Engineering*"
   - CLASS OF → 2027 (code style, citron)
   - CURRENTLY BUILDING → "Bonanza · payments + booking"
   - STATUS → `// OPEN · summer '26` (code style, citron)

**Background:** blueprint grid + dense PCB SVG trace network (8 corner clusters) + 3 faint binary-code bleed blocks at fixed positions + pulse-layer SVG for continuous "signal traveling" effect.

### 3.2 · Selected Works

**Layout:** centered, `min-height: 100vh`, content vertically centered. `max-width: 1480px`.
Grid: `grid-template-columns: minmax(0, 1fr) 320px; gap: 28px;` — cards on the left, sticky Index on the right. Stack to 1fr below 900px viewport.

**Background:** quieter than Hero. Only **8 trace flourishes** (4 each side, evenly spaced along left & right edges, hanging in the corners). No traces behind the cards.

**Card carousel** (left column):
- Meta line above the cards: `[01 / 03 · scroll →] [← →]`. Buttons are **56×36 rectangles**, mono labels.
- `.cards-scroll`: flex row, `gap: 0`, `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scroll-behavior: smooth`, vertical breathing room via `padding: 18px 0; margin: -18px 0;`.
- Each `.module`: `flex: 0 0 100%`, `scroll-snap-align: start`, `min-height: 540px`. So one card fills the carousel viewport at rest — no peek of the next card.

**Project module internal layout:** 2-column grid `grid-template-columns: 340px 1fr; gap: 56px;` (collapses to 280px / 36px at <1200px viewport, stacks at <900px):
- **Left:** mod-id stack (MOD · NN / dates / role), then `h3` title (line 1 regular, `<br>`, line 2 italic citron with trailing period), then `.module-sub` (— short subtitle), then chip rack (`.stack-row` flex-wrap)
- **Right:** `.tldr` (italic, dashed-bottom rule) then 2-3 plain body paragraphs

**Carousel state machine:**
- Track active card from `scrollLeft / cardWidth`
- Update the `01 / 03` counter and toggle `.active` on the matching index item
- Nav buttons jump to prev/next card via `scrollTo({ left, behavior: 'smooth' })`. Disable at boundaries.
- Index `<li data-idx="N">` items are clickable; clicking jumps the carousel to card N.

**Index sidebar:**
- 4 items: 3 projects (clickable) + 1 "more soon" draft (non-clickable)
- Each row: small pad-node + number + name (with italic-citron em) + meta (year / lang)
- Hover state: subtle cyan tint background
- Active state: stronger cyan tint, citron number

### 3.3 · Contact

**Layout:** `min-height: 100vh`, content centered vertically. `.contact-wrap` max-width 1280px.

Grid: `grid-template-columns: auto 560px; gap: 48px; justify-content: center;` — intro on the left, fixed-width form on the right, pair centered horizontally on the page.

**Intro column** (max-width 460px):
- "— Open a Channel —" menu-label (citron, italic, rule lines)
- "03 / TRANSMIT" mono index marker
- h2 "Send a *transmission.*" (Newsreader 64px, italic em in citron)
- short italic paragraph
- contact channels list (EMAIL / LINKEDIN / GITHUB / PHONE — 2-column grid each row: mono label + value)

**Form column** (560px fixed, styled as a module — same SMD-pad silhouette):
- Header row "TX · CHANNEL 01" / "direct → mail client"
- Fields: From (email, required), Subject (text), Message (textarea, 5 rows)
- TRANSMIT button: full-width, cyan border + cyan glow on hover
- Status line below button

**Behavior:** on submit
1. Prevent default
2. Animate the highlighted `.tx-trace` SVG path drawing across the section (stroke-dashoffset animation, ~1200ms easeInOutQuad)
3. On complete, pulse the `#tx-pad` (the antenna pad on the right edge of the section)
4. Status text: "→ routing…" → "→ transmitted · your mail client should open"
5. Open mailto URL: `mailto:ggl746@ensign.edu?subject=…&body=From: …\\n\\n…`

**Background traces:** 5 short incoming "context" traces on the left (ending around x=280-310 in the 1920×1000 viewBox so they never overlap text), plus 3 outgoing TX branches converging into the main TX artery that fires on submit. Big TX antenna pad on the right edge with two concentric outlined rings around it.

---

## 4 · Animations

### 4.1 · Trace draw-in (on load)

For each `.trace` path: set `stroke-dasharray = length`, `stroke-dashoffset = length`. Animate `strokeDashoffset` to 0 over 1800ms with `easeInOutQuart`, staggered 80ms from center outward.

### 4.2 · Continuous "signal traveling" pulse

For each trace, append a duplicate `<path class="pulse">` into a dedicated overlay SVG. Set `stroke-dasharray = ${Math.min(80, len * 0.18)} ${len}` and animate `strokeDashoffset` from `len` to `-len * 0.18` over 3200ms + jitter, opacity 0→0.95→0.95→0, looped forever. Per-pulse random delay 0-600ms.

### 4.3 · Pad breathing

Animate `r` (1× → 1.6× → 1×) + opacity (0.7 → 1 → 0.7) on every `.pad` circle, 2400ms `easeInOutSine`, alternate, random stagger, loop.

### 4.4 · Index cascade

Cycle opacity/scale on `.li-pad` dots in the index — staggered 220ms, 1600ms cycle, loop.

### 4.5 · TX submit (Contact)

Already described in §3.3.

All five effects are anime.js v3.2.2.

---

## 5 · Content

### 5.1 · Identity / bio

- **Name:** Gerardo Lazo Arones
- **Short bio:** "Software engineering student at Ensign, former pastry chef from Le Cordon Bleu. I build full-stack interfaces, back-ends, and the homelab that runs most of what I use day-to-day."
- **Tagline (the "menu" line):** "a tasting menu of *things made in the open*"

### 5.2 · Hero meta

| Key | Value |
|---|---|
| COURSE | B.S. *Software Engineering* |
| CLASS OF | 2027 |
| CURRENTLY BUILDING | Bonanza · payments + booking |
| STATUS | `// OPEN · summer '26` |

### 5.3 · Projects (3, in this order)

**Bonanza Transportation** — full-stack booking platform · Apr 2026 — present · sole developer · `MOD · 01`
- **tl;dr:** A premium transportation service had no way for customers to book online. I built one — from the database up to the Stripe receipt — by myself.
- **Body 1:** Architected the whole system from zero: schema, payment flow, SMS confirmations, deployment. Started with the boring docs (System Design, ERD, service-layer class diagram, MVP use cases) so the build itself stayed tightly scoped.
- **Body 2:** Configured a real engineering workflow on top — GitHub Org with branch protection, Vercel CI/CD, custom domain on Google Workspace — because shipping a one-person project should still look like a team made it.
- **Stack chips:** `Next.js 15` (hot), TypeScript, Supabase, Stripe, Twilio, Maps API, Vercel

**Project Zenith** — AI streaming plugin for Jellyfin · Jun — Nov 2025 · co-developer · `MOD · 02`
- **tl;dr:** Bringing back the feeling of "what's on TV?" — for a self-hosted kids' library, with an LLM playing programming director.
- **Body 1:** Co-built a plugin that turns an on-demand Jellyfin library into a continuous, AI-curated live channel for children's content. I owned the backend — a Python/FastAPI service that the C# plugin talks to over REST.
- **Body 2:** The integration gap nobody had solved: Jellyfin couldn't natively serve the AI-scheduled stream. I engineered server-side video streaming straight from FastAPI to close it. All inference runs locally through Ollama — no external API in the loop.
- **Stack chips:** `Python` (hot), FastAPI, REST, C# / .NET, Ollama

**The Homelab** — ongoing · personal infra · `MOD · 03`
- **tl;dr:** A Proxmox host running 20+ Docker containers — most of what I'd otherwise pay a SaaS for. The unglamorous parts of being an engineer.
- **Body 1:** A 6-service automation pipeline I built around Sonarr — chaining Prowlarr, qBittorrent (behind Gluetun/WireGuard), Bazarr, Shoko, and Jellyfin into one hardlink-based workflow.
- **Body 2:** Nginx Proxy Manager fronts everything with TLS; NetBird gives me mesh VPN access from anywhere. Along the way I've broken and fixed GPU passthrough, restructured NFS storage under load, and lost more than one VM to OOMs — which has done more for my Linux skills than any course.
- **Stack chips:** `Proxmox` (hot), Docker, Linux · Fedora, Nginx, WireGuard, NetBird

**+ Index placeholder:** "— *more soon*" / `draft` (non-clickable)

### 5.4 · Contact

| Channel | Value |
|---|---|
| EMAIL | ggl746@ensign.edu |
| LINKEDIN | /in/arones-41-gerardo |
| GITHUB | github.com/[your-handle] *(TODO: real handle)* |
| PHONE | +1 (435) 513-5284 |

**Mail-to target:** `ggl746@ensign.edu`

### 5.5 · Footnote (page bottom)

`GERARDO LAZO · BLUEPRINT v0.3` · `— pcb rev. B —` · `SCROLL · 03 / 03`

---

## 6 · Build checklist

- [ ] Scaffold Next.js 15 + TS + Tailwind
- [ ] Add Google Fonts (Newsreader + JetBrains Mono) via `next/font/google`
- [ ] Drop design tokens (§2) into `globals.css`
- [ ] Build `<PCBGrid>` (the blueprint grid background with the radial mask)
- [ ] Build `<PCBTraces section="hero|works|contact">` — per-section SVG trace networks (paths can be inlined from the prototype)
- [ ] Wire up `usePCBAnimation()` hook — draw-in, pulses, pad breathing (anime.js v3.2.2)
- [ ] Build `<Hero>` — top bar, name lockup, meta row
- [ ] Build `<SelectedWorks>` — carousel + index sidebar, with full state machine (counter, active index, button-disable, click-to-jump)
- [ ] Build `<Contact>` — intro + form, with submit-fires-trace + mailto open
- [ ] Set `<meta>` tags + `<title>` "Gerardo Lazo — Folio № 01"
- [ ] Verify responsive breakpoints: 1200px (module sidebar shrinks), 900px (modules stack)
- [ ] Smoke-test all 3 sections at 1920, 1440, 1280, 1024, 768

---

## 7 · TODO / open questions for Gerardo

1. **GitHub handle** — currently a placeholder in resume + portfolio
2. **Bonanza live URL** — if MVP is shipped, link it from MOD · 01
3. **Personal email** — `ggl746@ensign.edu` is fine, but consider claiming `gerardo.lazo@…` for after graduation
4. **LinkedIn vanity** — `/in/arones-41-gerardo` is functional; consider `/in/gerardolazo` if free
5. **Project screenshots** — even one hero shot per module would lift the page
6. **A possible 4th project** (the current `04. more soon` placeholder)
7. **Final hero meta values** — currently "CURRENTLY BUILDING: Bonanza · payments + booking" and "STATUS: OPEN · summer '26". Update before publishing.

---

## 8 · Reference

- **Design prototype:** `Portfolio Blueprint System.html` in this project — source of truth for layout, animations, exact values.
- **Content document:** `Portfolio Content + Voice.html` — voice options, copy alternatives, retouches to apply back to the resume.
- **Palette study:** `Portfolio Palette Studies.html` — the 5 directions explored before settling on Cyanotype.
