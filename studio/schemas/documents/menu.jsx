import { MdMenu } from 'react-icons/md'

export default {
  name: 'menu',
  type: 'document',
  title: 'Menu',
  icon: () => <MdMenu/>,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Menu Location',
      description: 'The area of the site you would like to use this menu',
      type: 'string',
      initialValue: 'unset',
      options: {
        list: [
          { title: 'Header', value: 'main-navigation' },
          { title: 'Footer', value: 'footer-navigation' },
          { title: 'Unset', value: 'unset' }
        ],
      },
      validation: Rule => Rule.required()
    },
    // {
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   hidden: true,
    //   options: {
    //     source: 'title',
    //     maxLength: 96
    //   },
    //   validation: Rule => Rule.required()
    // },
    {
      name: 'items',
      title: 'Nav Items',
      type: 'array',
      of: [
        { type: 'navLink' }
      ]
    },
  ]
}
