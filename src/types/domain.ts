export type MediaProvider =
  | 'youtube'
  | 'soundcloud'
  | 'spotify'
  | 'bandcamp'
  | 'studio-preview'

export type ThemeTag =
  | 'Hope'
  | 'Worship'
  | 'Testimony'
  | 'Stillness'
  | 'Lament'
  | 'Instrumental'

export type AvailabilityTag = 'collab' | 'ministry' | 'mentoring'

export interface MusicianProfile {
  id: string
  handle: string
  displayName: string
  initials: string
  accentTone: string
  location: string
  tagline: string
  bio: string
  testimony: string
  skills: string[]
  genres: string[]
  availability: AvailabilityTag[]
  links: {
    youtube?: string
    spotify?: string
    instagram?: string
    website?: string
  }
}

export interface ShowcaseWork {
  id: string
  slug: string
  profileId: string
  title: string
  subtitle: string
  provider: MediaProvider
  sourceUrl: string
  embedUrl?: string
  thumbnailUrl?: string
  duration: string
  musicalKey?: string
  previewChords?: number[][]
  coverGradient: string
  story: string
  scriptureRef?: string
  scriptureExcerpt?: string
  skillsUsed: string[]
  themes: ThemeTag[]
  genre: string
  createdAt: string
  featured?: boolean
}

export interface CollabPost {
  id: string
  profileId: string
  authorName: string
  authorHandle: string
  title: string
  description: string
  rolesNeeded: string[]
  isRemote: boolean
  location: string
  status: 'open' | 'filled'
  createdAt: string
}

export interface EncouragementNote {
  id: string
  recipientId: string
  recipientName: string
  workId?: string
  workTitle?: string
  senderName: string
  kind: 'prayer' | 'encouragement'
  message: string
  createdAt: string
}
