import { PrismaClient } from '@prisma/client'
import mongoose from 'mongoose'
import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'
import FormData from 'form-data'

const prisma = new PrismaClient()
const MONGO_URI = 'mongodb+srv://theo:jWFUzqYpPVvlGRz0@haus-store.tgexqks.mongodb.net/?retryWrites=true&w=majority'
const VIDEO_DIR = '/Users/fiction/Desktop/Label Discography/Music Videos'
const PINATA_JWT = process.env.PINATA_JWT!
const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || 'https://plantmaterial.mypinata.cloud'
const PINATA_TOKEN = process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN || ''

async function uploadToIPFS(filePath: string, name: string): Promise<string> {
  const formData = new FormData()
  formData.append('file', fs.createReadStream(filePath))
  formData.append('pinataMetadata', JSON.stringify({ name }))

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: Infinity,
      headers: { ...formData.getHeaders(), Authorization: `Bearer ${PINATA_JWT}` },
      timeout: 600000, // 10 min for large videos
    })
    const cid = res.data.IpfsHash
    const url = `${PINATA_GATEWAY}/ipfs/${cid}?pinataGatewayToken=${PINATA_TOKEN}`
    console.log(`  Uploaded: ${name} → ${cid}`)
    return url
  } catch (e: any) {
    console.error(`  Upload failed: ${name} — ${e.message}`)
    return ''
  }
}

// Map video filenames to MongoDB video titles
const fileToTitle: Record<string, string> = {
  '[YT2mp3.info] - Nappy Nina - Dipped (Official Video).mp4': 'Dipped',
  '[YT2mp3.info] - Nappy Nina - Good To Me (Official Video).mp4': 'Good TO Me',
  '[YT2mp3.info] - Nappy Nina - Growth Groove (Official Flip).mp4': 'Growth Groove',
  '[YT2mp3.info] - Nappy Nina - Pig Pen (Official Video).mp4': 'Pig Pen',
  '[YT2mp3.info] - Nappy Nina - Plastic Spoons (Official Video).mp4': 'Plastic Spoons',
  '[YT2mp3.info] - Nappy Nina - Real Tea Feat. Stas Thee Boss (Official Video).mp4': 'Real Tea feat. Stas THEE Boss',
  '[YT2mp3.info] - Nappy Nina - Too Soon (Official Video).mp4': 'Too Soon',
  '[YT2mp3.info] - Nappy Nina - Weeping Waltz feat. Cavalier (Official Video).mp4': 'Weeping Waltz',
  '[YT2mp3.info] - Nappy Nina- Scuffle (Official Video).mp4': 'Scuffle',
  '13th LAW - It\'s Alright (Official Video).mp4': 'It\'s Alright',
  'babyfang - Goan Go (Official Music Video).mp4': 'Goan Go',
  'Be Honest FINAL.mov': 'Be Honest',
  'IDWTAI (Official Music Video).mp4': 'IDWTAI',
  'Tableset Video.mp4': 'Table Set',
  'Théo Mode - Burnt Orange.mp4': 'Burnt Orange',
  'Wanted Video.mp4': 'Wanted',
}

async function main() {
  console.log('=== Seeding Music Videos ===\n')

  await mongoose.connect(MONGO_URI)
  const db = mongoose.connection.db!
  const mongoVideos = await db.collection('musicvideos').find({}).toArray()
  const mongoArtists = await db.collection('artists').find({}).toArray()

  // Get our PG artists
  const pgArtists = await prisma.artist.findMany({ select: { id: true, name: true, slug: true } })

  const videoFiles = fs.readdirSync(VIDEO_DIR).filter(f => f.match(/\.(mp4|mov)$/i))
  console.log(`Found ${videoFiles.length} video files\n`)

  for (const file of videoFiles) {
    const mongoTitle = fileToTitle[file]
    if (!mongoTitle) {
      console.log(`Skipping: ${file} (no title mapping)`)
      continue
    }

    const mongoVideo = mongoVideos.find(v => v.title === mongoTitle)
    if (!mongoVideo) {
      console.log(`Skipping: ${file} (no MongoDB match for "${mongoTitle}")`)
      continue
    }

    // Resolve artist
    const mongoArtist = mongoArtists.find(a => a._id.toString() === mongoVideo.primaryArtist?.toString())
    const pgArtist = pgArtists.find(a => a.name === mongoArtist?.name)
    if (!pgArtist) {
      console.log(`Skipping: ${file} (artist not found: ${mongoArtist?.name})`)
      continue
    }

    // Check if already exists
    const existing = await prisma.musicVideo.findUnique({ where: { slug: mongoVideo.slug } })
    if (existing) {
      console.log(`Already exists: ${mongoTitle}`)
      continue
    }

    console.log(`Processing: ${mongoTitle} (${pgArtist.name})`)

    // Upload video to IPFS
    const filePath = path.join(VIDEO_DIR, file)
    const videoUrl = await uploadToIPFS(filePath, `${pgArtist.name} - ${mongoTitle}`)

    if (!videoUrl) {
      console.log(`  Skipping due to upload failure`)
      continue
    }

    // Upload thumbnail if available (re-pin from existing IPFS)
    let thumbnailUrl = ''
    if (mongoVideo.thumbnailUri) {
      const cid = mongoVideo.thumbnailUri.replace('ipfs://', '').split('/')[0]
      thumbnailUrl = `${PINATA_GATEWAY}/ipfs/${mongoVideo.thumbnailUri.replace('ipfs://', '')}?pinataGatewayToken=${PINATA_TOKEN}`
      // Try to re-pin the thumbnail
      try {
        await axios.post('https://api.pinata.cloud/pinning/pinByHash',
          { hashToPin: cid, pinataMetadata: { name: `${mongoTitle} thumbnail` } },
          { headers: { Authorization: `Bearer ${PINATA_JWT}` }, timeout: 15000 }
        )
      } catch { /* ignore */ }
    }

    await prisma.musicVideo.create({
      data: {
        title: mongoTitle,
        slug: mongoVideo.slug,
        primaryArtistId: pgArtist.id,
        videoUri: videoUrl,
        thumbnailUri: thumbnailUrl || null,
        isActive: true,
      },
    })

    console.log(`  Created: ${mongoTitle}\n`)
  }

  await mongoose.disconnect()
  await prisma.$disconnect()
  console.log('\n=== Done! ===')
}

main().catch(async e => {
  console.error(e)
  await mongoose.disconnect().catch(() => {})
  await prisma.$disconnect().catch(() => {})
  process.exit(1)
})
