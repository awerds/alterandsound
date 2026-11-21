import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  BookOpen,
  Compass,
  Disc3,
  Moon,
  Pause,
  Radio,
  Sparkles,
  Sun,
  Upload,
} from 'lucide-react'
import { ListeningBar } from '@/components/ListeningBar'
import { Button } from '@/components/ui/button'
import { subscribePlayer } from '@/lib/audioPreview'
import { subscribeColorSchemeStorage, toggleColorScheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/', label: 'Journal', icon: BookOpen, end: true },
  { to: '/catalog', label: 'Catalog', icon: Disc3, end: false },
  { to: '/sessions', label: 'Sessions', icon: Radio, end: false },
  { to: '/manifesto', label: 'Manifesto', icon: Compass, end: false },
]

const MOBILE_TABS = [
  { to: '/', label: 'Journal', icon: BookOpen, end: true },
  { to: '/catalog', label: 'Catalog', icon: Disc3, end: false },
  { to: '/sessions', label: 'Sessions', icon: Radio, end: false },
  { to: '/submit', label: 'Submit', icon: Upload, end: false },
  { to: '/manifesto', label: 'Ethos', icon: Compass, end: false },
]

export function Layout({ children }: { children: ReactNode }) {
  const [hasPlayer, setHasPlayer] = useState(false)
  const [shimmerPaused, setShimmerPaused] = useState(false)
  const location = useLocation()

  useEffect(() => {
    return subscribeColorSchemeStorage()
  }, [])

  useEffect(() => {
    return subscribePlayer((st) => setHasPlayer(Boolean(st)))
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div
      data-shimmer={shimmerPaused ? 'paused' : 'active'}
      className={cn(
        'relative flex min-h-dvh w-full flex-col bg-bg text-ink isolate',
        hasPlayer ? 'pb-40 md:pb-24' : 'pb-20 md:pb-0'
      )}
    >
      {/* Radiant Full-Viewport Sunlit Prism Light Field */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-clip"
      >
        <div
          className="aurora-orb-a absolute -left-[12%] -top-[18%] h-[42rem] w-[48rem] rounded-full blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,200,87,0.72) 0%, rgba(255,140,192,0.48) 52%, transparent 74%)',
          }}
        />
        <div
          className="aurora-orb-b absolute -right-[10%] top-[6%] h-[44rem] w-[48rem] rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(167,139,250,0.58) 0%, rgba(56,189,248,0.48) 55%, transparent 74%)',
          }}
        />
        <div
          className="aurora-orb-c absolute bottom-[-16%] left-[22%] h-[38rem] w-[56rem] rounded-full blur-[125px]"
          style={{
            background:
              'radial-gradient(circle, rgba(94,234,212,0.45) 0%, rgba(253,186,116,0.5) 55%, transparent 74%)',
          }}
        />
      </div>

      <a
        href="#main-content"
        className="visually-hidden fixed left-4 top-4 z-[100] rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg"
      >
        Skip to main content
      </a>

      {/* Full-Width Luminous Frosted Masthead */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/85 backdrop-blur-2xl">
        <div className="hidden border-b border-border/60 sm:block">
          <div className="flex w-full items-center justify-between gap-4 px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:px-10 lg:px-14">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500"
              />
              Issue No. 01 · Autumn 2026
            </span>
            <span>Christian Netlabel &amp; Luminous Music Journal</span>
            <span>altarandsound.com</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-10 md:py-3.5 lg:px-14">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 text-ink hover:opacity-90 transition-opacity"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/60 bg-gradient-to-br from-amber-400 via-pink-500 to-violet-600 shadow-md"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M6.5 18V11.5C6.5 8.46 8.96 6 12 6C15.04 6 17.5 8.46 17.5 11.5V18"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="6"
                  x2="12"
                  y2="18.5"
                  stroke="#fde68a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="font-serif text-xl font-medium tracking-tight sm:text-2xl lg:text-[1.75rem]">
              ALTAR <span className="prism-text italic">&amp;</span> SOUND
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1.5 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all',
                    isActive
                      ? 'bg-ink text-bg font-medium shadow-sm'
                      : 'text-muted hover:bg-surface-elevated hover:text-ink'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* WCAG 2.2.2 Pause / Resume Ambient Shimmer Control */}
            <button
              type="button"
              onClick={() => setShimmerPaused((prev) => !prev)}
              aria-label={shimmerPaused ? 'Resume light shimmer' : 'Pause light shimmer'}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-ink cursor-pointer"
            >
              {shimmerPaused ? (
                <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              ) : (
                <Pause className="h-3 w-3 text-accent" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">
                {shimmerPaused ? 'Shimmer' : 'Still'}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleColorScheme}
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-border bg-surface-elevated p-2 text-muted hover:text-ink cursor-pointer"
            >
              <span className="theme-icon-to-dark items-center">
                <Moon className="h-4 w-4" aria-hidden="true" />
                <span className="visually-hidden">Switch to twilight dark theme</span>
              </span>
              <span className="theme-icon-to-light items-center">
                <Sun className="h-4 w-4" aria-hidden="true" />
                <span className="visually-hidden">Switch to sunlit light theme</span>
              </span>
            </button>

            <Button
              asChild
              size="sm"
              variant="accent"
              className="hidden rounded-full font-mono text-[11px] uppercase tracking-[0.12em] md:inline-flex"
            >
              <Link to="/submit">Submit Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Full-Width Responsive Main Stage */}
      <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-10 md:px-10 lg:px-14 xl:px-16">
        {children}
      </main>

      {/* Full-Width Luminous Footer */}
      <footer className="mt-14 w-full border-t border-border bg-surface/85 backdrop-blur-xl">
        <div className="prism-rule" />
        <div className="grid w-full grid-cols-1 gap-8 px-5 py-12 sm:px-6 md:grid-cols-12 md:items-end md:px-10 lg:px-14">
          <div className="space-y-3 md:col-span-7">
            <p className="font-serif text-3xl tracking-tight text-ink">
              ALTAR <span className="prism-text italic">&amp;</span> SOUND
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              An independent Christian netlabel and luminous music journal
              discovering, reviewing, and releasing radiant sacred records that
              open doors to God.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-muted md:col-span-5 md:justify-end"
          >
            <Link to="/" className="hover:text-ink">
              Journal
            </Link>
            <Link to="/catalog" className="hover:text-ink">
              Catalog
            </Link>
            <Link to="/sessions" className="hover:text-ink">
              Sessions
            </Link>
            <Link to="/submit" className="hover:text-ink">
              Submit
            </Link>
            <Link to="/manifesto" className="hover:text-ink">
              Manifesto
            </Link>
          </nav>
        </div>

        <div className="border-t border-border/70 px-5 py-4 text-center text-xs text-muted">
          <span className="font-serif italic text-sm text-ink/90">
            “The light shines in the darkness, and the darkness has not overcome it.”
          </span>{' '}
          — John 1:5 · Netlabel Catalog A&amp;S · altarandsound.com
        </div>
      </footer>

      <ListeningBar />

      {/* Dedicated Mobile App Bottom Tab Bar */}
      <nav
        aria-label="Mobile"
        style={{ paddingBottom: 'max(0.45rem, env(safe-area-inset-bottom))' }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-elevated/92 px-2 pt-1.5 backdrop-blur-2xl md:hidden"
      >
        <ul className="grid grid-cols-5 gap-1">
          {MOBILE_TABS.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 font-mono text-[10px] tracking-wide transition-all',
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/18 via-pink-500/18 to-violet-500/18 font-medium text-ink'
                        : 'text-muted hover:text-ink'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={cn(
                          'h-[18px] w-[18px]',
                          isActive ? 'text-accent' : 'text-muted'
                        )}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
