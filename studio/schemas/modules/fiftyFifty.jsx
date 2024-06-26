import React from 'react'
import { TfiLayoutMediaLeft } from 'react-icons/tfi'
import IconUI from '@studio/components/IconUI'
import MediaThumbnail from '@studio/components/MediaThumbnail'
import {
  MdAlignVerticalBottom,
  MdAlignVerticalTop,
  MdAlignVerticalCenter,
} from "react-icons/md"

export default {
  title: 'Fifty Fifty',
  name: 'fiftyFifty',
  icon: () => <TfiLayoutMediaLeft size='20px' />,
  type: 'object',
  groups: [
    { title: 'Main', name: 'main' },
    { name: 'settings', title: 'Settings' }
  ],
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      group: 'main',
      validation: Rule => Rule.required()
    },
    {
      name: 'media',
      title: 'Media',
      type: 'media',
      group: 'main',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'textLockup'
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'alignmentHorizontal'
    },
    {
      name: 'textPosition',
      title: 'Image Position',
      type: 'string',
      initialValue: 'right',
      components: { input: IconUI },
      options: {
        list: [
          { title: 'Left', value: 'right', icon: <div><TfiLayoutMediaLeft size='24px' /></div> },
          { title: 'Right', value: 'left', icon: <div style={{ transform: 'rotate(180deg)' }}><TfiLayoutMediaLeft size='24px' /></div> }
        ]
      }
    },
    {
      name: 'mediaSize',
      title: 'Image Size',
      type: 'string',
      initialValue: 'medium',
      components: { input: IconUI },
      options: {
        list: [
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' }
        ]
      }
    },
    {
      name: 'vAlignment',
      title: 'Vertical Alignment',
      type: 'string',
      initialValue: 'top',
      components: { input: IconUI },
      options: {
        list: [
          { title: 'Top', value: 'top', icon: <MdAlignVerticalTop/> },
          { title: 'Center', value: 'center', icon: <MdAlignVerticalCenter/> },
          { title: 'Bottom', value: 'bottom', icon: <MdAlignVerticalBottom/> },
          { title: 'Sticky', value: 'sticky' },
          { title: 'Stretch', value: 'stretch' }
        ]
      }
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      group: 'settings'
    },
    // More Fields
    {
      name: 'hidden',
      title: 'Hidden',
      initialValue: false,
      type: 'boolean',
      group: 'settings'
    },
  ],
  preview: {
    select: {
      title: 'internalName',
      media: 'media',
      hidden: 'hidden',
      theme: 'theme'
    },
    prepare (selection) {
      const { subtitle, media, hidden, theme } = selection

      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle || 'Fifty Fifty',
        media: MediaThumbnail({ media: media, hidden: hidden })
      })
    }
  }
}