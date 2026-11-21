import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Flame,
  Music2,
  Search,
} from 'lucide-react'
import { ArtistLinksCard } from '@/components/ArtistLinksCard'
import { EmbeddedTrackCard } from '@/components/EmbeddedTrackCard'
import { EncourageDialog } from '@/components/EncourageDialog'
import { SacredHeartEmblem } from '@/components/SacredHeartEmblem'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import type { ArticleCategory } from '@/types/domain'

const CATEGORIES: Array<'All' | ArticleCategory> = [
  'All',
  'Artist Spotlight',
  'Album Review',
  'Essay',
  'Artist Interview',
  'Listening Guide',
]

export function HomePage() {
  usePageTitle('Love & Light · Christian Music Journal')
  const { articles } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<'All' | ArticleCategory>('All')
  const [query, setQuery] = useState('')

  const coverArticle = useMemo(
    () => articles.find((a) => a.coverStory) ?? articles[0],
    [articles]
  )
  const leadTrack = coverArticle?.featuredTracks[0]

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((art) => {
      if (selectedCategory !== 'All' && art.category !== selectedCategory) {
        return false
      }
      if (!q) return true
      return [
        art.title,
        art.dek,
        art.artistName,
        art.genre,
        art.category,
        ...art.tags,
        ...art.forFansOf,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [articles, selectedCategory, query])

  return (
    <div className="flex w-full flex-col gap-12 sm:gap-16">
      {/* Flagship Cover Feature Stage */}
      {coverArticle ? (
        <section className="prism-card relative w-full rounded-3xl p-5 sm:p-8 lg:p-12 xl:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-[28rem] w-[28rem] rounded-full blur-[95px] opacity-65"
            style={{
              background:
                'radial-gradient(circle, rgba(251,191,36,0.85) 0%, rgba(244,63,94,0.48) 52%, transparent 74%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-[24rem] w-[28rem] rounded-full blur-[95px] opacity-50"
            style={{
              background:
                'radial-gradient(circle, rgba(253,186,116,0.72) 0%, rgba(125,211,252,0.46) 55%, transparent 75%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-6 xl:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="accent"
                  className="font-mono text-[10px] uppercase tracking-[0.16em]"
                >
                  <Flame className="h-3 w-3 text-accent" aria-hidden="true" />
                  {coverArticle.category} · {coverArticle.issueNumber}
                </Badge>
                {coverArticle.rating ? (
                  <Badge
                    variant="default"
                    className="font-mono text-[10px] uppercase tracking-[0.16em]"
                  >
                    {coverArticle.rating}
                  </Badge>
                ) : null}
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] uppercase tracking-[0.14em]"
                >
                  {coverArticle.artistOrigin}
                </Badge>
              </div>

              <h1
                id="main-content"
                tabIndex={-1}
                className="display-cover font-medium text-ink focus:outline-none"
              >
                <Link
                  to={`/journal/${coverArticle.slug}`}
                  className="hover:opacity-90 transition-opacity"
                >
                  {coverArticle.title}
                </Link>
              </h1>

              <p className="max-w-2xl font-editorial text-base leading-relaxed text-muted sm:text-xl">
                {coverArticle.dek}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                <span className="font-medium text-ink">{coverArticle.author}</span>
                <span aria-hidden="true">·</span>
                <span>{coverArticle.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{coverArticle.readingTime}</span>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
                  <Link to={`/journal/${coverArticle.slug}`}>
                    Read Full Artist Spotlight
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <EncourageDialog
                  recipientName={coverArticle.artistName}
                  contextTitle={coverArticle.title}
                  triggerLabel={`Pray for ${coverArticle.artistName}`}
                  triggerVariant="outline"
                  triggerSize="lg"
                />
              </div>

              {/* Direct Artist Promotion Strip right on the Front Page */}
              <div className="space-y-2 border-t border-border/80 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Stream &amp; Follow {coverArticle.artistName}
                </p>
                <ArtistLinksCard
                  artistName={coverArticle.artistName}
                  artistOrigin={coverArticle.artistOrigin}
                  genre={coverArticle.genre}
                  outlets={coverArticle.outlets}
                  compact
                />
              </div>
            </div>

            {/* Right Column: Live Playable Lead YouTube Video + Editorial Pull Quote */}
            <div className="flex flex-col gap-5 lg:col-span-6 xl:col-span-5">
              {leadTrack ? (
                <EmbeddedTrackCard
                  track={leadTrack}
                  artistName={coverArticle.artistName}
                  featured
                  showNotes={false}
                />
              ) : null}
              <blockquote className="rounded-2xl border border-border bg-surface-elevated/88 px-5 py-4 font-serif italic text-lg leading-snug text-ink/90 backdrop-blur-md">
                “{coverArticle.pullQuote}”
              </blockquote>
            </div>
          </div>
        </section>
      ) : null}

      {/* Standout Tracks Showcase for the Cover Artist */}
      {coverArticle && coverArticle.featuredTracks.length > 0 ? (
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Essential Listening · {coverArticle.artistName}
              </p>
              <h2 className="display-section mt-1 text-ink">
                Recent Songs Bringing{' '}
                <span className="prism-text italic">Love &amp; Light</span>
              </h2>
            </div>
            <Link
              to={`/journal/${coverArticle.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:border-accent/60 transition-colors"
            >
              Read Full Review &amp; Story
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {coverArticle.featuredTracks.map((track) => (
              <EmbeddedTrackCard
                key={track.id}
                track={track}
                artistName={coverArticle.artistName}
              />
            ))}
          </div>
        </section>
      ) : null}

      <hr className="prism-rule" />

      {/* Journal Dispatches & Reviews Archive */}
      <section className="space-y-7">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Reviews · Spotlights · Interviews
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
                placeholder="Search artists, reviews, genres…"
                className="min-h-11 w-full rounded-full border border-border bg-surface-elevated pl-10 pr-4 text-sm text-ink placeholder:text-muted/75 backdrop-blur-md"
              />
            </div>
          </div>

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
                      ? 'border-transparent bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 text-white font-medium shadow-md'
                      : 'border-border bg-surface-elevated/85 text-muted hover:text-ink hover:border-accent/40'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="prism-card rounded-2xl px-6 py-14 text-center space-y-3">
            <p className="font-serif text-2xl text-ink">
              No journal entries match that filter yet.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSelectedCategory('All')
                setQuery('')
              }}
            >
              Show All Entries
            </Button>
          </div>
        ) : (
          <div className="journal-auto-grid">
            {filteredArticles.map((article) => {
              const thumb = article.featuredTracks[0]?.thumbnailUrl
              return (
                <article
                  key={article.id}
                  className="prism-card flex flex-col justify-between gap-5 rounded-2xl p-5 transition-transform hover:-translate-y-1 sm:p-6"
                >
                  <div className="space-y-4">
                    {thumb ? (
                      <Link
                        to={`/journal/${article.slug}`}
                        className="block aspect-video w-full overflow-hidden rounded-xl border border-border"
                      >
                        <img
                          src={thumb}
                          alt={`${article.artistName} — ${article.title}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </Link>
                    ) : null}

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-accent">
                        {article.category}
                      </span>
                      {article.rating ? (
                        <Badge variant="accent" className="font-mono text-[10px]">
                          {article.rating}
                        </Badge>
                      ) : null}
                      <span className="font-mono text-[10px] text-muted">
                        · {article.readingTime}
                      </span>
                    </div>

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
                      {article.artistName} · {article.artistOrigin}
                    </span>
                    <Link
                      to={`/journal/${article.slug}`}
                      className="inline-flex min-h-9 items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent hover:underline"
                    >
                      Read Review
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* Artist Value Proposition & Submission Callout */}
      <section
        className="relative w-full overflow-hidden rounded-3xl border border-amber-200/80 p-7 text-[#1a1019] shadow-xl sm:p-10 lg:p-14"
        style={{
          background:
            'linear-gradient(122deg, #fff4cc 0%, #ffe0ea 42%, #fde8d7 74%, #e0f2fe 100%)',
        }}
      >
        <div aria-hidden="true" className="shimmer-sweep-layer" />
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="space-y-3 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-white/80 px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-rose-700 backdrop-blur-md">
              <Music2 className="h-3.5 w-3.5" aria-hidden="true" />
              For Christian Artists · Free Editorial Features
            </div>
            <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Want your music reviewed, embedded, and shared in Love &amp; Light?
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[#4b3844] sm:text-base">
              Every Altar &amp; Sound feature gives independent Christian artists
              thoughtful long-form criticism, playable YouTube &amp; streaming
              embeds, direct links to every outlet, and a shareable editorial
              page rooted in the mercy of the Sacred Heart of Jesus—100% free.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:col-span-5 lg:justify-end">
            <SacredHeartEmblem variant="icon" className="hidden h-16 w-16 shrink-0 xl:block" />
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
                <Link to="/submit">Submit Your Music</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-[#1a1019]/25 bg-white/85 text-[#1a1019] hover:bg-white sm:w-auto"
              >
                <Link to="/">Our Manifesto</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
