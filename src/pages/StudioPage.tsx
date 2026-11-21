import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, HeartHandshake, Link2, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import { parseMediaUrl } from '@/lib/embed'
import { attachDeferredValidation } from '@/lib/formValidation'
import type { ThemeTag } from '@/types/domain'

const THEME_OPTIONS: ThemeTag[] = [
  'Hope',
  'Worship',
  'Testimony',
  'Stillness',
  'Lament',
  'Instrumental',
]

export function StudioPage() {
  usePageTitle('Musician Studio')
  const navigate = useNavigate()
  const { profiles, encouragements, addWork } = useStore()
  const uid = useId()
  const formRef = useRef<HTMLFormElement | null>(null)

  const [profileId, setProfileId] = useState(profiles[0]?.id ?? 'artist-hannah')
  const [title, setTitle] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [genre, setGenre] = useState('Acoustic Folk')
  const [skillsText, setSkillsText] = useState('Vocals, Acoustic Guitar')
  const [selectedThemes, setSelectedThemes] = useState<ThemeTag[]>(['Hope', 'Testimony'])
  const [story, setStory] = useState('')
  const [scriptureRef, setScriptureRef] = useState('')
  const [scriptureExcerpt, setScriptureExcerpt] = useState('')
  const [urlError, setUrlError] = useState<string | null>(null)

  const parsed = useMemo(() => (mediaUrl.trim() ? parseMediaUrl(mediaUrl) : null), [mediaUrl])

  useEffect(() => {
    return attachDeferredValidation(formRef.current)
  }, [])

  const toggleTheme = (theme: ThemeTag) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    )
  }

  const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.querySelector<HTMLElement>(':invalid')?.focus()
      return
    }

    const embed = parseMediaUrl(mediaUrl)
    if (!embed) {
      setUrlError(
        'Please paste a valid YouTube, SoundCloud, Spotify, or Bandcamp link.'
      )
      return
    }
    setUrlError(null)

    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const created = addWork({
      profileId,
      title: title.trim(),
      subtitle: `${embed.providerLabel} Showcase`,
      provider: embed.provider,
      sourceUrl: mediaUrl.trim(),
      embedUrl: embed.embedUrl,
      thumbnailUrl: embed.thumbnailUrl,
      duration: embed.providerLabel,
      coverGradient: 'from-[#2e2319] via-[#181614] to-[#0f0e0d]',
      story: story.trim(),
      scriptureRef: scriptureRef.trim() || undefined,
      scriptureExcerpt: scriptureExcerpt.trim() || undefined,
      skillsUsed: skills.length > 0 ? skills : ['Musicianship'],
      themes: selectedThemes.length > 0 ? selectedThemes : ['Hope'],
      genre: genre.trim() || 'Worship',
    })

    navigate(`/story/${created.slug}`)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">Phase 1 Studio Preview</Badge>
          <span className="text-xs text-muted">
            Zero-cost smart embeds · Saves locally until Supabase Auth connects in Phase 2
          </span>
        </div>
        <h1
          id="main-content"
          tabIndex={-1}
          className="font-serif text-4xl font-medium text-ink sm:text-5xl focus:outline-none"
        >
          Musician Studio
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          Publish a showcase directly from YouTube, SoundCloud, Spotify, or Bandcamp
          with your story behind the song, and read private prayers sent by listeners.
        </p>
      </header>

      <Tabs defaultValue="publish">
        <TabsList>
          <TabsTrigger value="publish">Publish a Work</TabsTrigger>
          <TabsTrigger value="inbox">
            Prayer &amp; Encouragement Inbox ({encouragements.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="publish">
          <form
            ref={formRef}
            onSubmit={handlePublish}
            noValidate
            className="grid grid-cols-1 gap-6 rounded-sm border border-border bg-surface-elevated p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor={`${uid}-artist`} className="mb-1 text-sm font-medium text-ink">
                  Artist folio
                </label>
                <select
                  id={`${uid}-artist`}
                  value={profileId}
                  onChange={(e) => setProfileId(e.target.value)}
                  className="min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                >
                  {profiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-genre`} className="mb-1 text-sm font-medium text-ink">
                  Genre
                </label>
                <input
                  id={`${uid}-genre`}
                  type="text"
                  required
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="Acoustic Folk, Gospel, Classical, Indie…"
                  className="field-input min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-title`} className="text-sm font-medium text-ink">
                Work title
              </label>
              <span id={`${uid}-title-hint`} className="mb-1 text-xs text-muted">
                Name of the song, cover, or instrumental session.
              </span>
              <input
                id={`${uid}-title`}
                type="text"
                required
                minLength={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-describedby={`${uid}-title-hint`}
                data-error={`${uid}-title-err`}
                placeholder="e.g., Psalm 46 (Live Acoustic)"
                className="field-input min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
              />
              <div id={`${uid}-title-err`} className="field-error">
                <span role="img" aria-label="Error">!</span> Please enter a work title (at least 3 characters).
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-url`} className="text-sm font-medium text-ink">
                Media link (YouTube, SoundCloud, Spotify, or Bandcamp)
              </label>
              <span id={`${uid}-url-hint`} className="mb-1 text-xs text-muted">
                Paste a public link—Altar &amp; Sound validates and embeds it at $0 hosting cost.
              </span>
              <div className="relative">
                <Link2
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id={`${uid}-url`}
                  type="url"
                  required
                  value={mediaUrl}
                  onChange={(e) => {
                    setMediaUrl(e.target.value)
                    setUrlError(null)
                  }}
                  aria-describedby={`${uid}-url-hint`}
                  data-error={`${uid}-url-err`}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="field-input min-h-10 w-full rounded-sm border border-border bg-bg pl-9 pr-3 text-sm text-ink"
                />
                <div id={`${uid}-url-err`} className="field-error">
                  <span role="img" aria-label="Error">!</span> Enter a valid URL starting with https://
                </div>
              </div>

              {urlError ? (
                <p role="alert" className="mt-1.5 text-xs text-danger">
                  {urlError}
                </p>
              ) : null}

              {parsed ? (
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Verified {parsed.providerLabel} embed ready to publish
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-skills`} className="text-sm font-medium text-ink">
                Skills / instruments showcased
              </label>
              <span id={`${uid}-skills-hint`} className="mb-1 text-xs text-muted">
                Comma-separated list (e.g., Piano, Vocals, Mixing).
              </span>
              <input
                id={`${uid}-skills`}
                type="text"
                required
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                aria-describedby={`${uid}-skills-hint`}
                className="field-input min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
              />
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-ink">Themes</legend>
              <div className="flex flex-wrap gap-2">
                {THEME_OPTIONS.map((theme) => {
                  const active = selectedThemes.includes(theme)
                  return (
                    <button
                      key={theme}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleTheme(theme)}
                      className={`min-h-9 rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                        active
                          ? 'border-accent bg-accent text-accent-ink'
                          : 'border-border bg-bg text-muted hover:text-ink'
                      }`}
                    >
                      {theme}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-story`} className="text-sm font-medium text-ink">
                Story Behind the Song
              </label>
              <span id={`${uid}-story-hint`} className="mb-1 text-xs text-muted">
                Write honestly for both believers and friends exploring faith (min 20 characters).
              </span>
              <textarea
                id={`${uid}-story`}
                required
                minLength={20}
                rows={5}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                aria-describedby={`${uid}-story-hint`}
                data-error={`${uid}-story-err`}
                placeholder="What season were you walking through, and how did God meet you in this piece?"
                className="field-input rounded-sm border border-border bg-bg px-3 py-2 text-sm text-ink"
              />
              <div id={`${uid}-story-err`} className="field-error">
                <span role="img" aria-label="Error">!</span> Share at least 20 characters of the story behind your music.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor={`${uid}-ref`} className="mb-1 text-sm font-medium text-ink">
                  Scripture reference <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  id={`${uid}-ref`}
                  type="text"
                  value={scriptureRef}
                  onChange={(e) => setScriptureRef(e.target.value)}
                  placeholder="e.g., Psalm 46:10"
                  className="min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor={`${uid}-excerpt`} className="mb-1 text-sm font-medium text-ink">
                  Verse line <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  id={`${uid}-excerpt`}
                  type="text"
                  value={scriptureExcerpt}
                  onChange={(e) => setScriptureExcerpt(e.target.value)}
                  placeholder="Be still, and know that I am God."
                  className="min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
              <Button type="submit" variant="accent" size="lg">
                Publish to Showcase
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="inbox">
          <div className="space-y-4">
            <p className="text-sm text-muted">
              Private prayers and encouragements sent by listeners and fellow
              musicians. Try sending a prayer from any showcase card to see it appear
              here immediately.
            </p>
            {encouragements.map((note) => (
              <article
                key={note.id}
                className="rounded-sm border border-border bg-surface-elevated p-5 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <Badge variant="accent">
                      {note.kind === 'prayer' ? (
                        <Sparkles className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <HeartHandshake className="h-3 w-3" aria-hidden="true" />
                      )}
                      {note.kind === 'prayer' ? 'Prayer' : 'Encouragement'}
                    </Badge>
                    <span>
                      To <strong className="text-ink">{note.recipientName}</strong>
                      {note.workTitle ? ` · on “${note.workTitle}”` : ''}
                    </span>
                  </div>
                  <span>{note.createdAt}</span>
                </div>
                <p className="font-serif text-xl leading-relaxed text-ink">
                  “{note.message}”
                </p>
                <p className="text-xs text-muted">— {note.senderName}</p>
              </article>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
