import { MdLink, MdOpenInNew, MdMail, MdPhone } from 'react-icons/md'
import { formatPhone, getPluralLabel } from '@utils/helpers'

export default {
  title: 'Navigation Link',
  name: 'navLink',
  type: 'object',
  fields: [
    {
      name: 'itemLink',
      type: 'link',
      description: 'If this item has sublinks, the parent link will be disregarded'
    },
    {
      name: 'sublinks',
      title: 'Dropdown Links',
      type: 'array',
      hidden: true,
      options: {
        modal: {
          type: 'dialog'
        }
      },
      of: [
        { type: 'link' }
      ],
    }
  ],
  preview: {
    select: {
      title: 'itemLink.title',
      externalLink: 'itemLink.externalLink',
      sublinks: 'sublinks',
      pageLink: 'itemLink.link.title',
      emailLink: 'itemLink.emailLink',
      phoneNumber: 'itemLink.phoneLink',
      type: 'itemLink.type'
    },
    prepare (selection) {
      const { sublinks, externalLink, pageLink, type, emailLink, phoneNumber } = selection
      let subtitle = 'Link to page'
      let media = MdLink
      if (sublinks?.length > 0) {
        subtitle = getPluralLabel('sublink', sublinks)
      } else if (type === 'externalLink') {
        subtitle = 'Link to ' + externalLink
        media = MdOpenInNew
      } else if (type === 'fileLink') {
        subtitle = 'Link to ' + fileName
        media = MdFolder
      } else if (type === 'emailLink') {
        subtitle = 'Email ' + emailLink
        media = MdMail
      } else if (type === 'phoneLink') {
        subtitle = 'Call ' + formatPhone(phoneNumber)
        media = MdPhone
      } else if (type === 'pageLink') {
        subtitle = 'Link to ' + pageLink + ' page'
      }

      // const fallbackSubtitle = externalLink ? 'Link to ' + externalLink : 'Link to page'
      return Object.assign({}, selection, {
        media: media,
        subtitle: subtitle
      })
    }
  }
}
