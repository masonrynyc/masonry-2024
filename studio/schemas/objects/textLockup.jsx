import React from 'react'
import { IoMdColorFill } from 'react-icons/io'
import link from './link'

const renderHeadline = props => {
  return <span as={props.value}>{props.children}</span>
}

export default {
  title: 'Text Lockup',
  name: 'textLockup',
  type: 'object',
  fields: [
    {
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string'
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'array',
      hidden: true, // Not necessary for many sites
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
              link({
                name: 'link',
                title: 'Link',
                needTitle: false
              })
            ]
          }
        },
      ]
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'actions'
    }
  ]
}
