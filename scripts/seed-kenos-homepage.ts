import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '../.env') })

async function seedKenosHomepage() {
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

    const existingPage = pages.docs[0]

    // EXACT sections from Keno's Home- Ref.png design
    const kenosLayout: any[] = [
      // 1. Hero Section - "You're Only A Stranger Once"
      {
        blockType: 'kenosHero',
        heading: "You're Only A Stranger Once",
        address: '8045 E Chapman Ave\nOrange, CA 92869',
        primaryButton: {
          text: 'See Menu',
          link: '/menu',
        },
        secondaryButton: {
          text: 'Our History',
          link: '/history',
        },
      },
      // 2. Awards Section - Two badges with logo between
      {
        blockType: 'awardsSection',
        awards: [
          {
            title: 'Best Breakfast in Orange County',
            source: 'Yelp',
          },
          {
            title: '#2 Best Family Friendly Restaurant in Orange County',
            source: 'OC Register',
          },
        ],
      },
      // 3. Thanksgiving Promotion Section
      {
        blockType: 'promotionSection',
        heading: 'Thanksgiving',
        content: [
          {
            children: [
              {
                text: 'Pre-Order Menu Available Now',
              },
            ],
          },
        ],
        button: {
          text: 'Reserve',
          link: '/reservations',
        },
      },
      // 4. Order Online Section with photo gallery
      {
        blockType: 'orderOnlineSection',
        heading: 'Order Online',
        description: '',
        button: {
          text: 'Order Online',
          link: '/order',
        },
        gallery: [],
      },
      // 5. "A Destination" Section
      {
        blockType: 'destinationSection',
        heading: 'A Destination',
        content: "Keno's Family Restaurant located in Orange, CA is truly your full service neighborhood restaurant. Nestled at the base of the beautiful Anaheim Hills canyon, and for the last 31 years has been owned and operated by the Cooper family.",
        button: {
          text: 'Our Menu',
          link: '/menu',
        },
      },
      // 6. Owner Profile Section - Steve Cooper
      {
        blockType: 'ownerProfileSection',
        label: 'OWNER',
        name: 'Steve Cooper',
        bio: "Steve Cooper has been an active member of the food industry for over 30 years. After over 20 years at Kenos, Steve's passion and tenacious attitude led him to open Canyon Catering.\n\nSteve's dedication to his family and his values are just a few of the reasons why he is so well-respected by the community and other members of the industry.",
        favoriteMealLabel: "Steve's Favorite Meal",
        favoriteMeal: "Tie between the Patty Melt and the LEGENDARY Fried Chicken.",
        button: {
          text: 'See The Team',
          link: '/staff',
        },
      },
    ]

    if (existingPage) {
      console.log('Deleting existing homepage...')
      await payload.delete({
        collection: 'pages',
        id: existingPage.id,
      })
      console.log('   Deleted old homepage')
    }
    
    {
      console.log('Creating new homepage with exact Kenos design...')
      const newPage = await payload.create({
        collection: 'pages',
        data: {
          title: 'Home',
          slug: 'home',
          layout: kenosLayout,
          status: 'published',
          meta: {
            title: "Keno's Restaurant | Best Breakfast in Orange County",
            description: "Keno's Family Restaurant - Award-winning breakfast and family dining in Orange, CA. Serving the community for 31+ years.",
            keywords: 'Kenos restaurant, Orange CA, best breakfast Orange County, family restaurant, American food',
          },
        },
      })
      console.log('✅ Homepage created successfully!')
      console.log(`   Page ID: ${newPage.id}`)
    }

    console.log('\n📋 Homepage sections (matching design reference):')
    console.log('   1. Hero - "You\'re Only A Stranger Once"')
    console.log('   2. Awards - Best Breakfast & Family Friendly badges')
    console.log('   3. Thanksgiving Promotion')
    console.log('   4. Order Online with photo gallery')
    console.log('   5. "A Destination" section')
    console.log('   6. Owner Profile - Ken Cooper')
    
    console.log('\n🌐 View your homepage:')
    console.log('   Frontend: http://localhost:3011')
    console.log('   Admin: http://localhost:3011/admin')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding homepage:', error)
    process.exit(1)
  }
}

seedKenosHomepage()
