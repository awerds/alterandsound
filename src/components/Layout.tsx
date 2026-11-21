import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
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
      className={cn(
        'flex min-h-dvh flex-col bg-bg text-ink',
        hasPlayer && 'pb-20'
      )}
    >
      <a
        href="#main-content"
        className="visually-hidden fixed left-4 top-4 z-[100] rounded-sm bg-ink px-4 py-2 text-sm font-medium text-bg"
      >
        Skip to main content
      </a>

      {/* Magazine Publication Masthead */}
      <header className="border-b border-border bg-bg">
        {/* Top edition hairline bar */}
        <div className="border-b border-border/70">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:px-8">
            <span>Issue No. 01 · Autumn 2026</span>
            <span className="hidden sm:inline">
              Independent Christian Netlabel &amp; Music Journal
            </span>
            <span>altarandsound.com</span>
          </div>
        </div>

        {/* Masthead Brand + Primary Navigation */}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link
            to="/"
            className="group inline-flex items-baseline gap-2.5 text-ink hover:opacity-85 transition-opacity"
          >
            <span className="font-serif text-2xl font-medium tracking-tight sm:text-3xl">
              ALTAR <span className="italic text-accent">&amp;</span> SOUND
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'font-mono text-xs uppercase tracking-[0.14em] transition-colors',
                    isActive
                      ? 'font-medium text-ink underline decoration-accent decoration-2 underline-offset-8'
                      : 'text-muted hover:text-ink'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleColorScheme}
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-sm border border-border bg-transparent p-2 text-muted hover:bg-surface hover:text-ink cursor-pointer"
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
              variant="default"
              className="hidden font-mono text-[11px] uppercase tracking-[0.12em] sm:inline-flex"
            >
              <Link to="/submit">Submit Demo</Link>
            </Button>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-sm border border-border p-2 text-ink md:hidden cursor-pointer"
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
            className="border-t border-border bg-surface/50 px-5 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        'block py-1.5 font-mono text-xs uppercase tracking-[0.14em]',
                        isActive ? 'font-medium text-accent' : 'text-ink'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild className="w-full font-mono text-xs uppercase tracking-[0.12em]">
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

      <footer className="border-t border-border bg-surface/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-12 sm:px-8 md:grid-cols-12 md:items-end">
          <div className="space-y-3 md:col-span-7">
            <p className="font-serif text-2xl tracking-tight text-ink">
              ALTAR <span className="italic text-accent">&amp;</span> SOUND
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-muted">
              An independent Christian netlabel and music journal discovering,
              reviewing, and releasing unhurried sacred music—built to celebrate
              craft and introduce listeners to the living God.
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
          <span className="font-serif italic text-sm text-ink/80">
            “Sing to him a new song; play skillfully on the strings.”
          </span>{' '}
          — Psalm 33:3 · Netlabel Catalog A&amp;S · altarandsound.com
        </div>
      </footer>

      <ListeningBar />
    </div>
  )
}
