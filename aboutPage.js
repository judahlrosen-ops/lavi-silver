export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    { name: 'badge', title: 'Badge', type: 'string' },
    { name: 'badgeHe', title: 'Badge (Hebrew)', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'titleHe', title: 'Title (Hebrew)', type: 'string' },
    { name: 'sub', title: 'Subtitle', type: 'text' },
    { name: 'subHe', title: 'Subtitle (Hebrew)', type: 'text' },
    { name: 'desc', title: 'Description', type: 'text' },
    { name: 'descHe', title: 'Description (Hebrew)', type: 'text' },
    { name: 'points', title: 'Key Points', type: 'array', of: [{ type: 'string' }] },
    { name: 'pointsHe', title: 'Key Points (Hebrew)', type: 'array', of: [{ type: 'string' }] },
    { name: 'whyTitle', title: 'Why Choose Us Title', type: 'string' },
    { name: 'whyTitleHe', title: 'Why Choose Us Title (Hebrew)', type: 'string' },
    { name: 'whySub', title: 'Why Choose Us Subtitle', type: 'string' },
    { name: 'whySubHe', title: 'Why Choose Us Subtitle (Hebrew)', type: 'string' },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'titleHe', title: 'Title (Hebrew)', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text' },
          { name: 'descHe', title: 'Description (Hebrew)', type: 'text' },
        ]
      }]
    },
    { name: 'ctaTitle', title: 'CTA Title', type: 'string' },
    { name: 'ctaTitleHe', title: 'CTA Title (Hebrew)', type: 'string' },
    { name: 'ctaDesc', title: 'CTA Description', type: 'text' },
    { name: 'ctaDescHe', title: 'CTA Description (Hebrew)', type: 'text' },
    { name: 'ctaBtn', title: 'CTA Button', type: 'string' },
    { name: 'ctaBtnHe', title: 'CTA Button (Hebrew)', type: 'string' },
  ]
}
