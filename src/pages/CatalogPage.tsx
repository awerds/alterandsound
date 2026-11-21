import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Search } from 'lucide-react'
import { AlbumSleeve } from '@/components/AlbumSleeve'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import {
  playOrToggleTrack,
  subscribePlayer,
  type ActiveTrackState,
} from '@/lib/audioPreview'
import type { NetlabelRelease } from '@/types/domain'

export function CatalogPage() {
  usePageTitle('Netlabel Catalog')
  const { releases } = useStore()
  const [genre, setGenre] = useState('All')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<ActiveTrackState | null>(null)

  useEffect(() => {
    return subscribePlayer(setActive)
  }, [])

  const genres = useMemo(() => {
    const set = new Set<string>()
    releases.forEach((r) => set.add(r.genre))
    return ['All', ...Array.from(set)]
  }, [releases])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return releases.filter((r) => {
      if (genre !== 'All' && r.genre !== genre) return false
      if (!q) return true
      return [r.title, r.artistName, r.catalogNumber, r.genre, r.artistOrigin, ...r.moods]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [releases, genre, query])

  const handlePlay = (release: NetlabelRelease) => {
    const first = release.tracks[0]
    if (!first) return
    playOrToggleTrack(
      {
        trackId: first.id,
        releaseId: release.id,
        releaseSlug: release.slug,
        catalogNumber: release.catalogNumber,
        title: first.title,
        artistName: release.artistName,
        duration: first.duration,
        musicalKey: first.musicalKey,
        sleevePalette: release.sleevePalette,
      },
      first.previewChords
    )
  }

  return (
    <div className="w-full space-y-10">
      <header className="max-w-3xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Altar &amp; Sound Discography
        </p>
        <h1
          id="main-content"
          tabIndex={-1}
          className="display-cover font-medium text-ink focus:outline-none"
        >
          Netlabel <span className="prism-text italic">Catalog</span>
        </h1>
        <p className="font-editorial text-lg leading-relaxed text-muted">
          Numbered digital releases, live room sessions, and curated streams—free to
          discover, share, and pass along to a friend.
        </p>
      </header>

      <div className="flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="mobile-snap-row sm:pill-row sm:overflow-visible"
          role="group"
          aria-label="Filter catalog by genre"
        >
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={genre === g}
              onClick={() => setGenre(g)}
              className={`min-h-10 shrink-0 snap-start rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all cursor-pointer ${
                genre === g
                  ? 'border-transparent bg-gradient-to-r from-amber-500 via-pink-600 to-violet-600 text-white font-medium shadow-md'
                  : 'border-border bg-surface-elevated/85 text-muted hover:text-ink'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="catalog-search" className="visually-hidden">
            Search catalog by album, artist, or catalog number
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Album, artist, A&S—001…"
            className="min-h-11 w-full rounded-full border border-border bg-surface-elevated pl-10 pr-4 text-sm text-ink placeholder:text-muted/75"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="prism-card flex flex-col items-center gap-4 rounded-2xl px-6 py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Catalog A&amp;S — 001 Forthcoming
          </p>
          <h2 className="font-serif text-3xl font-medium text-ink">
            The netlabel shelf is ready for its first real pressing.
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            Demo content has been cleared. Add a verified YouTube, SoundCloud,
            Spotify, or Bandcamp release from the Submission Desk to launch A&amp;S — 001.
          </p>
          <Link
            to="/submit"
            className="mt-2 inline-flex min-h-11 items-center rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-violet-600 px-6 py-2 text-sm font-medium text-white shadow-md hover:brightness-110"
          >
            Submit First Release
          </Link>
        </div>
      ) : (
        <div className="catalog-auto-grid">
          {filtered.map((release) => {
            const isPlaying = active?.releaseId === release.id && active.isPlaying
            return (
              <article
                key={release.id}
                className="prism-card flex flex-col justify-between gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <Link to={`/releases/${release.slug}`} className="block">
                    <AlbumSleeve
                      release={release}
                      isPlaying={isPlaying}
                      onTogglePlay={() => handlePlay(release)}
                    />
                  </Link>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      <span className="text-accent">{release.catalogNumber}</span>
                      <span>{release.releaseDate}</span>
                    </div>

                    <h2 className="font-serif text-2xl font-medium text-ink">
                      <Link
                        to={`/releases/${release.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {release.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-muted">
                      {release.artistName} · {release.artistOrigin}
                    </p>

                    <p className="line-clamp-3 pt-1 text-sm leading-relaxed text-muted">
                      {release.linerNotes}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="default">{release.genre}</Badge>
                    {release.essentialPick ? (
                      <Badge variant="accent">Essential Pick</Badge>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-[11px]">
                  <span className="text-muted">{release.format}</span>
                  <Link
                    to={`/releases/${release.slug}`}
                    className="inline-flex items-center gap-1 uppercase tracking-[0.12em] text-accent hover:underline"
                  >
                    Liner Notes
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
