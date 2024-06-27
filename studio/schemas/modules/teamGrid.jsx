import React from 'react'
import { MdGroups, MdPerson } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'

const teamMemberObj = {
  name: 'member',
  title: 'Team Member',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'blockText'
    },
    // {
    //   name: 'links',
    //   title: 'Links',
    //   type: 'array',
    //   of: [{ type: 'link' }]
    // },
    {
      name: 'headshot',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'headshot'
    },
    prepare (selection) {
      const { name, media } = selection
      return Object.assign({}, selection, {
        media: media || MdPerson
      })
    }
  }
}

export default {
  title: 'Team Members',
  name: 'teamGrid',
  icon: () => <MdGroups size='18px' />,
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
      initialValue: 'Team Grid',
      group: 'main',
      hidden: true,
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      group: 'main',
      validation: Rule => Rule.required()
    },
    {
      name: 'members',
      title: 'Team Members',
      type: 'array',
      group: 'main',
      validation: Rule => Rule.required().min(1),
      of: [ teamMemberObj ]
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
      title: 'internalName',
      media: 'media.image',
      hidden: 'hidden',
      theme: 'theme',
      members: 'members'
    },
    prepare (selection) {
      const { media, hidden, theme, members = [] } = selection
      let subtitle = (members?.length || '0') + ' members'
      if (members.length === 1) {
        subtitle = '1 member'
      }
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle || 'Team Members',
        media: media || <SectionIcon hidden={hidden} theme={theme}><MdGroups size='24px'/></SectionIcon>
      })
    }
  }
}