import { PrismaClient } from '@prisma/client'
import mongoose from 'mongoose'
import slugify from 'slugify'

const prisma = new PrismaClient()
const MONGO_URI = 'mongodb+srv://theo:jWFUzqYpPVvlGRz0@haus-store.tgexqks.mongodb.net/?retryWrites=true&w=majority'

async function main() {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGO_URI)
  const db = mongoose.connection.db!

  // Migrate products
  console.log('\n=== Migrating Products ===')
  const products = await db.collection('products').find({}).toArray()
  console.log(`Found ${products.length} products in MongoDB`)

  for (const p of products) {
    const slug = p.slug || slugify(p.name, { lower: true, remove: /[*+~.()'"!:@]/g })

    const existing = await prisma.product.findUnique({ where: { slug } })
    if (existing) {
      console.log(`  Skipping ${p.name} (already exists)`)
      continue
    }

    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug,
        description: p.description || '',
        price: p.price || 0,
        images: p.imageUri || [],
        category: 'merch',
        quantity: p.quantity || 0,
        stripeProductId: p.stripeId || null,
        isActive: true,
      },
    })

    // Migrate sized stock
    if (p.stock && Array.isArray(p.stock)) {
      for (const s of p.stock) {
        if (s.size && s.quantity !== undefined) {
          await prisma.productStock.create({
            data: {
              productId: product.id,
              size: s.size,
              quantity: s.quantity,
            },
          })
        }
      }
    }

    console.log(`  Migrated: ${p.name} (${p.stock?.length || 0} sizes, qty: ${p.quantity || 0})`)
  }

  // Show what other data exists
  console.log('\n=== Other MongoDB Collections ===')
  const collections = await db.listCollections().toArray()
  for (const col of collections) {
    const count = await db.collection(col.name).countDocuments()
    console.log(`  ${col.name}: ${count} documents`)
  }

  await mongoose.disconnect()
  console.log('\nMigration complete!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await mongoose.disconnect()
    await prisma.$disconnect()
    process.exit(1)
  })
