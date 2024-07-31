import React from 'react'
import { MdPlayArrow, MdImage } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'
import IconUI from '@studio/components/IconUI'
import { capitalize } from '@utils/helpers'
import photo from '@studio/schemas/objects/photo'
import video from '@studio/schemas/objects/video'
import ratios from '@studio/schemas/objects/ratios'

export default ({ hasDisplayOptions = true, videoFile = false, useAltText, ...props } = {}) => {
  return {
    title: 'Media',
    name: 'media',
    type: 'object',
    ...props,
    fields: [
      {
        name: 'mediaType',
        title: 'Media Type',
        type: 'string',
        initialValue: 'image',
        components: { input: IconUI },
        validation: (Rule) => Rule.required(),
        options: {
          list: [
            { value: 'image', title: 'Image', icon: <MdImage/>, showLabel: true },
            { value: 'video', title: 'Video', icon: <MdPlayArrow/>, showLabel: true }
          ]
        }
      },
      photo({
        hasDisplayOptions: false,
        hidden: ({ parent }) => parent?.mediaType !== 'image',
        useAltText: useAltText,
        options: {
          collapsible: false
        }
      }),
      video({
        hidden: ({ parent }) => parent?.mediaType !== 'video',
        file: videoFile,
        playerSettings: false,
        useTitle: false
      }),
      ...(hasDisplayOptions
        ? [
            {
              title: 'Display Size (aspect ratio)',
              name: 'customRatio',
              type: 'number',
              initialValue: 0,
              components: { input: IconUI },
              options: {
                list: ratios
              }
            }
          ]
        : []
      )
    ],
    preview: {
      select: {
        mediaType: 'mediaType',
        image: 'image',
        video: 'video',
        altText: 'image.alt'
      },
      prepare (selection) {
        const { altText, mediaType, image, video } = selection
        let title = altText || capitalize(mediaType)
        let mediaIcon = <SectionIcon><MdImage size='24px'/></SectionIcon>
        if (mediaType === 'video') {
          title = video.title
          mediaIcon = <SectionIcon><MdPlayArrow size='24px'/></SectionIcon>
        } else if (mediaType === 'image' && image?.asset) {
          mediaIcon = image.asset
        }
        return Object.assign({}, selection, {
          title: title,
          media: MediaThumbnail({ media: { mediaType: mediaType, image: image, video: video }, hidden: hidden })
        })
      }
    }
  }
}
