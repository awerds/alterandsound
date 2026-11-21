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

  const related = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 2)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <article className="space-y-12">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Journal
        </Link>
      </div>

      {/* Magazine Article Header */}
      <header className="mx-auto max-w-4xl space-y-5 border-b border-border pb-10 text-start">
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
          className="display-cover font-medium text-ink focus:outline-none"
        >
          {article.title}
        </h1>

        <p className="max-w-3xl font-editorial text-xl leading-relaxed text-muted">
          {article.dek}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
            <span className="font-medium text-ink">{article.author}</span>
            <span aria-hidden="true">·</span>
            <span>{article.authorRole}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>

          <div className="flex items-center gap-2">
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

      {/* Two-Column Editorial Spread */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Main Reading Column */}
        <div className="space-y-8 lg:col-span-8">
          {release ? <ReleasePlayer release={release} /> : null}

          <div className="editorial-prose space-y-6 text-ink/92">
            {article.paragraphs.map((para, idx) => (
              <div key={idx} className="space-y-6">
                <p className={idx === 0 ? 'editorial-dropcap' : ''}>{para}</p>
                {idx === 1 ? (
                  <blockquote className="my-8 border-y border-border py-6 font-serif italic text-2xl leading-snug text-ink sm:text-3xl">
                    “{article.pullQuote}”
                  </blockquote>
                ) : null}
              </div>
            ))}
          </div>

          {article.scriptureRef ? (
            <blockquote className="rounded-sm border border-border bg-surface p-6 space-y-2">
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
            <div className="prism-card sticky top-24 space-y-5 rounded-2xl p-5">
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
                <Link to={`/releases/${release.slug}`}>
                  Open Full Liner Notes
                </Link>
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
      <section className="mx-auto max-w-5xl space-y-5 border-t border-border pt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Continue Reading
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {related.map((item) => (
            <Link
              key={item.id}
              to={`/journal/${item.slug}`}
              className="group rounded-sm border border-border bg-surface-elevated p-5 space-y-2 hover:border-accent/60 transition-colors"
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
