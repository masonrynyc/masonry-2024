import { MdPerson } from 'react-icons/md'

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96
      }
    },
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
