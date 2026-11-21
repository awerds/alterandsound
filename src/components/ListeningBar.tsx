import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pause, Play, Volume2, X } from 'lucide-react'
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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface-elevated/95 backdrop-blur-md shadow-2xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <div className="flex min-w-0 items-center gap-3.5">
          <button
            type="button"
            onClick={toggleCurrentTrack}
            aria-pressed={active.isPlaying}
            aria-label={active.isPlaying ? `Pause ${active.title}` : `Resume ${active.title}`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent bg-accent text-accent-ink transition-opacity hover:opacity-90 cursor-pointer"
          >
            {active.isPlaying ? (
              <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4 translate-x-0.5 fill-current" aria-hidden="true" />
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
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

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-2 text-xs text-muted md:flex">
            <Volume2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="font-mono text-[11px]">
              {active.isPlaying ? 'Listening Room Active' : 'Paused'}
            </span>
          </div>

          <button
            type="button"
            onClick={dismissPlayer}
            aria-label="Close listening bar"
            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-sm text-muted hover:bg-surface hover:text-ink cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  )
}
