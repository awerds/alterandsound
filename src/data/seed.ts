import type {
  CollabPost,
  EncouragementNote,
  MusicianProfile,
  ShowcaseWork,
} from '@/types/domain'

export const SEED_PROFILES: MusicianProfile[] = [
  {
    id: 'artist-hannah',
    handle: 'hannah-reyes',
    displayName: 'Hannah Reyes',
    initials: 'HR',
    accentTone: 'from-amber-900/70 via-stone-900 to-neutral-950',
    location: 'Nashville, TN',
    tagline: 'Fingerstyle acoustic guitarist & quiet-hour songwriter',
    bio: 'Trained in classical guitar before stepping into folk songwriting, Hannah writes sparse acoustic pieces anchored in the Psalms for anxious minds and late-night prayer.',
    testimony:
      'For years I treated music like an audition for worth. During a season of burnout when I could barely sing a full verse, an old nylon-string guitar became the place I met God without performance. Now every note I record is an open door for someone who feels too tired to pray.',
    skills: ['Acoustic Guitar', 'Vocals', 'Songwriting', 'Fingerstyle'],
    genres: ['Acoustic Folk', 'Worship', 'Instrumental'],
    availability: ['collab', 'mentoring'],
    links: {
      youtube: 'https://youtube.com',
      spotify: 'https://open.spotify.com',
    },
  },
  {
    id: 'artist-david',
    handle: 'david-okafor',
    displayName: 'David Okafor',
    initials: 'DO',
    accentTone: 'from-yellow-900/60 via-zinc-900 to-stone-950',
    location: 'Atlanta, GA',
    tagline: 'Gospel keys, Hammond organ & musical director',
    bio: 'Blending rich neo-soul harmony with classic gospel congregational roots, David arranges live sets for local churches, campus nights, and studio sessions.',
    testimony:
      'Harmony is my favorite sermon—tension that looks unresolved until grace brings it home. When I play in clubs or coffeehouses alongside non-believing musicians, excellence earns the conversation, and joy points them straight to Christ.',
    skills: ['Keys & Piano', 'Arrangement', 'Musical Direction', 'Production'],
    genres: ['Gospel', 'Soul', 'Worship'],
    availability: ['collab', 'ministry', 'mentoring'],
    links: {
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'artist-esther',
    handle: 'esther-park',
    displayName: 'Esther Park',
    initials: 'EP',
    accentTone: 'from-stone-800 via-neutral-900 to-amber-950/80',
    location: 'Seattle, WA',
    tagline: 'Cellist & cinematic string arranger',
    bio: 'Orchestral cellist recording warm solo cello meditations and remote string layers for independent Christian songwriters around the world.',
    testimony:
      'The cello sounds closest to the human voice—especially when words run out. I started recording unaccompanied hymns during my mother’s recovery, and friends who had never stepped into a church told me they felt peace they could not explain. That is why I keep playing.',
    skills: ['Cello', 'String Arrangement', 'Recording', 'Live Strings'],
    genres: ['Classical', 'Ambient', 'Instrumental'],
    availability: ['collab', 'ministry'],
    links: {
      spotify: 'https://open.spotify.com',
      website: 'https://altarandsound.com',
    },
  },
  {
    id: 'artist-micah',
    handle: 'micah-solis',
    displayName: 'Micah Solis',
    initials: 'MS',
    accentTone: 'from-orange-950/80 via-stone-900 to-neutral-950',
    location: 'Austin, TX',
    tagline: 'Indie producer, electric guitar & mixing engineer',
    bio: 'Analog-leaning producer helping faith-driven indie bands and worship leaders capture honest, unvarnished recordings without losing sonic craft.',
    testimony:
      'I walked away from faith in college because Christian art felt plastic to me. God met me through an honest, raw song about doubt. My calling behind the console is helping believers make art truthful enough for skeptics to trust.',
    skills: ['Electric Guitar', 'Mixing', 'Production', 'Songwriting'],
    genres: ['Indie', 'Ambient', 'Worship'],
    availability: ['collab', 'mentoring'],
    links: {
      spotify: 'https://open.spotify.com',
    },
  },
  {
    id: 'artist-caleb-ruth',
    handle: 'caleb-and-ruth',
    displayName: 'Caleb & Ruth Lind',
    initials: 'CR',
    accentTone: 'from-emerald-950/70 via-stone-900 to-neutral-950',
    location: 'Denver, CO',
    tagline: 'Vocal duo & living-room hymnwriters',
    bio: 'Husband-and-wife duo rewriting centuries-old hymn texts with fresh melodies and close vocal harmony for small gatherings and neighbor outreach.',
    testimony:
      'We host acoustic evenings in our living room for neighbors who would never visit a Sunday service. Singing truth with beauty and hospitality disarms walls faster than any argument ever could.',
    skills: ['Vocals', 'Harmonies', 'Acoustic Guitar', 'Worship Leading'],
    genres: ['Hymns', 'Acoustic Folk', 'Worship'],
    availability: ['ministry', 'collab'],
    links: {
      youtube: 'https://youtube.com',
    },
  },
]

export const SEED_WORKS: ShowcaseWork[] = [
  {
    id: 'work-still-waters',
    slug: 'still-waters-nylon-study',
    profileId: 'artist-hannah',
    title: 'Still Waters (Nylon Study in D)',
    subtitle: 'Single-mic living room session',
    provider: 'studio-preview',
    sourceUrl: '',
    duration: '03:42',
    musicalKey: 'D Major · 68 BPM',
    // Warm Dmaj9 -> Bm7 -> Gmaj7 -> A6 frequencies (Hz)
    previewChords: [
      [146.83, 220.0, 277.18, 329.63, 369.99],
      [123.47, 185.0, 220.0, 293.66, 369.99],
      [196.0, 246.94, 293.66, 369.99, 440.0],
      [110.0, 164.81, 220.0, 277.18, 329.63],
    ],
    coverGradient: 'from-[#3a2a1d] via-[#1c1815] to-[#11100f]',
    story:
      'Recorded in one take at 5:40 AM while the house was quiet. I wrote this melody during a week when anxiety made sleep feel impossible. Every time my fingers slowed down to let a chord ring out, I remembered that God does not rush the healing of a weary heart. If you are carrying more than you can name tonight, let this be three minutes where you do not have to strive.',
    scriptureRef: 'Psalm 23:2–3',
    scriptureExcerpt:
      'He leads me beside still waters. He restores my soul.',
    skillsUsed: ['Acoustic Guitar', 'Fingerstyle', 'Songwriting'],
    themes: ['Stillness', 'Hope', 'Instrumental'],
    genre: 'Acoustic Folk',
    createdAt: '2026-11-18',
    featured: true,
  },
  {
    id: 'work-mercy-in-the-minor',
    slug: 'mercy-in-the-minor',
    profileId: 'artist-david',
    title: 'Mercy in the Minor Key',
    subtitle: 'Solo Rhodes & gospel reharmonization',
    provider: 'studio-preview',
    sourceUrl: '',
    duration: '04:18',
    musicalKey: 'E Minor · 76 BPM',
    // Em9 -> Cmaj9 -> Am11 -> B7alt-ish warm voicing
    previewChords: [
      [164.81, 246.94, 293.66, 369.99, 392.0],
      [130.81, 196.0, 246.94, 293.66, 329.63],
      [110.0, 196.0, 261.63, 293.66, 329.63],
      [123.47, 185.0, 220.0, 311.13, 392.0],
    ],
    coverGradient: 'from-[#2e2418] via-[#191614] to-[#0e0d0c]',
    story:
      'We often rush past sorrow straight to triumphant major chords, as if God only welcomes us once we feel put together. This progression sits honestly in the minor key before resolving upward—because Scripture is full of lament that still ends in trust. Played on a vintage Rhodes with zero click track.',
    scriptureRef: 'Psalm 34:18',
    scriptureExcerpt:
      'The Lord is near to the brokenhearted and saves the crushed in spirit.',
    skillsUsed: ['Keys & Piano', 'Arrangement'],
    themes: ['Lament', 'Worship', 'Testimony'],
    genre: 'Gospel',
    createdAt: '2026-11-15',
  },
  {
    id: 'work-vesper-cello',
    slug: 'vesper-prelude-solo-cello',
    profileId: 'artist-esther',
    title: 'Vesper Prelude for Solo Cello',
    subtitle: 'Unaccompanied sanctuary recording',
    provider: 'studio-preview',
    sourceUrl: '',
    duration: '05:06',
    musicalKey: 'G Major · 58 BPM',
    // Gmaj7 -> Em9 -> Cmaj7 -> Dadd9
    previewChords: [
      [98.0, 146.83, 246.94, 369.99],
      [82.41, 164.81, 246.94, 293.66, 369.99],
      [130.81, 196.0, 246.94, 329.63],
      [146.83, 220.0, 293.66, 329.63, 369.99],
    ],
    coverGradient: 'from-[#282420] via-[#171513] to-[#0f0e0d]',
    story:
      'Inspired by the old evening hymn "Abide With Me." I placed two ribbon mics twenty feet back in an empty wooden chapel so you can hear the breath of the room. My hope is that someone who has never prayed before might listen and sense a Presence larger than the silence.',
    scriptureRef: 'Psalm 141:2',
    scriptureExcerpt:
      'Let my prayer be counted as incense before you, and the lifting up of my hands as the evening sacrifice.',
    skillsUsed: ['Cello', 'Recording', 'String Arrangement'],
    themes: ['Stillness', 'Instrumental', 'Worship'],
    genre: 'Classical',
    createdAt: '2026-11-12',
  },
  {
    id: 'work-honest-light',
    slug: 'honest-light-tape-demo',
    profileId: 'artist-micah',
    title: 'Honest Light (Tape Demo)',
    subtitle: 'Ambient baritone guitar & analog tape delay',
    provider: 'studio-preview',
    sourceUrl: '',
    duration: '03:54',
    musicalKey: 'F Major · 82 BPM',
    // Fmaj9 -> Dm9 -> Bbmaj7 -> Csus4
    previewChords: [
      [174.61, 220.0, 261.63, 329.63, 392.0],
      [146.83, 220.0, 261.63, 329.63, 349.23],
      [116.54, 174.61, 220.0, 293.66, 349.23],
      [130.81, 174.61, 196.0, 261.63, 349.23],
    ],
    coverGradient: 'from-[#362219] via-[#1b1613] to-[#100e0d]',
    story:
      'I tracked this after a late conversation with a longtime bandmate who told me he wanted to believe in God but felt too broken to walk into a church. The tone is intentionally imperfect—tape hiss, fret noise, real room air—because grace never asked us to clean ourselves up before coming into the light.',
    scriptureRef: 'John 1:5',
    scriptureExcerpt:
      'The light shines in the darkness, and the darkness has not overcome it.',
    skillsUsed: ['Electric Guitar', 'Production', 'Mixing'],
    themes: ['Testimony', 'Hope'],
    genre: 'Indie',
    createdAt: '2026-11-09',
  },
  {
    id: 'work-table-for-the-weary',
    slug: 'table-for-the-weary',
    profileId: 'artist-caleb-ruth',
    title: 'A Table for the Weary',
    subtitle: 'Two voices & parlor guitar · Live living room',
    provider: 'studio-preview',
    sourceUrl: '',
    duration: '04:05',
    musicalKey: 'C Major · 72 BPM',
    // Cmaj7 -> Am9 -> Fmaj7 -> G6
    previewChords: [
      [130.81, 196.0, 246.94, 329.63],
      [110.0, 164.81, 246.94, 261.63, 329.63],
      [174.61, 220.0, 261.63, 329.63],
      [196.0, 246.94, 293.66, 329.63, 440.0],
    ],
    coverGradient: 'from-[#1f2c24] via-[#161917] to-[#0e0f0e]',
    story:
      'Written for our monthly neighborhood acoustic night. Half the people in our living room that evening did not identify as Christians—yet everyone sang the final refrain together. Good music makes room at the table for honest questions and unexpected grace.',
    scriptureRef: 'Matthew 11:28',
    scriptureExcerpt:
      'Come to me, all who labor and are heavy laden, and I will give you rest.',
    skillsUsed: ['Vocals', 'Harmonies', 'Acoustic Guitar'],
    themes: ['Hope', 'Worship', 'Testimony'],
    genre: 'Hymns',
    createdAt: '2026-11-05',
  },
]

export const SEED_COLLABS: CollabPost[] = [
  {
    id: 'collab-1',
    profileId: 'artist-hannah',
    authorName: 'Hannah Reyes',
    authorHandle: 'hannah-reyes',
    title: 'Seeking cello & upright bass for 4-track Acoustic Psalms EP',
    description:
      'I have four stripped-back acoustic guitar and vocal tracks already tracked to a click. Looking for warm, understated string players who care more about space and prayerfulness than busy parts. Stems ready to share.',
    rolesNeeded: ['Cello', 'Upright Bass', 'Mixing'],
    isRemote: true,
    location: 'Remote (Nashville, TN)',
    status: 'open',
    createdAt: '2026-11-19',
  },
  {
    id: 'collab-2',
    profileId: 'artist-david',
    authorName: 'David Okafor',
    authorHandle: 'david-okafor',
    title: 'Electric guitarist & drummer for city-wide college outreach night',
    description:
      'Hosting an open acoustic/soul music & testimony evening near Georgia Tech next month. Looking for faith-filled musicians who can play pocket gospel/indie grooves and stick around afterward to talk with students.',
    rolesNeeded: ['Electric Guitar', 'Drums'],
    isRemote: false,
    location: 'Atlanta, GA',
    status: 'open',
    createdAt: '2026-11-16',
  },
  {
    id: 'collab-3',
    profileId: 'artist-micah',
    authorName: 'Micah Solis',
    authorHandle: 'micah-solis',
    title: 'Offering 2 free pro-bono mixes for first-time faith songwriters',
    description:
      'Want to bless two emerging musicians of faith who have written an honest song pointing people to God but lack a mixing budget. Send a rough voice memo or multi-track and your story behind the song.',
    rolesNeeded: ['Songwriters', 'Vocalists'],
    isRemote: true,
    location: 'Remote (Austin, TX)',
    status: 'open',
    createdAt: '2026-11-11',
  },
]

export const SEED_ENCOURAGEMENTS: EncouragementNote[] = [
  {
    id: 'enc-1',
    recipientId: 'artist-hannah',
    recipientName: 'Hannah Reyes',
    workId: 'work-still-waters',
    workTitle: 'Still Waters (Nylon Study in D)',
    senderName: 'Daniel K.',
    kind: 'prayer',
    message:
      'Praying that God keeps your hands rested and your joy rooted in Him, not in output. Shared this with my sister in the hospital tonight.',
    createdAt: '2026-11-20',
  },
  {
    id: 'enc-2',
    recipientId: 'artist-david',
    recipientName: 'David Okafor',
    workId: 'work-mercy-in-the-minor',
    workTitle: 'Mercy in the Minor Key',
    senderName: 'Grace M.',
    kind: 'encouragement',
    message:
      'The honesty in your story hit home. Thank you for making space for lament that still points toward Christ.',
    createdAt: '2026-11-17',
  },
]
