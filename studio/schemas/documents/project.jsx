import React from 'react'
import { MdImage } from 'react-icons/md'
import photo from '@studio/schemas/objects/photo'
import media from '@studio/schemas/objects/media'
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
      title: 'Client',
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
    {
      title: 'Coming Soon',
      name: 'comingSoon',
      type: 'boolean',
      description: 'If true, the project will no be clickable in the project grid',
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
    {
      name: 'featuredVideo',
      title: 'Featured Video',
      type: 'file',
      group: 'content',
      options: {
        accept: '.mp4'
      }
    },
    media({
      title: 'Project Intro Media',
      name: 'introMedia',
      description: 'Shown at the top of the project page',
      group: 'content',
      videoFile: true,
      hasDisplayOptions: false,
      useAltText: false,
      required: true
    }),
    {
      name: 'pageTitle',
      title: 'Headline',
      description: 'To be show on the case study page',
      type: 'string',
      group: 'content'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [
        {
          name: 'category',
          title: 'Category',
          type: 'reference',
          to: [
            { type: 'category' }
          ]
        }
      ]
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
      name: 'relatedProjects',
      title: 'Related Work',
      type: 'array',
      validation: Rule => Rule.max(3),
      of: [
        {
          name: 'project',
          title: 'Project',
          type: 'reference',
          to: { type: 'project' }
        }
      ],
      group: 'content'
    },
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