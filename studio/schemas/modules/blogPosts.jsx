import React from 'react'
import { BiNews } from 'react-icons/bi'
import { MdInfoOutline } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'

export default {
  title: 'Blog Posts',
  name: 'blogPosts',
  icon: () => <BiNews size='18px' />,
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Headline',
      name: 'headline',
      placeholder: 'From the Blog',
      type: 'string'
    },
    {
      title: 'Listing Type',
      name: 'listingType',
      type: 'string',
      initialValue: 'most-recent',
      options: {
        list: [
          { title: 'Currated', value: 'currated' },
          { title: 'Most Recent', value: 'most-recent' },
          { title: 'By Category', value: 'by-cat' }
        ]
      }
    },
    {
      title: 'Show Most Recent Posts',
      description: 'This section will show the most recent posts from the blog reguardless of category based on the date field',
      name: 'typeRecentNote',
      type: 'note',
      hidden: ({ parent }) => parent?.listingType !== 'most-recent',
      options: {
        icon: () => <MdInfoOutline size={20} style={{ marginRight: 6 }} />
      }
    },
    {
      title: 'Currated Selection of Posts',
      description: 'Select the posts to show in this section below',
      name: 'typeCurratedNote',
      type: 'note',
      hidden: ({ parent }) => parent?.listingType !== 'currated',
      options: {
        icon: () => <MdInfoOutline size={20} style={{ marginRight: 6 }} />
      }
    },
    {
      title: 'Posts by Category',
      description: 'Select the posts to show in this section below',
      name: 'typeByCatNote',
      type: 'note',
      validation: Rule => Rule.max(1),
      hidden: ({ parent }) => parent?.listingType !== 'by-cat',
      options: {
        icon: () => <MdInfoOutline size={20} style={{ marginRight: 6 }} />
      }
    },
    {
      title: 'Posts',
      name: 'posts',
      type: 'array',
      hidden: ({ parent }) => parent?.listingType !== 'currated',
      of: [
        {
          title: 'Post',
          name: 'post',
          type: 'reference',
          to: [
            { type: 'post' }
          ]
        }
      ]
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      hidden: ({ parent }) => parent?.listingType !== 'by-cat',
      to: [
        { type: 'category' }
      ]
    },
    {
      name: 'viewMoreLink',
      title: 'Show "View More" link',
      initialValue: true,
      type: 'boolean',
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme'
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
      category: 'category.title',
      listingType: 'listingType'
    },
    prepare (selection) {
      const { hidden, listingType, category } = selection
      const typeLabel = {
        'currated': 'Currated selection of posts',
        'by-cat': category ? 'Posts in the "' + category + '" category' : 'Posts by category',
        'most-recent': 'Most Recent Posts'
      }
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : typeLabel[listingType] || 'Blog posts',
        media: <SectionIcon hidden={hidden}><BiNews size='22px'/></SectionIcon>
      })
    }
  }
}
