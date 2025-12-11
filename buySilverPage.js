export default {
    name: 'buySilverPage',
    title: 'Buy Silver Page',
    type: 'document',
    fields: [
        { name: 'heroTitle', title: 'Page Title', type: 'string', initialValue: 'Buy Silver & Gold' },
        { name: 'heroTitleHe', title: 'Page Title (Hebrew)', type: 'string', initialValue: 'קנה כסף וזהב' },
        { name: 'heroDesc', title: 'Page Description', type: 'text', initialValue: 'Explore our premium collection of silver and gold bullion.' },
        { name: 'heroDescHe', title: 'Page Description (Hebrew)', type: 'text', initialValue: 'חקור את אוסף הכסף והזהב היוקרתי שלנו.' },

        {
            name: 'trustBanner',
            title: 'Trust Banner Items',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'sub', title: 'Subtitle', type: 'string' },
                    { name: 'icon', title: 'Icon Name (e.g. Truck, Shield)', type: 'string' }
                ]
            }]
        }
    ]
}
