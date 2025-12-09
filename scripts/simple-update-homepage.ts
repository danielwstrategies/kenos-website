import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env') })

async function updateHomepage() {
  try {
    console.log('Connecting to Payload...')
    const payload = await getPayload({ config })

    console.log('Finding existing homepage...')
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
    })

    if (!pages.docs[0]) {
      console.log('No homepage found!')
      process.exit(1)
    }

    const pageId = pages.docs[0].id

    console.log('\n✅ Homepage found!')
    console.log(`Page ID: ${pageId}`)
    console.log('\n📝 Instructions to manually update:')
    console.log('1. Go to http://localhost:3011/admin/collections/pages/' + pageId)
    console.log('2. Clear all existing blocks from the Layout field')
    console.log('3. Add these NEW KENOS BLOCKS in order:')
    console.log('   a. Kenos Hero - Main hero section')
    console.log('   b. Awards Section - Award badges')
    console.log('   c. Promotion Section - Seasonal promotions')
    console.log('   d. Order Online Section - Gallery + CTA')
    console.log('   e. Destination Section - Quote with dark overlay')
    console.log('   f. Owner Profile Section - Profile with quote')
    console.log('4. Save and publish\n')
    console.log('Note: You can upload images in the Media collection first,')
    console.log('      then select them in each block.\n')

    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

updateHomepage()
