import { MdSettings } from 'react-icons/md'
import social from '../objects/social'

export default {
  name: 'siteSettings',
  _id: 'siteSettings',
  id: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => <MdSettings/>,
  groups: [
    { name: 'main', title: 'Settings', default: true },
    { name: 'footer', title: 'Footer' },
    { name: 'meta', title: 'Default SEO' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'main'
    },
    {
      name: 'topBanner',
      title: 'Top Banner Link',
      description: 'Optional',
      type: 'object',
      group: 'main',
      hidden: true,
      fields: [
        {
          name: 'bannerLink',
          title: 'Banner Link',
          type: 'link'
        }
      ]
    },
    // {
    //   name: 'footerSettings',
    //   title: 'Footer Settings',
    //   type: 'footerSettings',
    //   group: 'footer'
    // },
    // {
    //   name: 'social',
    //   title: 'Social',
    //   type: 'social',
    //   group: 'main',
    //   // hidden: true
    // },
    {
      name: 'social',
      title: 'Social',
      type: 'social',
      group: 'main',
      hidden: true
    },
    {
      name: 'favicon',
      title: 'Favicon',
      description: '32x32 .png file to be shown in the browser tab bar. transparent background is best.',
      type: 'image',
      group: 'main',
      options: {
        accept: '.png'
      }
    },
    {
      name: 'touchicon',
      title: 'Touch Icon',
      description: '192x192 .png file to be used as an icon in rare occasions. Solid background is best.',
      type: 'image',
      group: 'main',
      options: {
        accept: '.png'
      }
    },
    {
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
      group: 'meta'
    }
  ],
  preview: {
    select: {
      media: 'favicon'
    },
    prepare (selection) {
      return Object.assign({}, selection, {
        title: 'Site Settings',
        media: false
      })
    }
  }
}
