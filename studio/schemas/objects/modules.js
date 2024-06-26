const reusableModuleType = [
  {
    title: 'Reusable Section',
    type: 'reference',
    to: [{ type: 'section' }]
  }
]

export const modules = (name, title, group = '', reusable = false) => {
  return (
    {
      title: title || 'Modules',
      name: name || 'modules',
      type: 'array',
      group: group,
      options: {
        insertMenu: {
          filter: 'auto',
          showIcons: true,
          views: [
            { name: 'grid', previewImageUrl: (schemaTypeName) => `/cms-previews/${schemaTypeName}.png` },
            // { name: 'list' }
          ],
          // groups: [
          //   {
          //     name: 'storytelling',
          //     title: 'Stroytelling',
          //     of: [
          //       'wideMedia'
          //     ]
          //   }
          // ]
        }
      },
      of: [
        { type: 'wideMedia' },
        // plopAddModules
				{ type: 'twoColumnText' },
				{ type: 'columns' },
				{ type: 'textSection' },
		    { type: 'blogPosts' },
        { type: 'fiftyFifty' },
        ...(reusable ? reusableModuleType : []),
      ],
    }
  )
}

export default modules