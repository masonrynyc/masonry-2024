import React from 'react'
import { RxDividerHorizontal } from 'react-icons/rx'
import SectionIcon from '@studio/components/SectionIcon'

export default {
  title: 'Divider',
  name: 'divider',
  icon: () => <RxDividerHorizontal size='18px' />,
  type: 'object',
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      initialValue: 'Divider',
      hidden: true,
      validation: Rule => Rule.required()
    },
    {
      name: 'mobileHide',
      title: 'Hide on mobile',
      type: 'boolean'
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      hidden: true
    }
  ],
  preview: {
    select: {
      title: 'internalName',
      media: 'media.image',
      hidden: 'hidden',
      theme: 'theme'
    },
    prepare (selection) {
      const { subtitle, media, hidden, theme } = selection
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle || 'Divider',
        media: media || <SectionIcon hidden={hidden} theme={theme}><RxDividerHorizontal size='24px'/></SectionIcon>
      })
    }
  }
}