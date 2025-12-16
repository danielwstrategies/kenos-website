import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Check if page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'our-staff',
        },
      },
    })

    if (existingPages.docs.length > 0) {
      return NextResponse.json({
        message: 'Our Staff page already exists',
        page: existingPages.docs[0],
      })
    }

    // Create the Our Staff page
    const page = await payload.create({
      collection: 'pages',
      data: {
        title: 'Our Staff',
        slug: 'our-staff',
        status: 'published',
        layout: [
          // Staff Hero Section
          {
            blockType: 'staffHero',
            heading: 'Our',
            subheading: 'Family',
            content: "We can't say it enough… thank you. From the early days to today, your support has carried us through the tough times and made the good times even better. Every smile, every meal shared, every kind word reminds us why we love doing this.",
            primaryButton: {
              text: 'Contact Us',
              link: '/contact',
            },
            secondaryButton: {
              text: 'Jobs',
              link: '/jobs',
            },
          },
          // Staff Grid Section
          {
            blockType: 'staffGrid',
            introText: "As we've grown, so has our family here at Kenos. We are blessed with an incredible team of managers and staff who bring their heart and energy into the restaurant every single day. They are the reason our guests feel at home the moment they walk through the door.\n\nAs we grow, our family is excited to see how the next generation will carry forward the traditions and values that have always been at the heart of Kenos.\n\nFrom our family to yours, thank you for being part of Kenos. You are the reason we can continue to do what we love, and we look forward to welcoming you back again and again.\n\nWith love and gratitude,\nThe Coopers\nOwners, Kenos Restaurant",
            staffMembers: [
              {
                name: 'Meet Shauna',
                title: 'General Manager',
                image: null,
              },
              {
                name: 'Meet Chef Leo',
                title: 'Executive Chef',
                image: null,
              },
              {
                name: 'Meet Chef Doro Najera',
                title: 'Steakhouse Chef',
                image: null,
              },
              {
                name: 'Meet Iven',
                title: 'Bar Manager',
                image: null,
              },
              {
                name: 'Meet Alfonso',
                title: 'Assistant General Manager',
                image: null,
              },
            ],
          },
          // History Hero Section
          {
            blockType: 'historyHero',
            heading: 'Our History',
            content: "Kenos Family Restaurant has been a part of the Canyon since its inception in 1983. Kenos opened its doors on August 3rd, 1980. The current owners, the Cooper family, began owning and operating the business on July 21, 1993. For the past thirty years, Kenos has grown with the Canyon. But one thing at Kenos has stayed the same throughout the decades: the food & the people.",
          },
          // Keno's Today Section
          {
            blockType: 'kenosToday',
            headingSuffix: 'Today',
            content: "Today, Keno's is still changing and adapting to the Canyon. With a recently updated exterior, Keno's is still your favorite neighborhood stop! We still have our world famous pancakes, and fried chicken on Tuesdays! The Lounge is still decked out with The Rat Pack and gives off just the right 'old Vegas' vibe you've been missing. Come say hi! We hope to see you soon.",
            primaryButton: {
              text: 'See Menu',
              link: '/menu',
            },
            secondaryButton: {
              text: 'Order Online',
              link: '/order',
            },
          },
        ] as any,
        meta: {
          title: 'Our Staff | Keno\'s Restaurant',
          description: 'Meet the Keno\'s family - our dedicated team of managers and staff who bring their heart and energy into the restaurant every single day.',
        },
      },
    })

    return NextResponse.json({
      message: 'Our Staff page created successfully!',
      page,
      adminUrl: '/admin/collections/pages/' + page.id,
      frontendUrl: '/our-staff',
    })
  } catch (error) {
    console.error('Error seeding Our Staff page:', error)
    return NextResponse.json(
      { error: 'Failed to seed Our Staff page', details: String(error) },
      { status: 500 }
    )
  }
}

