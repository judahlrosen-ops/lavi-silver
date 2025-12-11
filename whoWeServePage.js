export default {
  name: 'whoWeServePage',
  title: 'Who We Serve Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string' },
    { name: 'titleHe', title: 'Page Title (Hebrew)', type: 'string' },
    { name: 'sub', title: 'Subtitle', type: 'text' },
    { name: 'subHe', title: 'Subtitle (Hebrew)', type: 'text' },
    { name: 'aliyahTitle', title: 'Aliyah Title', type: 'string' },
    { name: 'aliyahTitleHe', title: 'Aliyah Title (Hebrew)', type: 'string' },
    { name: 'aliyahGradient', title: 'Aliyah Gradient Text', type: 'string' },
    { name: 'aliyahGradientHe', title: 'Aliyah Gradient Text (Hebrew)', type: 'string' },
    { name: 'aliyahIntro', title: 'Aliyah Intro Paragraphs', type: 'array', of: [{ type: 'text' }] },
    { name: 'aliyahIntroHe', title: 'Aliyah Intro Paragraphs (Hebrew)', type: 'array', of: [{ type: 'text' }] },
    { name: 'aliyahCta', title: 'Aliyah CTA', type: 'string' },
    { name: 'aliyahCtaHe', title: 'Aliyah CTA (Hebrew)', type: 'string' },
    { name: 'benefitsTitle', title: 'Benefits Title', type: 'string' },
    { name: 'benefitsTitleHe', title: 'Benefits Title (Hebrew)', type: 'string' },
    { name: 'benefitsSub', title: 'Benefits Subtitle', type: 'string' },
    { name: 'benefitsSubHe', title: 'Benefits Subtitle (Hebrew)', type: 'string' },
    { name: 'olimTitle', title: 'For Olim Title', type: 'string' },
    { name: 'olimTitleHe', title: 'For Olim Title (Hebrew)', type: 'string' },
    { name: 'olimContent', title: 'For Olim Content', type: 'array', of: [{ type: 'text' }] },
    { name: 'olimContentHe', title: 'For Olim Content (Hebrew)', type: 'array', of: [{ type: 'text' }] },
    { name: 'techTitle', title: 'For Tech Title', type: 'string' },
    { name: 'techTitleHe', title: 'For Tech Title (Hebrew)', type: 'string' },
    { name: 'techContent', title: 'For Tech Content', type: 'array', of: [{ type: 'text' }] },
    { name: 'techContentHe', title: 'For Tech Content (Hebrew)', type: 'array', of: [{ type: 'text' }] },
    { name: 'tableHeader1', title: 'Table Header 1 (Real Estate)', type: 'string' },
    { name: 'tableHeader1He', title: 'Table Header 1 (Hebrew)', type: 'string' },
    { name: 'tableHeader2', title: 'Table Header 2 (Silver)', type: 'string' },
    { name: 'tableHeader2He', title: 'Table Header 2 (Hebrew)', type: 'string' },
    {
      name: 'tableRows',
      title: 'Comparison Table Rows',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'labelHe', title: 'Label (Hebrew)', type: 'string' },
          { name: 're', title: 'Real Estate Value', type: 'string' },
          { name: 'reHe', title: 'Real Estate Value (Hebrew)', type: 'string' },
          { name: 'ag', title: 'Silver Value', type: 'string' },
          { name: 'agHe', title: 'Silver Value (Hebrew)', type: 'string' },
        ]
      }]
    }
  ]
}
