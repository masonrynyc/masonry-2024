import React from 'react'
import { BsColumnsGap } from 'react-icons/bs'
import { MdPlayArrow, MdImage } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'
import MediaStackIcon from '@studio/components/MediaStackIcon'
import photo from '@studio/schemas/objects/photo'
import video from '@studio/schemas/objects/video'

const MediaRow = {
  name: 'items',
  title: 'Media Items',
  type: 'object',
  fields: [
    {
      name: 'item',
      title: 'Item',
      type: 'array',
      validation: Rule => Rule.required().min(1).max(3),
      of: [
        photo({
          hasDisplayOptions: true,
          name: 'image',
          hotspot: false,
          options: {
            collapsible: false
          }
        }),
        video({
          playerSettings: true
        })
      ]
    }
  ],
  preview: {
    select: {
      items: 'item'
    },
    prepare (selection) {
      const itemsLength = selection?.items?.length
      let title = itemsLength + ' items'
      if (itemsLength === 1) {
        title = itemsLength + ' item'
      }

      const items = selection?.items[0]
      const { mediaType, image } = items
      let mediaIcon = <SectionIcon><MdImage size='24px'/></SectionIcon>
      if (mediaType === 'video') {
        mediaIcon = <SectionIcon><MdPlayArrow size='24px'/></SectionIcon>
      } else if (mediaType === 'image' && image?.asset) {
        mediaIcon = image.asset
      }
      return Object.assign({}, selection, {
        title: title,
        // media: mediaIcon,
        media: <MediaStackIcon items={selection?.items}/>
      })
    }
  }
}

export default {
  title: 'Media Collage',
  name: 'mediaCollage',
  icon: () => <BsColumnsGap size='18px' />,
  type: 'object',
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
    },
    {
      name: 'rows',
      title: 'Media Rows',
      type: 'array',
      validation: Rule => Rule.required().min(1),
      of: [
        MediaRow
      ]
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      hidden: true
    },
    // More Fields
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
      media: 'media.image',
      hidden: 'hidden',
      theme: 'theme'
    },
    prepare (selection) {
      const { subtitle, media, hidden, theme } = selection
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle || 'Media Collage',
        media: media || <SectionIcon hidden={hidden} theme={theme}><BsColumnsGap size='20px'/></SectionIcon>
      })
    }
  }
}