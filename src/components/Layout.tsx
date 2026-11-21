import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Moon, Pause, Sparkles, Sun, X } from 'lucide-react'
import { ListeningBar } from '@/components/ListeningBar'
import { Button } from '@/components/ui/button'
import { subscribePlayer } from '@/lib/audioPreview'
import { subscribeColorSchemeStorage, toggleColorScheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/', label: 'Journal', end: true },
  { to: '/catalog', label: 'Catalog', end: false },
  { to: '/sessions', label: 'Sessions', end: false },
  { to: '/manifesto', label: 'Manifesto', end: false },
]

export function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
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
    setMobileOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div
      data-shimmer={shimmerPaused ? 'paused' : 'active'}
      className={cn(
        'relative flex min-h-dvh flex-col bg-bg text-ink isolate',
        hasPlayer && 'pb-24'
      )}
    >
      {/* Living Cathedral Prism Light Field (fixed ambient backdrop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className="aurora-orb-a absolute -left-24 -top-28 h-[36rem] w-[36rem] rounded-full blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,180,67,0.52) 0%, rgba(244,114,182,0.36) 52%, transparent 74%)',
          }}
        />
        <div
          className="aurora-orb-b absolute -right-24 top-[14%] h-[38rem] w-[38rem] rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.48) 0%, rgba(56,189,248,0.35) 55%, transparent 74%)',
          }}
        />
        <div
          className="aurora-orb-c absolute bottom-[-10%] left-[26%] h-[34rem] w-[44rem] rounded-full blur-[125px]"
          style={{
            background:
              'radial-gradient(circle, rgba(45,212,191,0.32) 0%, rgba(251,146,60,0.34) 55%, transparent 74%)',
          }}
        />
      </div>

      <a
        href="#main-content"
        className="visually-hidden fixed left-4 top-4 z-[100] rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg"
      >
        Skip to main content
      </a>

      {/* Flagship Luminous Frosted Masthead */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur-2xl">
        <div className="border-b border-border/70">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:px-8">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500"
              />
              Issue No. 01 · Autumn 2026
            </span>
            <span className="hidden sm:inline">
              Christian Netlabel &amp; Luminous Music Journal
            </span>
            <span>altarandsound.com</span>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-ink hover:opacity-90 transition-opacity"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/40 bg-gradient-to-br from-amber-400 via-pink-500 to-violet-600 shadow-md"
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
            <span className="font-serif text-2xl font-medium tracking-tight sm:text-[1.7rem]">
              ALTAR <span className="prism-text italic">&amp;</span> SOUND
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
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
              <span className="hidden lg:inline">
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
                <span className="visually-hidden">Switch to dark theme</span>
              </span>
              <span className="theme-icon-to-light items-center">
                <Sun className="h-4 w-4" aria-hidden="true" />
                <span className="visually-hidden">Switch to light theme</span>
              </span>
            </button>

            <Button
              asChild
              size="sm"
              variant="accent"
              className="hidden rounded-full font-mono text-[11px] uppercase tracking-[0.12em] sm:inline-flex"
            >
              <Link to="/submit">Submit Demo</Link>
            </Button>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-border bg-surface-elevated p-2 text-ink md:hidden cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-border bg-surface-elevated/95 px-5 py-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-[0.14em]',
                        isActive
                          ? 'bg-ink text-bg font-medium'
                          : 'text-ink hover:bg-surface'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild variant="accent" className="w-full rounded-full font-mono text-xs uppercase tracking-[0.12em]">
                  <Link to="/submit">Submit Demo</Link>
                </Button>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        {children}
      </main>

      <footer className="mt-16 border-t border-border bg-surface/80 backdrop-blur-xl">
        <div className="prism-rule" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-12 sm:px-8 md:grid-cols-12 md:items-end">
          <div className="space-y-3 md:col-span-7">
            <p className="font-serif text-3xl tracking-tight text-ink">
              ALTAR <span className="prism-text italic">&amp;</span> SOUND
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-muted">
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

        <div className="border-t border-border/70 px-5 py-4 text-center text-xs text-muted sm:px-8">
          <span className="font-serif italic text-sm text-ink/85">
            “The light shines in the darkness, and the darkness has not overcome it.”
          </span>{' '}
          — John 1:5 · Netlabel Catalog A&amp;S · altarandsound.com
        </div>
      </footer>

      <ListeningBar />
    </div>
  )
}
