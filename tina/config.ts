import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.NEXT_PUBLIC_TINA_BRANCH || 'content',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'content/blog',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'excerpt', label: 'Excerpt', ui: { component: 'textarea' } },
          { type: 'datetime', name: 'date', label: 'Date', required: true },
          { type: 'string', name: 'slug', label: 'Slug', required: true },
          { type: 'string', name: 'category', label: 'Category' },
          { type: 'image', name: 'image', label: 'Cover Image' },
          { type: 'string', name: 'imageAlt', label: 'Image Alt Text' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'product',
        label: 'Products',
        path: 'content/products',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'string', name: 'slug', label: 'Slug', required: true },
          { type: 'string', name: 'tagline', label: 'Tagline' },
          { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
          { type: 'image', name: 'image', label: 'Hero Image' },
          { type: 'string', name: 'imageAlt', label: 'Hero Image Alt Text' },
          {
            type: 'object',
            name: 'features',
            label: 'Features',
            list: true,
            fields: [
              { type: 'string', name: 'icon', label: 'Icon (emoji)' },
              { type: 'string', name: 'text', label: 'Feature Text' },
            ],
          },
          {
            type: 'object',
            name: 'faqs',
            label: 'FAQs',
            list: true,
            fields: [
              { type: 'string', name: 'q', label: 'Question' },
              { type: 'string', name: 'a', label: 'Answer', ui: { component: 'textarea' } },
            ],
          },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'settings',
        label: 'Site Settings',
        path: 'content/settings',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'siteName', label: 'Site Name' },
          { type: 'string', name: 'phone', label: 'Phone Number' },
          { type: 'string', name: 'email', label: 'Email Address' },
          { type: 'string', name: 'address', label: 'Address' },
          { type: 'string', name: 'city', label: 'City' },
          { type: 'string', name: 'state', label: 'State' },
          { type: 'string', name: 'zip', label: 'Zip Code' },
          {
            type: 'object',
            name: 'nav',
            label: 'Navigation Links',
            list: true,
            fields: [
              { type: 'string', name: 'label', label: 'Label' },
              { type: 'string', name: 'href', label: 'URL' },
            ],
          },
        ],
      },
    ],
  },
})
