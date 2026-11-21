import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pause, Play, X } from 'lucide-react'
import {
  dismissPlayer,
  subscribePlayer,
  toggleCurrentTrack,
  type ActiveTrackState,
} from '@/lib/audioPreview'

export function ListeningBar() {
  const [active, setActive] = useState<ActiveTrackState | null>(null)

  useEffect(() => {
    return subscribePlayer(setActive)
  }, [])

  if (!active) return null

  return (
    <aside
      aria-label="Audio listening bar"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4 sm:px-6"
    >
      <div
        className="pointer-events-auto relative mx-auto flex max-w-4xl items-center justify-between gap-4 overflow-hidden rounded-2xl border border-border bg-surface-elevated px-4 py-3 shadow-2xl backdrop-blur-2xl sm:px-5"
        style={{
          boxShadow: `0 22px 60px -14px ${active.sleevePalette.glow}, inset 0 1px 0 rgba(255,255,255,0.35)`,
        }}
      >
        {/* Subtle track-colored ambient glow inside dock */}
        <div
          aria-hidden="true"
          style={{
            background: `linear-gradient(90deg, ${active.sleevePalette.bg}38 0%, ${active.sleevePalette.via}26 45%, transparent 100%)`,
          }}
          className="pointer-events-none absolute inset-0"
        />

        <div className="relative z-10 flex min-w-0 items-center gap-3.5">
          <button
            type="button"
            onClick={toggleCurrentTrack}
            aria-label={active.isPlaying ? `Pause ${active.title}` : `Play ${active.title}`}
            style={{
              background: `linear-gradient(135deg, ${active.sleevePalette.bg}, ${active.sleevePalette.via})`,
            }}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 text-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            {active.isPlaying ? (
              <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4 translate-x-0.5 fill-current" aria-hidden="true" />
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
                {active.catalogNumber}
              </span>
              <span className="hidden text-xs text-muted sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="hidden font-mono text-[11px] text-muted sm:inline">
                {active.musicalKey}
              </span>
            </div>
            <p className="truncate text-sm font-medium text-ink">
              <Link
                to={`/releases/${active.releaseSlug}`}
                className="hover:text-accent transition-colors"
              >
                {active.title}
              </Link>{' '}
              <span className="font-normal text-muted">— {active.artistName}</span>
            </p>
          </div>
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-4">
          {/* Luminous Equalizer Bars */}
          <div
            aria-hidden="true"
            className="hidden h-5 items-end gap-[3px] sm:flex"
          >
            {[0, 0.2, 0.4, 0.15, 0.35].map((delay, idx) => (
              <span
                key={idx}
                style={{
                  animationDelay: `${delay}s`,
                  background: `linear-gradient(180deg, ${active.sleevePalette.accent}, ${active.sleevePalette.via})`,
                  animationPlayState: active.isPlaying ? 'running' : 'paused',
                }}
                className="eq-bar h-full w-[3px] rounded-full"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={dismissPlayer}
            aria-label="Close listening bar"
            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-ink cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  )
}
