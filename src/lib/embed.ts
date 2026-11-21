import type { MediaProvider } from '@/types/domain'

export interface ParsedEmbed {
  provider: Exclude<MediaProvider, 'studio-preview'>
  embedUrl: string
  embedId: string
  thumbnailUrl?: string
  providerLabel: string
}

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'music.youtube.com',
])

const SPOTIFY_HOSTS = new Set(['open.spotify.com'])
const SOUNDCLOUD_HOSTS = new Set(['soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com'])

export function parseMediaUrl(rawUrl: string): ParsedEmbed | null {
  let url: URL
  try {
    url = new URL(rawUrl.trim())
  } catch {
    return null
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return null
  }

  const host = url.hostname.toLowerCase()

  // YouTube
  if (YOUTUBE_HOSTS.has(host)) {
    let videoId = ''
    if (host === 'youtu.be') {
      videoId = url.pathname.replace(/^\//, '').split('/')[0] ?? ''
    } else if (url.pathname.startsWith('/shorts/')) {
      videoId = url.pathname.split('/')[2] ?? ''
    } else if (url.pathname.startsWith('/embed/')) {
      videoId = url.pathname.split('/')[2] ?? ''
    } else {
      videoId = url.searchParams.get('v') ?? ''
    }

    if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return {
        provider: 'youtube',
        embedId: videoId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`,
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        providerLabel: 'YouTube',
      }
    }
    return null
  }

  // Spotify (track / album / episode / playlist)
  if (SPOTIFY_HOSTS.has(host)) {
    const match = url.pathname.match(/^\/(track|album|playlist|episode)\/([a-zA-Z0-9]{22})/)
    if (match) {
      const [, kind, id] = match
      return {
        provider: 'spotify',
        embedId: `${kind}/${id}`,
        embedUrl: `https://open.spotify.com/embed/${kind}/${id}?utm_source=generator`,
        providerLabel: 'Spotify',
      }
    }
    return null
  }

  // SoundCloud
  if (SOUNDCLOUD_HOSTS.has(host)) {
    const parts = url.pathname.split('/').filter(Boolean)
    if (parts.length >= 2) {
      const cleanUrl = `https://soundcloud.com/${parts.join('/')}`
      return {
        provider: 'soundcloud',
        embedId: parts.join('/'),
        embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(cleanUrl)}&color=%239a6f42&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`,
        providerLabel: 'SoundCloud',
      }
    }
    return null
  }

  // Bandcamp
  if (host.endsWith('.bandcamp.com') && (url.pathname.startsWith('/track/') || url.pathname.startsWith('/album/'))) {
    return {
      provider: 'bandcamp',
      embedId: `${host}${url.pathname}`,
      embedUrl: url.toString(),
      providerLabel: 'Bandcamp',
    }
  }

  return null
}

export function getProviderLabel(provider: MediaProvider): string {
  switch (provider) {
    case 'youtube':
      return 'YouTube'
    case 'soundcloud':
      return 'SoundCloud'
    case 'spotify':
      return 'Spotify'
    case 'bandcamp':
      return 'Bandcamp'
    case 'studio-preview':
      return 'Studio Preview'
  }
}
