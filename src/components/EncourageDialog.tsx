import { useEffect, useId, useRef, useState } from 'react'
import { Check, HeartHandshake, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useStore } from '@/context/StoreContext'
import { attachDeferredValidation } from '@/lib/formValidation'

interface EncourageDialogProps {
  recipientId: string
  recipientName: string
  workId?: string
  workTitle?: string
  triggerLabel?: string
  triggerVariant?: 'outline' | 'subtle' | 'ghost' | 'accent' | 'default'
  triggerSize?: 'default' | 'sm' | 'lg'
}

export function EncourageDialog({
  recipientId,
  recipientName,
  workId,
  workTitle,
  triggerLabel = 'Pray / Encourage',
  triggerVariant = 'outline',
  triggerSize = 'sm',
}: EncourageDialogProps) {
  const { addEncouragement } = useStore()
  const [open, setOpen] = useState(false)
  const [kind, setKind] = useState<'prayer' | 'encouragement'>('prayer')
  const [senderName, setSenderName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const uid = useId()

  useEffect(() => {
    if (!open || submitted) return
    return attachDeferredValidation(formRef.current)
  }, [open, submitted])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      const firstInvalid = e.currentTarget.querySelector<HTMLElement>(':invalid')
      firstInvalid?.focus()
      return
    }
    addEncouragement({
      recipientId,
      recipientName,
      workId,
      workTitle,
      senderName: senderName.trim() || 'A listener',
      kind,
      message: message.trim(),
    })
    setSubmitted(true)
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setSubmitted(false)
      setMessage('')
      setSenderName('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize}>
          <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" />
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {submitted ? 'Sent with grace' : `Encourage ${recipientName}`}
          </DialogTitle>
          <DialogDescription>
            {submitted
              ? `Your ${kind} note was delivered privately to ${recipientName}'s Studio Inbox.`
              : workTitle
                ? `Private note regarding “${workTitle}”. Notes on Altar & Sound are never public clout—they go straight to the musician.`
                : 'Notes on Altar & Sound are private to the musician—built for real fellowship, not public metrics.'}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-start gap-4 pt-2">
            <div className="flex items-center gap-2 rounded-sm border border-border bg-surface px-4 py-3 text-sm text-ink w-full">
              <Check className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
              <span>You can also view sent notes in the Studio Inbox preview.</span>
            </div>
            <Button type="button" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 pt-1">
            <fieldset className="flex flex-col gap-2">
              <legend className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                Type of note
              </legend>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  aria-pressed={kind === 'prayer'}
                  onClick={() => setKind('prayer')}
                  className={`flex min-h-10 items-center justify-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors cursor-pointer ${
                    kind === 'prayer'
                      ? 'border-accent bg-accent/12 text-ink font-medium'
                      : 'border-border bg-transparent text-muted hover:text-ink'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Prayer
                </button>
                <button
                  type="button"
                  aria-pressed={kind === 'encouragement'}
                  onClick={() => setKind('encouragement')}
                  className={`flex min-h-10 items-center justify-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors cursor-pointer ${
                    kind === 'encouragement'
                      ? 'border-accent bg-accent/12 text-ink font-medium'
                      : 'border-border bg-transparent text-muted hover:text-ink'
                  }`}
                >
                  <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" />
                  Encouragement
                </button>
              </div>
            </fieldset>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-name`} className="text-sm font-medium text-ink">
                Your name <span className="text-muted font-normal">(optional)</span>
              </label>
              <span id={`${uid}-name-hint`} className="mb-1.5 text-xs text-muted">
                Leave blank to send anonymously as “A listener”.
              </span>
              <input
                id={`${uid}-name`}
                name="senderName"
                type="text"
                autoComplete="name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                aria-describedby={`${uid}-name-hint`}
                placeholder="e.g., Jordan"
                className="rounded-sm border border-border bg-bg px-3 py-2 text-sm text-ink"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor={`${uid}-msg`} className="text-sm font-medium text-ink">
                {kind === 'prayer' ? 'Your prayer' : 'Your note'}
              </label>
              <span id={`${uid}-msg-hint`} className="mb-1.5 text-xs text-muted">
                At least 10 characters. Kept private to the artist.
              </span>
              <textarea
                id={`${uid}-msg`}
                name="message"
                required
                minLength={10}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-describedby={`${uid}-msg-hint`}
                data-error={`${uid}-msg-error`}
                placeholder={
                  kind === 'prayer'
                    ? 'Praying that God uses this song to bring peace to everyone who hears it…'
                    : 'Thank you for sharing both your craft and your story…'
                }
                className="field-input rounded-sm border border-border bg-bg px-3 py-2 text-sm text-ink"
              />
              <div id={`${uid}-msg-error`} className="field-error">
                <span role="img" aria-label="Error">
                  !
                </span>{' '}
                Please write at least 10 characters so your note feels personal.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="accent">
                Send {kind === 'prayer' ? 'Prayer' : 'Encouragement'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
