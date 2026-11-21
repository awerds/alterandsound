import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { subscribeColorSchemeStorage, toggleColorScheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/', label: 'Showcase', end: true },
  { to: '/artists', label: 'Musicians', end: false },
  { to: '/collabs', label: 'Collabs', end: false },
  { to: '/about', label: 'Mission', end: false },
]

export function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    return subscribeColorSchemeStorage()
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <a
        href="#main-content"
        className="visually-hidden fixed left-4 top-4 z-[100] rounded-sm bg-ink px-4 py-2 text-sm font-medium text-bg"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-ink hover:opacity-85 transition-opacity"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              className="h-7 w-7 shrink-0"
              fill="none"
            >
              <rect
                width="32"
                height="32"
                rx="5"
                className="fill-surface stroke-border"
                strokeWidth="1.2"
              />
              <path
                d="M10 23V13.5C10 10.1863 12.6863 7.5 16 7.5C19.3137 7.5 22 10.1863 22 13.5V23"
                className="stroke-accent"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line
                x1="16"
                y1="7.5"
                x2="16"
                y2="24.5"
                className="stroke-accent"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <line
                x1="8"
                y1="23"
                x2="24"
                y2="23"
                className="stroke-ink"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-serif text-xl font-medium tracking-tight">
              Altar <span className="text-accent">&amp;</span> Sound
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'text-sm transition-colors',
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

            <Button asChild size="sm" variant="default" className="hidden sm:inline-flex">
              <Link to="/studio">Share Your Craft</Link>
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
            className="border-t border-border bg-bg px-5 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        'block py-1.5 text-base',
                        isActive ? 'font-medium text-accent' : 'text-ink'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild className="w-full">
                  <Link to="/studio">Share Your Craft</Link>
                </Button>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        {children}
      </main>

      <footer className="border-t border-border bg-surface/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md space-y-2">
            <p className="font-serif text-xl text-ink">
              Altar <span className="text-accent">&amp;</span> Sound
            </p>
            <p className="text-sm leading-relaxed text-muted">
              A quiet, craft-first home for musicians of faith to share their skill,
              collaborate across churches and genres, and tell the stories that point
              listeners toward God.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <Link to="/" className="hover:text-ink">
              Showcase
            </Link>
            <Link to="/artists" className="hover:text-ink">
              Musicians
            </Link>
            <Link to="/collabs" className="hover:text-ink">
              Collabs
            </Link>
            <Link to="/studio" className="hover:text-ink">
              Studio Preview
            </Link>
            <Link to="/about" className="hover:text-ink">
              Mission &amp; Faith
            </Link>
          </nav>
        </div>
        <div className="border-t border-border/70 px-5 py-4 text-center text-xs text-muted sm:px-8">
          <span className="font-serif italic text-sm text-ink/80">
            “Sing to him a new song; play skillfully on the strings, with loud shouts.”
          </span>{' '}
          — Psalm 33:3 · altarandsound.com
        </div>
      </footer>
    </div>
  )
}
