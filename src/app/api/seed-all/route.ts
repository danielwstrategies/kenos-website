import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  // Optional: Add API key protection
  const apiKey = request.headers.get('x-api-key')
  const expectedKey = process.env.SEED_API_KEY
  
  // If SEED_API_KEY is set, require it
  if (expectedKey && apiKey !== expectedKey) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized - invalid or missing API key' },
      { status: 401 }
    )
  }

  const results: any = {
    created: [],
    skipped: [],
    errors: [],
  }

  try {
    const payload = await getPayload({ config })

    // ============================================
    // HOMEPAGE
    // ============================================
    try {
      const existingHome = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } },
      })

      if (existingHome.docs.length > 0) {
        results.skipped.push({ page: 'home', reason: 'Already exists' })
      } else {
        const homepage = await payload.create({
          collection: 'pages',
          data: {
            title: 'Home',
            slug: 'home',
            status: 'published',
            layout: [
              {
                blockType: 'kenosHero',
                heading: "You're Only A Stranger Once",
                address: '8685 E Chapman Ave\nOrange, CA 92869',
                primaryButton: { text: 'See Menu', link: '/menu' },
                secondaryButton: { text: 'Join Waitlist', link: 'https://www.waitlist.com/restaurants/kenos' },
              },
              {
                blockType: 'awardsSection',
                awards: [
                  { title: 'Best Breakfast in Orange County', source: 'hotlist' },
                  { title: '#2 Best Family Friendly Restaurant in Orange County', source: 'register' },
                ],
              },
              {
                blockType: 'promotionSection',
                heading: 'Thanksgiving Day Menus',
                subheading: 'Pre-Order Family Meals or Dine-In',
                showDateBox: true,
                dateBoxLine1: 'Thursday November 27th, 2025',
                dateBoxLine2: 'Open from 7:00 am - 6:00 pm',
                dateBoxLine3: 'Holiday Menu 11am - Sold Out',
                button: { text: 'Reserve', link: '/reservations' },
              },
              {
                blockType: 'orderOnlineSection',
                heading: 'Order Online',
                description: "Enjoy Keno's delicious food from the comfort of your home.",
                button: { text: 'Order Now', link: '/order' },
                gallery: [],
              },
              {
                blockType: 'destinationSection',
                heading: 'A Destination',
                content: "For over 31 years, Keno's has been a beloved gathering place where families and friends come together to share great food and create lasting memories.",
                button: { text: 'Our Menu', link: '/menu' },
              },
              {
                blockType: 'ownerProfileSection',
                label: 'OWNER',
                name: 'Steve Cooper',
                bio: "Steve Cooper has been at the helm of Keno's since 1993, carrying forward a legacy of hospitality and great food.",
                favoriteMealLabel: "Steve's Favorite Meal",
                favoriteMeal: '"Two eggs over medium, crispy hash browns, and our famous sourdough toast."',
                button: { text: 'See The Team', link: '/our-staff' },
              },
            ],
            meta: {
              title: "Keno's Restaurant | Orange County's Best Breakfast & Family Dining",
              description: "Experience 31+ years of delicious American comfort food at Keno's Restaurant in Orange, CA.",
            },
          },
        })
        results.created.push({ page: 'home', id: homepage.id })
      }
    } catch (error: any) {
      results.errors.push({ page: 'home', error: error.message })
    }

    // ============================================
    // OUR STAFF PAGE
    // ============================================
    try {
      const existingStaff = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'our-staff' } },
      })

      if (existingStaff.docs.length > 0) {
        results.skipped.push({ page: 'our-staff', reason: 'Already exists' })
      } else {
        const staffPage = await payload.create({
          collection: 'pages',
          data: {
            title: 'Our Staff',
            slug: 'our-staff',
            status: 'published',
            layout: [
              {
                blockType: 'staffHero',
                heading: 'Our',
                subheading: 'Family',
                content: "We can't say it enough… thank you. From the early days to today, your support has carried us through the tough times and made the good times even better. Every smile, every meal shared, every kind word reminds us why we love doing this.",
                primaryButton: { text: 'Contact Us', link: '/contact' },
                secondaryButton: { text: 'Jobs', link: '/jobs' },
              },
              {
                blockType: 'staffGrid',
                introText: "As we've grown, so has our family here at Kenos. We are blessed with an incredible team of managers and staff who bring their heart and energy into the restaurant every single day. They are the reason our guests feel at home the moment they walk through the door.\n\nAs we grow, our family is excited to see how the next generation will carry forward the traditions and values that have always been at the heart of Kenos.\n\nFrom our family to yours, thank you for being part of Kenos. You are the reason we can continue to do what we love, and we look forward to welcoming you back again and again.\n\nWith love and gratitude,\nThe Coopers\nOwners, Kenos Restaurant",
                staffMembers: [
                  { name: 'Meet Shauna', title: 'General Manager', image: null },
                  { name: 'Meet Chef Leo', title: 'Executive Chef', image: null },
                  { name: 'Meet Chef Doro Najera', title: 'Steakhouse Chef', image: null },
                  { name: 'Meet Iven', title: 'Bar Manager', image: null },
                  { name: 'Meet Alfonso', title: 'Assistant General Manager', image: null },
                ],
              },
              {
                blockType: 'historyHero',
                heading: 'Our History',
                content: "Kenos Family Restaurant has been a part of the Canyon since its inception in 1983. Kenos opened its doors on August 3rd, 1980. The current owners, the Cooper family, began owning and operating the business on July 21, 1993. For the past thirty years, Kenos has grown with the Canyon. But one thing at Kenos has stayed the same throughout the decades: the food & the people.",
                button: { text: 'Read More', link: '/our-history' },
              } as any,
              {
                blockType: 'kenosToday',
                headingSuffix: 'Today',
                content: "Today, Keno's is still changing and adapting to the Canyon. With a recently updated exterior, Keno's is still your favorite neighborhood stop! We still have our world famous pancakes, and fried chicken on Tuesdays! The Lounge is still decked out with The Rat Pack and gives off just the right 'old Vegas' vibe you've been missing. Come say hi! We hope to see you soon.",
                primaryButton: { text: 'See Menu', link: '/menu' },
                secondaryButton: { text: 'Order Online', link: '/order' },
              },
            ] as any,
            meta: {
              title: "Our Staff | Keno's Restaurant",
              description: "Meet the Keno's family - our dedicated team of managers and staff.",
            },
          },
        })
        results.created.push({ page: 'our-staff', id: staffPage.id })
      }
    } catch (error: any) {
      results.errors.push({ page: 'our-staff', error: error.message })
    }

    // ============================================
    // OUR HISTORY PAGE
    // ============================================
    try {
      const existingHistory = await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'our-history' } },
      })

      if (existingHistory.docs.length > 0) {
        results.skipped.push({ page: 'our-history', reason: 'Already exists' })
      } else {
        const historyPage = await payload.create({
          collection: 'pages',
          data: {
            title: 'Our History',
            slug: 'our-history',
            status: 'published',
            layout: [
              {
                blockType: 'historyHero',
                heading: 'Our History',
                content: "Kenos Family Restaurant has been a part of the Canyon since its inception in 1983. Kenos opened its doors on August 3rd, 1980. The current owners, the Cooper family, began owning and operating the business on July 21, 1993. For the past thirty years, Kenos has grown with the Canyon. But one thing at Kenos has stayed the same throughout the decades: the food & the people.",
                button: { text: 'Meet The Team', link: '/our-staff' },
              } as any,
              {
                blockType: 'historyTimelineTicker',
                displayMode: 'notecard',
                showYear: true,
                yearLabel: 'EST.',
                year: '1983',
                images: [],
              },
              {
                blockType: 'classicsSection',
                subtitle: 'TASTE THE CLASSICS',
                content: "Our menu features time-tested recipes that have been perfected over three decades. From our famous pancakes to our legendary fried chicken, every dish tells a story of tradition and quality.",
                images: [],
              },
              {
                blockType: 'kenosToday',
                headingSuffix: 'Today',
                content: "Today, Keno's is still changing and adapting to the Canyon. With a recently updated exterior, Keno's is still your favorite neighborhood stop!",
                primaryButton: { text: 'See Menu', link: '/menu' },
                secondaryButton: { text: 'Order Online', link: '/order' },
              },
            ],
            meta: {
              title: "Our History | Keno's Restaurant",
              description: "Discover the rich history of Keno's Restaurant - serving Orange County since 1983.",
            },
          },
        })
        results.created.push({ page: 'our-history', id: historyPage.id })
      }
    } catch (error: any) {
      results.errors.push({ page: 'our-history', error: error.message })
    }

    return NextResponse.json({
      success: true,
      message: 'Seed operation completed',
      results,
      nextSteps: [
        'Upload images via /admin for each page',
        'Edit content as needed in /admin/collections/pages',
      ],
    })
  } catch (error: any) {
    console.error('Error in seed-all:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
