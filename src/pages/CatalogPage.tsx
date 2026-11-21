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
    <div className="space-y-10">
      <header className="max-w-2xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Altar &amp; Sound Discography
        </p>
        <h1
          id="main-content"
          tabIndex={-1}
          className="display-cover font-medium text-ink focus:outline-none"
        >
          Netlabel Catalog
        </h1>
        <p className="font-editorial text-lg leading-relaxed text-muted">
          Numbered digital releases, live room sessions, and curated streams—free to
          discover, share, and pass along to a friend.
        </p>
      </header>

      <div className="flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter catalog by genre">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={genre === g}
              onClick={() => setGenre(g)}
              className={`min-h-9 rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                genre === g
                  ? 'bg-ink text-bg font-medium'
                  : 'text-muted hover:bg-surface hover:text-ink'
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
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Album, artist, A&S—001…"
            className="min-h-10 w-full rounded-sm border border-border bg-bg pl-9 pr-3 text-sm text-ink placeholder:text-muted/75"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((release) => {
          const isPlaying = active?.releaseId === release.id && active.isPlaying
          return (
            <article
              key={release.id}
              className="flex flex-col justify-between gap-4 rounded-sm border border-border bg-surface-elevated p-5"
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

                  <p className="line-clamp-3 text-sm leading-relaxed text-muted pt-1">
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
    </div>
  )
}
