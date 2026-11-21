# Altar & Sound — Netlabel & Music Journal Specification

- **Brand:** Altar & Sound
- **Domain:** `https://altarandsound.com`
- **Identity:** An independent Christian netlabel and high-craft editorial music journal discovering, reviewing, and releasing great Christian music that opens doors to God.
- **Cost Target:** \$0/month hosting and infrastructure (domain registration only).

---

## 1. Editorial & Netlabel Pillars

1. **The Music Journal (`/`, `/journal/:slug`)**
   Magazine-grade album reviews, essays, artist interviews, live room sessions, and listening guides written with real musical literacy and reverence—inspired by *Bandcamp Daily*, *ECM Records*, and *Kinfolk*.
2. **The Netlabel Catalog (`/catalog`, `/releases/:slug`)**
   Numbered digital releases (`A&S — 001`, `A&S — 002`, …) featuring bespoke typographic/geometric sleeve art, multi-track listening rooms, liner notes, musician credits, and Scripture anchors.
3. **Persistent Listening Room (`ListeningBar`)**
   A docked bottom player lets readers play tracks from any release or review and keep listening across the site.
4. **Zero-Cost Curated Submissions (`/submit`)**
   Artists and curators pitch or publish releases using smart allowlisted embeds from **YouTube, SoundCloud, Spotify, and Bandcamp**, keeping audio/video bandwidth at \$0/month.

---

## 2. Information Architecture

| Route | View | Purpose |
| :--- | :--- | :--- |
| `/` | **Front Page (Journal)** | Magazine cover story spread, numbered Netlabel Shelf (`A&S — 001`…), and filterable editorial dispatches (*Album Review, Essay, Artist Interview, Live Session, Listening Guide*). |
| `/journal/:slug` | **Long-Form Article** | Editorial prose (`64ch` measure, drop-cap opening, pull quotes), inline listening player, Scripture liner note, and sticky Record Dossier sidebar. |
| `/catalog` | **Netlabel Discography** | Filterable archive of numbered releases with instant sleeve playback. |
| `/releases/:slug` | **Release Liner Notes** | Full tracklist, credits, liner notes, faith story, and related Journal coverage. |
| `/sessions` | **Room Sessions** | Dedicated listening room for stripped-back acoustic/live sessions and video/audio embeds. |
| `/submit` | **Submission & Editorial Desk** | Submit/preview smart-embed releases + view private Prayer & Reader Notes inbox. |
| `/manifesto` | **Manifesto & Faith** | Editorial commitments + a warm, accessible guide for listeners exploring faith. |

---

## 3. Technical Architecture (\$0 Hosting)

- **Frontend:** Vite + React 19 + TypeScript + Tailwind CSS v4 + **shadcn/ui** (Radix Dialog, Tabs, Slot).
- **Typography:** `Cormorant Garamond` (display), `Newsreader` (long-form editorial prose), `Plus Jakarta Sans` (UI), `IBM Plex Mono` (catalog numbers, issue metadata, timings).
- **Theming:** Automatic OS light/dark via CSS `color-scheme: light dark` and `light-dark()` with fallbacks + pure-CSS 2-state manual override.
- **Hosting:** GitHub Pages (`awerds/alterandsound`, `gh-pages` branch) with custom domain `altarandsound.com` + enforced Let's Encrypt HTTPS + SPA `404.html` redirect.
- **Growth Path (Phase 2):** Swap `src/context/StoreContext.tsx` from static seed + `localStorage` to Markdown/Git-backed posts (zero DB cost forever!) or Supabase Free Tier when adding contributor logins and public demo queues.
