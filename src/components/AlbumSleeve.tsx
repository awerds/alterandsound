import { Pause, Play } from 'lucide-react'
import { SacredHeartEmblem } from '@/components/SacredHeartEmblem'
import type { NetlabelRelease } from '@/types/domain'
import { cn } from '@/lib/utils'

interface AlbumSleeveProps {
  release: NetlabelRelease
  isPlaying?: boolean
  onTogglePlay?: () => void
  size?: 'sm' | 'md' | 'lg'
  showVinyl?: boolean
  className?: string
}

function PrismaticMotif({
  motif,
  fg,
  accent,
}: {
  motif: NetlabelRelease['sleeveMotif']
  fg: string
  accent: string
}) {
  switch (motif) {
    case 'sacred-heart':
      return (
        <div className="flex h-full w-full items-center justify-center p-6">
          <SacredHeartEmblem variant="motif" className="h-4/5 w-4/5 drop-shadow-lg" />
        </div>
      )
    case 'arch':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <defs>
            <radialGradient id="arch-bloom" cx="50%" cy="42%" r="48%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.65" />
              <stop offset="60%" stopColor={fg} stopOpacity="0.12" />
              <stop offset="100%" stopColor={fg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="175" r="155" fill="url(#arch-bloom)" />
          <path
            d="M96 356 V190 A104 104 0 0 1 304 190 V356"
            fill="none"
            stroke={fg}
            strokeOpacity="0.72"
            strokeWidth="1.6"
          />
          <path
            d="M132 356 V192 A68 68 0 0 1 268 192 V356"
            fill="none"
            stroke={accent}
            strokeOpacity="0.88"
            strokeWidth="1.4"
          />
          <line x1="200" y1="48" x2="200" y2="356" stroke={fg} strokeOpacity="0.55" strokeWidth="1" />
          <circle cx="200" cy="190" r="18" fill={accent} fillOpacity="0.38" stroke={fg} strokeWidth="1.2" />
          <circle cx="200" cy="190" r="5" fill={fg} />
        </svg>
      )
    case 'rings':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <defs>
            <radialGradient id="rings-bloom" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.7" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#rings-bloom)" />
          <circle cx="200" cy="200" r="144" fill="none" stroke={fg} strokeOpacity="0.35" strokeWidth="1" />
          <circle cx="200" cy="200" r="108" fill="none" stroke={accent} strokeOpacity="0.9" strokeWidth="1.8" />
          <circle cx="200" cy="200" r="72" fill="none" stroke={fg} strokeOpacity="0.55" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="36" fill={fg} fillOpacity="0.16" stroke={accent} strokeWidth="1.5" />
          <line x1="36" y1="200" x2="364" y2="200" stroke={fg} strokeOpacity="0.32" />
          <line x1="200" y1="36" x2="200" y2="364" stroke={fg} strokeOpacity="0.22" />
        </svg>
      )
    case 'vesper':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <defs>
            <radialGradient id="vesper-bloom" cx="50%" cy="46%" r="48%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.7" />
              <stop offset="100%" stopColor={fg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="184" r="140" fill="url(#vesper-bloom)" />
          <line x1="36" y1="258" x2="364" y2="258" stroke={accent} strokeOpacity="0.9" strokeWidth="1.5" />
          <circle cx="200" cy="184" r="88" fill="none" stroke={fg} strokeOpacity="0.75" strokeWidth="1.4" />
          <path d="M108 258 Q200 84 292 258" fill="none" stroke={accent} strokeOpacity="0.85" strokeWidth="1.5" />
          <line x1="200" y1="54" x2="200" y2="328" stroke={fg} strokeOpacity="0.4" />
        </svg>
      )
    case 'horizon':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <defs>
            <radialGradient id="hor-bloom" cx="65%" cy="44%" r="45%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.75" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="262" cy="176" r="130" fill="url(#hor-bloom)" />
          {[104, 138, 176, 214, 252, 290].map((y, idx) => (
            <line
              key={y}
              x1="36"
              y1={y}
              x2="364"
              y2={y}
              stroke={idx === 2 ? accent : fg}
              strokeOpacity={idx === 2 ? 0.95 : 0.35 + idx * 0.06}
              strokeWidth={idx === 2 ? 2 : 1}
            />
          ))}
          <circle cx="262" cy="176" r="46" fill={fg} fillOpacity="0.16" stroke={accent} strokeWidth="1.6" />
        </svg>
      )
    case 'monolith':
      return (
        <svg viewBox="0 0 400 400" aria-hidden="true" className="h-full w-full">
          <defs>
            <radialGradient id="mono-bloom" cx="50%" cy="50%" r="46%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.65" />
              <stop offset="100%" stopColor={fg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#mono-bloom)" />
          <rect x="108" y="68" width="184" height="264" fill="none" stroke={fg} strokeOpacity="0.5" strokeWidth="1.3" />
          <rect x="142" y="102" width="116" height="196" fill={fg} fillOpacity="0.12" stroke={accent} strokeWidth="1.8" />
          <line x1="60" y1="200" x2="340" y2="200" stroke={fg} strokeOpacity="0.45" />
        </svg>
      )
  }
}

export function AlbumSleeve({
  release,
  isPlaying = false,
  onTogglePlay,
  size = 'md',
  showVinyl = false,
  className,
}: AlbumSleeveProps) {
  const { bg, via, to, fg, accent, glow } = release.sleevePalette

  return (
    <div className={cn('group relative select-none', showVinyl && 'pr-6 sm:pr-10', className)}>
      {/* Luminous Color Halo Behind Sleeve */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${glow} 0%, transparent 72%)`,
        }}
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full blur-2xl opacity-75 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Peeking Translucent Prismatic Vinyl Record */}
      {showVinyl ? (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute right-0 top-1/2 -z-[1] h-[86%] w-[86%] -translate-y-1/2 rounded-full border border-white/25 shadow-2xl transition-transform duration-700',
            isPlaying ? 'translate-x-4 sm:translate-x-6' : 'group-hover:translate-x-3'
          )}
          style={{
            background: `conic-gradient(from 45deg, #161224, ${bg}, #1c1630, ${accent}, #13101f, ${via}, #161224)`,
          }}
        >
          <div
            className={cn(
              'relative h-full w-full rounded-full',
              isPlaying && 'vinyl-spinning'
            )}
          >
            <div className="absolute inset-[10%] rounded-full border border-white/15" />
            <div className="absolute inset-[22%] rounded-full border border-white/10" />
            <div className="absolute inset-[34%] rounded-full border border-white/15" />
            <div
              className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 shadow-inner"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${via})`,
              }}
            >
              <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80" />
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Collector's Foil Sleeve */}
      <div
        style={{
          background: `linear-gradient(138deg, ${bg} 0%, ${via} 52%, ${to} 100%)`,
          color: fg,
          boxShadow: `0 20px 50px -16px ${glow}, inset 0 1px 0 rgba(255,255,255,0.45)`,
        }}
        className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/30"
      >
        {release.thumbnailUrl ? (
          <img
            src={release.thumbnailUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}

        {/* Cathedral Glass Geometry */}
        <div className="absolute inset-0">
          <PrismaticMotif motif={release.sleeveMotif} fg={fg} accent={accent} />
        </div>

        {/* Diagonal Specular Light Shimmer Layer */}
        <div aria-hidden="true" className="shimmer-sweep-layer" />

        {/* Subtle Top Glass Highlight + Bottom Readability Veil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/55"
        />

        {/* Editorial Sleeve Stamp + Play Control */}
        <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span
              className="rounded-full border border-white/35 bg-black/25 px-2.5 py-0.5 backdrop-blur-md"
              style={{ color: accent }}
            >
              {release.catalogNumber}
            </span>
            <span className="hidden opacity-90 drop-shadow-sm sm:inline">
              ALTAR &amp; SOUND
            </span>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 drop-shadow-sm">
              <p
                className={cn(
                  'truncate font-serif font-medium leading-tight',
                  size === 'lg'
                    ? 'text-2xl sm:text-3xl'
                    : size === 'sm'
                      ? 'text-base'
                      : 'text-xl'
                )}
              >
                {release.title}
              </p>
              <p className="mt-0.5 truncate text-xs font-medium opacity-90">
                {release.artistName}
              </p>
            </div>

            {onTogglePlay ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onTogglePlay()
                }}
                aria-label={
                  isPlaying
                    ? `Pause ${release.title} by ${release.artistName}`
                    : `Play ${release.title} by ${release.artistName}`
                }
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/55 bg-white/20 text-white shadow-lg backdrop-blur-md transition-transform hover:scale-108 hover:bg-white/30 cursor-pointer"
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
    </div>
  )
}
