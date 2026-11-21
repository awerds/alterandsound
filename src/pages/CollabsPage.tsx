import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, MapPin, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { EncourageDialog } from '@/components/EncourageDialog'
import { useStore } from '@/context/StoreContext'
import { usePageTitle } from '@/hooks/usePageTitle'
import { attachDeferredValidation } from '@/lib/formValidation'

export function CollabsPage() {
  usePageTitle('Collab Board')
  const { collabs, profiles, addCollab } = useStore()
  const [filterMode, setFilterMode] = useState<'all' | 'remote' | 'local'>('all')
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [rolesText, setRolesText] = useState('')
  const [location, setLocation] = useState('Remote')
  const [isRemote, setIsRemote] = useState(true)
  const [description, setDescription] = useState('')
  const [authorId, setAuthorId] = useState(profiles[0]?.id ?? 'artist-hannah')
  const formRef = useRef<HTMLFormElement | null>(null)
  const uid = useId()

  useEffect(() => {
    if (!open) return
    return attachDeferredValidation(formRef.current)
  }, [open])

  const filtered = useMemo(() => {
    return collabs.filter((c) => {
      if (filterMode === 'remote') return c.isRemote
      if (filterMode === 'local') return !c.isRemote
      return true
    })
  }, [collabs, filterMode])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.querySelector<HTMLElement>(':invalid')?.focus()
      return
    }
    const author = profiles.find((p) => p.id === authorId) ?? profiles[0]
    const roles = rolesText
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean)

    addCollab({
      profileId: author.id,
      authorName: author.displayName,
      authorHandle: author.handle,
      title: title.trim(),
      description: description.trim(),
      rolesNeeded: roles.length > 0 ? roles : ['Collaborator'],
      isRemote,
      location: location.trim() || (isRemote ? 'Remote' : author.location),
    })

    setTitle('')
    setRolesText('')
    setDescription('')
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            The Circle
          </p>
          <h1
            id="main-content"
            tabIndex={-1}
            className="font-serif text-4xl font-medium text-ink sm:text-5xl focus:outline-none"
          >
            Collaboration Board
          </h1>
          <p className="text-sm leading-relaxed text-muted">
            Find session players, co-writers, mixing engineers, and local worship
            musicians building Kingdom-minded art together.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="accent">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Post a Collab
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Post a Collaboration Call</DialogTitle>
              <DialogDescription>
                Share what you are creating and who you would love to build alongside.
                Saved locally in this Phase 1 preview.
              </DialogDescription>
            </DialogHeader>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4 pt-1"
            >
              <div className="flex flex-col">
                <label htmlFor={`${uid}-author`} className="mb-1 text-sm font-medium text-ink">
                  Posting as
                </label>
                <select
                  id={`${uid}-author`}
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  className="min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                >
                  {profiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.displayName} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-title`} className="text-sm font-medium text-ink">
                  Collab title
                </label>
                <span id={`${uid}-title-hint`} className="mb-1 text-xs text-muted">
                  Summarize the project and key need (min 8 characters).
                </span>
                <input
                  id={`${uid}-title`}
                  type="text"
                  required
                  minLength={8}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  aria-describedby={`${uid}-title-hint`}
                  data-error={`${uid}-title-err`}
                  placeholder="e.g., Looking for violin & mixing for an acoustic hymn single"
                  className="field-input min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                />
                <div id={`${uid}-title-err`} className="field-error">
                  <span role="img" aria-label="Error">!</span> Please enter a clear title (at least 8 characters).
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-roles`} className="text-sm font-medium text-ink">
                  Roles needed
                </label>
                <span id={`${uid}-roles-hint`} className="mb-1 text-xs text-muted">
                  Separate multiple roles with commas.
                </span>
                <input
                  id={`${uid}-roles`}
                  type="text"
                  required
                  value={rolesText}
                  onChange={(e) => setRolesText(e.target.value)}
                  aria-describedby={`${uid}-roles-hint`}
                  data-error={`${uid}-roles-err`}
                  placeholder="Cello, Mixing, Harmony Vocals"
                  className="field-input min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                />
                <div id={`${uid}-roles-err`} className="field-error">
                  <span role="img" aria-label="Error">!</span> List at least one role or instrument needed.
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col">
                  <label htmlFor={`${uid}-loc`} className="mb-1 text-sm font-medium text-ink">
                    Location
                  </label>
                  <input
                    id={`${uid}-loc`}
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Remote or City, State"
                    className="min-h-10 rounded-sm border border-border bg-bg px-3 text-sm text-ink"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="inline-flex items-center gap-2 text-sm text-ink cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRemote}
                      onChange={(e) => setIsRemote(e.target.checked)}
                      className="h-4 w-4"
                    />
                    Open to remote stems
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`${uid}-desc`} className="text-sm font-medium text-ink">
                  Vision &amp; details
                </label>
                <span id={`${uid}-desc-hint`} className="mb-1 text-xs text-muted">
                  Describe the heart of the song/event and timeline (min 20 characters).
                </span>
                <textarea
                  id={`${uid}-desc`}
                  required
                  minLength={20}
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  aria-describedby={`${uid}-desc-hint`}
                  data-error={`${uid}-desc-err`}
                  placeholder="Share the heart of the project, references, and how people can contribute…"
                  className="field-input rounded-sm border border-border bg-bg px-3 py-2 text-sm text-ink"
                />
                <div id={`${uid}-desc-err`} className="field-error">
                  <span role="img" aria-label="Error">!</span> Please add at least 20 characters describing the collaboration.
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="accent">
                  Publish Collab
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter collaborations by location">
        {[
          { key: 'all', label: 'All Listings' },
          { key: 'remote', label: 'Remote Friendly' },
          { key: 'local', label: 'In-Person / Local' },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={filterMode === item.key}
            onClick={() => setFilterMode(item.key as 'all' | 'remote' | 'local')}
            className={`min-h-9 rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              filterMode === item.key
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-border bg-bg text-muted hover:text-ink'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {filtered.map((collab) => (
          <article
            key={collab.id}
            className="flex flex-col justify-between gap-5 rounded-sm border border-border bg-surface-elevated p-6 md:flex-row md:items-start"
          >
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <Badge variant="accent">Open</Badge>
                <span className="inline-flex items-center gap-1">
                  {collab.isRemote ? (
                    <Globe className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  ) : (
                    <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  )}
                  {collab.location}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  Posted by{' '}
                  <Link
                    to={`/artists/${collab.authorHandle}`}
                    className="font-medium text-ink hover:text-accent"
                  >
                    {collab.authorName}
                  </Link>
                </span>
              </div>

              <h2 className="font-serif text-2xl font-medium text-ink">
                {collab.title}
              </h2>

              <p className="text-sm leading-relaxed text-muted">
                {collab.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {collab.rolesNeeded.map((role) => (
                  <Badge key={role}>{role}</Badge>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:flex-col md:items-end">
              <EncourageDialog
                recipientId={collab.profileId}
                recipientName={collab.authorName}
                workTitle={collab.title}
                triggerLabel="Offer to Collab"
                triggerVariant="default"
                triggerSize="default"
              />
              <span className="text-xs text-muted">{collab.createdAt}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
