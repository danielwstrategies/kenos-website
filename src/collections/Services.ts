import type { CollectionConfig } from 'payload'

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order'],
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        try {
          const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3011'
          
          await fetch(`${serverUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'x-revalidate-secret': process.env.REVALIDATE_SECRET!,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: '/services' }),
          })
          
          console.log('Triggered revalidation for /services')
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
    },
    {
      name: 'icon',
      type: 'text',
      required: false,
      admin: {
        description: 'Icon name from iconoir-react (e.g., "headset-help", "chart-line")',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
    {
      name: 'tagline',
      type: 'text',
      required: false,
      admin: {
        description: 'Short tagline or subtitle for the service',
      },
    },
    {
      name: 'detailedDescription',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Longer description paragraph for the service',
      },
    },
    {
      name: 'serviceItems',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: false,
          admin: {
            description: 'Icon name from iconoir-react',
          },
        },
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      defaultValue: 0,
      admin: {
        description: 'Order in which the service appears (lower numbers first)',
      },
    },
  ],
}

export default Services
