const STORAGE_KEY = 'color-scheme-v2'

type ExplicitScheme = 'light' | 'dark'

function getActiveScheme(): ExplicitScheme {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]')
  return meta?.content === 'dark' ? 'dark' : 'light'
}

function applyScheme(value: ExplicitScheme) {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]')
  if (meta) meta.content = value
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (themeColor) {
    themeColor.content = value === 'dark' ? '#17132b' : '#fffdf9'
  }
}

/**
 * Radiant Sunlit Light is the brand's luminous default; users can toggle
 * to Twilight Mode (and back) at any time with cross-tab persistence.
 */
export function toggleColorScheme(): void {
  const next: ExplicitScheme = getActiveScheme() === 'dark' ? 'light' : 'dark'
  try {
    if (next === 'light') {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, 'dark')
    }
  } catch {
    // Still apply visually even if storage is blocked
  }
  applyScheme(next)
}

export function subscribeColorSchemeStorage(): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    applyScheme(event.newValue === 'dark' ? 'dark' : 'light')
  }
  window.addEventListener('storage', onStorage)
  return () => window.removeEventListener('storage', onStorage)
}
