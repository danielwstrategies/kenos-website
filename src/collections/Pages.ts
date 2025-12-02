import type { CollectionConfig } from 'payload'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
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