// Syncs aria-invalid, dynamic aria-describedby error links, and polite live-region announcements
// with native :user-invalid (with automatic fallback if :user-invalid is unsupported).

let announcerEl: HTMLDivElement | null = null
let announceTimer: number | undefined
let announcedField: Element | null = null

function getAnnouncer(): HTMLDivElement {
  if (announcerEl && document.body.contains(announcerEl)) return announcerEl
  const el = document.createElement('div')
  el.setAttribute('aria-live', 'polite')
  el.className = 'visually-hidden'
  document.body.append(el)
  announcerEl = el
  return el
}

function linkError(el: HTMLElement, shown: boolean) {
  const errorId = el.dataset.error
  if (!errorId) return
  const ids = (el.getAttribute('aria-describedby') || '')
    .split(/\s+/)
    .filter((id) => id && id !== errorId)
  if (shown) ids.push(errorId)
  if (ids.length) el.setAttribute('aria-describedby', ids.join(' '))
  else el.removeAttribute('aria-describedby')
}

function spokenText(node: HTMLElement): string {
  const copy = node.cloneNode(true) as HTMLElement
  copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove())
  copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
    n.replaceWith(`${n.getAttribute('aria-label')}: `)
  })
  return (copy.textContent || '').replace(/\s+/g, ' ').trim()
}

function announceError(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const errorId = el.dataset.error
  if (!errorId) return
  const errorNode = document.getElementById(errorId)
  if (!errorNode) return
  const labelText = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : ''
  const announcer = getAnnouncer()
  window.clearTimeout(announceTimer)
  announcer.textContent = ''
  announcedField = el
  announceTimer = window.setTimeout(() => {
    announcer.textContent = labelText + spokenText(errorNode)
  }, 500)
}

export function attachDeferredValidation(form: HTMLFormElement | null): () => void {
  if (!form) return () => {}

  const supportsUserInvalid = typeof CSS !== 'undefined' && CSS.supports('selector(:user-invalid)')
  const flagged = new WeakSet<Element>()
  const announced = new WeakSet<Element>()
  const dirtyFallback = new WeakMap<Element, { interacted: boolean; blurred: boolean }>()

  const isFormField = (
    el: EventTarget | null
  ): el is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
    el instanceof HTMLElement && el.matches('input, select, textarea')

  const syncAria = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, announce = false) => {
    let invalid: boolean
    if (supportsUserInvalid) {
      invalid = el.matches(':user-invalid')
    } else {
      const state = dirtyFallback.get(el)
      const committed = Boolean(state?.interacted && state?.blurred)
      invalid = committed && !el.validity.valid
      el.classList.toggle('user-invalid-fallback', invalid)
      el.classList.toggle('user-valid-fallback', committed && el.validity.valid)
    }

    if (invalid) {
      if (announce && !announced.has(el)) {
        announceError(el)
        announced.add(el)
      }
      el.setAttribute('aria-invalid', 'true')
      linkError(el, true)
      flagged.add(el)
    } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
      el.setAttribute('aria-invalid', 'false')
      linkError(el, false)
      flagged.delete(el)
      announced.delete(el)
      if (announcedField === el && announcerEl) {
        window.clearTimeout(announceTimer)
        announcerEl.textContent = ''
      }
    }
  }

  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, select, textarea').forEach(
    (el) => syncAria(el)
  )

  const onBlur = (e: Event) => {
    if (!isFormField(e.target)) return
    if (!supportsUserInvalid) {
      const st = dirtyFallback.get(e.target) ?? { interacted: false, blurred: false }
      st.blurred = true
      dirtyFallback.set(e.target, st)
    }
    syncAria(e.target, true)
  }

  const onInput = (e: Event) => {
    if (!isFormField(e.target)) return
    if (!supportsUserInvalid) {
      const st = dirtyFallback.get(e.target) ?? { interacted: false, blurred: false }
      st.interacted = true
      dirtyFallback.set(e.target, st)
    }
    if (e.target.hasAttribute('aria-invalid')) syncAria(e.target)
  }

  const onChange = (e: Event) => {
    if (!isFormField(e.target)) return
    if (!supportsUserInvalid) {
      const st = dirtyFallback.get(e.target) ?? { interacted: false, blurred: false }
      st.interacted = true
      dirtyFallback.set(e.target, st)
    }
    syncAria(e.target, true)
  }

  const onInvalid = (e: Event) => {
    if (!isFormField(e.target)) return
    if (!supportsUserInvalid) {
      dirtyFallback.set(e.target, { interacted: true, blurred: true })
    }
    announced.add(e.target)
    syncAria(e.target)
  }

  const onReset = () => {
    window.setTimeout(() => {
      form
        .querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, select, textarea')
        .forEach((el) => {
          dirtyFallback.delete(el)
          el.classList.remove('user-invalid-fallback', 'user-valid-fallback')
          syncAria(el)
        })
    })
  }

  form.addEventListener('blur', onBlur, true)
  form.addEventListener('input', onInput)
  form.addEventListener('change', onChange, true)
  form.addEventListener('invalid', onInvalid, true)
  form.addEventListener('reset', onReset, true)

  return () => {
    form.removeEventListener('blur', onBlur, true)
    form.removeEventListener('input', onInput)
    form.removeEventListener('change', onChange, true)
    form.removeEventListener('invalid', onInvalid, true)
    form.removeEventListener('reset', onReset, true)
  }
}
