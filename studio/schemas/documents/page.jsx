import React from 'react'
import { MdInsertDriveFile, MdMail, MdLocationOn, MdHome, MdVideocam, MdRssFeed, MdLock, MdMergeType, MdGroup, MdSchool, MdAssignmentTurnedIn, MdDashboard } from 'react-icons/md'
import { FaSchool, FaNewspaper, FaInstagram } from 'react-icons/fa'
import { IoMdHeart } from 'react-icons/io'
import modules from '@studio/schemas/objects/modules'

const getPreviewIcon = slug => {
  const iconSize = '24px'
  if (!slug) {
    return <MdInsertDriveFile size={iconSize} />
  } else if (slug === 'home' || slug === '/') {
    return <MdHome size={iconSize} />
  } else if (slug === 'work') {
    return <MdDashboard size={iconSize} style={{ transform: 'rotate(-90deg)' }} />
  } else if (slug.includes('-school')) {
    return <MdSchool size={iconSize} />
  } else if (slug.includes('school')) {
    return <FaSchool size={iconSize} />
  } else if (slug.includes('team')) {
    return <MdGroup size={iconSize} />
  } else if (slug.includes('enroll')) {
    return <MdAssignmentTurnedIn size={iconSize} />
  } else if (slug.includes('video')) {
    return <MdVideocam size={iconSize} />
  } else if (slug.includes('location') || slug.includes('visit')) {
    return <MdLocationOn size={iconSize} />
  } else if (slug.includes('approach')) {
    return <MdMergeType size={iconSize} />
  } else if (slug.includes('contact')) {
    return <MdMail size={iconSize} />
  } else if (slug.includes('support')) {
    return <IoMdHeart size={iconSize} />
  } else if (slug.includes('blog')) {
    return <MdRssFeed size={iconSize} />
  } else if (slug === 'press') {
    return <FaNewspaper size={iconSize} />
  } else if (slug === 'instagram') {
    return <FaInstagram size={iconSize} />
  } else if (slug === 'privacy') {
    return <MdLock size={iconSize} />
  } else {
    return <MdInsertDriveFile size={iconSize} />
  }
}

export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: () => <MdInsertDriveFile />,
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
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      initialValue: 'light',
      hidden: ({ parent }) => !parent?.hasOverlayText,
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' }
        ],
        layout: 'dropdown'
      }
    },
    {
      title: 'This is your homepage',
      description: <>Because this page's slug is <code>home</code>, this will be the site's homepage.</>,
      name: 'homePageNote',
      type: 'note',
      group: 'content',
      hidden: ({ parent }) => {
        return parent?.slug?.current !== 'home'
      },
      options: {
        icon: () => <MdHome size={20} style={{ marginRight: 6 }} />
      }
    },
    {
      title: 'This is your blog listing page',
      description: <>Because this page's slug is <code>blog</code>, this page will show a list of blog posts before any of the page content.</>,
      name: 'blogPageNote',
      type: 'note',
      group: 'content',
      hidden: ({ parent }) => {
        return parent?.slug?.current !== 'blog'
      },
      options: {
        icon: () => <MdRssFeed size={20} style={{ marginRight: 6 }} />
      }
    },
    modules('modules', 'Page Content', 'content', true),
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
      slug: 'slug'
    },
    prepare({ title = 'Untitled', slug = {} }) {
      slug = slug?.current
      const path = `/${slug}`
      return {
        title: title,
        subtitle: slug ? path : 'Missing slug',
        media: getPreviewIcon(slug)
      }
    }
  }
}