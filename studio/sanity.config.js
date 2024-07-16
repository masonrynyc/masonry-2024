import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { visionTool } from '@sanity/vision'
import { noteField } from 'sanity-plugin-note-field'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { schemaTypes } from '@studio/schemas'
import StudioLogo from '@studio/components/StudioLogo'
import saveAction from '@studio/components/saveAction'

// plopImportMenuItem
import projectMenuItem from '@studio/src/projectMenuItem'
import pageMenuItem from '@studio/src/pageMenuItem'
import blogMenuItem from '@studio/src/blogMenuItem'
import settingsMenuItem from '@studio/src/settingsMenuItem'

// Define the singleton document types
const singletons = new Set(["siteSettings"])

export default defineConfig({
  basePath: '/admin',
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  icon: process.env.NEXT_PUBLIC_SANITY_STUDIO_LOGO ? <img src={process.env.NEXT_PUBLIC_SANITY_STUDIO_LOGO} /> : <img src="/touch-icon.png" />,

  plugins: [
    structureTool({
      structure: (S) => {
        return S.list()
          .title('Content')
          .items([
            pageMenuItem(S),
            // plopAddMenuItem
            projectMenuItem(S),
            S.divider(),
            settingsMenuItem(S)
          ])
      }
    }),
    media(),
    process.env.NODE_ENV !== 'production' && visionTool(),
    noteField(),
    vercelDeployTool()
  ],

  schema: {
    types: schemaTypes,
    
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },

  document: {
    actions: (defaultActions, { schemaType }) => {
      let newActions = defaultActions

      const publishIndex = defaultActions.findIndex(({ action }) => action === 'publish')
      newActions[publishIndex] = saveAction(defaultActions[publishIndex])

      if (singletons.has(schemaType)) {
        return [
          ...newActions.filter (
            ({ action }) => 
              !['unpublish', 'duplicate', 'delete'].includes(action ?? ''),
          )
        ]
      }

      return newActions
    }
  }
})
