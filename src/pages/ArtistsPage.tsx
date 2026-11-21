import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import type { AvailabilityTag } from '@/types/domain'

const AVAILABILITY_LABELS: Record<'all' | AvailabilityTag, string> = {
  all: 'All Musicians',
  collab: 'Open to Collab',
  ministry: 'Ministry & Events',
  mentoring: 'Mentoring',
}

export function ArtistsPage() {
  usePageTitle('Musicians')
  const { profiles, works } = useStore()
  const [availability, setAvailability] = useState<'all' | AvailabilityTag>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return profiles.filter((p) => {
      if (availability !== 'all' && !p.availability.includes(availability)) {
        return false
      }
      if (!q) return true
      return [p.displayName, p.location, p.tagline, ...p.skills, ...p.genres]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [profiles, availability, query])

  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-2xl space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          The Folio Directory
        </p>
        <h1
          id="main-content"
          tabIndex={-1}
          className="font-serif text-4xl font-medium text-ink sm:text-5xl focus:outline-none"
        >
          Musicians of Faith
        </h1>
        <p className="text-sm leading-relaxed text-muted">
          Discover instrumentalists, vocalists, producers, and songwriters offering
          their craft to serve churches, collaborate on honest art, and welcome
          seekers.
        </p>
      </header>

      <div className="flex flex-col gap-4 rounded-sm border border-border bg-surface/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by availability"
        >
          {(Object.keys(AVAILABILITY_LABELS) as Array<'all' | AvailabilityTag>).map(
            (key) => (
              <button
                key={key}
                type="button"
                aria-pressed={availability === key}
                onClick={() => setAvailability(key)}
                className={`min-h-9 rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  availability === key
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-border bg-bg text-muted hover:text-ink'
                }`}
              >
                {AVAILABILITY_LABELS[key]}
              </button>
            )
          )}
        </div>

        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="artist-search" className="visually-hidden">
            Search musicians by name, city, instrument, or genre
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="artist-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, instrument, city…"
            className="min-h-10 w-full rounded-sm border border-border bg-bg pl-9 pr-3 text-sm text-ink placeholder:text-muted/75"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((artist) => {
          const count = works.filter((w) => w.profileId === artist.id).length
          return (
            <article
              key={artist.id}
              className="flex flex-col justify-between rounded-sm border border-border bg-surface-elevated p-6 transition-colors hover:border-accent/50"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface font-serif text-lg text-accent"
                    >
                      {artist.initials}
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-medium text-ink">
                        <Link
                          to={`/artists/${artist.handle}`}
                          className="hover:text-accent transition-colors"
                        >
                          {artist.displayName}
                        </Link>
                      </h2>
                      <p className="inline-flex items-center gap-1 text-xs text-muted">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {artist.location}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted">{artist.tagline}</p>

                <div className="flex flex-wrap gap-1.5">
                  {artist.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {artist.availability.map((av) => (
                    <Badge key={av} variant="accent">
                      {AVAILABILITY_LABELS[av]}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                <span className="text-muted">
                  {count} {count === 1 ? 'showcase' : 'showcases'}
                </span>
                <Link
                  to={`/artists/${artist.handle}`}
                  className="inline-flex items-center gap-1 font-medium uppercase tracking-[0.12em] text-accent hover:underline"
                >
                  Open Folio
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
