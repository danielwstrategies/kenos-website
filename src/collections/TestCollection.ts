import type { CollectionConfig } from 'payload'

const TestCollection: CollectionConfig = {
  slug: 'test',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
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
}

export default TestCollection
