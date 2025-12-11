export default {
    name: 'webinar',
    title: 'Webinars',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'titleHe',
            title: 'Title (Hebrew)',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'descriptionHe',
            title: 'Description (Hebrew)',
            type: 'text'
        },
        {
            name: 'date',
            title: 'Date & Time',
            type: 'datetime'
        },
        {
            name: 'image',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'registrationLink',
            title: 'Registration Link',
            type: 'url'
        },
        {
            name: 'isUpcoming',
            title: 'Is Upcoming?',
            type: 'boolean',
            initialValue: true
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'date',
            media: 'image'
        }
    }
}
