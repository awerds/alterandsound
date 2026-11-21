import { Link } from 'react-router-dom'
import { BookOpen, Compass, Disc3, Feather, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePageTitle } from '@/hooks/usePageTitle'

const PILLARS = [
  {
    icon: Disc3,
    title: 'Craft First',
    body: 'Great Christian music should stand shoulder-to-shoulder with the finest independent records on earth—thoughtful arrangements, honest rooms, zero plastic clichés.',
  },
  {
    icon: Feather,
    title: 'Literate Criticism',
    body: 'We write about faith-driven records with real musical curiosity: liner notes, harmonic texture, recording rooms, and the human stories behind every track.',
  },
  {
    icon: HeartHandshake,
    title: 'Independent Netlabel',
    body: 'Catalog numbers A&S—001 and onward champion underheard believers releasing acoustic, classical, gospel, ambient, and folk recordings freely online.',
  },
  {
    icon: Compass,
    title: 'Hospitality to Seekers',
    body: 'Beauty disarms cynicism. Every review and release is written so you can send a link to any friend—believer or skeptic—and let the music open the conversation.',
  },
]

const SEEKER_READINGS = [
  {
    ref: 'Psalm 34:18',
    title: 'When life feels heavy',
    text: 'The Lord is near to the brokenhearted and saves the crushed in spirit.',
  },
  {
    ref: 'Matthew 11:28–29',
    title: 'When you are tired of performing',
    text: 'Come to me, all who labor and are heavy laden, and I will give you rest.',
  },
  {
    ref: 'John 1:14',
    title: 'Grace and truth together',
    text: 'And the Word became flesh and dwelt among us… full of grace and truth.',
  },
]

export function ManifestoPage() {
  usePageTitle('Manifesto')

  return (
    <div className="mx-auto max-w-4xl space-y-16">
      <header className="space-y-5 border-b border-border pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Altar &amp; Sound · Editorial Manifesto
        </p>
        <h1
          id="main-content"
          tabIndex={-1}
          className="display-cover font-medium text-ink focus:outline-none"
        >
          Finding, curating, and releasing Christian music worth leaning in for.
        </h1>
        <p className="editorial-prose text-muted">
          Altar &amp; Sound began with a simple conviction: the finest sacred music
          rarely lives inside algorithmic radio charts. It lives in living rooms,
          wooden chapels, home tape decks, and independent studios—where musicians
          of faith offer their best work upward in the hope that someone listening
          might encounter the living God.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Our Four Commitments
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="prism-card rounded-2xl p-6 space-y-3"
              >
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="font-serif text-2xl font-medium text-ink">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section
        id="for-seekers"
        className="space-y-6 rounded-sm border border-border bg-surface p-7 sm:p-10"
      >
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            For Listeners Exploring Faith
          </p>
          <h2 className="font-serif text-3xl font-medium text-ink">
            The God behind these songs
          </h2>
          <p className="editorial-prose text-base text-muted">
            You don’t have to pretend to be religious to spend time here. Many of
            the artists in our catalog write out of real grief, doubt, and wonder—
            pointing to Jesus not as a slogan, but as a living presence who meets
            honest people right where they are.
          </p>
        </div>

        <div className="space-y-5 pt-2">
          {SEEKER_READINGS.map((item) => (
            <blockquote
              key={item.ref}
              className="border-l-2 border-accent/70 pl-4 space-y-1"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <BookOpen className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>
                  {item.title} · <strong className="text-ink">{item.ref}</strong>
                </span>
              </div>
              <p className="font-serif italic text-xl text-ink">“{item.text}”</p>
            </blockquote>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <Button asChild variant="default">
            <Link to="/">Read the Journal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/catalog">Browse Netlabel Catalog</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
