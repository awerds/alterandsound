import { useEffect, useState } from 'react'
import { ExternalLink, Pause, Play, Volume2 } from 'lucide-react'
import {
  playOrToggleTrack,
  subscribePlayer,
  type ActiveTrackState,
} from '@/lib/audioPreview'
import { getProviderLabel } from '@/lib/embed'
import type { NetlabelRelease, TrackItem } from '@/types/domain'
import { cn } from '@/lib/utils'

interface ReleasePlayerProps {
  release: NetlabelRelease
  showAllTracks?: boolean
}

export function ReleasePlayer({
  release,
  showAllTracks = true,
}: ReleasePlayerProps) {
  const [embedActive, setEmbedActive] = useState(false)
  const [active, setActive] = useState<ActiveTrackState | null>(null)

  useEffect(() => {
    return subscribePlayer(setActive)
  }, [])

  const handleTrackPlay = (track: TrackItem) => {
    playOrToggleTrack(
      {
        trackId: track.id,
        releaseId: release.id,
        releaseSlug: release.slug,
        catalogNumber: release.catalogNumber,
        title: track.title,
        artistName: release.artistName,
        duration: track.duration,
        musicalKey: track.musicalKey,
        sleevePalette: release.sleevePalette,
      },
      track.previewChords
    )
  }

  if (release.provider !== 'studio-preview') {
    if (release.provider === 'bandcamp') {
      return (
        <div className="prism-card flex flex-col justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {release.catalogNumber} · Bandcamp Stream
            </p>
            <p className="mt-1 font-serif text-2xl text-ink">{release.title}</p>
            <p className="text-xs text-muted">{release.artistName}</p>
          </div>
          <a
            href={release.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-violet-600 px-5 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white shadow-md hover:brightness-110"
          >
            Listen on Bandcamp
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      )
    }

    if (embedActive && release.embedUrl) {
      const frameHeight =
        release.provider === 'spotify'
          ? 'h-[152px]'
          : release.provider === 'soundcloud'
            ? 'h-[166px]'
            : 'aspect-video'
      return (
        <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-xl">
          <iframe
            src={release.embedUrl}
            title={`${release.title} by ${release.artistName} on ${getProviderLabel(release.provider)}`}
            className={cn('w-full border-0', frameHeight)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )
    }

    return (
      <div className="prism-card flex flex-col justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {release.catalogNumber} · {getProviderLabel(release.provider)} Embed
          </p>
          <p className="mt-1 font-serif text-2xl text-ink">{release.title}</p>
          <p className="text-xs text-muted">
            {release.artistName} · Click to load {getProviderLabel(release.provider)} player
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEmbedActive(true)}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-violet-600 px-5 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white shadow-md hover:brightness-110 cursor-pointer"
        >
          <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          Load &amp; Listen
        </button>
      </div>
    )
  }

  const tracks = showAllTracks ? release.tracks : release.tracks.slice(0, 1)

  return (
    <div className="prism-card rounded-2xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
          Listening Room · {release.catalogNumber}
        </span>
        <span className="font-mono text-[11px] text-muted">{release.format}</span>
      </div>

      <ol className="divide-y divide-border/70">
        {tracks.map((track) => {
          const isThisPlaying =
            active?.trackId === track.id && active.isPlaying
          return (
            <li key={track.id}>
              <button
                type="button"
                onClick={() => handleTrackPlay(track)}
                aria-label={
                  isThisPlaying
                    ? `Pause ${track.title}`
                    : `Play ${track.title}`
                }
                className={cn(
                  'flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors hover:bg-surface/80 cursor-pointer',
                  isThisPlaying && 'bg-surface/90'
                )}
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <span
                    style={
                      isThisPlaying
                        ? {
                            background: `linear-gradient(135deg, ${release.sleevePalette.bg}, ${release.sleevePalette.via})`,
                          }
                        : undefined
                    }
                    className={cn(
                      'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs transition-all',
                      isThisPlaying
                        ? 'border-white/40 text-white shadow-md'
                        : 'border-border bg-bg/80 text-ink'
                    )}
                  >
                    {isThisPlaying ? (
                      <Pause className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    ) : (
                      <Play className="h-3.5 w-3.5 translate-x-0.5 fill-current" aria-hidden="true" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      <span className="mr-2 font-mono text-xs text-muted">
                        {track.number}
                      </span>
                      {track.title}
                    </p>
                    <p className="font-mono text-[11px] text-muted">
                      {track.musicalKey}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted tabular-nums">
                  {track.duration}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
