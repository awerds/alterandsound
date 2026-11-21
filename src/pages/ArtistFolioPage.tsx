import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EncourageDialog } from '@/components/EncourageDialog'
import { WorkCard } from '@/components/WorkCard'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import type { AvailabilityTag } from '@/types/domain'

const AVAILABILITY_TEXT: Record<AvailabilityTag, string> = {
  collab: 'Open to Collaborate',
  ministry: 'Available for Ministry / Events',
  mentoring: 'Open to Mentoring',
}

export function ArtistFolioPage() {
  const { handle } = useParams<{ handle: string }>()
  const { getProfileByHandle, works } = useStore()
  const artist = handle ? getProfileByHandle(handle) : undefined

  usePageTitle(artist ? `${artist.displayName} — Folio` : 'Musician Not Found')

  if (!artist) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center space-y-4">
        <h1 id="main-content" tabIndex={-1} className="font-serif text-4xl text-ink">
          Musician not found
        </h1>
        <Button asChild variant="outline">
          <Link to="/artists">Back to Musicians</Link>
        </Button>
      </div>
    )
  }

  const artistWorks = works.filter((w) => w.profileId === artist.id)

  return (
    <div className="flex flex-col gap-12">
      <div>
        <Link
          to="/artists"
          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All Musicians
        </Link>
      </div>

      {/* Folio Header */}
      <header className="grid grid-cols-1 gap-8 border-b border-border pb-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-surface font-serif text-2xl text-accent"
            >
              {artist.initials}
            </div>
            <div>
              <h1
                id="main-content"
                tabIndex={-1}
                className="font-serif text-4xl font-medium text-ink sm:text-5xl focus:outline-none"
              >
                {artist.displayName}
              </h1>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {artist.location} · {artist.tagline}
              </p>
            </div>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-muted">
            {artist.bio}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {artist.availability.map((tag) => (
              <Badge key={tag} variant="accent">
                {AVAILABILITY_TEXT[tag]}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-sm border border-border bg-surface p-5 lg:col-span-4">
          <div className="space-y-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Skills &amp; Disciplines
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {artist.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
            <h3 className="pt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Genres
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {artist.genres.map((genre) => (
                <Badge key={genre} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <EncourageDialog
              recipientId={artist.id}
              recipientName={artist.displayName}
              triggerVariant="accent"
              triggerSize="default"
              triggerLabel="Pray / Connect"
            />
            {artist.links.youtube ? (
              <a
                href={artist.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1 rounded-sm border border-border px-3 text-xs text-muted hover:text-ink"
              >
                YouTube
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            ) : null}
            {artist.links.spotify ? (
              <a
                href={artist.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1 rounded-sm border border-border px-3 text-xs text-muted hover:text-ink"
              >
                Spotify
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </header>

      {/* Why I Play — Testimony */}
      <section className="rounded-sm border border-border bg-surface-elevated p-7 sm:p-9 space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Why I Play · Faith Story
        </h2>
        <p className="max-w-3xl font-serif text-2xl leading-relaxed text-ink">
          “{artist.testimony}”
        </p>
      </section>

      {/* Showcased Works */}
      <section className="space-y-6">
        <h2 className="font-serif text-3xl font-medium text-ink">
          Showcased Works ({artistWorks.length})
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {artistWorks.map((work) => (
            <WorkCard key={work.id} work={work} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  )
}
