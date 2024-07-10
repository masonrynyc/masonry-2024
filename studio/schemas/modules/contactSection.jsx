import React from 'react'
import { MdMail, MdList } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'
import { getPluralLabel, portableToPlainText } from '@utils/helpers'

export default {
  title: 'Contact Section',
  name: 'contactSection',
  icon: () => <MdMail size='18px' />,
  type: 'object',
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      initialValue: 'Contact Section',
      hidden: true,
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'leftColumn',
      title: 'Left Column',
      type: 'array',
      of: [
        {
          name: 'linkSection',
          title: 'Link Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [{ type: 'link' }]
            }
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links'
            },
            prepare (selection) {
              const { links } = selection
              let subtitle = getPluralLabel('link', links)
              
              return Object.assign({}, selection, {
                subtitle: subtitle,
                media: <MdList size='24px'/>
              })
            }
          }
        }
      ]
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
      leftColumn: 'leftColumn',
      rightColumn: 'rightColumn',
      hidden: 'hidden',
      theme: 'theme',

    },
    prepare (selection) {
      const { subtitle, media, hidden, theme, internalName, leftColumn, rightColumn } = selection
      let title = getPluralLabel('link section', leftColumn) || internalName
      let subtitleText = 'Contact Section'
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
        media: media || <SectionIcon hidden={hidden} theme={theme}><MdMail size='24px'/></SectionIcon>
      })
    }
  }
}