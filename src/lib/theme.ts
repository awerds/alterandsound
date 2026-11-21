const STORAGE_KEY = 'color-scheme'

type ExplicitScheme = 'light' | 'dark'

function getSystemScheme(): ExplicitScheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredScheme(): ExplicitScheme | null {
  try {
    const val = localStorage.getItem(STORAGE_KEY)
    return val === 'light' || val === 'dark' ? val : null
  } catch {
    return null
  }
}

function applyMetaContent(value: 'light dark' | ExplicitScheme) {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]')
  if (meta) {
    meta.content = value
  }
}

/**
 * Two-state toggle following modern color-scheme guidance:
 * - Target = opposite of currently rendered scheme.
 * - If target matches system preference, remove stored value so page reverts to system tracking.
 * - Otherwise store literal scheme override.
 */
export function toggleColorScheme(): void {
  const system = getSystemScheme()
  const rendered = getStoredScheme() ?? system
  const target: ExplicitScheme = rendered === 'dark' ? 'light' : 'dark'

  if (target === system) {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Still apply in-memory even if storage is blocked
    }
    applyMetaContent('light dark')
  } else {
    try {
      localStorage.setItem(STORAGE_KEY, target)
    } catch {
      // Still apply in-memory even if storage is blocked
    }
    applyMetaContent(target)
  }
}

export function subscribeColorSchemeStorage(): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    const next = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : 'light dark'
    applyMetaContent(next)
  }
  window.addEventListener('storage', onStorage)
  return () => window.removeEventListener('storage', onStorage)
}
