import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Require API key for seed operations
  const apiKey = request.headers.get('x-api-key')
  const expectedKey = process.env.SEED_API_KEY
  
  if (!expectedKey) {
    return NextResponse.json(
      { success: false, error: 'SEED_API_KEY not configured on server' },
      { status: 500 }
    )
  }
  
  if (apiKey !== expectedKey) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized - invalid or missing API key' },
      { status: 401 }
    )
  }

  try {
    const payload = await getPayload({ config })

    // Check if homepage already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
    })

    if (existingPages.docs.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Homepage already exists',
        pageId: existingPages.docs[0].id,
        url: `/admin/collections/pages/${existingPages.docs[0].id}`,
      })
    }

    // Create the Keno's Restaurant homepage with design-specific blocks
    const homepage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        layout: [
          // 1. Hero Section - "You're Only A Stranger Once"
          {
            blockType: 'kenosHero',
            heading: "You're Only A Stranger Once",
            address: '8685 E Chapman Ave\nOrange, CA 92869',
            primaryButton: {
              text: 'See Menu',
              link: '/menu',
            },
            secondaryButton: {
              text: 'Our History',
              link: '/history',
            },
          },
          // 2. Awards Section - Best Breakfast & Family Friendly
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
            heading: 'Thanksgiving Pre-Order Menu',
            content: [
              {
                children: [
                  {
                    text: 'Order your complete Thanksgiving dinner from Keno\'s! Traditional turkey dinner with all the fixings, including stuffing, mashed potatoes, gravy, cranberry sauce, and fresh-baked pies.',
                  },
                ],
              },
              {
                children: [
                  {
                    text: 'Pre-orders must be placed by November 20th. Pick up available November 22-23.',
                  },
                ],
              },
            ],
            button: {
              text: 'Reserve',
              link: '/reservations',
            },
          },
          // 4. Order Online Section with Photo Gallery
          {
            blockType: 'orderOnlineSection',
            heading: 'Order Online',
            description: 'Enjoy Keno\'s delicious food from the comfort of your home. Browse our full menu and place your order for pickup or delivery.',
            button: {
              text: 'Order Now',
              link: '/order',
            },
            gallery: [],
          },
          // 5. "A Destination" Section
          {
            blockType: 'destinationSection',
            heading: 'A Destination',
            content: 'For over 31 years, Keno\'s has been a beloved gathering place where families and friends come together to share great food and create lasting memories. Our commitment to quality ingredients, scratch-made recipes, and warm hospitality makes every visit special.',
            button: {
              text: 'Our Menu',
              link: '/menu',
            },
          },
          // 6. Owner Profile Section
          {
            blockType: 'ownerProfileSection',
            label: 'OWNER',
            name: 'Keno',
            quote: 'My favorite meal at the restaurant is our classic breakfast platter with fluffy pancakes, crispy bacon, and farm-fresh eggs. It reminds me why I started this place - to bring people together over honest, delicious food.',
            button: {
              text: 'See The Team',
              link: '/team',
            },
          },
          // 7. Menu Highlights Section
          {
            blockType: 'menuHighlights',
            title: 'Signature Dishes',
            subtitle: 'Fan favorites that keep our guests coming back',
            items: [
              {
                name: 'Famous Fried Chicken',
                description: 'Crispy, golden-fried chicken with our secret blend of herbs and spices',
                price: '$16.99',
                category: 'Main Course',
                featured: true,
              },
              {
                name: 'Classic Breakfast Platter',
                description: 'Two eggs any style, bacon or sausage, hash browns, and pancakes or toast',
                price: '$12.99',
                category: 'Breakfast',
                featured: true,
              },
              {
                name: 'Keno\'s Burger',
                description: 'Half-pound Angus beef patty with lettuce, tomato, onion, and special sauce',
                price: '$14.99',
                category: 'Main Course',
                featured: true,
              },
              {
                name: 'Homemade Pie',
                description: 'Fresh-baked daily - ask your server for today\'s flavors',
                price: '$6.99',
                category: 'Dessert',
                featured: false,
              },
            ],
          },
          // 8. Testimonials
          {
            blockType: 'testimonials',
            title: 'What Our Guests Say',
            subtitle: 'Over 31 years of happy customers',
            testimonials: [
              {
                quote: 'Best breakfast in Orange County, hands down! The pancakes are fluffy, the bacon is crispy, and the service is always friendly. This is our family\'s Sunday tradition.',
                author: 'Jennifer Martinez',
                role: 'Regular Customer',
                rating: 5,
              },
              {
                quote: 'Keno\'s is the real deal. Great food, generous portions, and prices that won\'t break the bank. The fried chicken is absolutely incredible!',
                author: 'Mike Thompson',
                role: 'Food Enthusiast',
                rating: 5,
              },
              {
                quote: 'A true Orange County gem! We\'ve been coming here for over 15 years and it never disappoints. The staff treats you like family.',
                author: 'Sarah Chen',
                role: 'Local Resident',
                rating: 5,
              },
            ],
          },
          // 9. Contact Information
          {
            blockType: 'contact',
            title: 'Visit Us',
            subtitle: 'We\'re here to serve you',
            address: '8685 E Chapman Ave\nOrange, CA 92869',
            phone: '(714) 555-KENO',
            email: 'info@kenosrestaurant.com',
            hours: [
              {
                day: 'Monday - Friday',
                hours: '7:00 AM - 9:00 PM',
              },
              {
                day: 'Saturday',
                hours: '7:00 AM - 10:00 PM',
              },
              {
                day: 'Sunday',
                hours: '7:00 AM - 9:00 PM',
              },
            ],
            showContactForm: true,
          },
        ] as any,
        meta: {
          title: "Keno's Restaurant | Orange County's Best Breakfast & Family Dining Since 1994",
          description:
            "Experience 31+ years of delicious American comfort food at Keno's Restaurant in Orange, CA. Award-winning breakfast, lunch, and dinner in a family-friendly atmosphere.",
          keywords:
            'Kenos restaurant, Orange CA restaurant, best breakfast Orange County, family restaurant, American food, fried chicken, comfort food, Orange dining',
        },
        status: 'published',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Keno\'s Restaurant homepage created successfully!',
      page: {
        id: homepage.id,
        title: homepage.title,
        slug: homepage.slug,
        blocks: homepage.layout.length,
      },
      urls: {
        view: `/admin/collections/pages/${homepage.id}`,
        frontend: '/',
        api: `/api/pages/${homepage.id}`,
      },
    })
  } catch (error: any) {
    console.error('Error seeding homepage:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create homepage',
        details: error.toString(),
      },
      { status: 500 },
    )
  }
}
