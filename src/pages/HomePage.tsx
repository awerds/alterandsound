import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Disc3,
  Pause,
  Play,
  Search,
  Sparkles,
} from 'lucide-react'
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
  usePageTitle('Luminous Christian Netlabel & Music Journal')
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
    <div className="flex w-full flex-col gap-12 sm:gap-16">
      {/* Full-Width Luminous Cover Stage */}
      {coverArticle && coverRelease ? (
        <section className="prism-card relative w-full rounded-3xl p-5 sm:p-8 lg:p-12 xl:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-[28rem] w-[28rem] rounded-full blur-[95px] opacity-60"
            style={{
              background:
                'radial-gradient(circle, rgba(255,204,92,0.85) 0%, rgba(244,114,182,0.5) 52%, transparent 74%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-[24rem] w-[28rem] rounded-full blur-[95px] opacity-50"
            style={{
              background:
                'radial-gradient(circle, rgba(125,211,252,0.7) 0%, rgba(196,181,253,0.45) 55%, transparent 75%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-7 xl:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="accent"
                  className="font-mono text-[10px] uppercase tracking-[0.16em]"
                >
                  <Sparkles className="h-3 w-3 text-accent" aria-hidden="true" />
                  Cover Feature · {coverArticle.issueNumber}
                </Badge>
                <Badge
                  variant="default"
                  className="font-mono text-[10px] uppercase tracking-[0.16em]"
                >
                  {coverRelease.catalogNumber}
                </Badge>
              </div>

              <h1
                id="main-content"
                tabIndex={-1}
                className="display-cover font-medium text-ink focus:outline-none"
              >
                <Link to={`/journal/${coverArticle.slug}`}>
                  Sound That{' '}
                  <span className="prism-text italic">Shimmers</span>: Why Sacred
                  Music Belongs in Full Color
                </Link>
              </h1>

              <p className="max-w-2xl font-editorial text-base leading-relaxed text-muted sm:text-xl">
                {coverArticle.dek}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                <span className="font-medium text-ink">By {coverArticle.author}</span>
                <span aria-hidden="true">·</span>
                <span>{coverArticle.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{coverArticle.readingTime}</span>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
                  <Link to={`/journal/${coverArticle.slug}`}>
                    Read Cover Feature
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => triggerReleasePlay(coverRelease)}
                >
                  {activeTrack?.releaseId === coverRelease.id && activeTrack.isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 fill-current text-accent" aria-hidden="true" />
                      Pause {coverRelease.catalogNumber}
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-current text-accent" aria-hidden="true" />
                      Listen to {coverRelease.catalogNumber}
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:col-span-5 xl:col-span-5">
              <Link
                to={`/releases/${coverRelease.slug}`}
                className="mx-auto block w-full max-w-md lg:max-w-none"
              >
                <AlbumSleeve
                  release={coverRelease}
                  size="lg"
                  showVinyl
                  isPlaying={
                    activeTrack?.releaseId === coverRelease.id &&
                    Boolean(activeTrack?.isPlaying)
                  }
                  onTogglePlay={() => triggerReleasePlay(coverRelease)}
                />
              </Link>
              <blockquote className="rounded-2xl border border-border bg-surface-elevated/85 px-5 py-4 font-serif italic text-lg leading-snug text-ink/90 backdrop-blur-md">
                “{coverArticle.pullQuote}”
              </blockquote>
            </div>
          </div>
        </section>
      ) : null}

      {/* Full-Width Netlabel Shelf (Swipeable Snap Row on Mobile, 5-Col Showcase on Desktop) */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              The Netlabel Catalog
            </p>
            <h2 className="display-section mt-1 text-ink">
              Collector Editions &amp;{' '}
              <span className="prism-text italic">New Pressings</span>
            </h2>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:border-accent/60 transition-colors"
          >
            All Releases ({releases.length})
            <ArrowUpRight className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile: Horizontal Touch-Snap Vinyl Rack | Desktop: Full-Width 5-Col Grid */}
        <div className="mobile-snap-row md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:grid-cols-5">
          {releases.slice(0, 5).map((rel) => {
            const playing =
              activeTrack?.releaseId === rel.id && Boolean(activeTrack?.isPlaying)
            return (
              <article
                key={rel.id}
                className="group flex w-[68vw] max-w-[240px] shrink-0 snap-start flex-col gap-3 md:w-auto md:max-w-none md:shrink"
              >
                <Link
                  to={`/releases/${rel.slug}`}
                  className="block transition-transform duration-300 group-hover:-translate-y-1.5"
                >
                  <AlbumSleeve
                    release={rel}
                    size="sm"
                    isPlaying={playing}
                    onTogglePlay={() => triggerReleasePlay(rel)}
                  />
                </Link>
                <div className="space-y-0.5 px-1">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    <span className="text-accent">{rel.catalogNumber}</span>
                    <span className="truncate">{rel.genre}</span>
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

      <hr className="prism-rule" />

      {/* Full-Width Editorial Dispatches — Flagship Music Blog */}
      <section className="space-y-7">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Criticism · Conversations · Guides
              </p>
              <h2 className="display-section mt-1 text-ink">
                Latest from the{' '}
                <span className="prism-text italic">Journal</span>
              </h2>
            </div>
            <div className="relative w-full sm:max-w-sm">
              <label htmlFor="journal-search" className="visually-hidden">
                Search reviews, essays, and artists
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="journal-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reviews, artists, genres…"
                className="min-h-11 w-full rounded-full border border-border bg-surface-elevated pl-10 pr-4 text-sm text-ink placeholder:text-muted/75 backdrop-blur-md"
              />
            </div>
          </div>

          {/* Mobile Horizontal Swipeable Pills | Desktop Balanced Wrap */}
          <div
            className="mobile-snap-row sm:pill-row sm:overflow-visible"
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
                  className={`min-h-10 shrink-0 snap-start rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all cursor-pointer ${
                    active
                      ? 'border-transparent bg-gradient-to-r from-amber-500 via-pink-600 to-violet-600 text-white font-medium shadow-md'
                      : 'border-border bg-surface-elevated/85 text-muted hover:text-ink hover:border-accent/40'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {dispatches.length === 0 ? (
          <div className="prism-card rounded-2xl px-6 py-14 text-center space-y-3">
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
          <div className="journal-auto-grid">
            {dispatches.map((article) => {
              const release = getReleaseById(article.releaseId)
              const isPlaying =
                Boolean(release) &&
                activeTrack?.releaseId === release?.id &&
                Boolean(activeTrack?.isPlaying)

              return (
                <article
                  key={article.id}
                  className="prism-card flex flex-col justify-between gap-5 rounded-2xl p-5 transition-transform hover:-translate-y-1 sm:p-6"
                >
                  <div className="space-y-4">
                    {release ? (
                      <div className="grid grid-cols-12 items-center gap-4">
                        <div className="col-span-5">
                          <Link to={`/releases/${release.slug}`} className="block">
                            <AlbumSleeve
                              release={release}
                              size="sm"
                              isPlaying={isPlaying}
                              onTogglePlay={() => triggerReleasePlay(release)}
                            />
                          </Link>
                        </div>

                        <div className="col-span-7 space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-accent">
                              {article.category}
                            </span>
                            {article.rating ? (
                              <Badge variant="accent" className="font-mono text-[10px]">
                                {article.rating}
                              </Badge>
                            ) : null}
                          </div>
                          <p className="truncate font-mono text-[11px] font-medium text-ink">
                            {release.catalogNumber}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {release.artistName}
                          </p>
                          <p className="font-mono text-[10px] text-muted">
                            {article.readingTime}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-medium leading-snug text-ink">
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
                          aria-label={
                            isPlaying
                              ? `Pause ${release.title}`
                              : `Listen to ${release.title}`
                          }
                          className="inline-flex min-h-9 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink cursor-pointer"
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
                        className="inline-flex min-h-9 items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent hover:underline"
                      >
                        Read
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* Radiant Sunlit Opalescent Pitch Banner (Full Width, Bright & Luminous) */}
      <section
        className="relative w-full overflow-hidden rounded-3xl border border-white/80 p-7 text-[#161124] shadow-xl sm:p-10 lg:p-14"
        style={{
          background:
            'linear-gradient(122deg, #fff3c4 0%, #ffd8ea 38%, #e2d9ff 70%, #cbf5ff 100%)',
        }}
      >
        <div aria-hidden="true" className="shimmer-sweep-layer" />
        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
          <div className="space-y-3 md:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/25 bg-white/75 px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#6d28d9] backdrop-blur-md">
              <Disc3 className="h-3.5 w-3.5" aria-hidden="true" />
              Open Submissions · Netlabel &amp; Journal
            </div>
            <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Making radiant, honest Christian music? Send us the tape.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[#3b3352] sm:text-base">
              Whether it’s an acoustic EP, gospel-jazz session, solo cello, or
              shimmering ambient hymns—we curate records filled with light and share
              them with the world.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:col-span-4 md:justify-end">
            <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
              <Link to="/submit">Submit a Record</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-[#161124]/25 bg-white/80 text-[#161124] hover:bg-white sm:w-auto"
            >
              <Link to="/manifesto">Our Manifesto</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
