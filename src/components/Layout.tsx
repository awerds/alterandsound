import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  BookOpen,
  Compass,
  Flame,
  Moon,
  Pause,
  Radio,
  Sun,
  Upload,
} from 'lucide-react'
import { SacredHeartEmblem } from '@/components/SacredHeartEmblem'
import { Button } from '@/components/ui/button'
import { subscribeColorSchemeStorage, toggleColorScheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    handle: '@alterandsound',
    href: 'https://www.instagram.com/alterandsound/',
  },
  {
    label: 'Facebook',
    handle: 'Altar & Sound',
    href: 'https://www.facebook.com/profile.php?id=61596785071846',
  },
] as const

const NAV_ITEMS = [
  { to: '/', label: 'Manifesto', icon: Compass, end: true },
  { to: '/journal', label: 'Journal', icon: BookOpen, end: false },
  { to: '/sessions', label: 'Listen', icon: Radio, end: false },
]

const MOBILE_TABS = [
  { to: '/', label: 'Home', icon: Compass, end: true },
  { to: '/journal', label: 'Journal', icon: BookOpen, end: false },
  { to: '/sessions', label: 'Listen', icon: Radio, end: false },
  { to: '/submit', label: 'Submit', icon: Upload, end: false },
]

export function Layout({ children }: { children: ReactNode }) {
  const [lightMotionPaused, setLightMotionPaused] = useState(false)
  const location = useLocation()

  useEffect(() => {
    return subscribeColorSchemeStorage()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div
      data-shimmer={lightMotionPaused ? 'paused' : 'active'}
      className="relative flex min-h-dvh w-full flex-col bg-bg pb-20 text-ink isolate md:pb-0"
    >
      {/* Living Love & Light Radiant Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-clip"
      >
        <div
          className="aurora-orb-a absolute -left-[12%] -top-[18%] h-[42rem] w-[48rem] rounded-full blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(251,191,36,0.72) 0%, rgba(244,63,94,0.44) 52%, transparent 74%)',
          }}
        />
        <div
          className="aurora-orb-b absolute -right-[10%] top-[6%] h-[44rem] w-[48rem] rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(251,146,60,0.52) 0%, rgba(125,211,252,0.44) 55%, transparent 74%)',
          }}
        />
        <div
          className="aurora-orb-c absolute bottom-[-16%] left-[22%] h-[38rem] w-[56rem] rounded-full blur-[125px]"
          style={{
            background:
              'radial-gradient(circle, rgba(244,114,182,0.42) 0%, rgba(253,224,71,0.48) 55%, transparent 74%)',
          }}
        />
      </div>

      <a
        href="#main-content"
        className="visually-hidden fixed left-4 top-4 z-[100] rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg"
      >
        Skip to main content
      </a>

      {/* Full-Width Luminous Masthead */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/85 backdrop-blur-2xl">
        <div className="hidden border-b border-border/60 sm:block">
          <div className="flex w-full items-center justify-between gap-4 px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:px-10 lg:px-14">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500"
              />
              Love &amp; Light · Sacred Heart of Jesus
            </span>
            <span>Christian Music Journal &amp; Independent Artist Spotlight</span>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {s.label}
                </a>
              ))}
              <span aria-hidden="true">·</span>
              <span>altarandsound.com</span>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-10 md:py-3.5 lg:px-14">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 text-ink hover:opacity-90 transition-opacity"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-300 via-rose-500 to-rose-700 p-1 shadow-md"
            >
              <SacredHeartEmblem variant="icon" className="h-8 w-8" />
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
            {/* WCAG 2.2.2 Pause / Resume Ambient Light Control */}
            <button
              type="button"
              onClick={() => setLightMotionPaused((prev) => !prev)}
              aria-label={lightMotionPaused ? 'Resume radiant light motion' : 'Pause radiant light motion'}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-ink cursor-pointer"
            >
              {lightMotionPaused ? (
                <Flame className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              ) : (
                <Pause className="h-3 w-3 text-accent" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">
                {lightMotionPaused ? 'Light' : 'Still'}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleColorScheme}
              className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-border bg-surface-elevated p-2 text-muted hover:text-ink cursor-pointer"
            >
              <span className="theme-icon-to-dark items-center">
                <Moon className="h-4 w-4" aria-hidden="true" />
                <span className="visually-hidden">Switch to twilight theme</span>
              </span>
              <span className="theme-icon-to-light items-center">
                <Sun className="h-4 w-4" aria-hidden="true" />
                <span className="visually-hidden">Switch to sunlit theme</span>
              </span>
            </button>

            <Button
              asChild
              size="sm"
              variant="accent"
              className="hidden rounded-full font-mono text-[11px] uppercase tracking-[0.12em] md:inline-flex"
            >
              <Link to="/submit">Submit Music</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Full-Width Responsive Main Stage */}
      <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-10 md:px-10 lg:px-14 xl:px-16">
        {children}
      </main>

      {/* Full-Width Footer */}
      <footer className="mt-14 w-full border-t border-border bg-surface/85 backdrop-blur-xl">
        <div className="prism-rule" />
        <div className="grid w-full grid-cols-1 gap-8 px-5 py-12 sm:px-6 md:grid-cols-12 md:items-end md:px-10 lg:px-14">
          <div className="space-y-3 md:col-span-7">
            <p className="font-serif text-3xl tracking-tight text-ink">
              ALTAR <span className="prism-text italic">&amp;</span> SOUND
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              A Christian music journal and emerging netlabel devoted to{' '}
              <strong className="font-medium text-ink">Love &amp; Light</strong>—discovering,
              reviewing, and promoting independent artists whose music points
              hearts to Jesus.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={SOCIAL_LINKS[0].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Altar & Sound on Instagram"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink hover:border-accent/60 hover:text-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS[1].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Altar & Sound on Facebook"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink hover:border-accent/60 hover:text-accent transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.8v3h2.5v8h3.2z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-muted md:col-span-5 md:justify-end"
          >
            <Link to="/" className="hover:text-ink">
              Manifesto
            </Link>
            <Link to="/journal" className="hover:text-ink">
              Journal
            </Link>
            <Link to="/sessions" className="hover:text-ink">
              Listen
            </Link>
            <Link to="/submit" className="hover:text-ink">
              Submit
            </Link>
          </nav>
        </div>

        <div className="border-t border-border/70 px-5 py-4 text-center text-xs text-muted">
          <span className="font-serif italic text-sm text-ink/90">
            “Learn from me, for I am gentle and humble in heart, and you will find rest for your souls.”
          </span>{' '}
          — Matthew 11:29 · Love &amp; Light · altarandsound.com
        </div>
      </footer>

      {/* Dedicated Mobile App Bottom Tab Bar */}
      <nav
        aria-label="Mobile"
        style={{ paddingBottom: 'max(0.45rem, env(safe-area-inset-bottom))' }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-elevated/92 px-2 pt-1.5 backdrop-blur-2xl md:hidden"
      >
        <ul className="grid grid-cols-4 gap-1">
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
                        ? 'bg-gradient-to-r from-amber-500/18 via-rose-500/18 to-pink-500/18 font-medium text-ink'
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
