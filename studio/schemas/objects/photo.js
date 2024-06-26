import IconUI from '@studio/components/IconUI'
import ratios from '@studio/schemas/objects/ratios'

export default ({
  hasDisplayOptions = true,
  hidden = false,
  useAltText = true,
  required = false,
  title = 'Photo',
  name = 'photo',
  description = false,
  ...props
} = {}) => {
  return {
    title: title || 'Photo',
    name: name || 'photo',
    description: description,
    type: 'image',
    hidden: hidden,
    options: {
      hotspot: true,
      accept: '.png, .jpg, .jpeg, .gif',
      collapsible: false
    },
    validation: Rule => {
      if (required) {
        return Rule.required()
      } else {
        return null
      }
    },
    fields: [
      ...(hasDisplayOptions ? [
          {
            title: 'Display Size (aspect ratio)',
            name: 'customRatio',
            type: 'number',
            initialValue: 0,
            components: { input: IconUI },
            options: {
              list: ratios
            }
          }
        ] : []
      ),
      ...(useAltText ? [
        {
          title: 'Alternative text',
          name: 'alt',
          type: 'string',
          description: 'A description of the image. Important for SEO and accessibility',
          validation: Rule => Rule.required()
        }
      ] : [])
    ],
    preview: {
      select: {
        asset: 'asset',
        alt: 'asset.alt',
        customAlt: 'alt',
        customRatio: 'customRatio'
      },
      prepare({ alt, customAlt, customRatio, asset }) {
        const crop = ratios.find(crop => crop.value === customRatio)

        return {
          title: customAlt ?? alt ?? '(alt text missing)',
          subtitle: crop?.title || 'Original Ratio',
          media: asset
        }
      }
    },
    ...props
  }
}