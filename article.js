export default {
  name: 'article',
  title: 'Articles',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'titleHe', title: 'Title (Hebrew)', type: 'string' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'excerptHe', title: 'Excerpt (Hebrew)', type: 'text' },
    { name: 'type', title: 'Type', type: 'string', options: { list: ['Video', 'White Paper', 'Article', 'External'] } },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'categoryHe', title: 'Category (Hebrew)', type: 'string' },
    { name: 'readTime', title: 'Read Time', type: 'string' },
    { name: 'readTimeHe', title: 'Read Time (Hebrew)', type: 'string' },
    { name: 'date', title: 'Date', type: 'string' },
  ]
}
