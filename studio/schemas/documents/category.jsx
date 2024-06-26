import { IoMdPricetag } from 'react-icons/io'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => <IoMdPricetag/>,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
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
      name: 'description',
      title: 'Description',
      type: 'blockText'
    }
  ],
 
  preview: {
    select: {
      title: 'title',
    }
  }
}
