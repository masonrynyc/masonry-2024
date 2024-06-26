import React from 'react'
import { MdOutlineViewDay } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'

export default {
  title: 'Reusable Section',
  name: 'section',
  type: 'document',
  icon: () => <MdOutlineViewDay />,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description: 'Provide a name to reference this section. For internal use only.',
      validation: Rule => Rule.required()
    },
    {
      title: 'Content',
      name: 'content',
      type: 'modules',
      validation: Rule => Rule.required().min(1).max(1).error('You must have one module')
    }
  ],
  preview: {
    select: {
      name: 'name',
      // content: 'content.0'
    },
    prepare({ name, content }) {
      return {
        title: name,
        media: <SectionIcon><MdOutlineViewDay size='24px'/></SectionIcon>
        // subtitle: getModuleName(content._type) TODO: better way?
      }
    }
  }
}