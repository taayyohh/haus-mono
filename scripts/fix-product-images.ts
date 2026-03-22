import { PrismaClient } from '@prisma/client'
import mongoose from 'mongoose'
import axios from 'axios'

const prisma = new PrismaClient()
const MONGO_URI = 'mongodb+srv://theo:jWFUzqYpPVvlGRz0@haus-store.tgexqks.mongodb.net/?retryWrites=true&w=majority'

const PINATA_GATEWAY = 'https://plantmaterial.mypinata.cloud'
const PINATA_GATEWAY_TOKEN = 'BME32aCNybM83ofWic5mPEX59IByL6SlvcMMgMOLZAkgHfBQyfUcsepC_ooXDuN3'
const PINATA_JWT = process.env.PINATA_JWT || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZDVkY2Q3ZS0zZGE2LTQ4NDctYmRlNC00Y2JlOTZlOThjM2MiLCJlbWFpbCI6InNlbnRpbmFsMy4xNDE1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3NzdjMWU5OWMxYTM2N2I2OWUyYyIsInNjb3BlZEtleVNlY3JldCI6IjE1MTVlMTYwZGNlODZiNDhiYjgxMDBmZmE4MGRjYjNjZDBiZmUyYTU4OTEwZDUwYzdmZmI0NzEyZDhkZjdhNjMiLCJleHAiOjE4MDM1ODIzNDB9.CMXjBxmK2yH0NTCeAmX43KE-LnJWMxL2TeLhWd0SDwU'

/**
 * Convert an ipfs:// URI to a Pinata gateway URL with auth token.
 */
function ipfsToGatewayUrl(ipfsUri: string): string {
  if (!ipfsUri) return ''

  // Already a gateway URL
  if (ipfsUri.startsWith('http')) {
    // Ensure it has the gateway token
    if (ipfsUri.includes('pinataGatewayToken')) return ipfsUri
    const separator = ipfsUri.includes('?') ? '&' : '?'
    return `${ipfsUri}${separator}pinataGatewayToken=${PINATA_GATEWAY_TOKEN}`
  }

  // Extract CID (and optional path) from ipfs:// URI
  let cidPath: string
  if (ipfsUri.startsWith('ipfs://')) {
    cidPath = ipfsUri.replace('ipfs://', '')
  } else {
    cidPath = ipfsUri
  }

  return `${PINATA_GATEWAY}/ipfs/${cidPath}?pinataGatewayToken=${PINATA_GATEWAY_TOKEN}`
}

/**
 * Extract just the CID from an ipfs:// URI (without any filename path).
 */
function extractCid(ipfsUri: string): string {
  let cidPath: string
  if (ipfsUri.startsWith('ipfs://')) {
    cidPath = ipfsUri.replace('ipfs://', '')
  } else if (ipfsUri.includes('/ipfs/')) {
    cidPath = ipfsUri.split('/ipfs/').pop()!
  } else {
    cidPath = ipfsUri
  }
  // CID is the first path segment
  return cidPath.split('/')[0]
}

/**
 * Check if a URL is accessible (returns 200).
 */
async function isUrlAccessible(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url, { timeout: 15000 })
    return response.status === 200
  } catch {
    // Some servers don't support HEAD, try GET with range
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        headers: { Range: 'bytes=0-0' },
        responseType: 'arraybuffer',
      })
      return response.status === 200 || response.status === 206
    } catch {
      return false
    }
  }
}

/**
 * Try to re-pin a CID on Pinata by hash so the gateway can serve it.
 */
async function repinOnPinata(cid: string, name: string): Promise<boolean> {
  try {
    console.log(`    Attempting to re-pin CID ${cid} on Pinata...`)
    await axios.post(
      'https://api.pinata.cloud/pinning/pinByHash',
      {
        hashToPin: cid,
        pinataMetadata: { name: `product-image-${name}` },
      },
      {
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    )
    console.log(`    Re-pin request submitted for ${cid}`)
    return true
  } catch (error: any) {
    const status = error?.response?.status
    const msg = error?.response?.data?.error || error.message
    // 409 means already pinned - that's fine
    if (status === 409) {
      console.log(`    CID ${cid} is already pinned`)
      return true
    }
    console.log(`    Re-pin failed for ${cid}: ${status} ${msg}`)
    return false
  }
}

async function main() {
  console.log('=== Fix Product Images ===\n')

  // Connect to MongoDB to get original image data
  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGO_URI)
  const db = mongoose.connection.db!
  const mongoProducts = await db.collection('products').find({}).toArray()
  console.log(`Found ${mongoProducts.length} products in MongoDB\n`)

  // Build a lookup by name for MongoDB products
  const mongoByName = new Map<string, any>()
  for (const mp of mongoProducts) {
    mongoByName.set(mp.name, mp)
  }

  // Get all products from PostgreSQL
  const pgProducts = await prisma.product.findMany({
    select: { id: true, name: true, images: true, slug: true },
  })
  console.log(`Found ${pgProducts.length} products in PostgreSQL\n`)

  let updatedCount = 0
  let failedCount = 0

  for (const product of pgProducts) {
    console.log(`\nProcessing: ${product.name}`)

    // Get image URIs from MongoDB (source of truth) or fall back to PG
    const mongoProd = mongoByName.get(product.name)
    const sourceImages: string[] = mongoProd?.imageUri || product.images
    console.log(`  Source images: ${JSON.stringify(sourceImages)}`)

    const fixedImages: string[] = []

    for (const imageUri of sourceImages) {
      if (!imageUri) continue

      // Convert ipfs:// to gateway URL
      const gatewayUrl = ipfsToGatewayUrl(imageUri)
      console.log(`  Gateway URL: ${gatewayUrl}`)

      // Check if the gateway URL works
      const accessible = await isUrlAccessible(gatewayUrl)
      console.log(`  Accessible: ${accessible}`)

      if (accessible) {
        fixedImages.push(gatewayUrl)
      } else {
        // Try to re-pin the CID
        const cid = extractCid(imageUri)
        const repinned = await repinOnPinata(cid, product.slug)

        if (repinned) {
          // Wait a moment and check again
          console.log('    Waiting 3s for pin to propagate...')
          await new Promise((r) => setTimeout(r, 3000))
          const nowAccessible = await isUrlAccessible(gatewayUrl)
          console.log(`    Accessible after re-pin: ${nowAccessible}`)

          if (nowAccessible) {
            fixedImages.push(gatewayUrl)
          } else {
            // Still push the gateway URL - the re-pin may take time to propagate
            console.log('    Using gateway URL anyway (pin may still be propagating)')
            fixedImages.push(gatewayUrl)
          }
        } else {
          // Even if re-pin fails, store the gateway URL (better than ipfs://)
          console.log('    Falling back to gateway URL (may not work until re-pinned)')
          fixedImages.push(gatewayUrl)
        }
      }
    }

    if (fixedImages.length > 0) {
      // Check if images actually changed
      const changed = JSON.stringify(fixedImages) !== JSON.stringify(product.images)
      if (changed) {
        await prisma.product.update({
          where: { id: product.id },
          data: { images: fixedImages },
        })
        console.log(`  UPDATED in PostgreSQL with ${fixedImages.length} image(s)`)
        updatedCount++
      } else {
        console.log(`  No change needed`)
      }
    } else {
      console.log(`  WARNING: No images found for product!`)
      failedCount++
    }
  }

  console.log(`\n=== Summary ===`)
  console.log(`Total products: ${pgProducts.length}`)
  console.log(`Updated: ${updatedCount}`)
  console.log(`Failed/no images: ${failedCount}`)
  console.log(`Unchanged: ${pgProducts.length - updatedCount - failedCount}`)

  // Verify final state
  console.log(`\n=== Final Product Images ===`)
  const finalProducts = await prisma.product.findMany({
    select: { name: true, images: true },
  })
  for (const p of finalProducts) {
    console.log(`  ${p.name}: ${p.images[0]?.substring(0, 80)}...`)
  }

  await mongoose.disconnect()
  await prisma.$disconnect()
  console.log('\nDone!')
}

main().catch(async (e) => {
  console.error('Error:', e)
  await mongoose.disconnect().catch(() => {})
  await prisma.$disconnect().catch(() => {})
  process.exit(1)
})
