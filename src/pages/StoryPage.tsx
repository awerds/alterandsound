import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, Check, Share2, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EncourageDialog } from '@/components/EncourageDialog'
import { MediaPlayer } from '@/components/MediaPlayer'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'

export function StoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const { getWorkBySlug, getProfileById, profiles } = useStore()
  const work = slug ? getWorkBySlug(slug) : undefined
  const artist = work ? getProfileById(work.profileId) ?? profiles[0] : undefined
  const [copied, setCopied] = useState(false)

  usePageTitle(work ? work.title : 'Story Not Found')

  if (!work || !artist) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center space-y-4">
        <h1 id="main-content" tabIndex={-1} className="font-serif text-4xl text-ink">
          Story not found
        </h1>
        <p className="text-sm text-muted">
          This showcase link may have moved or hasn’t been published yet.
        </p>
        <Button asChild variant="outline">
          <Link to="/">Return to Showcase</Link>
        </Button>
      </div>
    )
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Showcase
        </Link>
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>{work.genre}</span>
          <span aria-hidden="true">·</span>
          <span>{work.duration}</span>
          {work.themes.map((theme) => (
            <Badge key={theme} variant="accent">
              {theme}
            </Badge>
          ))}
        </div>

        <h1
          id="main-content"
          tabIndex={-1}
          className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl focus:outline-none"
        >
          {work.title}
        </h1>

        <p className="text-sm text-muted">
          Performed by{' '}
          <Link
            to={`/artists/${artist.handle}`}
            className="font-medium text-ink underline decoration-border underline-offset-4 hover:decoration-accent"
          >
            {artist.displayName}
          </Link>{' '}
          · {artist.location}
        </p>
      </header>

      <MediaPlayer work={work} artistName={artist.displayName} />

      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-4">
        <div className="flex flex-wrap gap-1.5">
          {work.skillsUsed.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <EncourageDialog
            recipientId={artist.id}
            recipientName={artist.displayName}
            workId={work.id}
            workTitle={work.title}
            triggerVariant="accent"
          />
          <Button type="button" variant="outline" size="sm" onClick={handleCopyLink}>
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                Link Copied
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                Share Story
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Story Behind the Song */}
      <section className="space-y-4">
        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The Story Behind the Song
        </h2>
        <p className="font-serif text-2xl leading-relaxed text-ink/95">
          {work.story}
        </p>
      </section>

      {work.scriptureRef ? (
        <blockquote className="rounded-sm border border-border bg-surface px-6 py-6 space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Scripture Anchor · {work.scriptureRef}
          </div>
          {work.scriptureExcerpt ? (
            <p className="font-serif italic text-xl leading-relaxed text-ink">
              “{work.scriptureExcerpt}”
            </p>
          ) : null}
        </blockquote>
      ) : null}

      {/* Artist Mini Bio */}
      <section className="flex flex-col justify-between gap-5 rounded-sm border border-border bg-surface-elevated p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface font-serif text-lg text-accent"
          >
            {artist.initials}
          </div>
          <div>
            <p className="font-serif text-xl text-ink">{artist.displayName}</p>
            <p className="text-sm text-muted">{artist.tagline}</p>
          </div>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to={`/artists/${artist.handle}`}>View Full Folio</Link>
        </Button>
      </section>

      {/* Gentle Seeker Invitation */}
      <aside className="rounded-sm border border-accent/30 bg-accent/8 p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-accent">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Curious about the God behind this music?
        </div>
        <p className="text-sm leading-relaxed text-muted">
          You don’t need to have everything figured out to listen or ask honest
          questions. Read a quiet introduction to the hope behind these songs.
        </p>
        <div className="pt-1">
          <Link
            to="/about#for-seekers"
            className="text-sm font-medium text-ink underline decoration-accent underline-offset-4 hover:text-accent"
          >
            Explore Faith &amp; Readings →
          </Link>
        </div>
      </aside>
    </article>
  )
}
