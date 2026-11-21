import { Link } from 'react-router-dom'
import { BookOpen, Compass, Disc3, Feather, Flame } from 'lucide-react'
import { SacredHeartEmblem } from '@/components/SacredHeartEmblem'
import { Button } from '@/components/ui/button'
import { usePageTitle } from '@/hooks/usePageTitle'

const PILLARS = [
  {
    icon: Flame,
    title: 'The Sacred Heart of Jesus',
    body: 'At the center of everything we publish is the burning, merciful heart of Christ—gentle, pierced, radiant, and wide open to every soul searching for rest.',
  },
  {
    icon: Disc3,
    title: 'Craft in Full Light',
    body: 'Great Christian music belongs in radiant color, standing shoulder-to-shoulder with the finest independent records on earth—honest rooms, fearless artistry, zero clichés.',
  },
  {
    icon: Feather,
    title: 'Literate Music Journalism',
    body: 'We write about faith-driven records with genuine musical curiosity: liner notes, harmony, texture, and the living testimonies behind every song.',
  },
  {
    icon: Compass,
    title: 'Love & Light to the World',
    body: 'Beauty disarms cynicism. Every release and essay is crafted so you can share a link with any friend—believer or seeker—and let love and light open the door to God.',
  },
]

const SEEKER_READINGS = [
  {
    ref: 'Matthew 11:28–29',
    title: 'The Heart of Jesus',
    text: 'Come to me, all who labor and are heavy laden, and I will give you rest. Learn from me, for I am gentle and humble in heart.',
  },
  {
    ref: 'John 1:5',
    title: 'Light that cannot be overcome',
    text: 'The light shines in the darkness, and the darkness has not overcome it.',
  },
  {
    ref: '1 John 4:16',
    title: 'Abiding in love',
    text: 'God is love, and whoever abides in love abides in God, and God abides in him.',
  },
]

export function ManifestoPage() {
  usePageTitle('Manifesto · Love & Light')

  return (
    <div className="w-full space-y-14">
      <header className="prism-card grid grid-cols-1 gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14">
        <div className="space-y-5 lg:col-span-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Altar &amp; Sound · Love &amp; Light Manifesto
          </p>
          <h1
            id="main-content"
            tabIndex={-1}
            className="display-cover font-medium text-ink focus:outline-none"
          >
            Finding, curating, and releasing Christian music rooted in{' '}
            <span className="prism-text italic">Love &amp; Light</span>.
          </h1>
          <p className="editorial-prose text-muted">
            Altar &amp; Sound is an independent netlabel and music journal
            inspired by the Sacred Heart of Jesus—a furnace of mercy, beauty,
            and unquenchable light. We seek out musicians offering their highest
            craft upward so that every song becomes an open doorway to God.
          </p>
        </div>

        <div className="flex justify-center lg:col-span-4">
          <div className="rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-100/80 via-rose-100/70 to-amber-50/80 p-6 shadow-inner">
            <SacredHeartEmblem
              variant="hero"
              decorative={false}
              className="h-48 w-48 sm:h-56 sm:w-56"
            />
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Our Four Commitments
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
        className="prism-card space-y-6 rounded-3xl p-7 sm:p-10 lg:p-12"
      >
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            For Listeners Exploring Faith
          </p>
          <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
            The Love &amp; Light behind these songs
          </h2>
          <p className="editorial-prose text-base text-muted">
            You do not have to have everything figured out to spend time here.
            Every song we curate points toward Jesus—whose Sacred Heart burns
            with real mercy for the weary, the curious, and the brokenhearted.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 pt-2 lg:grid-cols-3">
          {SEEKER_READINGS.map((item) => (
            <blockquote
              key={item.ref}
              className="rounded-2xl border border-border bg-surface-elevated/80 p-5 space-y-2"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <BookOpen className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>
                  {item.title} · <strong className="text-ink">{item.ref}</strong>
                </span>
              </div>
              <p className="font-serif italic text-xl leading-relaxed text-ink">
                “{item.text}”
              </p>
            </blockquote>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <Button asChild variant="accent">
            <Link to="/">Explore the Journal</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/catalog">Browse Netlabel Catalog</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
