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
  'Artist Spotlight',
  'Album Review',
  'Essay',
  'Artist Interview',
  'Listening Guide',
]

export function SubmitPage() {
  usePageTitle('Submit Music for Review')
  const navigate = useNavigate()
  const { notes, publishFeature } = useStore()
  const uid = useId()
  const formRef = useRef<HTMLFormElement | null>(null)

  const [artistName, setArtistName] = useState('')
  const [artistOrigin, setArtistOrigin] = useState('')
  const [songTitle, setSongTitle] = useState('')
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('Christian Americana & Folk')
  const [category, setCategory] = useState<ArticleCategory>('Artist Spotlight')
  const [mediaUrl, setMediaUrl] = useState('')
  const [dek, setDek] = useState('')
  const [reviewBody, setReviewBody] = useState('')
  const [faithNote, setFaithNote] = useState('')
  const [scriptureRef, setScriptureRef] = useState('')
  const [scriptureExcerpt, setScriptureExcerpt] = useState('')
  const [youtubeChannel, setYoutubeChannel] = useState('')
  const [spotifyUrl, setSpotifyUrl] = useState('')
  const [appleMusicUrl, setAppleMusicUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
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

    const article = publishFeature({
      title: title.trim() || `${artistName.trim()} — ${songTitle.trim()}`,
      songTitle,
      artistName,
      artistOrigin,
      genre,
      category,
      provider: embed.provider,
      sourceUrl: mediaUrl,
      embedUrl: embed.embedUrl,
      thumbnailUrl: embed.thumbnailUrl,
      dek,
      reviewBody,
      faithNote,
      scriptureRef,
      scriptureExcerpt,
      outlets: {
        youtube: youtubeChannel.trim() || (embed.provider === 'youtube' ? mediaUrl.trim() : undefined),
        spotify: spotifyUrl.trim() || undefined,
        appleMusic: appleMusicUrl.trim() || undefined,
        instagram: instagramUrl.trim() || undefined,
      },
    })

    navigate(`/journal/${article.slug}`)
  }

  return (
    <div className="w-full space-y-8">
      <header className="max-w-3xl space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">Editorial Submission Desk</Badge>
          <span className="font-mono text-xs text-muted">
            100% Free Artist Spotlights · Embedded YouTube, Spotify, SoundCloud &amp; Bandcamp
          </span>
        </div>
        <h1
          id="main-content"
          tabIndex={-1}
          className="display-cover font-medium text-ink focus:outline-none"
        >
          Submit <span className="prism-text italic">Music</span>
        </h1>
        <p className="font-editorial text-lg leading-relaxed text-muted">
          Pitch an independent Christian artist, song, or album for an editorial
          review on Altar &amp; Sound. Include links to YouTube, Spotify, Apple
          Music, and Instagram so readers can stream and follow the artist directly.
        </p>
      </header>

      <Tabs defaultValue="submit">
        <TabsList>
          <TabsTrigger value="submit">Publish / Preview Feature</TabsTrigger>
          <TabsTrigger value="inbox">
            Prayer &amp; Reader Inbox ({notes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submit">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="prism-card grid grid-cols-1 gap-6 rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col">
                <label htmlFor={`${uid}-artist`} className="text-sm font-medium text-ink">
                  Artist name
                </label>
                <span id={`${uid}-artist-hint`} className="mb-1 text-xs text-muted">
                  Musician or band name.
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
                  placeholder="e.g., Jimmy Clifton"
                  className="field-input min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
                <div id={`${uid}-artist-err`} className="field-error">
                  <span role="img" aria-label="Error">!</span> Enter the artist name.
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-origin`} className="text-sm font-medium text-ink">
                  Hometown / Region
                </label>
                <span id={`${uid}-origin-hint`} className="mb-1 text-xs text-muted">
                  City or state.
                </span>
                <input
                  id={`${uid}-origin`}
                  type="text"
                  value={artistOrigin}
                  onChange={(e) => setArtistOrigin(e.target.value)}
                  aria-describedby={`${uid}-origin-hint`}
                  placeholder="e.g., North Carolina"
                  className="min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-genre`} className="text-sm font-medium text-ink">
                  Genre
                </label>
                <span className="mb-1 text-xs text-muted">Sonic style.</span>
                <input
                  id={`${uid}-genre`}
                  type="text"
                  required
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="Christian Americana, Folk, Gospel…"
                  className="field-input min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex flex-col">
                <label htmlFor={`${uid}-song`} className="text-sm font-medium text-ink">
                  Featured song / video title
                </label>
                <span id={`${uid}-song-hint`} className="mb-1 text-xs text-muted">
                  Name of the embedded track.
                </span>
                <input
                  id={`${uid}-song`}
                  type="text"
                  required
                  minLength={2}
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  aria-describedby={`${uid}-song-hint`}
                  data-error={`${uid}-song-err`}
                  placeholder="e.g., Outcasts (Lyric Video)"
                  className="field-input min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
                <div id={`${uid}-song-err`} className="field-error">
                  <span role="img" aria-label="Error">!</span> Enter the featured song title.
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-headline`} className="text-sm font-medium text-ink">
                  Article headline
                </label>
                <span className="mb-1 text-xs text-muted">Optional custom headline.</span>
                <input
                  id={`${uid}-headline`}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Leave blank to use Artist — Song"
                  className="min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-cat`} className="text-sm font-medium text-ink">
                  Journal column
                </label>
                <span className="mb-1 text-xs text-muted">Editorial category.</span>
                <select
                  id={`${uid}-cat`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                  className="min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
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
                Lead track embed URL (YouTube, Spotify, SoundCloud, or Bandcamp)
              </label>
              <span id={`${uid}-url-hint`} className="mb-1 text-xs text-muted">
                Paste a public watch/track URL to embed it cleanly at $0 hosting cost.
              </span>
              <div className="relative">
                <Link2
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
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
                  className="field-input min-h-10 w-full rounded-xl border border-border bg-bg pl-10 pr-3.5 text-sm text-ink"
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

            {/* Artist Promotion Links */}
            <fieldset className="space-y-3 rounded-2xl border border-border bg-surface/60 p-4 sm:p-5">
              <legend className="px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Artist Promotion &amp; Streaming Links (Optional)
              </legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="url"
                  aria-label="YouTube channel URL"
                  value={youtubeChannel}
                  onChange={(e) => setYoutubeChannel(e.target.value)}
                  placeholder="YouTube channel (https://youtube.com/@...)"
                  className="min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
                <input
                  type="url"
                  aria-label="Spotify artist URL"
                  value={spotifyUrl}
                  onChange={(e) => setSpotifyUrl(e.target.value)}
                  placeholder="Spotify artist link"
                  className="min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
                <input
                  type="url"
                  aria-label="Apple Music artist URL"
                  value={appleMusicUrl}
                  onChange={(e) => setAppleMusicUrl(e.target.value)}
                  placeholder="Apple Music artist link"
                  className="min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
                <input
                  type="url"
                  aria-label="Instagram URL"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="Instagram link"
                  className="min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
              </div>
            </fieldset>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-dek`} className="text-sm font-medium text-ink">
                Summary hook (dek)
              </label>
              <span id={`${uid}-dek-hint`} className="mb-1 text-xs text-muted">
                1–2 sentences introducing why this artist matters (min 15 characters).
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
                placeholder="Why should listeners stop and play this record today?"
                className="field-input min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
              />
              <div id={`${uid}-dek-err`} className="field-error">
                <span role="img" aria-label="Error">!</span> Write at least 15 characters for the summary hook.
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-review`} className="text-sm font-medium text-ink">
                Review &amp; musical notes
              </label>
              <span id={`${uid}-review-hint`} className="mb-1 text-xs text-muted">
                Sound, vocal character, instrumentation, standout moments (min 20 characters).
              </span>
              <textarea
                id={`${uid}-review`}
                required
                minLength={20}
                rows={4}
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
                aria-describedby={`${uid}-review-hint`}
                data-error={`${uid}-review-err`}
                placeholder="Describe the artistry, tone, and songwriting craft…"
                className="field-input rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm text-ink"
              />
              <div id={`${uid}-review-err`} className="field-error">
                <span role="img" aria-label="Error">!</span> Add at least 20 characters for the review.
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-faith`} className="text-sm font-medium text-ink">
                Love &amp; Light reflection (the heart behind the music)
              </label>
              <span id={`${uid}-faith-hint`} className="mb-1 text-xs text-muted">
                How does this music point people toward the heart of Jesus? (min 20 characters).
              </span>
              <textarea
                id={`${uid}-faith`}
                required
                minLength={20}
                rows={3}
                value={faithNote}
                onChange={(e) => setFaithNote(e.target.value)}
                aria-describedby={`${uid}-faith-hint`}
                data-error={`${uid}-faith-err`}
                placeholder="Share the testimony or Gospel heart behind the song…"
                className="field-input rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm text-ink"
              />
              <div id={`${uid}-faith-err`} className="field-error">
                <span role="img" aria-label="Error">!</span> Share at least 20 characters on the heart behind the music.
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
                  placeholder="e.g., John 8:12"
                  className="min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
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
                  placeholder="I am the light of the world…"
                  className="min-h-10 rounded-xl border border-border bg-bg px-3.5 text-sm text-ink"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-border pt-5">
              <Button type="submit" variant="accent" size="lg">
                Publish Artist Spotlight
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="inbox">
          <div className="space-y-4">
            <p className="text-sm text-muted">
              Private prayers and encouragement notes sent by readers from artist
              features.
            </p>
            {notes.length === 0 ? (
              <div className="prism-card rounded-2xl p-8 text-center">
                <p className="font-serif text-2xl text-ink">Inbox is clear.</p>
                <p className="mt-1 text-sm text-muted">
                  Send a prayer or encouragement note from any artist feature to see
                  it delivered here.
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
