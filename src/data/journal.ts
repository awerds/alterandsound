import type { JournalArticle, ReaderNote } from '@/types/domain'

export const SEED_ARTICLES: JournalArticle[] = [
  {
    id: 'art-jimmy-clifton-2026',
    slug: 'jimmy-clifton-outcasts-appalachian-grace',
    issueNumber: 'ISSUE 01',
    category: 'Artist Spotlight',
    title: 'Jimmy Clifton Turns Broken Confession Into Radiant Appalachian Gospel',
    dek: 'With over 206,000 views in two weeks on “Outcasts” and a prolific November streak of Scripture-anchored folk tracks, the North Carolina singer-songwriter proves raw honesty hits harder than polished industry formulas.',
    artistName: 'Jimmy Clifton',
    artistOrigin: 'North Carolina',
    genre: 'Christian Americana & Folk',
    forFansOf: ['Charles Wesley Godwin', 'The Lumineers', 'Bon Iver', 'Rich Mullins'],
    author: 'Altar & Sound Editorial',
    authorRole: 'Music Criticism & Curation',
    publishedAt: 'November 21, 2026',
    readingTime: '6 min read',
    coverStory: true,
    rating: 'Essential Spotlight',
    pullQuote:
      'Clifton writes like a man who walked out of hiding into daylight—refusing to disguise the scars so that anyone still in the dark can recognize the way home.',
    verdict:
      'A rare independent Christian voice uniting Appalachian folk grit, unfiltered testimony, and crystal-clear Gospel hope. Start with “Outcasts” and “Stay,” then explore his full YouTube and streaming catalog.',
    paragraphs: [
      'Most modern Christian music tries to sound finished before it sounds true. Glossy synth pads and arena-sized hooks have their place, yet thousands of listeners—believers and skeptics alike—are quietly gravitating toward something far more stripped back: a weathered voice, an acoustic guitar, and lyrics that refuse to pretend life is easy. That hunger explains why North Carolina independent singer-songwriter Jimmy Clifton has been surging across YouTube this November.',
      'Clifton’s musical turn is inseparable from his testimony. Raised in a Christian home, he first pursued music chasing mainstream pop approval while wrestling privately with hidden addiction and shame. Stepping into the light changed everything—not only his life, but his songwriting vocabulary. Across albums like Crucified in Christ and There’s Proof of God But Time Is Short, and now across a remarkable run of November 2026 singles, Clifton trades performance-based religion for bruised, radiant grace.',
      'Nowhere is that resonance clearer than on “Outcasts,” released November 6 and already past 206,000 YouTube views and 1,550 likes. Anchored by 1 Thessalonians 4:16–17, the song speaks directly to the misfits, wanderers, and bruised hearts who feel miles outside the polite walls of church culture—reminding them that Christ gathers the very people the world overlooks.',
      'What separates Clifton from trend-chasing acoustic acts is his discipline as a storyteller. On “Allie, run” (43K+ views in five days, paired with 1 Peter 5:10), he leans into urgent, compassionate folk storytelling where suffering is never minimized, yet God’s restoring promise holds the final word. Meanwhile, “Stay” (32.5K+ views and 555+ likes) pairs directly with John 8:12—“I am the light of the world”—capturing the tender plea to remain close to the heart of Jesus when darkness feels persuasive.',
      'Even his quieter dispatches reward close listening. “Letter From God” (16.8K+ views, grounded in Isaiah 41:13) strips away every ounce of theatrical ego, letting warm acoustic phrasing carry the reassurance of a Father who holds His child’s right hand. In an era where artists are pressured to chase algorithms over truth, Jimmy Clifton’s refusal to sell out—and his willingness to name both sin and mercy plainly—makes him one of the most compelling independent Christian songwriters to follow right now.',
    ],
    scriptureRef: 'John 8:12',
    scriptureExcerpt:
      'I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life.',
    outlets: {
      youtube: 'https://www.youtube.com/@jimmycliftonmusic',
      spotify: 'https://open.spotify.com/artist/2G0M287MWFHQB1dE4RwW7t',
      appleMusic: 'https://music.apple.com/us/artist/jimmy-clifton/1495710054',
      instagram: 'https://www.instagram.com/jimmycliftonmusic',
      tiktok: 'https://www.tiktok.com/@jimmycliftonmusic',
    },
    featuredTracks: [
      {
        id: 'jc-outcasts',
        title: 'Outcasts (Lyric Video)',
        provider: 'youtube',
        sourceUrl: 'https://www.youtube.com/watch?v=6g5hpQeVN5k',
        embedUrl: 'https://www.youtube-nocookie.com/embed/6g5hpQeVN5k?rel=0',
        thumbnailUrl: 'https://i.ytimg.com/vi/6g5hpQeVN5k/hqdefault.jpg',
        releaseDate: 'Nov 6, 2026',
        tractionLabel: '206K+ views · 1.5K+ likes',
        scriptureRef: '1 Thessalonians 4:16–17',
        scriptureExcerpt:
          'And so shall we ever be with the Lord.',
        reviewNote:
          'Clifton’s breakout November anthem—an unvarnished folk-Americana rally cry for the overlooked and brokenhearted, anchored in the promise of Christ’s return.',
      },
      {
        id: 'jc-allie-run',
        title: 'Allie, run (Lyric Video)',
        provider: 'youtube',
        sourceUrl: 'https://www.youtube.com/watch?v=eLe-CfAotBo',
        embedUrl: 'https://www.youtube-nocookie.com/embed/eLe-CfAotBo?rel=0',
        thumbnailUrl: 'https://i.ytimg.com/vi/eLe-CfAotBo/hqdefault.jpg',
        releaseDate: 'Nov 16, 2026',
        tractionLabel: '43K+ views · 395+ likes',
        scriptureRef: '1 Peter 5:10',
        scriptureExcerpt:
          'After you have suffered a little while, the God of all grace… will himself restore, confirm, strengthen, and establish you.',
        reviewNote:
          'Urgent, narrative-driven songwriting at its best. Clifton delivers raw empathy without flinching from pain, pointing straight to the restoring grace of God.',
      },
      {
        id: 'jc-stay',
        title: 'Stay (Lyric Video)',
        provider: 'youtube',
        sourceUrl: 'https://www.youtube.com/watch?v=HM-iNzIPqTY',
        embedUrl: 'https://www.youtube-nocookie.com/embed/HM-iNzIPqTY?rel=0',
        thumbnailUrl: 'https://i.ytimg.com/vi/HM-iNzIPqTY/hqdefault.jpg',
        releaseDate: 'Nov 10, 2026',
        tractionLabel: '32.5K+ views · 555+ likes',
        scriptureRef: 'John 8:12',
        scriptureExcerpt:
          'I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.',
        reviewNote:
          'Intimate and deeply devotional—one of his highest-engagement November uploads, capturing the heart’s desire to abide in the light of Christ.',
      },
      {
        id: 'jc-letter-from-god',
        title: 'Letter From God (Lyric Video)',
        provider: 'youtube',
        sourceUrl: 'https://www.youtube.com/watch?v=4Jkfck5dR_4',
        embedUrl: 'https://www.youtube-nocookie.com/embed/4Jkfck5dR_4?rel=0',
        thumbnailUrl: 'https://i.ytimg.com/vi/4Jkfck5dR_4/hqdefault.jpg',
        releaseDate: 'Nov 5, 2026',
        tractionLabel: '16.8K+ views · 428+ likes',
        scriptureRef: 'Isaiah 41:13',
        scriptureExcerpt:
          'For I the Lord thy God will hold thy right hand, saying unto thee, Fear not; I will help thee.',
        reviewNote:
          'Tender, direct, and disarmingly warm—recasting divine mercy as a personal letter spoken directly into fear and isolation.',
      },
    ],
    tags: ['Christian Americana', 'Indie Folk', 'North Carolina', 'YouTube Spotlight'],
  },
  {
    id: 'art-damion-suomi-2026',
    slug: 'damion-suomi-minor-prophets-go-and-sell-all-your-things',
    issueNumber: 'ISSUE 01',
    category: 'Album Review',
    title: 'Damion Suomi & The Minor Prophets: Prophetic Folk-Rock That Refuses Easy Answers',
    dek: 'Revisiting the Florida roots-rock ensemble whose Scripture-steeped cult classic “Go, and Sell All of Your Things” still hits like a brass-and-acoustic thunderclap for anyone wrestling honestly with God.',
    artistName: 'Damion Suomi & The Minor Prophets',
    artistOrigin: 'Florida',
    genre: 'Indie Folk-Rock & Roots Americana',
    forFansOf: ['Neutral Milk Hotel', 'Bright Eyes', 'Josh Garrels', 'The Tallest Man on Earth'],
    author: 'Altar & Sound Editorial',
    authorRole: 'Music Criticism & Curation',
    publishedAt: 'November 21, 2026',
    readingTime: '6 min read',
    rating: 'Essential Classic',
    pullQuote:
      'Suomi writes with the fearless candor of the Psalms and Ecclesiastes—staging doubt, longing, and sacrifice inside foot-stomping folk-rock that makes both saints and skeptics stop in their tracks.',
    verdict:
      'An essential cult landmark of Scripture-saturated indie folk-rock. Start with “The Teacher” and “Pearls (Before the Swine),” then let the emotional collapse and quiet grace of “Holy Ghost” and “Let My Love” wash over you.',
    paragraphs: [
      'Great faith-wrestling art has never belonged exclusively to safe, predictable worship playlists. Long before indie folk became a streaming genre algorithm, Florida singer-songwriter Damion Suomi—fresh off a year at Bible college, a season singing Irish rebel ballads in pubs across Ireland, and a standout 2010 SXSW turn that caught Esquire’s eye—assembled The Minor Prophets and recorded something unforgettable: a blazing, theatrical, deeply human folk-rock sermon titled Go, and Sell All of Your Things.',
      'Named directly after Christ’s startling invitation to the rich young ruler (Matthew 19:21), the record refuses glossy escapism. Marching snare drums, ragged acoustic strumming, sudden trumpet flares, and Suomi’s weathered, razor-edged voice collide like an old revival meeting held inside a neighborhood bar. It is raw enough for indie-rock purists and steeped deeply enough in biblical literature to reward every careful listen.',
      'On “The Teacher” (32.9K+ views on YouTube Music), Suomi channels Qoheleth—the narrator of Ecclesiastes—repeating the ancient verdict “Vanity of vanities, all is meaningless” not with cold cynicism, but with the urgent desperation of someone tired of counterfeit idols. Follow it straight into “Pearls (Before the Swine)” (25K+ views), where Matthew 7:6 becomes a gritty, driving reflection on guarding what is sacred in a world eager to trample it.',
      'The emotional center of the band’s catalog arrives on “Holy Ghost” (16K+ views), a track Paste Magazine rightly hailed as the album’s devastating turning point. After climbing through roaring guitars and cymbal storms, the arrangement suddenly strips away to a lone fingerpicked acoustic guitar and a stark, trembling confession of spiritual dryness before dissolving into ocean waves. Like Psalm 42, it proves that crying out in the dark is still a form of prayer.',
      'Yet Suomi never leaves the listener stranded in ashes. On “Let My Love” (11.9K+ views), the storm gives way to warmth, devotion, and open-handed mercy—reminding us why Damion Suomi & The Minor Prophets remain a touchstone for artists trying to bridge honest human struggle and the living light of Christ.',
    ],
    scriptureRef: 'Matthew 19:21',
    scriptureExcerpt:
      'If you would be perfect, go, sell what you possess and give to the poor, and you will have treasure in heaven; and come, follow me.',
    outlets: {
      youtubeMusic: 'https://music.youtube.com/channel/UCrmRAMqjZrp_Lr39Rp8KHDg',
      youtube: 'https://www.youtube.com/channel/UCrmRAMqjZrp_Lr39Rp8KHDg',
      appleMusic: 'https://music.apple.com/us/artist/damion-suomi-the-minor-prophets/415265878',
    },
    featuredTracks: [
      {
        id: 'ds-the-teacher',
        title: 'The Teacher',
        provider: 'youtube',
        sourceUrl: 'https://www.youtube.com/watch?v=uOGTRrSVeso',
        embedUrl: 'https://www.youtube-nocookie.com/embed/uOGTRrSVeso?rel=0',
        thumbnailUrl: 'https://i.ytimg.com/vi/uOGTRrSVeso/hqdefault.jpg',
        releaseDate: 'Go, and Sell All of Your Things',
        tractionLabel: '32.9K+ views',
        scriptureRef: 'Ecclesiastes 1:2',
        scriptureExcerpt:
          'Vanity of vanities, says the Preacher, vanity of vanities! All is vanity.',
        reviewNote:
          'The band’s most-played YouTube Music track—a fiery, roots-driven meditation on Ecclesiastes that tears down hollow ambition with unforgettable acoustic momentum.',
      },
      {
        id: 'ds-pearls',
        title: 'Pearls (Before the Swine)',
        provider: 'youtube',
        sourceUrl: 'https://www.youtube.com/watch?v=shM11xpMC-g',
        embedUrl: 'https://www.youtube-nocookie.com/embed/shM11xpMC-g?rel=0',
        thumbnailUrl: 'https://i.ytimg.com/vi/shM11xpMC-g/hqdefault.jpg',
        releaseDate: 'Go, and Sell All of Your Things',
        tractionLabel: '25K+ views',
        scriptureRef: 'Matthew 7:6',
        scriptureExcerpt:
          'Do not give dogs what is holy, and do not throw your pearls before pigs.',
        reviewNote:
          'Prophetic Americana storytelling carried by biting vocal grit and surging band dynamics—unflinching about the cost of protecting what is holy.',
      },
      {
        id: 'ds-holy-ghost',
        title: 'Holy Ghost',
        provider: 'youtube',
        sourceUrl: 'https://www.youtube.com/watch?v=9UNPVnGGEHo',
        embedUrl: 'https://www.youtube-nocookie.com/embed/9UNPVnGGEHo?rel=0',
        thumbnailUrl: 'https://i.ytimg.com/vi/9UNPVnGGEHo/hqdefault.jpg',
        releaseDate: 'Go, and Sell All of Your Things',
        tractionLabel: '16K+ views',
        scriptureRef: 'Psalm 51:11',
        scriptureExcerpt:
          'Cast me not away from your presence, and take not your Holy Spirit from me.',
        reviewNote:
          'A breathtaking dynamic arc—moving from roaring folk-rock intensity to bare acoustic lament and ocean waves, capturing raw spiritual hunger without a trace of pretense.',
      },
      {
        id: 'ds-let-my-love',
        title: 'Let My Love',
        provider: 'youtube',
        sourceUrl: 'https://www.youtube.com/watch?v=m4HgJzm-Y2Y',
        embedUrl: 'https://www.youtube-nocookie.com/embed/m4HgJzm-Y2Y?rel=0',
        thumbnailUrl: 'https://i.ytimg.com/vi/m4HgJzm-Y2Y/hqdefault.jpg',
        releaseDate: 'Go, and Sell All of Your Things',
        tractionLabel: '11.9K+ views',
        scriptureRef: '1 Corinthians 13:13',
        scriptureExcerpt:
          'So now faith, hope, and love abide, these three; but the greatest of these is love.',
        reviewNote:
          'Warm, open-hearted, and redemptive—revealing the tender longing for genuine love and mercy beating beneath the band’s thunderous folk-rock exterior.',
      },
    ],
    tags: ['Indie Folk-Rock', 'Roots Americana', 'Florida', 'Cult Classic'],
  },
]

export const SEED_NOTES: ReaderNote[] = []
