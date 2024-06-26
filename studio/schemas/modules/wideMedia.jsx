import React from 'react'
import { MdPlayArrow, MdImage } from 'react-icons/md'
import { FiAlignCenter, FiAlignLeft } from "react-icons/fi"
import MediaThumbnail from '@studio/components/MediaThumbnail'
import IconUI from '@studio/components/IconUI'
import SliderInput from '@studio/components/SliderInput'
import media from '@studio/schemas/objects/media'

export const wideMedia = (requirements, name) => {
  return (
    {
      title: 'Wide Media',
      name: 'wideMedia',
      icon: () => <MdImage size='18px' />,
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'internalName',
          title: 'Internal Name',
          type: 'string',
          hidden: requirements,
          validation: Rule => Rule.required()
        },
        media({ hasDisplayOptions: false }),
        {
          name: 'hasOverlayText',
          description: 'Text to be shown over image or video',
          initialValue: false,
          type: 'boolean'
        },
        {
          name: 'text',
          title: 'Text',
          type: 'textLockup',
          hidden: ({ parent }) => !parent?.hasOverlayText,
        },
        {
          name: 'alignment',
          title: 'Alignment',
          type: 'string',
          initialValue: 'center',
          components: { input: IconUI },
          hidden: ({ parent }) => !parent?.hasOverlayText,
          options: {
            list: [
              { title: 'Left', value: 'left', icon: <FiAlignLeft/> },
              { title: 'Center', value: 'center', icon: <FiAlignCenter/> }
            ]
          }
        },
        {
          name: 'placement',
          title: 'Placement',
          type: 'placement',
          hidden: ({ parent }) => !parent?.hasOverlayText
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          initialValue: 'light',
          hidden: ({ parent }) => !parent?.hasOverlayText,
          options: {
            list: [
              { title: 'Light', value: 'light' },
              { title: 'Dark', value: 'dark' }
            ],
            layout: 'dropdown'
          }
        },
        {
          name: 'overlayOpacity',
          title: 'Overlay Opacity',
          type: 'number',
          initialValue: 0,
          components: { input: SliderInput },
          hidden: ({ parent }) => !parent?.hasOverlayText
        },
        {
          name: 'height',
          title: 'Height',
          type: 'string',
          initialValue: 'auto',
          components: { input: IconUI },
          options: {
            list: [
              { title: 'Auto', value: 'auto' },
              { title: 'Full', value: 'fullHeight' },
              { title: 'Medium', value: 'mediumHeight' },
              { title: 'Short', value: 'shortHeight' }
            ],
            layout: 'dropdown'
          }
        },
        {
          name: 'width',
          title: 'Width',
          type: 'string',
          initialValue: 'fullWidth',
          validation: Rule => Rule.required(),
          options: {
            list: [
              {title: 'Full Width', value: 'fullWidth'},
              {title: 'Margins', value: 'margins'}
            ],
            layout: 'dropdown',
          }
        },
        {
          name: 'theme',
          title: 'Theme',
          type: 'theme',
          hidden: ({ parent }) => parent?.width === 'fullWidth'
        },
        {
          name: "hidden",
          title: "Hidden",
          initialValue: false,
          type: "boolean",
          hidden: !requirements,
        },
      ],
      preview: {
        select: {
          title: 'internalName',
          subtitle: 'width',
          media: 'media',
          hidden: 'hidden'
        },
        prepare (selection) {
          const { subtitle, media, hidden } = selection
          let subtitleText = 'Margins'
          if (subtitle === 'fullWidth') {
            subtitleText = 'Full Width'
          }

          return Object.assign({}, selection, {
            subtitle: hidden ? 'Hidden' : subtitleText,
            media: MediaThumbnail({ media: media, hidden: hidden })
          })
        }
      }
    }
  )
}

export default wideMedia
