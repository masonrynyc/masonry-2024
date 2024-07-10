import React from 'react'
import { MdDashboard, MdDescription } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'
import { getPluralLabel } from '@utils/helpers'
import LiBadgePreview from '@studio/components/previews/LiBadgePreview'
import IconUI from '@studio/components/IconUI'
import { capitalize } from '@utils/helpers'

export default {
  title: 'Project Grid',
  name: 'projectGrid',
  icon: () => <MdDashboard size='18px' style={{ transform: 'rotate(90deg)' }} />,
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      hidden: true,
      initialValue: 'Project Grid',
      validation: Rule => Rule.required()
    },
    {
      title: 'Projects',
      name: 'projects',
      type: 'array',
      validation: Rule => Rule.required().min(1),
      of: [
        {
          title: 'Project',
          name: 'item',
          type: 'object',
          components: { preview: (props) => <LiBadgePreview {...props} label={capitalize(props?.size)} badge /> },
          fields: [
            {
              title: 'Project',
              name: 'project',
              type: 'reference',
              to: [
                { type: 'project' }
              ]
            },
            {
              title: 'size',
              name: 'size',
              type: 'string',
              initialValue: 'medium',
              components: { input: IconUI },
              validation: Rule => Rule.required(),
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' }
                ]
              }
            }
          ],
          preview: {
            select: {
              title: 'project.title',
              subtitle: 'project.subtitle',
              media: 'project.featuredImage',
              size: 'size'
            }
          }
        }
      ]
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'actions'
    },
    {
      name: 'showFilters',
      title: 'Show Filters',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      hidden: true
    },
    {
      name: 'hidden',
      title: 'Hidden',
      initialValue: false,
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'internalName',
      hidden: 'hidden',
      projects: 'projects'
    },
    prepare (selection) {
      const { hidden, projects } = selection
      const subtitle = getPluralLabel('project', projects)
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle,
        media: <SectionIcon hidden={hidden}><MdDashboard size='22px' style={{ transform: 'rotate(90deg)' }} /></SectionIcon>
      })
    }
  }
}
