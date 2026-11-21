import { useEffect, useState } from 'react'
import { ExternalLink, Pause, Play, Volume2 } from 'lucide-react'
import { getProviderLabel } from '@/lib/embed'
import { subscribeAudioPreview, toggleStudioPreview } from '@/lib/audioPreview'
import type { ShowcaseWork } from '@/types/domain'
import { cn } from '@/lib/utils'

interface MediaPlayerProps {
  work: ShowcaseWork
  artistName: string
  compact?: boolean
}

const WAVE_BARS = [28, 52, 40, 74, 62, 88, 56, 44, 78, 92, 60, 48, 70, 52, 36, 64, 80, 46, 58, 34, 42, 68, 50, 30]

export function MediaPlayer({ work, artistName, compact = false }: MediaPlayerProps) {
  const [embedActive, setEmbedActive] = useState(false)
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null)

  useEffect(() => {
    return subscribeAudioPreview(setActivePreviewId)
  }, [])

  const isPreviewPlaying = activePreviewId === work.id

  // 1. Live external embeds (YouTube, Spotify, SoundCloud, Bandcamp)
  if (work.provider !== 'studio-preview') {
    if (work.provider === 'bandcamp') {
      return (
        <div
          className={cn(
            'relative flex flex-col justify-between overflow-hidden rounded-sm border border-border bg-gradient-to-br p-5 text-[#f3efe7]',
            work.coverGradient,
            compact ? 'min-h-44' : 'min-h-56'
          )}
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#d1a978]">
            <span>Bandcamp Release</span>
            <span>{work.duration}</span>
          </div>
          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-serif text-xl">{work.title}</p>
              <p className="text-xs text-[#cfc8bc]">{artistName}</p>
            </div>
            <a
              href={work.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-[#d1a978]/50 bg-black/35 px-3.5 py-2 text-xs font-medium text-[#f3efe7] hover:bg-black/55"
            >
              Listen on Bandcamp
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      )
    }

    if (embedActive && work.embedUrl) {
      const frameHeight =
        work.provider === 'spotify'
          ? 'h-[152px]'
          : work.provider === 'soundcloud'
            ? 'h-[166px]'
            : 'aspect-video'
      return (
        <div className="overflow-hidden rounded-sm border border-border bg-black">
          <iframe
            src={work.embedUrl}
            title={`${work.title} by ${artistName} on ${getProviderLabel(work.provider)}`}
            className={cn('w-full border-0', frameHeight)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )
    }

    return (
      <div
        className={cn(
          'group relative overflow-hidden rounded-sm border border-border bg-gradient-to-br text-[#f3efe7]',
          work.coverGradient,
          compact ? 'aspect-[16/10]' : 'aspect-video'
        )}
      >
        {work.thumbnailUrl ? (
          <img
            src={work.thumbnailUrl}
            alt=""
            className="h-full w-full object-cover opacity-65 transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : null}
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/30 to-black/20 p-5">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#d1a978]">
            <span>{getProviderLabel(work.provider)} Embed</span>
            <span>{work.duration}</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-serif text-xl leading-snug">{work.title}</p>
              <p className="truncate text-xs text-[#d6d0c5]">{artistName}</p>
            </div>
            <button
              type="button"
              onClick={() => setEmbedActive(true)}
              aria-label={`Load and play ${work.title} by ${artistName}`}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d1a978]/60 bg-[#141210]/85 text-[#f3efe7] transition-transform hover:scale-105 cursor-pointer"
            >
              <Play className="h-4 w-4 translate-x-0.5 fill-current" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 2. Sample Studio Preview (generative acoustic chord preview — zero bandwidth)
  return (
    <div
      className={cn(
        'relative flex flex-col justify-between overflow-hidden rounded-sm border border-border bg-gradient-to-br p-5 text-[#f3efe7]',
        work.coverGradient,
        compact ? 'min-h-48' : 'min-h-60'
      )}
    >
      <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.16em] text-[#d1a978]">
        <span className="inline-flex items-center gap-1.5">
          <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
          {work.musicalKey ?? 'Studio Preview'}
        </span>
        <span className="tabular-nums text-[#cfc8bc]">{work.duration}</span>
      </div>

      {/* Minimalist harmonic waveform visualization */}
      <div
        aria-hidden="true"
        className="my-5 flex h-12 items-end gap-[3px] px-1 opacity-85"
      >
        {WAVE_BARS.map((height, idx) => (
          <span
            key={idx}
            style={{
              height: `${isPreviewPlaying ? Math.max(20, (height + ((idx * 17) % 28)) % 100) : height}%`,
            }}
            className={cn(
              'flex-1 rounded-full transition-all duration-500',
              isPreviewPlaying ? 'bg-[#d1a978]' : 'bg-[#f3efe7]/30'
            )}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-[#cfc8bc]">{work.subtitle}</p>
          <p className="text-[11px] text-[#a39c91]">
            {isPreviewPlaying
              ? 'Playing studio harmonic sketch…'
              : 'Press play for acoustic chord preview'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => toggleStudioPreview(work.id, work.previewChords)}
          aria-pressed={isPreviewPlaying}
          aria-label={
            isPreviewPlaying
              ? `Pause studio preview for ${work.title}`
              : `Play studio preview for ${work.title}`
          }
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d1a978]/70 bg-[#141210]/80 text-[#f3efe7] transition-transform hover:scale-105 cursor-pointer"
        >
          {isPreviewPlaying ? (
            <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4 translate-x-0.5 fill-current" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  )
}
