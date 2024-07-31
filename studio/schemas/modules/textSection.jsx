import React from 'react'
import SectionIcon from '@studio/components/SectionIcon'
import alignmentHorizontal from '@studio/schemas/objects/alignmentHorizontal'
import { FiAlignCenter, FiAlignLeft } from "react-icons/fi"
import { portableToPlainText } from '@utils/helpers'

export default {
  title: 'Text Section',
  name: 'textSection',
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
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      group: 'main',
      hidden: true,
    },
    alignmentHorizontal({
      showRight: false,
      group: 'main',
      initial: 'left',
      name: 'alignment',
      hidden: true
    }),
    {
      name: 'text',
      title: 'Text',
      type: 'textLockup',
      group: 'main'
    },
    {
      name: 'extraSpacing',
      title: 'Extra Spacing',
      type: 'boolean',
      group: 'main'
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
      title: 'internalName',
      media: 'media.image',
      hidden: 'hidden',
      theme: 'theme',
      text: 'text',
      alignment: 'alignment'
    },
    prepare (selection) {
      const { media, hidden, theme, text, alignment } = selection
      const subtitle = text?.text && text?.text?.length ? portableToPlainText(text.text) : 'Text Section'
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle,
        media: media || <SectionIcon hidden={hidden} theme={theme}>{alignment === 'center' ? <FiAlignCenter size='24px'/> : <FiAlignLeft size='24px'/>}</SectionIcon>
      })
    }
  }
}