export type MediaProvider =
  | 'youtube'
  | 'soundcloud'
  | 'spotify'
  | 'bandcamp'
  | 'studio-preview'

export type ArticleCategory =
  | 'Album Review'
  | 'Essay'
  | 'Artist Interview'
  | 'Live Session'
  | 'Listening Guide'

export type SleeveMotif = 'arch' | 'rings' | 'horizon' | 'monolith' | 'vesper'

export interface SleevePalette {
  bg: string
  via: string
  to: string
  fg: string
  accent: string
  glow: string
}

export interface TrackItem {
  id: string
  number: string
  title: string
  duration: string
  musicalKey: string
  previewChords: number[][]
}

export interface NetlabelRelease {
  id: string
  catalogNumber: string // e.g., "A&S — 001"
  slug: string
  title: string
  artistName: string
  artistOrigin: string
  releaseDate: string
  format: string
  genre: string
  moods: string[]
  provider: MediaProvider
  sourceUrl: string
  embedUrl?: string
  thumbnailUrl?: string
  sleeveMotif: SleeveMotif
  sleevePalette: SleevePalette
  linerNotes: string
  faithNote: string
  scriptureRef?: string
  scriptureExcerpt?: string
  credits: string[]
  tracks: TrackItem[]
  essentialPick?: boolean
}

export interface JournalArticle {
  id: string
  slug: string
  issueNumber: string
  category: ArticleCategory
  title: string
  dek: string
  author: string
  authorRole: string
  publishedAt: string
  readingTime: string
  coverStory?: boolean
  rating?: string
  releaseId: string
  pullQuote: string
  paragraphs: string[]
  scriptureRef?: string
  scriptureExcerpt?: string
  tags: string[]
}

export interface ReaderNote {
  id: string
  recipientName: string
  contextTitle?: string
  senderName: string
  kind: 'prayer' | 'note' | 'pitch'
  message: string
  createdAt: string
}
