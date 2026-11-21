export type MediaProvider =
  | 'youtube'
  | 'soundcloud'
  | 'spotify'
  | 'bandcamp'

export type ArticleCategory =
  | 'Artist Spotlight'
  | 'Album Review'
  | 'Essay'
  | 'Artist Interview'
  | 'Listening Guide'

export interface ArtistOutlets {
  youtube?: string
  spotify?: string
  appleMusic?: string
  instagram?: string
  tiktok?: string
  bandcamp?: string
  website?: string
}

export interface FeaturedTrack {
  id: string
  title: string
  provider: MediaProvider
  sourceUrl: string
  embedUrl: string
  thumbnailUrl?: string
  releaseDate: string
  tractionLabel?: string
  scriptureRef?: string
  scriptureExcerpt?: string
  reviewNote: string
}

export interface JournalArticle {
  id: string
  slug: string
  issueNumber: string
  category: ArticleCategory
  title: string
  dek: string
  artistName: string
  artistOrigin: string
  genre: string
  forFansOf: string[]
  author: string
  authorRole: string
  publishedAt: string
  readingTime: string
  coverStory?: boolean
  rating?: string
  pullQuote: string
  verdict: string
  paragraphs: string[]
  scriptureRef?: string
  scriptureExcerpt?: string
  outlets: ArtistOutlets
  featuredTracks: FeaturedTrack[]
  tags: string[]
}

export interface ReaderNote {
  id: string
  recipientName: string
  contextTitle?: string
  senderName: string
  kind: 'prayer' | 'note'
  message: string
  createdAt: string
}
