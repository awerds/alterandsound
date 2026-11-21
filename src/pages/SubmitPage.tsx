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
import type { ArticleCategory } from '@/types/domain'

const COLUMN_OPTIONS: ArticleCategory[] = [
  'Album Review',
  'Live Session',
  'Essay',
  'Artist Interview',
  'Listening Guide',
]

export function SubmitPage() {
  usePageTitle('Submit a Record')
  const navigate = useNavigate()
  const { notes, publishSubmission } = useStore()
  const uid = useId()
  const formRef = useRef<HTMLFormElement | null>(null)

  const [title, setTitle] = useState('')
  const [artistName, setArtistName] = useState('')
  const [artistOrigin, setArtistOrigin] = useState('')
  const [genre, setGenre] = useState('Acoustic Folk')
  const [category, setCategory] = useState<ArticleCategory>('Live Session')
  const [mediaUrl, setMediaUrl] = useState('')
  const [dek, setDek] = useState('')
  const [linerNotes, setLinerNotes] = useState('')
  const [faithNote, setFaithNote] = useState('')
  const [scriptureRef, setScriptureRef] = useState('')
  const [scriptureExcerpt, setScriptureExcerpt] = useState('')
  const [urlError, setUrlError] = useState<string | null>(null)

  const parsed = useMemo(
    () => (mediaUrl.trim() ? parseMediaUrl(mediaUrl) : null),
    [mediaUrl]
  )

  useEffect(() => {
    return attachDeferredValidation(formRef.current)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.querySelector<HTMLElement>(':invalid')?.focus()
      return
    }

    const embed = parseMediaUrl(mediaUrl)
    if (!embed) {
      setUrlError(
        'Paste a valid YouTube, SoundCloud, Spotify, or Bandcamp link.'
      )
      return
    }
    setUrlError(null)

    const { article } = publishSubmission({
      title,
      artistName,
      artistOrigin,
      genre,
      category,
      provider: embed.provider,
      sourceUrl: mediaUrl,
      embedUrl: embed.embedUrl,
      thumbnailUrl: embed.thumbnailUrl,
      dek,
      linerNotes,
      faithNote,
      scriptureRef,
      scriptureExcerpt,
    })

    navigate(`/journal/${article.slug}`)
  }

  return (
    <div className="w-full space-y-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">Netlabel &amp; Editorial Desk</Badge>
          <span className="font-mono text-xs text-muted">
            Zero-cost smart embeds · Preview publishes immediately to your browser
          </span>
        </div>
        <h1
          id="main-content"
          tabIndex={-1}
          className="display-cover font-medium text-ink focus:outline-none"
        >
          Submit a Record
        </h1>
        <p className="max-w-2xl font-editorial text-lg leading-relaxed text-muted">
          Pitch an album, single, or live room session for the Altar &amp; Sound
          netlabel catalog and music journal. Paste a link from YouTube, SoundCloud,
          Spotify, or Bandcamp to preview how it publishes.
        </p>
      </header>

      <Tabs defaultValue="submit">
        <TabsList>
          <TabsTrigger value="submit">Pitch &amp; Publish Record</TabsTrigger>
          <TabsTrigger value="inbox">
            Editorial &amp; Prayer Inbox ({notes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submit">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="grid grid-cols-1 gap-6 rounded-sm border border-border bg-surface-elevated p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor={`${uid}-artist`} className="text-sm font-medium text-ink">
                  Artist or ensemble name
                </label>
                <span id={`${uid}-artist-hint`} className="mb-1 text-xs text-muted">
                  Who recorded this release?
                </span>
                <input
                  id={`${uid}-artist`}
                  type="text"
                  required
                  minLength={2}
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  aria-describedby={`${uid}-artist-hint`}
                  data-error={`${uid}-artist-err`}
                  placeholder="e.g., Sarah & The Cedar Strings"
                  className="field-input min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                />
                <div id={`${uid}-artist-err`} className="field-error">
                  <span role="img" aria-label="Error">!</span> Enter the artist or ensemble name.
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-origin`} className="text-sm font-medium text-ink">
                  City / origin
                </label>
                <span id={`${uid}-origin-hint`} className="mb-1 text-xs text-muted">
                  Where was it recorded?
                </span>
                <input
                  id={`${uid}-origin`}
                  type="text"
                  value={artistOrigin}
                  onChange={(e) => setArtistOrigin(e.target.value)}
                  aria-describedby={`${uid}-origin-hint`}
                  placeholder="e.g., Portland, OR"
                  className="min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex flex-col sm:col-span-1">
                <label htmlFor={`${uid}-title`} className="text-sm font-medium text-ink">
                  Release / song title
                </label>
                <span id={`${uid}-title-hint`} className="mb-1 text-xs text-muted">
                  Min 3 characters.
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
                  placeholder="e.g., Night Watch EP"
                  className="field-input min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                />
                <div id={`${uid}-title-err`} className="field-error">
                  <span role="img" aria-label="Error">!</span> Enter a title (at least 3 characters).
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-genre`} className="mb-1 text-sm font-medium text-ink">
                  Genre
                </label>
                <span className="mb-1 text-xs text-muted">Primary sonic lane.</span>
                <input
                  id={`${uid}-genre`}
                  type="text"
                  required
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="Acoustic Folk, Gospel, Classical…"
                  className="field-input min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-cat`} className="mb-1 text-sm font-medium text-ink">
                  Journal column
                </label>
                <span className="mb-1 text-xs text-muted">Editorial placement.</span>
                <select
                  id={`${uid}-cat`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                  className="min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                >
                  {COLUMN_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-url`} className="text-sm font-medium text-ink">
                Listening link (YouTube, SoundCloud, Spotify, or Bandcamp)
              </label>
              <span id={`${uid}-url-hint`} className="mb-1 text-xs text-muted">
                We validate the domain and embed it cleanly inside the Journal &amp; Catalog at $0 bandwidth cost.
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
                  placeholder="https://www.youtube.com/watch?v=... or https://open.spotify.com/track/..."
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
                  Verified {parsed.providerLabel} embed ready for Catalog &amp; Journal
                </div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-dek`} className="text-sm font-medium text-ink">
                Editorial headline dek (1-sentence hook)
              </label>
              <span id={`${uid}-dek-hint`} className="mb-1 text-xs text-muted">
                Appears beneath the headline on the front page (min 15 characters).
              </span>
              <input
                id={`${uid}-dek`}
                type="text"
                required
                minLength={15}
                value={dek}
                onChange={(e) => setDek(e.target.value)}
                aria-describedby={`${uid}-dek-hint`}
                data-error={`${uid}-dek-err`}
                placeholder="e.g., A stripped-back acoustic meditation recorded live in an old brick loft."
                className="field-input min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
              />
              <div id={`${uid}-dek-err`} className="field-error">
                <span role="img" aria-label="Error">!</span> Write a short hook (at least 15 characters).
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-liner`} className="text-sm font-medium text-ink">
                Liner notes &amp; musical craft
              </label>
              <span id={`${uid}-liner-hint`} className="mb-1 text-xs text-muted">
                Instruments, recording room, sonic influences (min 20 characters).
              </span>
              <textarea
                id={`${uid}-liner`}
                required
                minLength={20}
                rows={3}
                value={linerNotes}
                onChange={(e) => setLinerNotes(e.target.value)}
                aria-describedby={`${uid}-liner-hint`}
                data-error={`${uid}-liner-err`}
                placeholder="Tell listeners about the room, instruments, and musical vision…"
                className="field-input rounded-sm border border-border bg-bg px-3 py-2 text-sm text-ink"
              />
              <div id={`${uid}-liner-err`} className="field-error">
                <span role="img" aria-label="Error">!</span> Add at least 20 characters of liner notes.
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-faith`} className="text-sm font-medium text-ink">
                Faith story behind the music
              </label>
              <span id={`${uid}-faith-hint`} className="mb-1 text-xs text-muted">
                Written honestly for both believers and seekers (min 20 characters).
              </span>
              <textarea
                id={`${uid}-faith`}
                required
                minLength={20}
                rows={4}
                value={faithNote}
                onChange={(e) => setFaithNote(e.target.value)}
                aria-describedby={`${uid}-faith-hint`}
                data-error={`${uid}-faith-err`}
                placeholder="How does this song point listeners toward God?"
                className="field-input rounded-sm border border-border bg-bg px-3 py-2 text-sm text-ink"
              />
              <div id={`${uid}-faith-err`} className="field-error">
                <span role="img" aria-label="Error">!</span> Share at least 20 characters on the heart behind the record.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label htmlFor={`${uid}-ref`} className="mb-1 text-sm font-medium text-ink">
                  Scripture reference <span className="font-normal text-muted">(optional)</span>
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
                  Verse line <span className="font-normal text-muted">(optional)</span>
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

            <div className="flex justify-end border-t border-border pt-5">
              <Button type="submit" variant="accent" size="lg">
                Publish to Catalog &amp; Journal
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="inbox">
          <div className="space-y-4">
            <p className="text-sm text-muted">
              Private prayers and reader notes submitted from articles and release
              pages—keeping community personal and free of public comment noise.
            </p>
            {notes.length === 0 ? (
              <div className="prism-card rounded-2xl p-8 text-center">
                <p className="font-serif text-2xl text-ink">Inbox is clear.</p>
                <p className="mt-1 text-sm text-muted">
                  Private prayers and reader notes sent from published articles or
                  releases will appear here.
                </p>
              </div>
            ) : (
              notes.map((note) => (
                <article
                  key={note.id}
                  className="prism-card rounded-2xl p-5 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
                    <div className="flex items-center gap-2">
                      <Badge variant="accent">
                        {note.kind === 'prayer' ? (
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <HeartHandshake className="h-3 w-3" aria-hidden="true" />
                        )}
                        {note.kind === 'prayer' ? 'Prayer' : 'Reader Note'}
                      </Badge>
                      <span>
                        To <strong className="text-ink">{note.recipientName}</strong>
                        {note.contextTitle ? ` · ${note.contextTitle}` : ''}
                      </span>
                    </div>
                    <span>{note.createdAt}</span>
                  </div>
                  <p className="font-serif text-xl leading-relaxed text-ink">
                    “{note.message}”
                  </p>
                  <p className="font-mono text-xs text-muted">— {note.senderName}</p>
                </article>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
