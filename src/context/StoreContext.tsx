import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { SEED_ARTICLES, SEED_NOTES } from '@/data/journal'
import type {
  ArticleCategory,
  ArtistOutlets,
  JournalArticle,
  MediaProvider,
  ReaderNote,
} from '@/types/domain'

const STORAGE_KEYS = {
  articles: 'altarandsound:journal:articles:v6',
  notes: 'altarandsound:journal:notes:v6',
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

export interface PublishFeatureInput {
  title: string
  songTitle: string
  artistName: string
  artistOrigin: string
  genre: string
  category: ArticleCategory
  provider: MediaProvider
  sourceUrl: string
  embedUrl: string
  thumbnailUrl?: string
  dek: string
  reviewBody: string
  faithNote: string
  scriptureRef?: string
  scriptureExcerpt?: string
  outlets: ArtistOutlets
}

interface StoreContextValue {
  articles: JournalArticle[]
  notes: ReaderNote[]
  getArticleBySlug: (slug: string) => JournalArticle | undefined
  publishFeature: (input: PublishFeatureInput) => JournalArticle
  addReaderNote: (note: Omit<ReaderNote, 'id' | 'createdAt'>) => ReaderNote
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<JournalArticle[]>(() =>
    loadStored(STORAGE_KEYS.articles, SEED_ARTICLES)
  )
  const [notes, setNotes] = useState<ReaderNote[]>(() =>
    loadStored(STORAGE_KEYS.notes, SEED_NOTES)
  )

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
      articles,
      notes,
      getArticleBySlug: (slug) =>
        articles.find((a) => a.slug === slug || a.id === slug),
      publishFeature: (input) => {
        const slugBase = `${input.artistName}-${input.songTitle}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
        const stamp = Date.now().toString(36).slice(-4)
        const nowDate = new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })

        const created: JournalArticle = {
          id: `art-${Date.now()}`,
          slug: `${slugBase || 'feature'}-${stamp}`,
          issueNumber: 'ISSUE 01',
          category: input.category,
          title: input.title.trim(),
          dek: input.dek.trim(),
          artistName: input.artistName.trim(),
          artistOrigin: input.artistOrigin.trim() || 'Independent',
          genre: input.genre.trim() || 'Christian Indie',
          forFansOf: [input.genre.trim() || 'Independent Faith Music'],
          author: 'Altar & Sound Editorial',
          authorRole: 'Community Curated',
          publishedAt: nowDate,
          readingTime: '3 min read',
          pullQuote: input.faithNote.trim(),
          verdict: input.dek.trim(),
          paragraphs: [input.reviewBody.trim(), input.faithNote.trim()],
          scriptureRef: input.scriptureRef?.trim() || undefined,
          scriptureExcerpt: input.scriptureExcerpt?.trim() || undefined,
          outlets: input.outlets,
          featuredTracks: [
            {
              id: `tr-${Date.now()}`,
              title: input.songTitle.trim(),
              provider: input.provider,
              sourceUrl: input.sourceUrl.trim(),
              embedUrl: input.embedUrl,
              thumbnailUrl: input.thumbnailUrl,
              releaseDate: nowDate,
              scriptureRef: input.scriptureRef?.trim() || undefined,
              scriptureExcerpt: input.scriptureExcerpt?.trim() || undefined,
              reviewNote: input.dek.trim(),
            },
          ],
          tags: [input.genre.trim() || 'Christian Music', input.category],
        }

        setArticles((prev) => [created, ...prev])
        return created
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
    [articles, notes]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
