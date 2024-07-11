import React from 'react'
import { FiAlignLeft } from "react-icons/fi"
import SectionIcon from '@studio/components/SectionIcon'
import { portableToPlainText } from '@utils/helpers'

export default {
  title: 'Project Text',
  name: 'projectText',
  icon: () => <FiAlignLeft size='18px' />,
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
      name: 'text',
      title: 'Text',
      type: 'blockText',
      group: 'main'
    },
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
      text: 'text',
      hidden: 'hidden',
      theme: 'theme'
    },
    prepare (selection) {
      const { subtitle, text, hidden, theme } = selection
      const title = text && text?.length ? portableToPlainText(text) : 'Text Section'
      return Object.assign({}, selection, {
        title: title,
        subtitle: hidden ? 'Hidden' : subtitle || 'Project Text',
        media: <SectionIcon hidden={hidden} theme={theme}><FiAlignLeft size='24px'/></SectionIcon>
      })
    }
  }
}