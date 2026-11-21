import { ExternalLink, Globe, Music2, PlayCircle, Radio } from 'lucide-react'
import type { ArtistOutlets } from '@/types/domain'

interface ArtistLinksCardProps {
  artistName: string
  artistOrigin: string
  genre: string
  outlets: ArtistOutlets
  forFansOf?: string[]
  compact?: boolean
}

export function ArtistLinksCard({
  artistName,
  artistOrigin,
  genre,
  outlets,
  forFansOf = [],
  compact = false,
}: ArtistLinksCardProps) {
  const links = [
    outlets.youtube
      ? { label: 'YouTube Channel', href: outlets.youtube, icon: PlayCircle, highlight: true }
      : null,
    outlets.spotify
      ? { label: 'Listen on Spotify', href: outlets.spotify, icon: Music2, highlight: false }
      : null,
    outlets.appleMusic
      ? { label: 'Apple Music', href: outlets.appleMusic, icon: Radio, highlight: false }
      : null,
    outlets.instagram
      ? { label: 'Instagram', href: outlets.instagram, icon: Globe, highlight: false }
      : null,
    outlets.tiktok
      ? { label: 'TikTok', href: outlets.tiktok, icon: Globe, highlight: false }
      : null,
    outlets.bandcamp
      ? { label: 'Bandcamp', href: outlets.bandcamp, icon: Music2, highlight: false }
      : null,
    outlets.website
      ? { label: 'Official Website', href: outlets.website, icon: Globe, highlight: false }
      : null,
  ].filter(Boolean) as Array<{
    label: string
    href: string
    icon: typeof Globe
    highlight: boolean
  }>

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {links.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3.5 py-1.5 font-mono text-[11px] text-ink hover:border-accent/60 hover:text-accent transition-colors"
          >
            <span>{item.label}</span>
            <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="prism-card space-y-5 rounded-2xl p-5 sm:p-6">
      <div className="space-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          Support &amp; Follow the Artist
        </p>
        <h2 className="font-serif text-3xl font-medium text-ink">{artistName}</h2>
        <p className="text-sm text-muted">
          {artistOrigin} · {genre}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {links.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                item.highlight
                  ? 'flex min-h-11 items-center justify-between gap-3 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 px-4 py-2.5 text-sm font-medium text-white shadow-md hover:brightness-110 transition-all'
                  : 'flex min-h-11 items-center justify-between gap-3 rounded-full border border-border bg-bg/80 px-4 py-2.5 text-sm font-medium text-ink hover:border-accent/60 hover:bg-surface transition-colors'
              }
            >
              <span className="inline-flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden="true" />
            </a>
          )
        })}
      </div>

      {forFansOf.length > 0 ? (
        <div className="space-y-2 border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            For Fans Of
          </p>
          <p className="text-xs leading-relaxed text-ink/90">
            {forFansOf.join(' · ')}
          </p>
        </div>
      ) : null}
    </div>
  )
}
