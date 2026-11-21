import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Disc3, Pause, Play, Search } from 'lucide-react'
import { AlbumSleeve } from '@/components/AlbumSleeve'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import {
  playOrToggleTrack,
  subscribePlayer,
  type ActiveTrackState,
} from '@/lib/audioPreview'
import type { ArticleCategory, NetlabelRelease } from '@/types/domain'

const CATEGORIES: Array<'All' | ArticleCategory> = [
  'All',
  'Album Review',
  'Essay',
  'Artist Interview',
  'Live Session',
  'Listening Guide',
]

export function HomePage() {
  usePageTitle('Journal & Netlabel')
  const { articles, releases, getReleaseById } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<'All' | ArticleCategory>('All')
  const [query, setQuery] = useState('')
  const [activeTrack, setActiveTrack] = useState<ActiveTrackState | null>(null)

  useEffect(() => {
    return subscribePlayer(setActiveTrack)
  }, [])

  const coverArticle = useMemo(
    () => articles.find((a) => a.coverStory) ?? articles[0],
    [articles]
  )
  const coverRelease = coverArticle
    ? getReleaseById(coverArticle.releaseId) ?? releases[0]
    : releases[0]

  const dispatches = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((art) => {
      if (selectedCategory !== 'All' && art.category !== selectedCategory) {
        return false
      }
      if (!q) return true
      const rel = getReleaseById(art.releaseId)
      return [
        art.title,
        art.dek,
        art.author,
        art.category,
        ...art.tags,
        rel?.artistName ?? '',
        rel?.genre ?? '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [articles, selectedCategory, query, getReleaseById])

  const triggerReleasePlay = (release: NetlabelRelease) => {
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
    <div className="flex flex-col gap-16">
      {/* Magazine Cover Feature Spread */}
      {coverArticle && coverRelease ? (
        <section className="grid grid-cols-1 gap-10 border-b border-border pb-14 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              <span>Cover Feature</span>
              <span aria-hidden="true">·</span>
              <span>{coverArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-muted">{coverRelease.catalogNumber}</span>
            </div>

            <h1
              id="main-content"
              tabIndex={-1}
              className="display-cover font-medium text-ink focus:outline-none"
            >
              <Link
                to={`/journal/${coverArticle.slug}`}
                className="hover:text-accent transition-colors"
              >
                {coverArticle.title}
              </Link>
            </h1>

            <p className="max-w-xl font-editorial text-lg leading-relaxed text-muted">
              {coverArticle.dek}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
              <span>By {coverArticle.author}</span>
              <span aria-hidden="true">·</span>
              <span>{coverArticle.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{coverArticle.readingTime}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" variant="default">
                <Link to={`/journal/${coverArticle.slug}`}>
                  Read Cover Feature
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => triggerReleasePlay(coverRelease)}
              >
                {activeTrack?.releaseId === coverRelease.id && activeTrack.isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
                    Pause {coverRelease.catalogNumber}
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    Listen to {coverRelease.catalogNumber}
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <Link to={`/releases/${coverRelease.slug}`} className="block">
              <AlbumSleeve
                release={coverRelease}
                size="lg"
                isPlaying={
                  activeTrack?.releaseId === coverRelease.id && activeTrack.isPlaying
                }
                onTogglePlay={() => triggerReleasePlay(coverRelease)}
              />
            </Link>
            <blockquote className="border-l-2 border-accent/70 pl-4 font-serif italic text-lg leading-snug text-muted">
              “{coverArticle.pullQuote}”
            </blockquote>
          </div>
        </section>
      ) : null}

      {/* Netlabel Catalog Shelf */}
      <section className="space-y-6 border-b border-border pb-14">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              The Netlabel Shelf
            </p>
            <h2 className="display-section mt-1 text-ink">
              Numbered Catalog Releases
            </h2>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-accent hover:underline"
          >
            Full Discography ({releases.length})
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {releases.slice(0, 5).map((rel) => {
            const playing = activeTrack?.releaseId === rel.id && activeTrack.isPlaying
            return (
              <article key={rel.id} className="group flex flex-col gap-2.5">
                <Link to={`/releases/${rel.slug}`} className="block">
                  <AlbumSleeve
                    release={rel}
                    size="sm"
                    isPlaying={playing}
                    onTogglePlay={() => triggerReleasePlay(rel)}
                  />
                </Link>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    <span>{rel.catalogNumber}</span>
                    <span>{rel.genre}</span>
                  </div>
                  <h3 className="truncate font-serif text-lg font-medium text-ink">
                    <Link
                      to={`/releases/${rel.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {rel.title}
                    </Link>
                  </h3>
                  <p className="truncate text-xs text-muted">{rel.artistName}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Editorial Dispatches — The Music Blog */}
      <section className="space-y-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Reviews · Essays · Interviews
              </p>
              <h2 className="display-section mt-1 text-ink">
                Latest from the Journal
              </h2>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <label htmlFor="journal-search" className="visually-hidden">
                Search reviews, essays, and artists
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="journal-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reviews, artists, genres…"
                className="min-h-10 w-full rounded-sm border border-border bg-bg pl-9 pr-3 text-sm text-ink placeholder:text-muted/75"
              />
            </div>
          </div>

          {/* Editorial Column Filter Tabs */}
          <div
            className="flex flex-wrap gap-2 border-y border-border py-3"
            role="group"
            aria-label="Filter journal by column"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-9 rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                    active
                      ? 'bg-ink text-bg font-medium'
                      : 'text-muted hover:bg-surface hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {dispatches.length === 0 ? (
          <div className="rounded-sm border border-border bg-surface/40 px-6 py-14 text-center space-y-3">
            <p className="font-serif text-2xl text-ink">
              No dispatches match that filter yet.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSelectedCategory('All')
                setQuery('')
              }}
            >
              Show All Dispatches
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {dispatches.map((article, index) => {
              const release = getReleaseById(article.releaseId)
              const isPlaying =
                Boolean(release) &&
                activeTrack?.releaseId === release?.id &&
                Boolean(activeTrack?.isPlaying)

              return (
                <article
                  key={article.id}
                  className={`flex flex-col justify-between gap-5 rounded-sm border border-border bg-surface-elevated p-6 transition-colors hover:border-accent/60 ${
                    index === 0 && selectedCategory === 'All' && !query
                      ? 'md:col-span-2 md:grid md:grid-cols-12 md:items-center md:gap-8'
                      : ''
                  }`}
                >
                  {release ? (
                    <div
                      className={
                        index === 0 && selectedCategory === 'All' && !query
                          ? 'md:col-span-4'
                          : 'grid grid-cols-12 items-center gap-4'
                      }
                    >
                      <div
                        className={
                          index === 0 && selectedCategory === 'All' && !query
                            ? ''
                            : 'col-span-4'
                        }
                      >
                        <Link to={`/releases/${release.slug}`} className="block">
                          <AlbumSleeve
                            release={release}
                            size="sm"
                            isPlaying={isPlaying}
                            onTogglePlay={() => triggerReleasePlay(release)}
                          />
                        </Link>
                      </div>

                      {!(index === 0 && selectedCategory === 'All' && !query) ? (
                        <div className="col-span-8 space-y-1">
                          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                            <span>{article.category}</span>
                            {article.rating ? (
                              <Badge variant="accent" className="font-mono text-[10px]">
                                {article.rating}
                              </Badge>
                            ) : null}
                          </div>
                          <p className="font-mono text-[11px] text-muted">
                            {release.catalogNumber} · {release.artistName}
                          </p>
                          <p className="font-mono text-[11px] text-muted">
                            {article.publishedAt} · {article.readingTime}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  <div
                    className={`flex flex-col justify-between gap-4 ${
                      index === 0 && selectedCategory === 'All' && !query
                        ? 'md:col-span-8'
                        : ''
                    }`}
                  >
                    <div className="space-y-2.5">
                      {index === 0 && selectedCategory === 'All' && !query ? (
                        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                          <span>{article.category}</span>
                          {article.rating ? (
                            <Badge variant="accent" className="font-mono">
                              {article.rating}
                            </Badge>
                          ) : null}
                          <span className="text-muted">· {article.publishedAt}</span>
                        </div>
                      ) : null}

                      <h3 className="font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl">
                        <Link
                          to={`/journal/${article.slug}`}
                          className="hover:text-accent transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>

                      <p className="font-editorial text-base leading-relaxed text-muted">
                        {article.dek}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-4">
                      <span className="font-mono text-[11px] text-muted">
                        By {article.author}
                      </span>
                      <div className="flex items-center gap-4">
                        {release ? (
                          <button
                            type="button"
                            onClick={() => triggerReleasePlay(release)}
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink cursor-pointer"
                          >
                            {isPlaying ? (
                              <Pause className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                            ) : (
                              <Play className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                            )}
                            {isPlaying ? 'Pause' : 'Listen'}
                          </button>
                        ) : null}
                        <Link
                          to={`/journal/${article.slug}`}
                          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:underline"
                        >
                          Read Dispatch
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* Netlabel Demo Callout */}
      <section className="grid grid-cols-1 gap-6 rounded-sm border border-border bg-surface p-8 sm:p-10 md:grid-cols-12 md:items-center">
        <div className="space-y-2 md:col-span-8">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            <Disc3 className="h-3.5 w-3.5" aria-hidden="true" />
            Open Submissions · Netlabel &amp; Journal
          </div>
          <h2 className="font-serif text-3xl font-medium text-ink">
            Making honest, craft-driven Christian music? Send us the tape.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            Whether it’s an acoustic EP, jazz-gospel live session, solo strings, or
            an ambient hymn—we curate records with substance and share them with
            listeners searching for beauty and God.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <Button asChild variant="accent" size="lg">
            <Link to="/submit">Submit a Record</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/manifesto">Our Ethos</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
