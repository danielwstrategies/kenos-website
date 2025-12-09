import type { GlobalConfig } from 'payload'

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
      name: 'footerLeftColumn',
      label: 'Footer Left Column',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Navigation links for the left column of the footer',
      },
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
      name: 'footerRightColumn',
      label: 'Footer Right Column',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Navigation links for the right column of the footer',
      },
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
            placeholder: '/contact',
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
      name: 'footerHours',
      label: 'Footer Hours',
      type: 'group',
      admin: {
        description: 'Restaurant hours displayed in the footer',
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          defaultValue: 'Restaurant Hours',
        },
        {
          name: 'line1',
          label: 'Line 1',
          type: 'text',
          defaultValue: 'Sunday-Thursday 7 AM-9 PM',
        },
        {
          name: 'line2',
          label: 'Line 2',
          type: 'text',
          defaultValue: 'Friday-Saturday: 7 AM-10 PM',
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
