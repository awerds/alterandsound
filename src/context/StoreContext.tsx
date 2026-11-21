import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { SEED_ARTICLES, SEED_NOTES, SEED_RELEASES } from '@/data/catalog'
import type {
  ArticleCategory,
  JournalArticle,
  MediaProvider,
  NetlabelRelease,
  ReaderNote,
} from '@/types/domain'

const STORAGE_KEYS = {
  releases: 'altarandsound:netlabel:releases:v3',
  articles: 'altarandsound:netlabel:articles:v3',
  notes: 'altarandsound:netlabel:notes:v3',
} as const

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export interface PublishSubmissionInput {
  title: string
  artistName: string
  artistOrigin: string
  genre: string
  category: ArticleCategory
  provider: Exclude<MediaProvider, 'studio-preview'>
  sourceUrl: string
  embedUrl: string
  thumbnailUrl?: string
  dek: string
  linerNotes: string
  faithNote: string
  scriptureRef?: string
  scriptureExcerpt?: string
}

interface StoreContextValue {
  releases: NetlabelRelease[]
  articles: JournalArticle[]
  notes: ReaderNote[]
  getReleaseById: (id: string) => NetlabelRelease | undefined
  getReleaseBySlug: (slug: string) => NetlabelRelease | undefined
  getArticleBySlug: (slug: string) => JournalArticle | undefined
  getArticlesForRelease: (releaseId: string) => JournalArticle[]
  publishSubmission: (
    input: PublishSubmissionInput
  ) => { release: NetlabelRelease; article: JournalArticle }
  addReaderNote: (note: Omit<ReaderNote, 'id' | 'createdAt'>) => ReaderNote
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [releases, setReleases] = useState<NetlabelRelease[]>(() =>
    loadStored(STORAGE_KEYS.releases, SEED_RELEASES)
  )
  const [articles, setArticles] = useState<JournalArticle[]>(() =>
    loadStored(STORAGE_KEYS.articles, SEED_ARTICLES)
  )
  const [notes, setNotes] = useState<ReaderNote[]>(() =>
    loadStored(STORAGE_KEYS.notes, SEED_NOTES)
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.releases, JSON.stringify(releases))
    } catch {}
  }, [releases])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.articles, JSON.stringify(articles))
    } catch {}
  }, [articles])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes))
    } catch {}
  }, [notes])

  const value = useMemo<StoreContextValue>(
    () => ({
      releases,
      articles,
      notes,
      getReleaseById: (id) => releases.find((r) => r.id === id),
      getReleaseBySlug: (slug) =>
        releases.find((r) => r.slug === slug || r.id === slug),
      getArticleBySlug: (slug) =>
        articles.find((a) => a.slug === slug || a.id === slug),
      getArticlesForRelease: (releaseId) =>
        articles.filter((a) => a.releaseId === releaseId),
      publishSubmission: (input) => {
        const nextNum = String(releases.length + 1).padStart(3, '0')
        const slugBase = input.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
        const stamp = Date.now().toString(36).slice(-4)
        const relId = `rel-${Date.now()}`
        const relSlug = `${slugBase || 'release'}-${stamp}`

        const release: NetlabelRelease = {
          id: relId,
          catalogNumber: `A&S — ${nextNum}`,
          slug: relSlug,
          title: input.title.trim(),
          artistName: input.artistName.trim(),
          artistOrigin: input.artistOrigin.trim() || 'Independent',
          releaseDate: new Date().toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          }),
          format: `Curated Stream · ${input.provider.toUpperCase()}`,
          genre: input.genre.trim() || 'Sacred Indie',
          moods: ['Curated Pick', input.genre.trim() || 'Worship'],
          provider: input.provider,
          sourceUrl: input.sourceUrl.trim(),
          embedUrl: input.embedUrl,
          thumbnailUrl: input.thumbnailUrl,
          sleeveMotif: 'arch',
          sleevePalette: {
            bg: '#6d28d9',
            via: '#ec4899',
            to: '#f59e0b',
            fg: '#fffaf5',
            accent: '#fde68a',
            glow: 'rgba(236, 72, 153, 0.52)',
          },
          linerNotes: input.linerNotes.trim(),
          faithNote: input.faithNote.trim(),
          scriptureRef: input.scriptureRef?.trim() || undefined,
          scriptureExcerpt: input.scriptureExcerpt?.trim() || undefined,
          credits: [
            `Performed by ${input.artistName.trim()}`,
            'Published via Altar & Sound Submission Desk',
          ],
          tracks: [
            {
              id: `tr-${Date.now()}`,
              number: '01',
              title: input.title.trim(),
              duration: 'Stream',
              musicalKey: input.genre.trim() || 'Featured',
              previewChords: [
                [146.83, 220.0, 277.18, 369.99],
                [196.0, 246.94, 293.66, 369.99],
              ],
            },
          ],
        }

        const article: JournalArticle = {
          id: `art-${Date.now()}`,
          slug: `feature-${relSlug}`,
          issueNumber: 'ISSUE 01',
          category: input.category,
          title: `${input.artistName.trim()} — ${input.title.trim()}`,
          dek: input.dek.trim(),
          author: 'Altar & Sound Desk',
          authorRole: 'Community Curated',
          publishedAt: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          readingTime: '3 min read',
          releaseId: relId,
          pullQuote: input.faithNote.trim(),
          paragraphs: [input.linerNotes.trim(), input.faithNote.trim()],
          scriptureRef: input.scriptureRef?.trim() || undefined,
          scriptureExcerpt: input.scriptureExcerpt?.trim() || undefined,
          tags: [input.genre.trim() || 'Worship', input.category],
        }

        setReleases((prev) => [release, ...prev])
        setArticles((prev) => [article, ...prev])
        return { release, article }
      },
      addReaderNote: (input) => {
        const created: ReaderNote = {
          ...input,
          id: `note-${Date.now()}`,
          createdAt: new Date().toISOString().slice(0, 10),
        }
        setNotes((prev) => [created, ...prev])
        return created
      },
    }),
    [releases, articles, notes]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
