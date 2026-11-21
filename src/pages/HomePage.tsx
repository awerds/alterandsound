import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MediaPlayer } from '@/components/MediaPlayer'
import { WorkCard } from '@/components/WorkCard'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import type { ThemeTag } from '@/types/domain'

const THEMES: Array<'All' | ThemeTag> = [
  'All',
  'Hope',
  'Worship',
  'Testimony',
  'Stillness',
  'Lament',
  'Instrumental',
]

export function HomePage() {
  usePageTitle('Showcase')
  const { works, profiles, getProfileById } = useStore()
  const [selectedTheme, setSelectedTheme] = useState<'All' | ThemeTag>('All')
  const [selectedSkill, setSelectedSkill] = useState<string>('All')
  const [query, setQuery] = useState('')

  const allSkills = useMemo(() => {
    const set = new Set<string>()
    works.forEach((w) => w.skillsUsed.forEach((s) => set.add(s)))
    return ['All', ...Array.from(set).sort()]
  }, [works])

  const featuredWork = useMemo(
    () => works.find((w) => w.featured) ?? works[0],
    [works]
  )
  const featuredArtist = featuredWork
    ? getProfileById(featuredWork.profileId) ?? profiles[0]
    : undefined

  const filteredWorks = useMemo(() => {
    const q = query.trim().toLowerCase()
    return works.filter((work) => {
      if (selectedTheme !== 'All' && !work.themes.includes(selectedTheme)) {
        return false
      }
      if (selectedSkill !== 'All' && !work.skillsUsed.includes(selectedSkill)) {
        return false
      }
      if (!q) return true
      const artist = getProfileById(work.profileId)
      const haystack = [
        work.title,
        work.story,
        work.genre,
        work.scriptureRef ?? '',
        ...work.skillsUsed,
        ...work.themes,
        artist?.displayName ?? '',
        artist?.location ?? '',
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [works, selectedTheme, selectedSkill, query, getProfileById])

  return (
    <div className="flex flex-col gap-16">
      {/* Asymmetric Editorial Hero */}
      <section className="grid grid-cols-1 gap-10 border-b border-border pb-14 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Altar &amp; Sound · Musicians of Faith
          </p>

          <h1
            id="main-content"
            tabIndex={-1}
            className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl focus:outline-none"
          >
            Craft offered upward.{' '}
            <span className="italic text-accent">
              Music that opens the door to God.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted">
            A quiet gallery where musicians of faith showcase their skill, connect to
            collaborate, and pair every recording with the personal story behind the
            song—built for fellowship among artists and warmth toward seekers.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button asChild size="lg" variant="accent">
              <Link to="/studio">
                Share Your Craft
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/artists">Explore Musicians</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/collabs">Browse Collabs</Link>
            </Button>
          </div>
        </div>

        {/* Spotlight Session Card */}
        {featuredWork && featuredArtist ? (
          <aside className="lg:col-span-5">
            <div className="rounded-sm border border-border bg-surface-elevated p-5">
              <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted">
                <span>Featured Session</span>
                <Link
                  to={`/story/${featuredWork.slug}`}
                  className="inline-flex items-center gap-1 text-accent hover:underline"
                >
                  Open Story
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
              <MediaPlayer
                work={featuredWork}
                artistName={featuredArtist.displayName}
                compact
              />
              <div className="mt-4 space-y-1.5">
                <p className="font-serif text-xl text-ink">{featuredWork.title}</p>
                <p className="text-xs text-muted">
                  <Link
                    to={`/artists/${featuredArtist.handle}`}
                    className="font-medium text-ink hover:text-accent"
                  >
                    {featuredArtist.displayName}
                  </Link>{' '}
                  · {featuredArtist.location}
                </p>
                {featuredWork.scriptureExcerpt ? (
                  <p className="pt-2 font-serif italic text-sm text-muted">
                    “{featuredWork.scriptureExcerpt}” — {featuredWork.scriptureRef}
                  </p>
                ) : null}
              </div>
            </div>
          </aside>
        ) : null}
      </section>

      {/* Curated Showcase & Filters */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-3xl font-medium text-ink">
                Recent Showcases
              </h2>
              <p className="mt-1 text-sm text-muted">
                Listen by theme, instrument, or story. Every piece links to a
                distraction-free page you can share with a friend.
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">
              {filteredWorks.length} {filteredWorks.length === 1 ? 'work' : 'works'}
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-sm border border-border bg-surface/60 p-4">
            {/* Theme pills */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by theme">
              {THEMES.map((theme) => {
                const active = selectedTheme === theme
                return (
                  <button
                    key={theme}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedTheme(theme)}
                    className={`min-h-9 rounded-sm border px-3 py-1.5 text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                      active
                        ? 'border-accent bg-accent text-accent-ink'
                        : 'border-border bg-bg text-muted hover:text-ink'
                    }`}
                  >
                    {theme}
                  </button>
                )
              })}
            </div>

            {/* Search + Skill select */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
              <div className="relative sm:col-span-8">
                <label htmlFor="showcase-search" className="visually-hidden">
                  Search showcases by title, musician, instrument, or story
                </label>
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id="showcase-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by instrument, musician, genre, or Scripture…"
                  className="min-h-10 w-full rounded-sm border border-border bg-bg pl-9 pr-3 text-sm text-ink placeholder:text-muted/75"
                />
              </div>

              <div className="relative flex items-center gap-2 sm:col-span-4">
                <SlidersHorizontal
                  className="h-4 w-4 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <label htmlFor="skill-filter" className="visually-hidden">
                  Filter by skill or instrument
                </label>
                <select
                  id="skill-filter"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="min-h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                >
                  {allSkills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill === 'All' ? 'All instruments & skills' : skill}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {filteredWorks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-sm border border-border bg-surface/40 px-6 py-14 text-center">
            <p className="font-serif text-2xl text-ink">
              No showcases match those filters yet.
            </p>
            <p className="text-sm text-muted">
              Try clearing your filters or be the first to share a piece in this
              theme.
            </p>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSelectedTheme('All')
                  setSelectedSkill('All')
                  setQuery('')
                }}
              >
                Reset Filters
              </Button>
              <Button asChild variant="accent">
                <Link to="/studio">Share a Work</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredWorks.map((work) => {
              const artist = getProfileById(work.profileId) ?? profiles[0]
              return <WorkCard key={work.id} work={work} artist={artist} />
            })}
          </div>
        )}
      </section>

      {/* Quiet Invitation Band */}
      <section className="grid grid-cols-1 gap-6 rounded-sm border border-border bg-surface p-7 sm:p-10 md:grid-cols-12 md:items-center">
        <div className="space-y-2 md:col-span-8">
          <Badge variant="accent">No Vanity Metrics</Badge>
          <h2 className="font-serif text-3xl font-medium text-ink">
            Built for musicians who want excellence without the noise.
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Paste a link from YouTube, SoundCloud, Spotify, or Bandcamp, write the
            story behind your song, and receive private prayers instead of public
            clout scores.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <Button asChild variant="default">
            <Link to="/studio">Open Studio Preview</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/about">Read Our Heart</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
