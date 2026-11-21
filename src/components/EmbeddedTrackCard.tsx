import { useState } from 'react'
import { BookOpen, ExternalLink, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getProviderLabel } from '@/lib/embed'
import type { FeaturedTrack } from '@/types/domain'
import { cn } from '@/lib/utils'

interface EmbeddedTrackCardProps {
  track: FeaturedTrack
  artistName: string
  featured?: boolean
  showNotes?: boolean
}

export function EmbeddedTrackCard({
  track,
  artistName,
  featured = false,
  showNotes = true,
}: EmbeddedTrackCardProps) {
  const [loaded, setLoaded] = useState(false)

  const embedSrc =
    track.provider === 'youtube'
      ? `${track.embedUrl}${track.embedUrl.includes('?') ? '&' : '?'}autoplay=1`
      : track.embedUrl

  const frameClass =
    track.provider === 'spotify'
      ? 'h-[152px]'
      : track.provider === 'soundcloud'
        ? 'h-[166px]'
        : 'aspect-video'

  return (
    <article
      className={cn(
        'prism-card flex flex-col justify-between overflow-hidden rounded-2xl',
        featured ? 'p-4 sm:p-5' : 'p-4'
      )}
    >
      <div className="space-y-4">
        {/* Media Frame / Click-to-Load Facade */}
        {track.provider === 'bandcamp' ? (
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-amber-200/70 bg-gradient-to-br from-amber-500 via-rose-600 to-rose-800 p-5 text-white">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-100">
              Bandcamp Feature
            </span>
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="font-serif text-2xl">{track.title}</p>
                <p className="text-xs text-white/85">{artistName}</p>
              </div>
              <a
                href={track.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1a1019] hover:bg-amber-50"
              >
                Listen
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : loaded ? (
          <div className="overflow-hidden rounded-xl border border-border bg-black shadow-lg">
            <iframe
              src={embedSrc}
              title={`${track.title} by ${artistName} on ${getProviderLabel(track.provider)}`}
              className={cn('w-full border-0', frameClass)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/40 bg-gradient-to-br from-amber-500 via-rose-600 to-rose-900 text-white shadow-md">
            {track.thumbnailUrl ? (
              <img
                src={track.thumbnailUrl}
                alt={`${track.title} by ${artistName}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/25 to-black/20"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full border border-white/35 bg-black/45 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-amber-200 backdrop-blur-md">
                  {getProviderLabel(track.provider)}
                </span>
                {track.tractionLabel ? (
                  <span className="rounded-full border border-white/30 bg-black/45 px-2.5 py-0.5 font-mono text-[10px] text-white backdrop-blur-md">
                    {track.tractionLabel}
                  </span>
                ) : null}
              </div>

              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0 drop-shadow-sm">
                  <p className="truncate font-serif text-xl font-medium leading-tight sm:text-2xl">
                    {track.title}
                  </p>
                  <p className="truncate text-xs text-white/85">
                    {artistName} · {track.releaseDate}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setLoaded(true)}
                  aria-label={`Play ${track.title} by ${artistName}`}
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br from-amber-400 via-rose-500 to-rose-600 text-white shadow-xl transition-transform hover:scale-108 cursor-pointer"
                >
                  <Play className="h-5 w-5 translate-x-0.5 fill-current" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}

        {showNotes ? (
          <div className="space-y-3 px-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif text-2xl font-medium text-ink">
                {track.title}
              </h3>
              <a
                href={track.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent hover:underline"
              >
                Watch on {getProviderLabel(track.provider)}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>

            <p className="text-sm leading-relaxed text-muted">{track.reviewNote}</p>

            {track.scriptureRef ? (
              <div className="flex items-start gap-2 rounded-xl border border-border bg-surface/75 px-3.5 py-2.5 text-xs text-muted">
                <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <strong className="font-medium text-ink">{track.scriptureRef}</strong>
                  {track.scriptureExcerpt ? ` — “${track.scriptureExcerpt}”` : ''}
                </span>
              </div>
            ) : null}

            {track.tractionLabel ? (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <Badge variant="accent" className="font-mono text-[10px]">
                  {track.tractionLabel}
                </Badge>
                <Badge variant="default" className="font-mono text-[10px]">
                  {track.releaseDate}
                </Badge>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}
