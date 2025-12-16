import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  trash: true,
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['preview', 'alt', 'filename', 'updatedAt'],
    listSearchableFields: ['alt', 'filename'],
    group: 'Content',
    description: 'Manage images and media files for the website',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Cell: '@/components/MediaThumbnailCell',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption to display with the image',
      },
    },
  ],
}

export default Media