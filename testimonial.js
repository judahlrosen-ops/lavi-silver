export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'nameHe', title: 'Name (Hebrew)', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'roleHe', title: 'Role (Hebrew)', type: 'string' },
    { name: 'quote', title: 'Quote', type: 'text' },
    { name: 'quoteHe', title: 'Quote (Hebrew)', type: 'text' },
    { name: 'image', title: 'Image URL', type: 'string' },
  ]
}
