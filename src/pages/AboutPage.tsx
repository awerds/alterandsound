import { Link } from 'react-router-dom'
import { BookOpen, Compass, HeartHandshake, Music2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePageTitle } from '@/hooks/usePageTitle'

const SEEKER_READINGS = [
  {
    ref: 'Psalm 34:18',
    title: 'When life feels heavy',
    text: 'The Lord is near to the brokenhearted and saves the crushed in spirit.',
  },
  {
    ref: 'Matthew 11:28–29',
    title: 'When you are exhausted from striving',
    text: 'Come to me, all who labor and are heavy laden, and I will give you rest.',
  },
  {
    ref: 'John 1:14',
    title: 'What Christians mean by grace and truth',
    text: 'And the Word became flesh and dwelt among us… full of grace and truth.',
  },
]

export function AboutPage() {
  usePageTitle('Mission & Faith')

  return (
    <div className="mx-auto max-w-3xl space-y-16">
      <header className="space-y-4 border-b border-border pb-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Why Altar &amp; Sound Exists
        </p>
        <h1
          id="main-content"
          tabIndex={-1}
          className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl focus:outline-none"
        >
          Beauty earns a hearing. Honesty opens the heart.
        </h1>
        <p className="text-base leading-relaxed text-muted">
          Throughout history, some of the deepest music ever written was offered to
          God—not as a marketing gimmick, and not behind closed doors, but in the
          open air where anyone could listen and wonder.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="font-serif text-3xl font-medium text-ink">
          For Musicians of Faith
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-sm border border-border bg-surface-elevated p-5 space-y-2">
            <Music2 className="h-5 w-5 text-accent" aria-hidden="true" />
            <h3 className="font-serif text-xl text-ink">Craft without clout</h3>
            <p className="text-sm leading-relaxed text-muted">
              No public like counters or algorithmic chasing. Just your music, your
              instruments, and your story.
            </p>
          </div>
          <div className="rounded-sm border border-border bg-surface-elevated p-5 space-y-2">
            <HeartHandshake className="h-5 w-5 text-accent" aria-hidden="true" />
            <h3 className="font-serif text-xl text-ink">Real fellowship</h3>
            <p className="text-sm leading-relaxed text-muted">
              Connect across denominations and genres to record stems, mentor newer
              players, and serve local communities.
            </p>
          </div>
          <div className="rounded-sm border border-border bg-surface-elevated p-5 space-y-2">
            <Compass className="h-5 w-5 text-accent" aria-hidden="true" />
            <h3 className="font-serif text-xl text-ink">Outward facing</h3>
            <p className="text-sm leading-relaxed text-muted">
              Every song gets a quiet, share-ready story page designed to welcome
              friends who might never visit a church building.
            </p>
          </div>
        </div>
      </section>

      <section
        id="for-seekers"
        className="space-y-6 rounded-sm border border-border bg-surface p-7 sm:p-10"
      >
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            For Listeners &amp; Seekers
          </p>
          <h2 className="font-serif text-3xl font-medium text-ink">
            If a song moved you today
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Many of the artists here know what it feels like to doubt, grieve, or
            start over. The common thread in their stories isn’t religious
            perfection—it is meeting Jesus, who comes close to honest people in the
            middle of real life.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {SEEKER_READINGS.map((item) => (
            <blockquote
              key={item.ref}
              className="border-l-2 border-accent/60 pl-4 space-y-1"
            >
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
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
            <Link to="/">Listen to Showcases</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/artists">Meet the Musicians</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
