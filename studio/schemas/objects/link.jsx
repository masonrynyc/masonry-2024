import React from 'react'
import { MdLink, MdOpenInNew, MdMail, MdPhone, MdFolder } from 'react-icons/md'
import IconUI from '@studio/components/IconUI'
import ClientAsyncSelect from '@studio/components/ClientAsyncSelect'
import ButtonPreview from '@studio/components/previews/ButtonPreview'
import { formatPhone } from '@utils/helpers'
import { useFormValue } from 'sanity'

const buttonOptions = [
  {
    name: 'theme',
    title: 'Theme',
    type: 'string',
    initialValue: 'primary',
    options: {
      list: ['primary', 'secondary']
    }
  }
]

const link = ({name = 'link', title = 'Link', needTitle = true} = {}) => {
  return (
    {
      title: title || 'Link',
      name: name || 'link',
      type: 'object',
      components: name === 'button' ? { preview: (props) => <ButtonPreview {...props} /> } : null,
      fields: [
        {
          name: 'title',
          title: 'Link CTA',
          type: 'string',
          hidden: !needTitle
        },
        {
          name: 'type',
          title: 'Link Type',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'pageLink',
          components: {
            input: IconUI
          },
          options: {
            list: [
              { title: 'To Page', value: 'pageLink', icon: <MdLink /> },
              { title: 'External Link', value: 'externalLink', icon: <MdOpenInNew /> },
              { title: 'Email', value: 'emailLink', icon: <MdMail /> },
              { title: 'Phone', value: 'phoneLink', icon: <MdPhone /> },
              { title: 'File', value: 'fileLink', icon: <MdFolder /> },
            ]
          }
        },
        {
          name: 'link',
          title: 'Page Link',
          type: 'reference',
          hidden: ({ parent }) => parent?.type !== 'pageLink',
          to: [
            { type: 'page' },
            // plopAddDocumentLink
            { type: 'project' },
            { type: 'post' },
          ]
        },
        {
          name: 'linkSection',
          title: 'Page Section',
          description: 'Optional',
          options: {
            collapsable: true
          },
          components: {
            input: ClientAsyncSelect
          },
          type: 'string',
          hidden: ({ parent }) => !parent?.link || parent?.type !== 'pageLink',
        },
        // {
        //   name: 'url_parameters',
        //   title: 'URL Parameters',
        //   description: 'Optional. (ie: unitType=studio)',
        //   type: 'string',
        //   hidden: ({ parent }) => !parent?.link || parent?.type !== 'pageLink'
        // },
        {
          name: 'externalLink',
          title: 'External Link',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'externalLink',
          validation: Rule =>
            Rule.uri({
              allowRelative: true,
              scheme: ['https', 'http', 'mailto', 'tel']
            })
        },
        {
          name: 'file',
          title: 'File',
          type: 'file',
          hidden: ({ parent }) => parent?.type !== 'fileLink'
        },
        {
          name: 'emailLink',
          title: 'Email Address',
          description: 'Enter a valid email address',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'emailLink',
        },
        {
          name: 'phoneLink',
          title: 'Phone Number',
          description: 'No spaces dashes or dots',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'phoneLink',
        },
        ...(name === 'button' ? buttonOptions : []),
        {
          name: 'newTab',
          title: 'Open in new tab',
          initialValue: false,
          type: 'boolean'
        }
      ],
      preview: {
        select: {
          title: 'title',
          externalLink: 'externalLink',
          pageLink: 'link.title',
          phoneNumber: 'phoneLink',
          emailLink: 'emailLink',
          link: 'link',
          type: 'type',
          fileName: 'file.asset.originalFilename',
          newTab: 'newTab',
          theme: 'theme'
        },
        prepare (selection) {
          const { link, externalLink = '...', fileName, pageLink, type, phoneNumber, emailLink, newTab } = selection
          let subtitle = 'Link to page'
          let newTabLabel = ''
          if (newTab) {
            newTabLabel = ' in new tab'
          }
          let media = MdLink
          if (type === 'externalLink') {
            subtitle = 'Link to ' + externalLink + newTabLabel
            media = MdOpenInNew
          } else if (type === 'fileLink') {
            subtitle = 'Link to ' + fileName + newTabLabel
            media = MdFolder
          } else if (type === 'emailLink') {
            subtitle = 'Email ' + emailLink + newTabLabel
            media = MdMail
          } else if (type === 'phoneLink') {
            subtitle = 'Call ' + formatPhone(phoneNumber) + newTabLabel
            media = MdPhone
          } else if (type === 'pageLink') {
            subtitle = 'Link to ' + pageLink.toLowerCase() + ' ' + link?._type + newTabLabel
          }
          return Object.assign({}, selection, {
            media: media,
            subtitle: subtitle
          })
        }
      }
    }
  )
}

export default link