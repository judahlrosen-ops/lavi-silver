export default {
    name: 'learnPage',
    title: 'Learn Page Configuration',
    type: 'document',
    fields: [
        {
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'Knowledge Hub'
        },
        {
            name: 'heroTitleHe',
            title: 'Hero Title (Hebrew)',
            type: 'string',
            initialValue: 'מרכז ידע'
        },
        {
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            initialValue: 'Expert insights, market analysis, and educational resources.'
        },
        {
            name: 'heroSubtitleHe',
            title: 'Hero Subtitle (Hebrew)',
            type: 'text',
            initialValue: 'תובנות מומחים, ניתוח שוק ומשאבים חינוכיים.'
        },
        {
            name: 'youtubeChannelUrl',
            title: 'YouTube Channel URL',
            type: 'url',
            initialValue: 'https://youtube.com/@lavisilver'
        },
        {
            name: 'youtubeSubscribers',
            title: 'YouTube Subscribers Count',
            type: 'string',
            initialValue: '10K+'
        },
        {
            name: 'youtubeVideos',
            title: 'YouTube Video Count',
            type: 'string',
            initialValue: '150+'
        }
    ]
}
