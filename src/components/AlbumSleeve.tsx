import { Pause, Play } from 'lucide-react'
import type { NetlabelRelease } from '@/types/domain'
import { cn } from '@/lib/utils'

interface AlbumSleeveProps {
  release: NetlabelRelease
  isPlaying?: boolean
  onTogglePlay?: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function MotifArtwork({
  motif,
  fg,
  accent,
}: {
  motif: NetlabelRelease['sleeveMotif']
  fg: string
  accent: string
}) {
  switch (motif) {
    case 'arch':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <rect x="28" y="28" width="344" height="344" fill="none" stroke={fg} strokeOpacity="0.14" />
          <path
            d="M110 340 V190 A90 90 0 0 1 290 190 V340"
            fill="none"
            stroke={accent}
            strokeWidth="1.75"
          />
          <path
            d="M142 340 V192 A58 58 0 0 1 258 192 V340"
            fill="none"
            stroke={fg}
            strokeOpacity="0.32"
            strokeWidth="1"
          />
          <line x1="200" y1="80" x2="200" y2="340" stroke={accent} strokeOpacity="0.65" strokeWidth="1" />
          <circle cx="200" cy="190" r="14" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1" />
        </svg>
      )
    case 'rings':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <circle cx="200" cy="200" r="140" fill="none" stroke={fg} strokeOpacity="0.14" />
          <circle cx="200" cy="200" r="108" fill="none" stroke={accent} strokeOpacity="0.7" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="76" fill="none" stroke={fg} strokeOpacity="0.28" />
          <circle cx="200" cy="200" r="44" fill="none" stroke={accent} strokeOpacity="0.85" />
          <circle cx="200" cy="200" r="8" fill={accent} />
          <line x1="40" y1="200" x2="360" y2="200" stroke={fg} strokeOpacity="0.12" />
        </svg>
      )
    case 'vesper':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <line x1="48" y1="260" x2="352" y2="260" stroke={accent} strokeOpacity="0.7" strokeWidth="1.2" />
          <circle cx="200" cy="180" r="86" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.2" />
          <path d="M120 260 Q200 110 280 260" fill="none" stroke={fg} strokeOpacity="0.35" strokeWidth="1" />
          <line x1="200" y1="70" x2="200" y2="310" stroke={fg} strokeOpacity="0.22" />
        </svg>
      )
    case 'horizon':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          {[110, 145, 180, 215, 250, 285].map((y, idx) => (
            <line
              key={y}
              x1="44"
              y1={y}
              x2="356"
              y2={y}
              stroke={idx === 2 ? accent : fg}
              strokeOpacity={idx === 2 ? 0.85 : 0.18 + idx * 0.04}
              strokeWidth={idx === 2 ? 1.8 : 1}
            />
          ))}
          <circle cx="268" cy="180" r="42" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.2" />
        </svg>
      )
    case 'monolith':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <rect x="116" y="76" width="168" height="248" fill="none" stroke={fg} strokeOpacity="0.25" />
          <rect x="148" y="108" width="104" height="184" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.4" />
          <line x1="70" y1="200" x2="330" y2="200" stroke={fg} strokeOpacity="0.2" />
        </svg>
      )
  }
}

export function AlbumSleeve({
  release,
  isPlaying = false,
  onTogglePlay,
  size = 'md',
  className,
}: AlbumSleeveProps) {
  const { bg, fg, accent } = release.sleevePalette

  return (
    <div
      style={{ backgroundColor: bg, color: fg }}
      className={cn(
        'group relative aspect-square w-full overflow-hidden rounded-[2px] border border-border shadow-sm select-none',
        className
      )}
    >
      {release.thumbnailUrl ? (
        <img
          src={release.thumbnailUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-luminosity transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : null}

      <div className="absolute inset-0">
        <MotifArtwork motif={release.sleeveMotif} fg={fg} accent={accent} />
      </div>

      {/* Subtle studio vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30"
      />

      {/* Editorial sleeve typography */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span style={{ color: accent }}>{release.catalogNumber}</span>
          <span className="opacity-75">ALTAR &amp; SOUND</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p
              className={cn(
                'truncate font-serif font-medium leading-tight',
                size === 'lg' ? 'text-2xl sm:text-3xl' : size === 'sm' ? 'text-base' : 'text-xl'
              )}
            >
              {release.title}
            </p>
            <p className="mt-0.5 truncate text-xs opacity-80">{release.artistName}</p>
          </div>

          {onTogglePlay ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onTogglePlay()
              }}
              aria-pressed={isPlaying}
              aria-label={
                isPlaying
                  ? `Pause ${release.title} by ${release.artistName}`
                  : `Play ${release.title} by ${release.artistName}`
              }
              style={{ borderColor: accent }}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-black/60 text-[#f5efe6] backdrop-blur-sm transition-transform hover:scale-105 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4 translate-x-0.5 fill-current" aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
