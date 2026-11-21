import { Link } from 'react-router-dom'
import { ArrowUpRight, Radio } from 'lucide-react'
import { ReleasePlayer } from '@/components/ReleasePlayer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'

export function SessionsPage() {
  usePageTitle('Room Sessions')
  const { releases, getArticlesForRelease } = useStore()

  return (
    <div className="space-y-10">
      <header className="flex flex-col justify-between gap-4 border-b border-border pb-8 sm:flex-row sm:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            Unvarnished Live Tape &amp; Streams
          </p>
          <h1
            id="main-content"
            tabIndex={-1}
            className="display-cover font-medium text-ink focus:outline-none"
          >
            Listening Room Sessions
          </h1>
          <p className="font-editorial text-lg leading-relaxed text-muted">
            Single-mic living room takes, empty cedar chapels, and curated embeds
            from YouTube, SoundCloud, Spotify, and Bandcamp.
          </p>
        </div>

        <Button asChild variant="outline">
          <Link to="/submit">Submit a Session Link</Link>
        </Button>
      </header>

      {releases.length === 0 ? (
        <div className="prism-card flex flex-col items-center gap-4 rounded-2xl px-6 py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Listening Room · Open Stage
          </p>
          <h2 className="font-serif text-3xl font-medium text-ink">
            No sessions published yet.
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            Paste a live YouTube, SoundCloud, Spotify, or Bandcamp session on the
            Submit page and it will appear right here in the Listening Room.
          </p>
          <Button asChild variant="accent" className="mt-1">
            <Link to="/submit">Submit a Live Session</Link>
          </Button>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-7 2xl:grid-cols-2">
          {releases.map((release) => {
            const articles = getArticlesForRelease(release.id)
            return (
              <section
                key={release.id}
                className="prism-card grid grid-cols-1 gap-6 rounded-2xl p-6 lg:grid-cols-12"
              >
                <div className="space-y-3 lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                    <span>{release.catalogNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-muted">{release.artistOrigin}</span>
                  </div>
                  <h2 className="font-serif text-3xl font-medium text-ink">
                    <Link
                      to={`/releases/${release.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {release.title}
                    </Link>
                  </h2>
                  <p className="text-sm font-medium text-muted">{release.artistName}</p>
                  <p className="text-sm leading-relaxed text-muted">
                    {release.linerNotes}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <Badge>{release.genre}</Badge>
                    {release.moods.slice(0, 2).map((m) => (
                      <Badge key={m} variant="outline">
                        {m}
                      </Badge>
                    ))}
                  </div>
                  {articles[0] ? (
                    <div className="pt-2">
                      <Link
                        to={`/journal/${articles[0].slug}`}
                        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-accent hover:underline"
                      >
                        Read Editorial Feature
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  ) : null}
                </div>

                <div className="lg:col-span-7">
                  <ReleasePlayer release={release} />
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
