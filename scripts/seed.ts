import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create Nappy Nina artist
  const nappyNina = await prisma.artist.upsert({
    where: { slug: 'nappy-nina' },
    update: {},
    create: {
      name: 'Nappy Nina',
      slug: 'nappy-nina',
      bio: `Nappy Nina doesn't fit neatly into boxes—and that's exactly the point. With precision and a conversational flow that sounds like talking to your most perceptive friend, she's built a career dismantling expectations of what rap can be and who gets to define it.

Raised in Oakland—daughter of jazz radio host Greg Bridges, granddaughter of jazz legend Oliver Johnson—Nina's musical lineage runs deep. Shaped by the Bay Area's poetry and hip-hop scenes, she left home and moved to Brooklyn in 2012 with $500 and a goal: to become one of the few Oakland rappers to break internationally.`,
      heroImage: '/nina-epk-assets/nina-20.jpg',
      socialLinks: {
        instagram: 'https://instagram.com/nappynina',
      },
      walletAddresses: [],
    },
  })

  console.log('Created artist:', nappyNina.name)

  // Create genre
  const hipHop = await prisma.genre.upsert({
    where: { slug: 'hip-hop' },
    update: {},
    create: { name: 'Hip-Hop', slug: 'hip-hop' },
  })

  // Create album
  const album = await prisma.album.upsert({
    where: { slug: 'nothing-is-my-favorite-thing' },
    update: {},
    create: {
      title: 'Nothing Is My Favorite Thing',
      slug: 'nothing-is-my-favorite-thing',
      primaryArtistId: nappyNina.id,
      genreId: hipHop.id,
      coverImageUri: '/nina-epk-assets/nina-29.jpg',
      releaseDate: new Date('2024-01-01'),
      label: 'Lucid Haus',
    },
  })

  console.log('Created album:', album.title)

  // Create EPK for the new album
  const epk = await prisma.ePK.upsert({
    where: { slug: 'nappy-nina-2026' },
    update: {},
    create: {
      title: 'Nappy Nina - New Album 2026',
      slug: 'nappy-nina-2026',
      type: 'ALBUM',
      artistId: nappyNina.id,
      albumId: album.id,
      isPublished: true,
      bio: `Nappy Nina doesn't fit neatly into boxes—and that's exactly the point. With precision and a conversational flow that sounds like talking to your most perceptive friend, she's built a career dismantling expectations of what rap can be and who gets to define it.

Raised in Oakland—daughter of jazz radio host Greg Bridges, granddaughter of jazz legend Oliver Johnson—Nina's musical lineage runs deep. Shaped by the Bay Area's poetry and hip-hop scenes, she left home and moved to Brooklyn in 2012 with $500 and a goal: to become one of the few Oakland rappers to break internationally. She co-founded indie label Lucid Haus and quickly became a vital voice in Brooklyn's avant-garde Black music community. Her 2019 debut album *The Tree Act* earned praise from Okayplayer, Bandcamp, and Pitchfork, establishing her as a lyricist with range and bite.

Since then, Nina has released a prolific run of work: *30 Bag*, *Double Down*, *Dumb Doubt*, *Mourning Due*, and most recently *Nothing Is My Favorite Thing* with producer Swarvy, which she toured across Europe this year. Her collaborations read like a who's who of forward-thinking music: Ambrose Akinmusire, Quelle Chris, Yaeji, Pink Siifu, Son Lux, Moor Mother, Anna Wise, and Lucid Haus labelmate Stas Thee Boss (formerly of THEESatisfaction).

What sets Nina apart is her refusal to soften the edges. She raps about financial insecurity, grief, queerness, gentrification, and the knotty parts of being alive with a writer's eye for detail and a poet's instinct for emotion. Her music lives at the intersection of jazz, poetry, and experimental hip-hop—intimate, politically aware, and uncompromising. Whether over boom-bap, electronic beats, or jazz-inflected production, her voice remains unmistakable: vulnerable, incisive, deeply human.`,
      heroVideoSrc: '/nina-epk-assets/NINA-n-SWARV-in-PARIS_edit1.mp4',
      heroVideoPoster: '/nina-epk-assets/nina-20.jpg',
      liveVideos: [
        { youtubeId: 'eAhCTHeL98o', title: 'Nappy Nina - Live Performance' },
        { youtubeId: '_GH35tKPQTY', title: 'Nappy Nina - Live Performance 2' },
      ],
    },
  })

  console.log('Created EPK:', epk.title)

  // Create press links
  const pressLinksData = [
    { outlet: 'Le Guess Who', url: 'https://leguesswho.com/lineup/nappy-nina', description: 'Festival feature', sortOrder: 0 },
    { outlet: 'KQED', url: 'https://www.kqed.org/arts/13923186/best-of-musicians-to-know-nappy-nina', description: 'Best of Musicians to Know', sortOrder: 1 },
    { outlet: 'Wax Poetics', url: 'https://magazine.waxpoetics.com/connections/women-in-music-artists-and-writers/article/nappy-nina/', description: 'Women in Music', sortOrder: 2 },
    { outlet: 'Finals', url: 'https://finals.blog/posts/And-Now-For-Something-Completely-Different:-QandA-with-Nappy-Nina', description: 'Interview', sortOrder: 3 },
  ]

  for (const link of pressLinksData) {
    await prisma.ePKPressLink.create({
      data: { ...link, epkId: epk.id },
    })
  }

  console.log('Created', pressLinksData.length, 'press links')

  // Create photos
  const photosData = [
    { src: '/nina-epk-assets/nina-9.jpg', alt: 'Nappy Nina Press Photo 1', sortOrder: 0 },
    { src: '/nina-epk-assets/nina-20.jpg', alt: 'Nappy Nina Press Photo 2', sortOrder: 1 },
    { src: '/nina-epk-assets/nina-29.jpg', alt: 'Nappy Nina Press Photo 3', sortOrder: 2 },
    { src: '/nina-epk-assets/nina-35.jpg', alt: 'Nappy Nina Press Photo 4', sortOrder: 3 },
  ]

  for (const photo of photosData) {
    await prisma.ePKPhoto.create({
      data: { ...photo, epkId: epk.id },
    })
  }

  console.log('Created', photosData.length, 'photos')

  // Create tour graphics
  const tourGraphicsData = [
    { src: '/nina-epk-assets/Nappy-Nina-Tour-Poster-12x18-2.jpg', title: 'Tour Poster', sortOrder: 0 },
    { src: '/nina-epk-assets/NappyNina_EuroTour_2025_4x5.png', title: 'Euro Tour 2025', sortOrder: 1 },
    { src: '/nina-epk-assets/west-coast-tour.jpg', title: 'West Coast Tour', sortOrder: 2 },
  ]

  for (const graphic of tourGraphicsData) {
    await prisma.ePKTourGraphic.create({
      data: { ...graphic, epkId: epk.id },
    })
  }

  console.log('Created', tourGraphicsData.length, 'tour graphics')

  console.log('Seeding complete!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
