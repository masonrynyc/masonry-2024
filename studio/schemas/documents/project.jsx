import React from 'react'
import { MdImage } from 'react-icons/md'
import photo from '@studio/schemas/objects/photo'
import video from '@studio/schemas/objects/video'
import { projectModules } from '@studio/schemas/objects/modules'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: () => <MdImage size='24px' />,
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Settings', name: 'settings' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'content'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'content'
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: '(required)',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
      group: 'content'
    },
    photo({
      title: 'Featured Image',
      name: 'featuredImage',
      description: 'Used for SEO',
      group: 'content',
      hasDisplayOptions: false,
      useAltText: false,
      required: true
    }),
    video({ name: 'featuredVideo', title: 'Featured Video', group: 'content', useTitle: false }),
    {
      name: 'pageTitle',
      title: 'Headline',
      description: 'To be show on the case study page',
      type: 'string',
      group: 'content'
    },
    {
      name: 'projectMeta',
      title: 'Project Info',
      type: 'object',
      group: 'content',
      options: {
        columns: 2
      },
      fields: [
        {
          name: 'client',
          title: 'Client',
          type: 'string'
        },
        {
          name: 'project',
          title: 'Project Title',
          type: 'string'
        },
      ]
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'body',
      title: 'Project Description',
      type: 'blockText',
      group: 'content'
    },
    projectModules('projectModules', 'Sections', 'content'),
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'settings'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'featuredImage',
      slug: 'slug'
    },
    prepare({ title = 'Untitled', subtitle = '', media, slug = {} }) {
      const path = `/projects/${slug.current}`
      const projectTitle = subtitle ? title + ' – ' + subtitle : title
      return {
        title: projectTitle,
        subtitle: slug.current ? path : '/projects/...',
        media: media || <MdImage size='24px' />
      }
    }
  }
}