import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
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

    // Create the homepage with proper Slate editor format
    const homepage = await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        layout: [
          {
            blockType: 'hero',
            heading: "Welcome to Keno's Restaurant",
            subheading:
              'Experience authentic flavors and warm hospitality in the heart of the city. Every dish tells a story.',
            primaryButton: {
              text: 'View Our Menu',
              link: '/menu',
            },
            secondaryButton: {
              text: 'Reserve a Table',
              link: '/reservations',
            },
          },
          {
            blockType: 'about',
            title: 'Our Story',
            subtitle: 'A Passion for Excellence Since 2010',
            content: [
              {
                children: [
                  {
                    text: "At Keno's Restaurant, we believe that great food brings people together. Our journey began over a decade ago with a simple vision: to create a dining experience that celebrates authentic flavors, fresh ingredients, and the joy of sharing a meal with loved ones.",
                  },
                ],
              },
              {
                children: [
                  {
                    text: 'Our talented chefs craft each dish with care, combining traditional recipes with modern culinary techniques to deliver unforgettable flavors.',
                  },
                ],
              },
            ],
            imagePosition: 'right',
            features: [
              {
                icon: '🍳',
                title: 'Fresh Ingredients',
                description: 'Locally sourced produce and ingredients delivered fresh daily',
              },
              {
                icon: '👨‍🍳',
                title: 'Expert Chefs',
                description: 'Over 20 years of combined culinary experience',
              },
              {
                icon: '🏆',
                title: 'Award Winning',
                description: 'Recognized for excellence in dining and service',
              },
              {
                icon: '❤️',
                title: 'Made with Love',
                description: 'Every dish is prepared with passion and attention to detail',
              },
            ],
          },
          {
            blockType: 'menuHighlights',
            title: 'Signature Dishes',
            subtitle: 'Taste our most loved creations',
            items: [
              {
                name: 'Grilled Atlantic Salmon',
                description:
                  'Fresh salmon fillet with herb butter, seasonal vegetables, and roasted potatoes',
                price: '$28.99',
                category: 'Main Course',
                featured: true,
              },
              {
                name: 'Truffle Mushroom Risotto',
                description: 'Creamy arborio rice with wild mushrooms, parmesan, and black truffle oil',
                price: '$24.99',
                category: 'Main Course',
                featured: true,
              },
              {
                name: 'Caprese Salad',
                description: 'Fresh mozzarella, heirloom tomatoes, basil, and balsamic reduction',
                price: '$12.99',
                category: 'Appetizer',
                featured: false,
              },
              {
                name: 'Beef Tenderloin',
                description: '8oz prime beef with red wine reduction, mashed potatoes, and asparagus',
                price: '$36.99',
                category: 'Main Course',
                featured: true,
              },
              {
                name: 'Chocolate Lava Cake',
                description: 'Warm chocolate cake with molten center, vanilla ice cream, and berry coulis',
                price: '$9.99',
                category: 'Dessert',
                featured: false,
              },
              {
                name: 'Mediterranean Pasta',
                description: 'Fresh pasta with sun-dried tomatoes, olives, feta, and herbs',
                price: '$19.99',
                category: 'Main Course',
                featured: false,
              },
            ],
          },

          {
            blockType: 'testimonials',
            title: 'What Our Guests Say',
            subtitle: "Hear from those who've experienced Keno's",
            testimonials: [
              {
                quote:
                  'Absolutely incredible! The food was exceptional and the service was impeccable. This is now our go-to restaurant for special occasions.',
                author: 'Sarah Mitchell',
                role: 'Food Critic',
                rating: 5,
              },
              {
                quote:
                  "The best Italian cuisine I've had outside of Italy. The truffle risotto is to die for! Highly recommend.",
                author: 'James Chen',
                role: 'Regular Customer',
                rating: 5,
              },
              {
                quote:
                  "A hidden gem! The atmosphere is cozy, the staff is friendly, and every dish we tried was delicious. Can't wait to come back!",
                author: 'Emily Rodriguez',
                role: 'Travel Blogger',
                rating: 5,
              },
              {
                quote:
                  "Outstanding experience from start to finish. The chef's attention to detail is evident in every bite. Five stars!",
                author: 'Michael Thompson',
                role: 'Business Executive',
                rating: 5,
              },
            ],
          },
          {
            blockType: 'cta',
            heading: 'Ready for an Unforgettable Dining Experience?',
            description: "Reserve your table today and discover why Keno's is the talk of the town.",
            button: {
              text: 'Make a Reservation',
              link: '/reservations',
            },
            style: 'centered',
          },
          {
            blockType: 'contact',
            title: 'Visit Us',
            subtitle: "We'd love to serve you",
            address: '123 Gourmet Street\nDowntown District\nCity, State 12345',
            phone: '(555) 123-4567',
            email: 'info@kenosrestaurant.com',
            hours: [
              {
                day: 'Monday - Thursday',
                hours: '11:00 AM - 10:00 PM',
              },
              {
                day: 'Friday - Saturday',
                hours: '11:00 AM - 11:00 PM',
              },
              {
                day: 'Sunday',
                hours: '10:00 AM - 9:00 PM (Brunch 10AM-2PM)',
              },
            ],
            showContactForm: true,
          },
        ],
        meta: {
          title: "Keno's Restaurant | Authentic Cuisine & Fine Dining Experience",
          description:
            "Experience exceptional dining at Keno's Restaurant. Fresh ingredients, expert chefs, and unforgettable flavors in the heart of the city. Reserve your table today!",
          keywords:
            'restaurant, fine dining, Italian cuisine, local restaurant, gourmet food, farm to table, reservations',
        },
        status: 'published',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Homepage created successfully!',
      page: {
        id: homepage.id,
        title: homepage.title,
        slug: homepage.slug,
        blocks: homepage.layout.length,
      },
      urls: {
        view: `/admin/collections/pages/${homepage.id}`,
        api: `/api/pages/${homepage.id}`,
      },
    })
  } catch (error: any) {
    console.error('Error seeding homepage:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create homepage',
      },
      { status: 500 },
    )
  }
}