import { GlobalConfig } from 'payload'

const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mainNav',
      label: 'Main Navigation',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          label: 'Link',
          type: 'text',
          required: true,
          admin: {
            placeholder: '/about',
          },
        },
        {
          name: 'openInNewTab',
          label: 'Open in New Tab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'footerNav',
      label: 'Footer Navigation',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          label: 'Link',
          type: 'text',
          required: true,
          admin: {
            placeholder: '/about',
          },
        },
        {
          name: 'openInNewTab',
          label: 'Open in New Tab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          label: 'Facebook URL',
          type: 'text',
          admin: {
            placeholder: 'https://facebook.com/yourpage',
          },
        },
        {
          name: 'instagram',
          label: 'Instagram URL',
          type: 'text',
          admin: {
            placeholder: 'https://instagram.com/yourpage',
          },
        },
        {
          name: 'twitter',
          label: 'Twitter/X URL',
          type: 'text',
          admin: {
            placeholder: 'https://twitter.com/yourpage',
          },
        },
        {
          name: 'yelp',
          label: 'Yelp URL',
          type: 'text',
          admin: {
            placeholder: 'https://yelp.com/biz/yourrestaurant',
          },
        },
      ],
    },
  ],
}

export default Navigation
