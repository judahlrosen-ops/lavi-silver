import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Lavi Website',

  projectId: '6d6qll1w',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Learn Section Group
            S.listItem()
              .title('Learn Section')
              .child(
                S.list()
                  .title('Learn Content')
                  .items([
                    S.listItem()
                      .title('Page Configuration')
                      .child(S.document().schemaType('learnPage').documentId('learnPage')),
                    S.documentTypeListItem('article').title('Articles'),
                    S.documentTypeListItem('webinar').title('Webinars'),
                  ])
              ),
            S.listItem()
              .title('Buy Silver Page')
              .child(S.document().schemaType('buySilverPage').documentId('buySilverPage')),
            S.divider(),
            // Remaining items
            ...S.documentTypeListItems().filter(
              (listItem) => !['learnPage', 'article', 'webinar', 'buySilverPage'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
