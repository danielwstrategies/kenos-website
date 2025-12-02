# Create Homepage via Browser Console

Since the seed script has database connection issues, here's the easiest way to create your example homepage: **use the browser console to call the API directly**.

## 🚀 Quick Method (2 minutes)

1. **Open your admin panel**: http://localhost:3011/admin
2. **Open browser console**: Press `F12` or `Cmd+Option+J` (Mac) / `Ctrl+Shift+J` (Windows)
3. **Paste this script** and press Enter:

```javascript
fetch('http://localhost:3011/api/pages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Home',
    slug: 'home',
    status: 'published',
    layout: [
      {
        blockType: 'hero',
        heading: "Welcome to Keno's Restaurant",
        subheading: 'Experience authentic flavors and warm hospitality in the heart of the city. Every dish tells a story.',
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
            description: 'Fresh salmon fillet with herb butter, seasonal vegetables, and roasted potatoes',
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
        blockType: 'gallery',
        title: "Experience Keno's",
        subtitle: 'A glimpse into our world',
        layout: 'grid',
        images: [
          { caption: 'Our elegant dining room' },
          { caption: 'Fresh ingredients from local farms' },
          { caption: 'Our talented culinary team' },
          { caption: 'Handcrafted cocktails' },
          { caption: 'Perfect for intimate gatherings' },
          { caption: 'Art meets cuisine' },
          { caption: 'Seasonal specials' },
          { caption: 'Desserts to remember' },
        ],
      },
      {
        blockType: 'testimonials',
        title: 'What Our Guests Say',
        subtitle: "Hear from those who've experienced Keno's",
        testimonials: [
          {
            quote: 'Absolutely incredible! The food was exceptional and the service was impeccable. This is now our go-to restaurant for special occasions.',
            author: 'Sarah Mitchell',
            role: 'Food Critic',
            rating: 5,
          },
          {
            quote: "The best Italian cuisine I've had outside of Italy. The truffle risotto is to die for! Highly recommend.",
            author: 'James Chen',
            role: 'Regular Customer',
            rating: 5,
          },
          {
            quote: "A hidden gem! The atmosphere is cozy, the staff is friendly, and every dish we tried was delicious. Can't wait to come back!",
            author: 'Emily Rodriguez',
            role: 'Travel Blogger',
            rating: 5,
          },
          {
            quote: "Outstanding experience from start to finish. The chef's attention to detail is evident in every bite. Five stars!",
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
      description: "Experience exceptional dining at Keno's Restaurant. Fresh ingredients, expert chefs, and unforgettable flavors in the heart of the city. Reserve your table today!",
      keywords: 'restaurant, fine dining, Italian cuisine, local restaurant, gourmet food, farm to table, reservations',
    },
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log('✅ Homepage created successfully!');
    console.log('Page ID:', data.doc.id);
    console.log('View at:', `http://localhost:3011/admin/collections/pages/${data.doc.id}`);
    alert('✅ Homepage created! Refresh the Pages collection to see it.');
  })
  .catch((error) => {
    console.error('❌ Error creating homepage:', error);
    alert('Error creating homepage. Check console for details.');
  });
```

4. **Refresh** the Pages collection page to see your new homepage!

## ⚠️ If You Get an Authentication Error

If the API requires authentication, you need to be logged in first:

1. Make sure you're logged into the admin panel
2. The browser will use your existing session cookies
3. Try the script again

## 🎨 Alternative: Manual Creation

If the script doesn't work, just create the page manually:

1. Go to http://localhost:3011/admin/collections/pages
2. Click **Create New**
3. Add the blocks one by one using the admin interface
4. Use `QUICK_START.md` as your guide

## 📝 What This Creates

This script will create a complete homepage with:
- ✅ Hero section with welcome message
- ✅ About section with 4 features
- ✅ Menu highlights with 6 dishes
- ✅ Gallery section (8 image slots - you'll need to upload images)
- ✅ Testimonials (4 customer reviews)
- ✅ Call to action
- ✅ Contact section with hours
- ✅ SEO meta tags

## 🖼️ Next Steps

After creating the page:
1. **Upload images** to the Media collection
2. **Edit the homepage** and add images to the blocks
3. **Customize** the text to match your restaurant
4. **Update** contact information
5. **Add** your real menu items and prices

## 🔍 Verify It Worked

Check if the homepage was created:
```javascript
fetch('http://localhost:3011/api/pages?where[slug][equals]=home')
  .then(r => r.json())
  .then(d => console.log(d))
```

You should see your homepage data in the console!