import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Check, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EncourageDialog } from '@/components/EncourageDialog'
import { MediaPlayer } from '@/components/MediaPlayer'
import type { MusicianProfile, ShowcaseWork } from '@/types/domain'

interface WorkCardProps {
  work: ShowcaseWork
  artist: MusicianProfile
}

export function WorkCard({ work, artist }: WorkCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyShare = async () => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const shareUrl = `${window.location.origin}${base}/story/${work.slug}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: navigate directly if clipboard blocked
    }
  }

  return (
    <article className="flex flex-col justify-between rounded-sm border border-border bg-surface-elevated p-5 transition-colors hover:border-accent/50">
      <div className="flex flex-col gap-4">
        <MediaPlayer work={work} artistName={artist.displayName} compact />

        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <Link
              to={`/artists/${artist.handle}`}
              className="font-medium text-ink hover:text-accent transition-colors"
            >
              {artist.displayName}
            </Link>
            <span aria-hidden="true">·</span>
            <span>{artist.location}</span>
            <span aria-hidden="true">·</span>
            <span>{work.genre}</span>
          </div>

          <h3 className="font-serif text-2xl font-medium leading-snug text-ink">
            <Link
              to={`/story/${work.slug}`}
              className="hover:text-accent transition-colors"
            >
              {work.title}
            </Link>
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {work.story}
          </p>
        </div>

        {work.scriptureRef ? (
          <div className="flex items-start gap-2 border-l-2 border-accent/60 pl-3 text-xs text-muted">
            <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
            <span>
              <strong className="font-medium text-ink">{work.scriptureRef}</strong>
              {work.scriptureExcerpt ? ` — “${work.scriptureExcerpt}”` : ''}
            </span>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-1.5">
          {work.skillsUsed.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="default">
              {skill}
            </Badge>
          ))}
          {work.themes.slice(0, 2).map((theme) => (
            <Badge key={theme} variant="accent">
              {theme}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <EncourageDialog
            recipientId={artist.id}
            recipientName={artist.displayName}
            workId={work.id}
            workTitle={work.title}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCopyShare}
            aria-label={`Copy share link for ${work.title}`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                Copied
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                Share
              </>
            )}
          </Button>
        </div>

        <Link
          to={`/story/${work.slug}`}
          className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.12em] text-accent hover:underline"
        >
          Read Story
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
