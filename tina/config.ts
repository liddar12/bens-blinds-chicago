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
        name: 'homepage',
        label: 'Homepage',
        path: 'content/pages',
        match: { include: 'home' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object', name: 'heroSpring', label: 'Hero — Spring',
            fields: [
              { type: 'string', name: 'headline', label: 'Headline' },
              { type: 'string', name: 'sub', label: 'Subheadline' },
              { type: 'string', name: 'cta', label: 'CTA Button Text' },
              { type: 'image', name: 'heroImage', label: 'Hero Room Image' },
            ],
          },
          {
            type: 'object', name: 'heroSummer', label: 'Hero — Summer',
            fields: [
              { type: 'string', name: 'headline', label: 'Headline' },
              { type: 'string', name: 'sub', label: 'Subheadline' },
              { type: 'string', name: 'cta', label: 'CTA Button Text' },
              { type: 'image', name: 'heroImage', label: 'Hero Room Image' },
            ],
          },
          {
            type: 'object', name: 'heroFall', label: 'Hero — Fall',
            fields: [
              { type: 'string', name: 'headline', label: 'Headline' },
              { type: 'string', name: 'sub', label: 'Subheadline' },
              { type: 'string', name: 'cta', label: 'CTA Button Text' },
              { type: 'image', name: 'heroImage', label: 'Hero Room Image' },
            ],
          },
          {
            type: 'object', name: 'heroWinter', label: 'Hero — Winter',
            fields: [
              { type: 'string', name: 'headline', label: 'Headline' },
              { type: 'string', name: 'sub', label: 'Subheadline' },
              { type: 'string', name: 'cta', label: 'CTA Button Text' },
              { type: 'image', name: 'heroImage', label: 'Hero Room Image' },
            ],
          },
          {
            type: 'object', name: 'heroSevere', label: 'Hero — Severe Cold (Polar Vortex)',
            fields: [
              { type: 'string', name: 'headline', label: 'Headline' },
              { type: 'string', name: 'sub', label: 'Subheadline' },
              { type: 'string', name: 'cta', label: 'CTA Button Text' },
              { type: 'image', name: 'heroImage', label: 'Hero Room Image' },
            ],
          },
          {
            type: 'object', name: 'heroHeatwave', label: 'Hero — Heatwave',
            fields: [
              { type: 'string', name: 'headline', label: 'Headline' },
              { type: 'string', name: 'sub', label: 'Subheadline' },
              { type: 'string', name: 'cta', label: 'CTA Button Text' },
              { type: 'image', name: 'heroImage', label: 'Hero Room Image' },
            ],
          },
          { type: 'string', name: 'statsLine', label: 'Hero Stats Line', ui: { component: 'textarea' } },
          {
            type: 'object', name: 'trustBar', label: 'Trust Bar', list: true,
            fields: [
              { type: 'string', name: 'icon', label: 'Icon name' },
              { type: 'string', name: 'label', label: 'Label text' },
            ],
          },
          {
            type: 'object', name: 'processSteps', label: 'Process Steps', list: true,
            fields: [
              { type: 'string', name: 'icon', label: 'Icon name' },
              { type: 'string', name: 'title', label: 'Step Title' },
              { type: 'string', name: 'body', label: 'Step Description', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object', name: 'featuredProducts', label: 'Featured Products', list: true,
            fields: [
              { type: 'string', name: 'slug', label: 'Product Slug (cellular, solar, roller, wood, shutters, roman, motorized, drapery)' },
              { type: 'string', name: 'badge', label: 'Badge Text (optional, e.g. "Most Popular")' },
            ],
          },
          {
            type: 'object', name: 'reviews', label: 'Reviews', list: true,
            fields: [
              { type: 'string', name: 'name', label: 'Reviewer Name' },
              { type: 'string', name: 'hood', label: 'Neighborhood' },
              { type: 'number', name: 'stars', label: 'Star Rating' },
              { type: 'string', name: 'text', label: 'Review Text', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'ctaHeadline', label: 'CTA Headline' },
          { type: 'string', name: 'ctaBody', label: 'CTA Body Text', ui: { component: 'textarea' } },
        ],
      },
      {
        name: 'faq',
        label: 'FAQ Page',
        path: 'content/pages',
        match: { include: 'faq' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object', name: 'categories', label: 'FAQ Categories', list: true,
            fields: [
              { type: 'string', name: 'category', label: 'Category Name' },
              {
                type: 'object', name: 'items', label: 'Questions', list: true,
                fields: [
                  { type: 'string', name: 'q', label: 'Question' },
                  { type: 'string', name: 'a', label: 'Answer', ui: { component: 'textarea' } },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'neighborhoods',
        label: 'Neighborhoods',
        path: 'content/neighborhoods',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'name', label: 'Neighborhood Name', isTitle: true, required: true },
          { type: 'string', name: 'slug', label: 'Slug' },
          { type: 'string', name: 'headline', label: 'Page Headline' },
          { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
          { type: 'string', name: 'longDesc', label: 'Long Description', ui: { component: 'textarea' } },
          {
            type: 'object', name: 'faqs', label: 'FAQs', list: true,
            fields: [
              { type: 'string', name: 'q', label: 'Question' },
              { type: 'string', name: 'a', label: 'Answer', ui: { component: 'textarea' } },
            ],
          },
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
