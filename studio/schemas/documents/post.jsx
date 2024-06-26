import { BiNews } from 'react-icons/bi'

const getTodaysDate = () => {
  const today = new Date()
  const todayISO = today.toISOString()
  const [year, month, dayTime] = todayISO.split('-')
  const [day] = dayTime.split('T')
  return (year + '-' + month + '-' + day)
}

export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: () => <BiNews/>,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [
        { type: 'category' }
      ]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [
        { type: 'author' }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description: 'Posts will be displayed by most recent based on the published date',
      type: 'date',
      options: {
        dateFormat: 'YYYY/MM/DD'
      },
      initialValue: () => (getTodaysDate()),
      validation: Rule => Rule.required()
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      description: 'Optional',
      type: 'image'
    },
    {
      name: 'featured',
      title: 'Featured',
      initialValue: false,
      description: 'If true, this post will be displayed in the grid larger than others when possible.',
      type: 'boolean'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockText'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],
 
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'featuredImage'
    },
    prepare({ media, title, subtitle }) {
      return {
        title: title,
        subtitle: subtitle,
        media: media || <BiNews size='24px'/>
      }
    }
  }
}
