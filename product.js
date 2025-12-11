export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name (English)', type: 'string' },
    { name: 'nameHe', title: 'Name (Hebrew)', type: 'string' },
    { name: 'subtitle', title: 'Subtitle (English)', type: 'string' },
    { name: 'subtitleHe', title: 'Subtitle (Hebrew)', type: 'string' },
    { name: 'priceIndication', title: 'Price Indication (English)', type: 'string' },
    { name: 'priceIndicationHe', title: 'Price Indication (Hebrew)', type: 'string' },
    { name: 'priceOffset', title: 'Price Offset (for sorting)', type: 'number' },
    { name: 'weight', title: 'Weight (English)', type: 'string' },
    { name: 'weightHe', title: 'Weight (Hebrew)', type: 'string' },
    { name: 'purity', title: 'Purity', type: 'string' },
    { name: 'mint', title: 'Mint (English)', type: 'string' },
    { name: 'mintHe', title: 'Mint (Hebrew)', type: 'string' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['bar', 'coin'] }
    },
    {
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: { list: ['Basic Rounds & Bars', 'Standard Bullion', 'Premium Collection'] }
    },
    { name: 'description', title: 'Description (English)', type: 'text' },
    { name: 'descriptionHe', title: 'Description (Hebrew)', type: 'text' },
    { 
      name: 'image', 
      title: 'Main Image', 
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ 
        type: 'image',
        options: { hotspot: true }
      }]
    },
    { name: 'highlights', title: 'Highlights (English)', type: 'array', of: [{ type: 'string' }] },
    { name: 'highlightsHe', title: 'Highlights (Hebrew)', type: 'array', of: [{ type: 'string' }] },
  ]
}
