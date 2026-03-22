import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import axios from 'axios'
import FormData from 'form-data'

const prisma = new PrismaClient()

const DISCOGRAPHY_DIR = '/Users/fiction/Desktop/Label Discography'
const PINATA_JWT = process.env.PINATA_JWT!
const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || 'https://plantmaterial.mypinata.cloud'
const PINATA_GATEWAY_TOKEN = process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN || ''

// Temp directory for MP3 conversions
const TEMP_DIR = '/tmp/lucidhaus-seed'

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function convertToMp3(inputPath: string): string {
  ensureDir(TEMP_DIR)
  const basename = path.basename(inputPath, path.extname(inputPath))
  const outputPath = path.join(TEMP_DIR, `${basename}.mp3`)

  if (fs.existsSync(outputPath)) return outputPath

  console.log(`  Converting: ${path.basename(inputPath)} → MP3`)
  try {
    execSync(`ffmpeg -i "${inputPath}" -codec:a libmp3lame -b:a 320k -y "${outputPath}" 2>/dev/null`)
  } catch (e) {
    console.error(`  Failed to convert ${path.basename(inputPath)}`)
    return inputPath // Fall back to original
  }
  return outputPath
}

async function uploadToIPFS(filePath: string, name: string): Promise<string> {
  const formData = new FormData()
  formData.append('file', fs.createReadStream(filePath))
  formData.append('pinataMetadata', JSON.stringify({ name }))

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: Infinity,
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    })

    const cid = res.data.IpfsHash
    const url = `${PINATA_GATEWAY}/ipfs/${cid}?pinataGatewayToken=${PINATA_GATEWAY_TOKEN}`
    console.log(`  Uploaded: ${name} → ${cid}`)
    return url
  } catch (e: any) {
    console.error(`  Upload failed for ${name}: ${e.message}`)
    return ''
  }
}

function parseTrackNumber(filename: string): number {
  const match = filename.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 1
}

function parseTrackTitle(filename: string): string {
  // Remove extension
  let name = path.basename(filename, path.extname(filename))
  // Remove leading track number and separators
  name = name.replace(/^\d+[\s._-]+/, '')
  // Remove common suffixes
  name = name.replace(/[\s_-]*(master|mastered|final|clean|mix|MASTER\s*D?|DEO\s*MASTER|AP\s*MASTER)[\s_-]*/gi, '')
  // Remove date stamps like 2022-12-15
  name = name.replace(/\s*\d{4}-\d{2}-\d{2}(_\d+)?/g, '')
  // Remove trailing underscores, dashes
  name = name.replace(/[_-]+$/, '').replace(/^[_-]+/, '')
  // Clean up whitespace
  name = name.replace(/\s+/g, ' ').trim()
  return name || path.basename(filename, path.extname(filename))
}

// =========================================================
// DISCOGRAPHY DATA
// =========================================================

interface AlbumData {
  title: string
  dir: string // relative to artist dir
  year?: number
  coverArt?: string // relative to album dir or artist dir
  trackFileFilter?: (f: string) => boolean
}

interface ArtistData {
  name: string
  slug: string
  bio: string
  heroImage: string // will be uploaded from cover art or placeholder
  albums: AlbumData[]
}

const artists: ArtistData[] = [
  {
    name: 'Nappy Nina',
    slug: 'nappy-nina',
    bio: `Nappy Nina doesn't fit neatly into boxes—and that's exactly the point. With precision and a conversational flow that sounds like talking to your most perceptive friend, she's built a career dismantling expectations of what rap can be and who gets to define it. Raised in Oakland—daughter of jazz radio host Greg Bridges, granddaughter of jazz legend Oliver Johnson—Nina's musical lineage runs deep.`,
    heroImage: '', // will use existing
    albums: [
      { title: 'The Tree Act', dir: 'THE TREE ACT', year: 2019, trackFileFilter: f => f.endsWith('.wav') && !f.startsWith('.') },
      { title: '30 Bag', dir: '30 Bag Final', year: 2020, coverArt: 'nappy nina_30 bag_EP art_10x10.jpg' },
      { title: 'Double Down', dir: 'Double Down Masters - Nappy Nina X JWords', year: 2021, trackFileFilter: f => f.endsWith('.wav') && !f.startsWith('.') && !f.includes('CLEAN') },
      { title: 'Dumb Doubt', dir: 'DUMB DOUBT MASTER D', year: 2021, trackFileFilter: f => f.endsWith('.wav') },
      { title: 'Mourning Due', dir: 'MOURNING DUE MASTERS', year: 2023, trackFileFilter: f => f.endsWith('.wav') && !f.includes('ARCHIVE') && !f.includes('INSTRUMENTAL') && !f.includes('PERFORMANCE') },
    ],
  },
  {
    name: 'Stas THEE Boss',
    slug: 'stas-thee-boss',
    bio: `Stas THEE Boss is an artist, producer, and one half of the groundbreaking duo THEESatisfaction. As a solo artist under Lucid Haus, she continues to push boundaries across hip-hop, R&B, and experimental music.`,
    heroImage: '',
    albums: [
      { title: "S'WOMEN", dir: "S'WOMEN", year: 2020 },
      { title: 'Sang Stasia', dir: 'SANG STASIA MIXED AND MASTERED', year: 2022, coverArt: 'SANG STASIA!.jpg' },
      { title: '36 Chambers', dir: '36 Chambers', year: 2023, coverArt: '36 CHAMBERS.jpg' },
      { title: 'On The Quarner', dir: 'On The Quarner', year: 2023, coverArt: 'OTQ_ART.jpg' },
    ],
  },
  {
    name: 'Théo Mode',
    slug: 'theo-mode',
    bio: `Théo Mode is a multi-instrumentalist, producer, and composer whose work spans electronic, jazz, and experimental R&B. A core member of the Lucid Haus collective, his productions have been a backbone of the label's sonic identity.`,
    heroImage: '',
    albums: [
      { title: 'Love and Other Dreams', dir: 'Love and Other Dreams (2014)', year: 2014 },
      { title: 'Soft Blue Violet Tears', dir: 'Soft Blue Violet Tears (2015)', year: 2015 },
      { title: 'MVSSV', dir: 'MVSSV (2016)', year: 2016 },
      { title: 'MVSSV RMXS', dir: 'MVSSV RMXS (2017)', year: 2017 },
      { title: 'Burnt Orange', dir: 'Burnt Orange (2018)', year: 2018 },
      { title: 'Gotham', dir: 'Gotham (2018)', year: 2018 },
    ],
  },
  {
    name: 'babyfang',
    slug: 'babyfang',
    bio: `babyfang is a Brooklyn-based artist blending punk energy with hip-hop sensibility. Their music channels raw emotion through distorted beats and unflinching lyrics.`,
    heroImage: '',
    albums: [
      { title: 'Olive Juice', dir: 'Olive Juice', year: 2021 },
      { title: 'In The Face Of', dir: 'IN THE FACE OF MASTERS (Digital)', year: 2023, coverArt: 'In The Face Of Cover.jpg' },
    ],
  },
  {
    name: 'Canteen Killa',
    slug: 'canteen-killa',
    bio: `Canteen Killa brings a unique blend of experimental production and hard-hitting beats to the Lucid Haus roster.`,
    heroImage: '',
    albums: [
      { title: 'R I D M', dir: 'R I D M', year: 2022 },
    ],
  },
]

async function seedArtist(artistData: ArtistData) {
  const artistDir = path.join(DISCOGRAPHY_DIR, artistData.name)

  // Find a hero image from cover art
  let heroImageUrl = artistData.heroImage
  if (!heroImageUrl) {
    // Try to find any cover art
    for (const album of artistData.albums) {
      if (album.coverArt) {
        const coverPath = path.join(artistDir, album.dir, album.coverArt)
        if (fs.existsSync(coverPath)) {
          heroImageUrl = await uploadToIPFS(coverPath, `${artistData.name} - hero`)
          break
        }
      }
    }
    // Search for any jpg in the artist's directories
    if (!heroImageUrl) {
      const findJpg = (dir: string): string | null => {
        if (!fs.existsSync(dir)) return null
        const files = fs.readdirSync(dir)
        for (const f of files) {
          const full = path.join(dir, f)
          if (f.match(/\.(jpg|jpeg|png)$/i) && fs.statSync(full).isFile()) return full
          if (fs.statSync(full).isDirectory()) {
            const found = findJpg(full)
            if (found) return found
          }
        }
        return null
      }
      const jpgPath = findJpg(artistDir)
      if (jpgPath) {
        heroImageUrl = await uploadToIPFS(jpgPath, `${artistData.name} - hero`)
      }
    }
    if (!heroImageUrl) heroImageUrl = '/nina-epk-assets/nina-20.jpg' // fallback
  }

  // Create artist
  const artist = await prisma.artist.upsert({
    where: { slug: artistData.slug },
    update: { bio: artistData.bio, heroImage: heroImageUrl },
    create: {
      name: artistData.name,
      slug: artistData.slug,
      bio: artistData.bio,
      heroImage: heroImageUrl,
      walletAddresses: [],
    },
  })
  console.log(`\nArtist: ${artist.name}`)

  // Create hip-hop genre
  const genre = await prisma.genre.upsert({
    where: { slug: 'hip-hop' },
    update: {},
    create: { name: 'Hip-Hop', slug: 'hip-hop' },
  })

  // Seed albums
  for (const albumData of artistData.albums) {
    const albumDir = path.join(artistDir, albumData.dir)
    if (!fs.existsSync(albumDir)) {
      console.log(`  Skipping ${albumData.title} — directory not found: ${albumDir}`)
      continue
    }

    // Find cover art
    let coverUrl = ''
    if (albumData.coverArt) {
      const coverPath = path.join(albumDir, albumData.coverArt)
      if (fs.existsSync(coverPath)) {
        coverUrl = await uploadToIPFS(coverPath, `${artistData.name} - ${albumData.title} cover`)
      }
    }
    // Also check covers/ subdirectory (Théo Mode)
    if (!coverUrl) {
      const coversDir = path.join(artistDir, 'covers')
      if (fs.existsSync(coversDir)) {
        const coverFiles = fs.readdirSync(coversDir)
        const match = coverFiles.find(f =>
          f.toLowerCase().includes(albumData.title.toLowerCase().replace(/\s/g, '').substring(0, 6))
        )
        if (match) {
          coverUrl = await uploadToIPFS(path.join(coversDir, match), `${artistData.name} - ${albumData.title} cover`)
        }
      }
    }
    // Check for any jpg in the album dir
    if (!coverUrl) {
      const files = fs.readdirSync(albumDir)
      const jpg = files.find(f => f.match(/\.(jpg|jpeg|png)$/i))
      if (jpg) {
        coverUrl = await uploadToIPFS(path.join(albumDir, jpg), `${artistData.name} - ${albumData.title} cover`)
      }
    }

    const albumSlug = albumData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    const album = await prisma.album.upsert({
      where: { slug: albumSlug },
      update: { coverImageUri: coverUrl || undefined },
      create: {
        title: albumData.title,
        slug: albumSlug,
        primaryArtistId: artist.id,
        genreId: genre.id,
        coverImageUri: coverUrl || null,
        releaseDate: albumData.year ? new Date(`${albumData.year}-01-01`) : null,
        label: 'Lucid Haus',
      },
    })
    console.log(`  Album: ${album.title}`)

    // Find audio files
    let audioFiles = fs.readdirSync(albumDir)
      .filter(f => f.match(/\.(wav|mp3)$/i) && !f.startsWith('.'))

    if (albumData.trackFileFilter) {
      audioFiles = audioFiles.filter(albumData.trackFileFilter)
    }

    // Filter out non-audio files and sort by track number
    audioFiles.sort((a, b) => parseTrackNumber(a) - parseTrackNumber(b))

    // Delete existing tracks for this album (re-seed)
    await prisma.track.deleteMany({ where: { albumId: album.id } })

    for (let i = 0; i < audioFiles.length; i++) {
      const file = audioFiles[i]
      const filePath = path.join(albumDir, file)
      const trackNumber = parseTrackNumber(file) || (i + 1)
      const title = parseTrackTitle(file)

      // Convert WAV to MP3 for streaming
      let uploadPath = filePath
      if (file.toLowerCase().endsWith('.wav')) {
        uploadPath = convertToMp3(filePath)
      }

      const audioUrl = await uploadToIPFS(uploadPath, `${artistData.name} - ${title}`)

      await prisma.track.create({
        data: {
          title,
          trackNumber,
          albumId: album.id,
          audioUrl,
          featuredArtists: [],
          writers: [],
          producers: [],
        },
      })
      console.log(`    Track ${trackNumber}: ${title}`)
    }
  }
}

async function main() {
  console.log('=== Lucid Haus Discography Seed ===')
  console.log(`Source: ${DISCOGRAPHY_DIR}`)
  console.log()

  // Check ffmpeg
  try {
    execSync('which ffmpeg', { stdio: 'pipe' })
  } catch {
    console.error('ffmpeg not found. Install with: brew install ffmpeg')
    process.exit(1)
  }

  for (const artistData of artists) {
    await seedArtist(artistData)
  }

  // Clean up temp dir
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true })
  }

  console.log('\n=== Seed complete! ===')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
