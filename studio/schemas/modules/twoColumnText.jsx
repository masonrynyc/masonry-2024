import React from 'react'
import { PiTextColumnsBold } from 'react-icons/pi'
import SectionIcon from '@studio/components/SectionIcon'
import { portableToPlainText } from '@utils/helpers'

export default {
  title: 'Two Column Text',
  name: 'twoColumnText',
  icon: () => <PiTextColumnsBold size='18px' />,
  type: 'object',
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    // {
    //   name: 'leftColumn',
    //   title: 'Left Column',
    //   type: 'blockHeadline'
    // },
    {
      name: 'leftColumnString',
      title: 'Section Title',
      type: 'string'
    },
    {
      name: 'rightColumn',
      title: 'Right Column',
      type: 'blockText'
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      hidden: true,
    },
    // More Fields
    {
      name: 'hidden',
      title: 'Hidden',
      initialValue: false,
      type: 'boolean'
    },
  ],
  preview: {
    select: {
      internalName: 'internalName',
      media: 'media.image',
      leftColumn: 'leftColumn',
      leftColumnString: 'leftColumnString',
      rightColumn: 'rightColumn',
      hidden: 'hidden',
      theme: 'theme'
    },
    prepare (selection) {
      const { subtitle, media, hidden, theme, internalName, leftColumn, leftColumnString, rightColumn } = selection
      let title = leftColumnString || internalName
      let subtitleText = 'Two Column Text'
      if (leftColumn?.length) {
        // title = portableToPlainText(leftColumn)
        if (rightColumn?.length) {
          subtitleText = portableToPlainText(rightColumn)
        }
      } else if (!leftColumn?.length && rightColumn?.length) {
        // title = portableToPlainText(rightColumn)
      }
      
      return Object.assign({}, selection, {
        title: title,
        subtitle: hidden ? 'Hidden' : subtitleText,
        media: media || <SectionIcon hidden={hidden} theme={theme}><PiTextColumnsBold size='24px'/></SectionIcon>
      })
    }
  }
}