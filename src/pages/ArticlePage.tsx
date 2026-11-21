import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, Check, Share2, Sparkles } from 'lucide-react'
import { AlbumSleeve } from '@/components/AlbumSleeve'
import { EncourageDialog } from '@/components/EncourageDialog'
import { ReleasePlayer } from '@/components/ReleasePlayer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { getArticleBySlug, getReleaseById, articles } = useStore()
  const article = slug ? getArticleBySlug(slug) : undefined
  const release = article ? getReleaseById(article.releaseId) : undefined
  const [copied, setCopied] = useState(false)

  usePageTitle(article ? article.title : 'Article Not Found')

  if (!article) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center space-y-4">
        <h1 id="main-content" tabIndex={-1} className="font-serif text-4xl text-ink">
          Dispatch not found
        </h1>
        <Button asChild variant="outline">
          <Link to="/">Return to Journal</Link>
        </Button>
      </div>
    )
  }

  const related = articles.filter((a) => a.id !== article.id).slice(0, 3)

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
          to="/"
          className="inline-flex min-h-10 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Journal
        </Link>
      </div>

      {/* Full-Width Magazine Header */}
      <header className="prism-card w-full space-y-5 rounded-3xl p-6 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-accent">
          <span>{article.issueNumber}</span>
          <span aria-hidden="true">·</span>
          <span>{article.category}</span>
          {article.rating ? (
            <Badge variant="accent" className="font-mono">
              Score / Pick: {article.rating}
            </Badge>
          ) : null}
        </div>

        <h1
          id="main-content"
          tabIndex={-1}
          className="display-cover max-w-5xl font-medium text-ink focus:outline-none"
        >
          {article.title}
        </h1>

        <p className="max-w-3xl font-editorial text-lg leading-relaxed text-muted sm:text-xl">
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
            <EncourageDialog
              recipientName={release ? release.artistName : article.author}
              contextTitle={article.title}
              triggerLabel="Send Prayer / Note"
            />
            <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                  Link Copied
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Share Piece
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Full-Width Two-Column Editorial Spread */}
      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-8 lg:col-span-8">
          {release ? <ReleasePlayer release={release} /> : null}

          <div className="editorial-prose space-y-6 text-ink/92">
            {article.paragraphs.map((para, idx) => (
              <div key={idx} className="space-y-6">
                <p className={idx === 0 ? 'editorial-dropcap' : ''}>{para}</p>
                {idx === 1 ? (
                  <blockquote className="my-8 rounded-2xl border border-border bg-surface-elevated/85 px-6 py-6 font-serif italic text-2xl leading-snug text-ink sm:text-3xl">
                    “{article.pullQuote}”
                  </blockquote>
                ) : null}
              </div>
            ))}
          </div>

          {article.scriptureRef ? (
            <blockquote className="prism-card rounded-2xl p-6 space-y-2 max-w-[65ch]">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Liner Scripture · {article.scriptureRef}
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

        {/* Sticky Record Dossier Sidebar */}
        <aside className="space-y-6 lg:col-span-4">
          {release ? (
            <div className="prism-card sticky top-24 space-y-5 rounded-2xl p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Featured Record · {release.catalogNumber}
              </p>

              <Link to={`/releases/${release.slug}`} className="block">
                <AlbumSleeve release={release} size="sm" />
              </Link>

              <div className="space-y-1">
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
                <p className="font-mono text-xs text-muted">
                  {release.format} · {release.releaseDate}
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Credits
                </p>
                <ul className="space-y-1 text-xs leading-relaxed text-muted">
                  {release.credits.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link to={`/releases/${release.slug}`}>Open Full Liner Notes</Link>
              </Button>

              <div className="border-t border-border pt-4 space-y-1.5">
                <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Curious about faith?
                </p>
                <p className="text-xs leading-relaxed text-muted">
                  New to the stories behind these songs?{' '}
                  <Link
                    to="/manifesto#for-seekers"
                    className="text-ink underline decoration-accent underline-offset-4 hover:text-accent"
                  >
                    Read our quiet guide →
                  </Link>
                </p>
              </div>
            </div>
          ) : null}
        </aside>
      </div>

      {/* Continue Reading */}
      <section className="w-full space-y-5 border-t border-border pt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Continue Reading
        </h2>
        <div className="journal-auto-grid">
          {related.map((item) => (
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
    </article>
  )
}
