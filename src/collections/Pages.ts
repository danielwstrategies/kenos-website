import type { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  trash: true,
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        try {
          const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3011'
          
          // Revalidate the page's path
          const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
          
          await fetch(`${serverUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'x-revalidate-secret': process.env.REVALIDATE_SECRET!,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path }),
          })
          
          console.log(`Triggered revalidation for page: ${path}`)
        } catch (err) {
          console.error('Revalidation failed (non-critical):', err)
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Page title (used in browser tab and admin)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path for this page (e.g., "home", "about", "menu")',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value) {
              return value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        // Keno's Today Section (with logo heading and image ticker)
        {
          slug: 'kenosToday',
          labels: {
            singular: "Keno's Today Section",
            plural: "Keno's Today Sections",
          },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: "Script logo for 'Keno\\'s' text (uses default if not provided)",
              },
            },
            {
              name: 'headingSuffix',
              type: 'text',
              defaultValue: 'Today',
              admin: {
                description: "Text after the logo (e.g., 'Today', 'Legacy', 'Story')",
              },
            },
            {
              name: 'content',
              type: 'textarea',
              admin: {
                description: 'Description text below the heading',
              },
            },
            {
              name: 'primaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'See Menu',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Order Online',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image for the hero area',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              minRows: 2,
              maxRows: 8,
              admin: {
                description: 'Images for the horizontal scrolling ticker',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        // Staff Hero Section (Our Keno's Family)
        {
          slug: 'staffHero',
          labels: {
            singular: 'Staff Hero Section',
            plural: 'Staff Hero Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              defaultValue: 'Our',
              admin: {
                description: 'First part of heading (before logo)',
              },
            },
            {
              name: 'headingLogo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: "Logo to display in heading (Keno's script logo)",
              },
            },
            {
              name: 'subheading',
              type: 'text',
              defaultValue: 'Family',
              admin: {
                description: 'Text after the logo',
              },
            },
            {
              name: 'content',
              type: 'textarea',
              admin: {
                description: 'Introductory paragraph below the heading',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Background image for the hero section',
              },
            },
            {
              name: 'overlayImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Team photo that overlays on the right side with red border',
              },
            },
            {
              name: 'primaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Contact Us',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Jobs',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'sectionBackground',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None (Transparent)', value: 'none' },
                { label: 'Beige / Cream', value: 'beige' },
                { label: 'White', value: 'white' },
              ],
              admin: {
                description: 'Background color behind the entire section (visible around margins)',
              },
            },
          ],
        },
        // Staff Grid Section (team member cards)
        {
          slug: 'staffGrid',
          labels: {
            singular: 'Staff Grid Section',
            plural: 'Staff Grid Sections',
          },
          fields: [
            {
              name: 'introText',
              type: 'textarea',
              admin: {
                description: 'Italic introduction text (use double line breaks for paragraphs)',
              },
            },
            {
              name: 'staffMembers',
              type: 'array',
              minRows: 1,
              maxRows: 12,
              admin: {
                description: 'Team members to display in the grid',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Display name (e.g., "Meet Shauna")',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description: 'Job title (e.g., "General Manager")',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                  admin: {
                    description: 'Staff member photo (portrait orientation works best)',
                  },
                },
                {
                  name: 'bio',
                  type: 'textarea',
                  admin: {
                    description: 'Staff member biography (displayed in popup when clicking on the card)',
                  },
                },
              ],
            },
          ],
        },
        // Family Section (team/staff introduction)
        {
          slug: 'familySection',
          labels: {
            singular: 'Family Section',
            plural: 'Family Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'FAMILY',
              admin: {
                description: 'Section heading (displayed in Marble Dreams font)',
              },
            },
            {
              name: 'content',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Main text content (use double line breaks for paragraphs)',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Image displayed on the right side',
              },
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Meet the Team',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // History Timeline Ticker (EST. year with historical photos)
        {
          slug: 'historyTimelineTicker',
          labels: {
            singular: 'History Timeline Ticker',
            plural: 'History Timeline Tickers',
          },
          fields: [
            {
              name: 'displayMode',
              type: 'select',
              defaultValue: 'notecard',
              options: [
                { label: 'Notecard Gallery (layered photos with click to enlarge)', value: 'notecard' },
                { label: 'Ticker (scrolling horizontal photos)', value: 'ticker' },
              ],
              admin: {
                description: 'Choose how to display the photos',
              },
            },
            {
              name: 'showYear',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Show the EST. year section (uncheck to hide)',
              },
            },
            {
              name: 'yearLabel',
              type: 'text',
              defaultValue: 'EST.',
              admin: {
                description: 'Small label above the year (e.g., "EST.", "SINCE") - only shown if "Show Year" is checked',
              },
            },
            {
              name: 'year',
              type: 'text',
              defaultValue: '1983',
              admin: {
                description: 'Year to display prominently - only shown if "Show Year" is checked',
              },
            },
            {
              name: 'images',
              type: 'array',
              minRows: 1,
              maxRows: 10,
              admin: {
                description: 'Historical photos to display',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        // Classics Section (text left, stacked images right)
        {
          slug: 'classicsSection',
          labels: {
            singular: 'Classics Section',
            plural: 'Classics Sections',
          },
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              admin: {
                description: 'Small uppercase subtitle (e.g., "TASTE THE CLASSICS")',
              },
            },
            {
              name: 'content',
              type: 'textarea',
              admin: {
                description: 'Body text content',
              },
            },
            {
              name: 'images',
              type: 'array',
              minRows: 1,
              maxRows: 2,
              admin: {
                description: 'Two images that stack/overlap on the right side',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        // History Hero Section (simple card with logo, heading, content, button)
        {
          slug: 'historyHero',
          labels: {
            singular: 'History Hero',
            plural: 'History Heroes',
          },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: "Keno's script logo (uses default if not provided)",
              },
            },
            {
              name: 'heading',
              type: 'text',
              required: true,
              admin: {
                description: 'Main headline (e.g., "Our History")',
              },
            },
            {
              name: 'content',
              type: 'textarea',
              admin: {
                description: 'History description text',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Background image (e.g., restaurant exterior)',
              },
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Read More',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'sectionBackground',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None (Transparent)', value: 'none' },
                { label: 'Beige / Cream', value: 'beige' },
                { label: 'White', value: 'white' },
              ],
              admin: {
                description: 'Background color behind the entire section (visible around the rounded card)',
              },
            },
          ],
        },
        // Kenos Hero Section (with address overlay)
        {
          slug: 'kenosHero',
          labels: {
            singular: 'Kenos Hero',
            plural: 'Kenos Heroes',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              admin: {
                description: 'Main headline (e.g., "You\'re Only A Stranger Once")',
              },
            },
            {
              name: 'address',
              type: 'textarea',
              admin: {
                description: 'Restaurant address to display on hero',
              },
            },
            {
              name: 'addressLink',
              type: 'text',
              admin: {
                description: 'Google Maps link for the address',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Large food photography background',
              },
            },
            {
              name: 'primaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'See Menu',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Our History',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // Awards/Badges Section
        {
          slug: 'awardsSection',
          labels: {
            singular: 'Awards Section',
            plural: 'Awards Sections',
          },
          fields: [
            {
              name: 'awards',
              type: 'array',
              minRows: 1,
              maxRows: 3,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Award title (e.g., "Best Breakfast in Orange County")',
                  },
                },
                {
                  name: 'source',
                  type: 'select',
                  options: [
                    { label: 'Orange County Hotlist', value: 'hotlist' },
                    { label: 'The Orange County Register', value: 'register' },
                  ],
                  admin: {
                    description: 'Select the award source logo to display',
                  },
                },
                {
                  name: 'badgeImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Circular badge design with stars',
                  },
                },
              ],
            },
            {
              name: 'centerLogo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Logo displayed between badges',
              },
            },
          ],
        },
        // Promotion Section (Thanksgiving, seasonal)
        {
          slug: 'promotionSection',
          labels: {
            singular: 'Promotion Section',
            plural: 'Promotion Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              admin: {
                description: 'Main heading (e.g., "Thanksgiving Day Menus")',
              },
            },
            {
              name: 'subheading',
              type: 'text',
              admin: {
                description: 'Subheading below main heading (e.g., "Pre-Order Family Meals or Dine-In")',
              },
            },
            {
              name: 'promotionImages',
              type: 'array',
              maxRows: 3,
              admin: {
                description: 'Promotion images (menu flyers, product photos) - displayed on right side with overflow and rounded corners',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'showDateBox',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Show the date/info box above the CTA button',
              },
            },
            {
              name: 'dateBoxLine1',
              type: 'text',
              admin: {
                description: 'First line in date box (e.g., "Thursday November 27th, 2025") - only shown if "Show Date Box" is checked',
              },
            },
            {
              name: 'dateBoxLine2',
              type: 'text',
              admin: {
                description: 'Second line in date box (e.g., "Open from 7:00 am - 6:00 pm") - only shown if "Show Date Box" is checked',
              },
            },
            {
              name: 'dateBoxLine3',
              type: 'text',
              admin: {
                description: 'Third line in date box (e.g., "Holiday Menu 11am - Sold Out") - only shown if "Show Date Box" is checked',
              },
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Join Waitlist',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Background image for the section',
              },
            },
          ],
        },
        // Order Online Section
        {
          slug: 'orderOnlineSection',
          labels: {
            singular: 'Order Online Section',
            plural: 'Order Online Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Order Online',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Join Waitlist',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'gallery',
              type: 'array',
              minRows: 3,
              maxRows: 6,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // Destination Section (dark overlay with quote)
        {
          slug: 'destinationSection',
          labels: {
            singular: 'Destination Section',
            plural: 'Destination Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'content',
              type: 'textarea',
              required: true,
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Our Menu',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Food photography with dark overlay',
              },
            },
          ],
        },
        // Owner Profile Section
        {
          slug: 'ownerProfileSection',
          labels: {
            singular: 'Owner Profile Section',
            plural: 'Owner Profile Sections',
          },
          fields: [
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Circular profile photo',
              },
            },
            {
              name: 'label',
              type: 'text',
              defaultValue: 'OWNER',
              admin: {
                description: 'Label above name (e.g., "OWNER", "CHEF")',
              },
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'bio',
              type: 'textarea',
              admin: {
                description: 'Biography text (use double line breaks for paragraphs)',
              },
            },
            {
              name: 'favoriteMealLabel',
              type: 'text',
              defaultValue: "Steve's Favorite Meal",
              admin: {
                description: 'Label for favorite meal section',
              },
            },
            {
              name: 'favoriteMeal',
              type: 'text',
              admin: {
                description: 'Favorite meal quote',
              },
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'See The Team',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  defaultValue: 'Our History',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // Hero Section
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Section',
            plural: 'Hero Sections',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              admin: {
                description: 'Main headline text',
              },
            },
            {
              name: 'subheading',
              type: 'textarea',
              admin: {
                description: 'Supporting text below the headline',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Hero background image',
              },
            },
            {
              name: 'primaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                },
                {
                  name: 'link',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // About Section
        {
          slug: 'about',
          labels: {
            singular: 'About Section',
            plural: 'About Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'imagePosition',
              type: 'select',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              defaultValue: 'right',
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    description: 'Icon name or emoji',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        // Menu Highlights Section
        {
          slug: 'menuHighlights',
          labels: {
            singular: 'Menu Highlights',
            plural: 'Menu Highlights',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'price',
                  type: 'text',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'category',
                  type: 'text',
                  admin: {
                    description: 'e.g., Appetizer, Main Course, Dessert',
                  },
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        // Gallery Section
        {
          slug: 'gallery',
          labels: {
            singular: 'Gallery Section',
            plural: 'Gallery Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'images',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
            {
              name: 'layout',
              type: 'select',
              options: [
                { label: 'Grid', value: 'grid' },
                { label: 'Masonry', value: 'masonry' },
                { label: 'Carousel', value: 'carousel' },
              ],
              defaultValue: 'grid',
            },
          ],
        },
        // Testimonials Section
        {
          slug: 'testimonials',
          labels: {
            singular: 'Testimonials Section',
            plural: 'Testimonials Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'testimonials',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'author',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'role',
                  type: 'text',
                  admin: {
                    description: 'e.g., Food Critic, Regular Customer',
                  },
                },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'rating',
                  type: 'number',
                  min: 1,
                  max: 5,
                  admin: {
                    description: 'Star rating (1-5)',
                  },
                },
              ],
            },
          ],
        },
        // Contact/Location Section
        {
          slug: 'contact',
          labels: {
            singular: 'Contact Section',
            plural: 'Contact Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'subtitle',
              type: 'text',
            },
            {
              name: 'address',
              type: 'textarea',
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'email',
              type: 'email',
            },
            {
              name: 'hours',
              type: 'array',
              fields: [
                {
                  name: 'day',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'hours',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'mapEmbed',
              type: 'textarea',
              admin: {
                description: 'Google Maps embed code or map URL',
              },
            },
            {
              name: 'showContactForm',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        // Content Block (for flexible content)
        {
          slug: 'content',
          labels: {
            singular: 'Content Block',
            plural: 'Content Blocks',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
            {
              name: 'backgroundColor',
              type: 'select',
              options: [
                { label: 'White', value: 'white' },
                { label: 'Light Gray', value: 'light-gray' },
                { label: 'Dark', value: 'dark' },
                { label: 'Primary Color', value: 'primary' },
              ],
              defaultValue: 'white',
            },
          ],
        },
        // Call to Action Block
        {
          slug: 'cta',
          labels: {
            singular: 'Call to Action',
            plural: 'Call to Actions',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'button',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'style',
              type: 'select',
              options: [
                { label: 'Centered', value: 'centered' },
                { label: 'Left Aligned', value: 'left' },
                { label: 'Right Aligned', value: 'right' },
              ],
              defaultValue: 'centered',
            },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO & Meta',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Override the page title for SEO (defaults to page title)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Meta description for search engines',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Comma-separated keywords',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Open Graph image for social sharing',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Pages