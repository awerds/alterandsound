import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, BookOpen, Check, Share2 } from 'lucide-react'
import { AlbumSleeve } from '@/components/AlbumSleeve'
import { EncourageDialog } from '@/components/EncourageDialog'
import { ReleasePlayer } from '@/components/ReleasePlayer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import {
  playOrToggleTrack,
  subscribePlayer,
  type ActiveTrackState,
} from '@/lib/audioPreview'

export function ReleasePage() {
  const { slug } = useParams<{ slug: string }>()
  const { getReleaseBySlug, getArticlesForRelease } = useStore()
  const release = slug ? getReleaseBySlug(slug) : undefined
  const [copied, setCopied] = useState(false)
  const [active, setActive] = useState<ActiveTrackState | null>(null)

  useEffect(() => {
    return subscribePlayer(setActive)
  }, [])

  usePageTitle(
    release ? `${release.title} (${release.catalogNumber})` : 'Release Not Found'
  )

  if (!release) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center space-y-4">
        <h1 id="main-content" tabIndex={-1} className="font-serif text-4xl text-ink">
          Release not found
        </h1>
        <Button asChild variant="outline">
          <Link to="/catalog">Back to Catalog</Link>
        </Button>
      </div>
    )
  }

  const relatedArticles = getArticlesForRelease(release.id)
  const isPlaying = active?.releaseId === release.id && active.isPlaying

  const handlePlayFirst = () => {
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="space-y-12">
      <div>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Catalog
        </Link>
      </div>

      {/* Record Sleeve + Tracklist Header */}
      <header className="grid grid-cols-1 gap-10 border-b border-border pb-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <AlbumSleeve
            release={release}
            size="lg"
            isPlaying={isPlaying}
            onTogglePlay={handlePlayFirst}
          />
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-accent">
              <span>{release.catalogNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-muted">{release.releaseDate}</span>
              {release.essentialPick ? (
                <Badge variant="accent">Essential Pick</Badge>
              ) : null}
            </div>

            <h1
              id="main-content"
              tabIndex={-1}
              className="display-cover font-medium text-ink focus:outline-none"
            >
              {release.title}
            </h1>

            <p className="font-editorial text-lg text-muted">
              {release.artistName} · {release.artistOrigin} · {release.genre}
            </p>
          </div>

          <ReleasePlayer release={release} />

          <div className="flex flex-wrap items-center gap-2.5">
            <EncourageDialog
              recipientName={release.artistName}
              contextTitle={`${release.title} (${release.catalogNumber})`}
              triggerLabel="Send Prayer / Note to Artist"
              triggerVariant="accent"
              triggerSize="default"
            />
            <Button type="button" variant="outline" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-success" aria-hidden="true" />
                  Link Copied
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  Share Release
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Liner Notes & Credits */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Liner Notes
            </h2>
            <p className="editorial-prose text-ink/92">{release.linerNotes}</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              The Story &amp; Faith Behind the Record
            </h2>
            <p className="editorial-prose text-ink/92">{release.faithNote}</p>
          </section>

          {release.scriptureRef ? (
            <blockquote className="rounded-sm border border-border bg-surface p-6 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Scripture Anchor · {release.scriptureRef}
              </div>
              {release.scriptureExcerpt ? (
                <p className="font-serif italic text-xl text-ink">
                  “{release.scriptureExcerpt}”
                </p>
              ) : null}
            </blockquote>
          ) : null}
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-sm border border-border bg-surface-elevated p-5 space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Edition &amp; Credits
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4 border-b border-border/70 pb-2">
                <dt className="text-muted">Catalog</dt>
                <dd className="font-mono text-ink">{release.catalogNumber}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border/70 pb-2">
                <dt className="text-muted">Format</dt>
                <dd className="text-ink">{release.format}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border/70 pb-2">
                <dt className="text-muted">Recorded</dt>
                <dd className="text-ink">{release.artistOrigin}</dd>
              </div>
            </dl>
            <ul className="space-y-1.5 text-xs leading-relaxed text-muted">
              {release.credits.map((credit) => (
                <li key={credit}>{credit}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {release.moods.map((mood) => (
                <Badge key={mood}>{mood}</Badge>
              ))}
            </div>
          </div>

          {relatedArticles.length > 0 ? (
            <div className="rounded-sm border border-border bg-surface-elevated p-5 space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                In the Journal
              </h2>
              {relatedArticles.map((art) => (
                <Link
                  key={art.id}
                  to={`/journal/${art.slug}`}
                  className="group block space-y-1"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {art.category} · {art.readingTime}
                  </p>
                  <p className="font-serif text-xl text-ink group-hover:text-accent transition-colors">
                    {art.title}
                  </p>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-accent">
                    Read Feature
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  )
}
