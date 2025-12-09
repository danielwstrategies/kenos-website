import { CollectionConfig } from 'payload'

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Resolved', value: 'resolved' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default ContactSubmissions
