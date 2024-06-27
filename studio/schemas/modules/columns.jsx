import React from 'react'
import { HiViewBoards } from 'react-icons/hi'
import SectionIcon from '@studio/components/SectionIcon'
import photo from '@studio/schemas/objects/photo'
import alignmentHorizontal from '@studio/schemas/objects/alignmentHorizontal'
import { getPluralLabel } from '@utils/helpers'

const column = {
  name: 'column',
  title: 'Column',
  type: 'object',
  fields: [
    // photo({ hasDisplayOptions: false }),
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockText'
    }
  ]
}

export default {
  title: 'Columns',
  name: 'columns',
  icon: () => <HiViewBoards size='18px' />,
  type: 'object',
  groups: [
    { title: 'Main', name: 'main', default: true },
    { name: 'settings', title: 'Settings' }
  ],
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      group: 'main',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Headline',
      type: 'string',
      group: 'main'
    },
    {
      name: 'columnItems',
      title: 'Columns',
      type: 'array',
      group: 'main',
      of: [column],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'imageSize',
      title: 'Image Size',
      type: 'string',
      initialValue: 'large',
      hidden: true,
      options: {
        list: ['small', 'medium', 'large']
      },
      group: 'main'
    },
    alignmentHorizontal({ showRight: false, group: 'main', initial: 'left', hidden: true }),
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      group: 'main',
      hidden: true
    },
    // More Fields
    {
      name: 'hidden',
      title: 'Hidden',
      initialValue: false,
      type: 'boolean',
      group: 'settings'
    },
  ],
  preview: {
    select: {
      title: 'title',
      internalName: 'internalName',
      media: 'media.image',
      hidden: 'hidden',
      theme: 'theme',
      columns: 'columnItems'
    },
    prepare (selection) {
      const { columns, media, hidden, theme, title, internalName } = selection
      const subtitle = getPluralLabel('column', columns)
      return Object.assign({}, selection, {
        title: title || internalName,
        subtitle: hidden ? 'Hidden' : subtitle || 'Columns',
        media: media || <SectionIcon hidden={hidden} theme={theme}><HiViewBoards size='24px'/></SectionIcon>
      })
    }
  }
}