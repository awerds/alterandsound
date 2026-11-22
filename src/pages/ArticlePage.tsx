import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, Check, Flame, Share2, Sparkles } from 'lucide-react'
import { ArtistLinksCard } from '@/components/ArtistLinksCard'
import { EmbeddedTrackCard } from '@/components/EmbeddedTrackCard'
import { SacredHeartEmblem } from '@/components/SacredHeartEmblem'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { getArticleBySlug, articles } = useStore()
  const article = slug ? getArticleBySlug(slug) : undefined
  const [copied, setCopied] = useState(false)

  usePageTitle(article ? `${article.artistName} — ${article.title}` : 'Article Not Found')

  if (!article) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center space-y-4">
        <h1 id="main-content" tabIndex={-1} className="font-serif text-4xl text-ink">
          Feature not found
        </h1>
        <Button asChild variant="outline">
          <Link to="/journal">Return to Journal</Link>
        </Button>
      </div>
    )
  }

  const leadTrack = article.featuredTracks[0]
  const moreArticles = articles.filter((a) => a.id !== article.id).slice(0, 3)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <article className="w-full space-y-12">
      <div>
        <Link
          to="/journal"
          className="inline-flex min-h-10 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Journal
        </Link>
      </div>

      {/* Full-Width Balanced Magazine Hero Banner with Embedded Lead Video */}
      <header className="prism-card relative w-full rounded-3xl p-6 sm:p-10 lg:p-12 xl:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-[26rem] w-[26rem] rounded-full blur-[95px] opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(251,191,36,0.85) 0%, rgba(244,63,94,0.45) 52%, transparent 74%)',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="space-y-5 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              <span className="inline-flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                {article.issueNumber} · {article.category}
              </span>
              {article.rating ? (
                <Badge variant="accent" className="font-mono">
                  {article.rating}
                </Badge>
              ) : null}
              <Badge variant="default" className="font-mono">
                {article.artistName} · {article.artistOrigin}
              </Badge>
            </div>

            <h1
              id="main-content"
              tabIndex={-1}
              className="display-cover font-medium text-ink focus:outline-none"
            >
              {article.title}
            </h1>

            <p className="max-w-2xl font-editorial text-lg leading-relaxed text-muted sm:text-xl">
              {article.dek}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                <span className="font-medium text-ink">{article.author}</span>
                <span aria-hidden="true">·</span>
                <span>{article.authorRole}</span>
                <span aria-hidden="true">·</span>
                <span>{article.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                      Link Copied
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Share Feature
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {leadTrack ? (
            <div className="lg:col-span-5">
              <EmbeddedTrackCard
                track={leadTrack}
                artistName={article.artistName}
                featured
                showNotes={false}
              />
            </div>
          ) : null}
        </div>
      </header>

      {/* Full-Width Editorial Spread + Sticky Artist Promotion Sidebar */}
      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-8 lg:col-span-8">

          <div className="editorial-prose space-y-6 text-ink/92">
            {article.paragraphs.map((para, idx) => (
              <div key={idx} className="space-y-6">
                <p className={idx === 0 ? 'editorial-dropcap' : ''}>{para}</p>
                {idx === 1 ? (
                  <blockquote className="my-8 rounded-2xl border border-border bg-surface-elevated/88 px-6 py-6 font-serif italic text-2xl leading-snug text-ink sm:text-3xl">
                    “{article.pullQuote}”
                  </blockquote>
                ) : null}
              </div>
            ))}
          </div>

          {/* Editorial Verdict Box */}
          <section className="prism-card max-w-[65ch] rounded-2xl p-6 space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Altar &amp; Sound Editorial Verdict
            </p>
            <p className="font-serif text-xl leading-relaxed text-ink">
              {article.verdict}
            </p>
          </section>

          {article.scriptureRef ? (
            <blockquote className="prism-card max-w-[65ch] rounded-2xl p-6 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Love &amp; Light Scripture Anchor · {article.scriptureRef}
              </div>
              {article.scriptureExcerpt ? (
                <p className="font-serif italic text-xl leading-relaxed text-ink">
                  “{article.scriptureExcerpt}”
                </p>
              ) : null}
            </blockquote>
          ) : null}

          <div className="flex flex-wrap gap-2 border-t border-border pt-6">
            {article.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Sticky Artist Promotion & Streaming Links Dossier */}
        <aside className="space-y-6 lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <ArtistLinksCard
              artistName={article.artistName}
              artistOrigin={article.artistOrigin}
              genre={article.genre}
              outlets={article.outlets}
              forFansOf={article.forFansOf}
            />

            <div className="prism-card space-y-3 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <SacredHeartEmblem variant="icon" className="h-10 w-10 shrink-0" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Are You an Artist?
                  </p>
                  <p className="font-serif text-xl text-ink">
                    Get Featured on Altar &amp; Sound
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                We spotlight Christian musicians with in-depth reviews, embedded
                music players, and direct links to all your streaming channels—free
                of charge.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/submit">Submit Your Music</Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-surface/80 p-5 space-y-1.5 backdrop-blur-md">
              <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Moved by these songs?
              </p>
              <p className="text-xs leading-relaxed text-muted">
                Read a calm, honest introduction to the love and light of Jesus.{' '}
                <Link
                  to="/#for-seekers"
                  className="text-ink underline decoration-accent underline-offset-4 hover:text-accent"
                >
                  Explore Faith →
                </Link>
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Full Track-by-Track Playable Listening Guide */}
      {article.featuredTracks.length > 1 ? (
        <section className="w-full space-y-6 border-t border-border pt-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Track-by-Track Listening Guide
            </p>
            <h2 className="display-section mt-1 text-ink">
              Essential {article.artistName} Songs to Play &amp; Share
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {article.featuredTracks.map((track) => (
              <EmbeddedTrackCard
                key={track.id}
                track={track}
                artistName={article.artistName}
              />
            ))}
          </div>
        </section>
      ) : null}

      {moreArticles.length > 0 ? (
        <section className="w-full space-y-5 border-t border-border pt-10">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            More from the Journal
          </h2>
          <div className="journal-auto-grid">
            {moreArticles.map((item) => (
              <Link
                key={item.id}
                to={`/journal/${item.slug}`}
                className="prism-card group rounded-2xl p-6 space-y-2 transition-transform hover:-translate-y-1"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {item.category} · {item.readingTime}
                </p>
                <h3 className="font-serif text-2xl font-medium text-ink group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted">{item.dek}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
