# Altar & Sound — Project Specification

- **Brand:** Altar & Sound
- **Domain:** `altarandsound.com`
- **Mission:** A craft-first platform where musicians of faith showcase their artistry, connect to collaborate, and share the stories behind their music as a welcoming bridge that points listeners to God.
- **Cost Target:** \$0/month hosting and infrastructure (domain registration only).

---

## 1. Core Pillars

1. **Showcase Craft (The Folio)**
   Musicians present technical skill, original music, covers, and live studio sessions in a clean, gallery-grade portfolio—free from algorithmic noise and vanity metrics.
2. **Bridge to Faith (Story Behind the Song)**
   Every showcased piece can pair with a short personal reflection ("Why I wrote/played this") and optional Scripture reference, turning music discovery into a natural, non-preachy encounter with God for seekers.
3. **Faith-First Community (The Circle)**
   Structured collaboration listings and lightweight **Pray / Encourage** notes replace clout-driven likes and comments with genuine fellowship.

---

## 2. Target Audiences

| Audience | Primary Goal | Key Entry Point |
| :--- | :--- | :--- |
| **Musicians of Faith** (vocalists, instrumentalists, producers, songwriters, worship leaders, classical/indie/gospel artists) | Showcase skills, find collaborators, receive encouragement, share testimony | `/studio`, `/collabs`, `/artists/:handle` |
| **Seekers & Listeners** (friends, curious listeners discovering shared tracks) | Experience high-craft music and read authentic personal stories of faith | `/`, `/story/:id` |
| **Churches & Ministries** | Discover local or remote musicians for events, worship nights, and outreach | `/artists`, `/collabs` |

---

## 3. Information Architecture & Routes

Designed as a static Single Page Application (SPA) deployed to GitHub Pages (with `404.html` fallback for clean URLs):

| Route | View | Purpose |
| :--- | :--- | :--- |
| `/` | **Home & Curated Showcase** | Editorial intro + filterable showcase feed by **Skill**, **Genre**, and **Theme** (*Hope, Worship, Testimony, Stillness, Lament, Instrumental*). |
| `/story/:id` | **Seeker Share Page** | Distraction-free public page for a single work: embedded player, artist reflection, Scripture reference, and gentle "Explore Faith / Connect" CTA. Optimized for sharing via text/social. |
| `/artists` | **Musician Directory** | Searchable roster filtered by instrument/discipline, genre, location, and availability (*Open to Collab*, *Ministry/Events*, *Mentoring*). |
| `/artists/:handle` | **Artist Folio** | Musician profile: bio, location, skill matrix, **"Why I Play"** testimony, embedded showcase works, and **Send Encouragement / Collab Inquiry** actions. |
| `/collabs` | **Collab Board** | Structured needs posted by musicians (e.g., *"Need cello & mixing for acoustic EP"*, *"Seeking keys player for campus outreach"*). Filter by role and remote/local. |
| `/studio` | **Musician Dashboard** | Authenticated workspace to edit profile/testimony, publish works (paste YouTube/SoundCloud/Spotify/Bandcamp URL), post collabs, and read received prayer/encouragement notes. |
| `/about` | **Mission & Faith Story** | Short, accessible overview of Altar & Sound's heart, community guidelines, and resources for seekers curious about God. |

---

## 4. Zero-Cost Technical Architecture

### Frontend & Hosting (\$0)
- **Framework:** Vite + React 19 + TypeScript
- **Styling & UI Primitives:** Tailwind CSS + **shadcn/ui** (Radix UI primitives for accessible dialogs, sheets, tabs, dropdowns, and forms)
- **Routing:** React Router (BrowserRouter + GitHub Pages `404.html` redirect shim)
- **Hosting:** GitHub Pages with custom domain (`public/CNAME` containing `altarandsound.com`) + free automatic HTTPS
- **CI/CD:** GitHub Actions workflow (`deploy.yml`) building and deploying on push to `main`

### Media Strategy (\$0 Bandwidth & Storage)
- **Audio & Video via Smart Embeds:** Musicians submit URLs from platforms they already host on for free:
  - **YouTube** (`youtube.com`, `youtu.be`) — live sessions, playthroughs, testimonies
  - **SoundCloud** — demos, stems, tracks
  - **Spotify** — released singles/albums
  - **Bandcamp** — independent releases
- A lightweight URL parser validates and normalizes links into safe, lazy-loaded embeds (with facade thumbnails so initial page loads stay fast).
- **Avatars & Cover Art:** Client-side Canvas compression to WebP (<150 KB) before upload to free storage (1 GB holds ~6,000+ images).

### Backend & Auth (\$0 Free Tier)
- **Recommended:** **Supabase Free Tier** (500 MB PostgreSQL, 50k MAU Auth with Email + Google OAuth, 1 GB Storage, Row Level Security—no custom backend server required).
  - *Free-tier safeguard:* Weekly lightweight GitHub Action cron ping keeps the free database awake (prevents 7-day inactivity pause).
- **Alternative:** **Firebase Spark Plan** (1 GiB Firestore, 50k MAU Auth, never pauses; pair with external avatar URLs or Cloudinary free tier).
- **Repository Abstraction:** Data access sits behind a clean `src/lib/data/` adapter so **Phase 1** runs immediately on rich static seed data (zero external setup) and **Phase 2** flips cleanly to live Supabase/Firebase via environment variables.

---

## 5. Data Model (Relational Schema)

```sql
-- Musician profiles linked to Auth user
profiles (
  id              uuid primary key,
  handle          text unique not null,
  display_name    text not null,
  avatar_url      text,
  location        text,
  bio             text,
  testimony       text,                     -- "Why I Play" story
  skills          text[] default '{}',      -- e.g. ['Vocals', 'Acoustic Guitar', 'Mixing']
  genres          text[] default '{}',      -- e.g. ['Worship', 'Indie Folk', 'Gospel']
  availability    text[] default '{}',      -- ['collab', 'ministry', 'mentoring']
  external_links  jsonb default '{}',       -- youtube, spotify, instagram, website
  created_at      timestamptz default now()
)

-- Showcased audio/video works
works (
  id              uuid primary key,
  profile_id      uuid references profiles(id) on delete cascade,
  title           text not null,
  provider        text not null,            -- 'youtube' | 'soundcloud' | 'spotify' | 'bandcamp'
  source_url      text not null,
  embed_id        text not null,
  thumbnail_url   text,
  story           text,                     -- "Story Behind the Song"
  scripture_ref   text,                     -- e.g. 'Psalm 40:3'
  skills_used     text[] default '{}',
  themes          text[] default '{}',      -- e.g. ['Hope', 'Lament', 'Praise']
  created_at      timestamptz default now()
)

-- Collaboration requests
collabs (
  id              uuid primary key,
  profile_id      uuid references profiles(id) on delete cascade,
  title           text not null,
  description     text not null,
  roles_needed    text[] not null,
  is_remote       boolean default true,
  location        text,
  status          text default 'open',      -- 'open' | 'filled' | 'closed'
  created_at      timestamptz default now()
)

-- Private encouragement & prayer notes (replaces vanity likes)
encouragements (
  id              uuid primary key,
  recipient_id    uuid references profiles(id) on delete cascade,
  work_id         uuid references works(id) on delete set null,
  sender_name     text,                     -- optional for guests/seekers
  sender_id       uuid references profiles(id) on delete set null,
  kind            text not null,            -- 'prayer' | 'encouragement'
  message         text not null,
  created_at      timestamptz default now()
)
```

### Security & Moderation Rules
- Public read access on `profiles`, `works`, and open `collabs`.
- Authenticated write/update/delete restricted strictly to `auth.uid() = profile_id` via RLS.
- `encouragements` are private to `recipient_id` (and `sender_id`) to eliminate public comment toxicity and clout chasing.
- Rate-limited guest submissions and strict URL allowlist validation (`youtube`, `soundcloud`, `spotify`, `bandcamp` only) to prevent unsafe iframes/XSS.

---

## 6. Design System ("Intentional Minimalism")

- **Aesthetic Direction:** Editorial & sacred stillness—warm gallery spacing, expressive typography, zero generic church-template clichés.
- **Typography:**
  - *Display / Lyrics / Scripture:* Editorial Serif (`Cormorant Garamond` or `Instrument Serif`)
  - *UI / Metadata / Body:* Crisp Geometric Sans (`Inter` or `Plus Jakarta Sans`)
- **Theme Support (Light & Dark):**
  - *Warm Editorial Light:* Alabaster (`#FAF8F5`), Deep Ink (`#171614`), Muted Stone (`#6E6A63`), Burnished Ochre/Gold (`#A67C52`)
  - *Moody Studio Dark:* Obsidian (`#0E0E0D`), Warm Parchment (`#F2EFE9`), Ash (`#9C978E`), Soft Gold (`#C8A27A`)
- **Interaction Details:**
  - Facade media cards (fast load, expand/play cleanly inside modal or inline frame)
  - Subtle hairline borders (`1px`), generous negative space, crisp keyboard focus states (WCAG AA/AAA contrast)

---

## 7. Phased Roadmap

### Phase 1 — Static Showcase Prototype (Deploy to GitHub Pages Immediately)
- Scaffold Vite + React + TypeScript + Tailwind + shadcn/ui + GitHub Actions deploy pipeline.
- Build complete UI across Home Feed, Seeker Share Page (`/story/:id`), Musician Directory (`/artists`), Artist Folio (`/artists/:handle`), Collab Board (`/collabs`), and About/Mission (`/about`).
- Populate with realistic curated seed musicians, YouTube/SoundCloud smart embeds, testimonies, and filterable skills/themes.
- Include working client-side "Send Prayer / Encouragement" drawer and share-link copy UX.

### Phase 2 — Live Accounts & Database (Supabase Free Tier)
- Connect Supabase Auth (Email magic link + Google sign-in).
- Enable `/studio` dashboard for musicians to claim handles, publish works, post collabs, and read their private Encouragement Inbox.
- Add weekly GitHub Action keep-alive ping and RLS policies.

### Phase 3 — Community & Outreach Growth
- Curated devotional/theme playlists (e.g., *"Songs for Heavy Seasons"*, *"Acoustic Psalms"*).
- Local church/ministry event listings and verified ministry badges.
- Open-source submission guidelines and community moderation tools.

---

## 8. Domain & GitHub Pages Launch Checklist

1. Register `altarandsound.com` (Cloudflare Registrar or Porkbun, ~\$10–12/yr).
2. Add `public/CNAME` containing `altarandsound.com`.
3. Configure DNS records at registrar:
   - `A` records for `@` pointing to GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
   - `CNAME` record for `www` pointing to `<your-github-username>.github.io`
4. Push repo to GitHub → Settings → Pages → Source: **GitHub Actions** → Enable **Enforce HTTPS**.
