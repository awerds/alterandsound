import { Link } from 'react-router-dom'
import { ArrowUpRight, Radio } from 'lucide-react'
import { ArtistLinksCard } from '@/components/ArtistLinksCard'
import { EmbeddedTrackCard } from '@/components/EmbeddedTrackCard'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'

export function SessionsPage() {
  usePageTitle('Listen · Featured Songs')
  const { articles } = useStore()

  return (
    <div className="w-full space-y-10">
      <header className="flex flex-col justify-between gap-4 border-b border-border pb-8 sm:flex-row sm:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            Love &amp; Light Listening Room
          </p>
          <h1
            id="main-content"
            tabIndex={-1}
            className="display-cover font-medium text-ink focus:outline-none"
          >
            Listen to <span className="prism-text italic">Featured Songs</span>
          </h1>
          <p className="font-editorial text-lg leading-relaxed text-muted">
            Curated YouTube, Spotify, SoundCloud, and Bandcamp embeds from every
            artist spotlighted in the Altar &amp; Sound Journal.
          </p>
        </div>

        <Button asChild variant="accent">
          <Link to="/submit">Submit a Song</Link>
        </Button>
      </header>

      <div className="space-y-12">
        {articles.map((article) => (
          <section key={article.id} className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  {article.artistOrigin} · {article.genre}
                </p>
                <h2 className="font-serif text-3xl font-medium text-ink">
                  {article.artistName}
                </h2>
                <ArtistLinksCard
                  artistName={article.artistName}
                  artistOrigin={article.artistOrigin}
                  genre={article.genre}
                  outlets={article.outlets}
                  compact
                />
              </div>

              <Link
                to={`/journal/${article.slug}`}
                className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.14em] text-accent hover:underline"
              >
                Read Full Feature
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {article.featuredTracks.map((track) => (
                <EmbeddedTrackCard
                  key={track.id}
                  track={track}
                  artistName={article.artistName}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
