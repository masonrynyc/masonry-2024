import { MdLink, MdPlayArrow, MdImage } from 'react-icons/md'
import {
  h1Render,
  h2Render,
  h3Render,
  h4Render,
  bodySmallRender,
  bodyRender,
  bodyMediumRender,
  bodyLargeRender,
  blockquoteRender
} from '@studio/components/textRenderer'
import ImagePreview from '@studio/components/previews/ImagePreview'
import link from '@studio/schemas/objects/link'

const RotatingTextPreview = props => {
  return (
    <span>{props.renderDefault(props)} <span className="inline-block body-small bold">({props?.value?.items?.length} Items)</span></span>
  )
}

export default {
  title: 'Block Content',
  name: 'blockContent',
  description: 'For SEO purposes, only use "H1 (1 per page)" if this is the main page title',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal', component: bodyRender },
        { title: 'Medium', value: 'bodyMedium', component: bodyMediumRender },
        { title: 'Large', value: 'bodyLarge', component: bodyLargeRender },
        { title: 'Small', value: 'bodySmall', component: bodySmallRender },
        { title: 'H1', value: 'h1', component: h1Render },
        { title: 'H1 (1 per page)', value: 'trueH1', component: h1Render },
        { title: 'H2', value: 'h2', component: h2Render },
        { title: 'H3', value: 'h3', component: h3Render },
        { title: 'H4', value: 'h4', component: h4Render },
        { title: 'Quote', value: 'blockquote', component: blockquoteRender }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          // { title: 'Code', value: 'code' }
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          link({
            name: 'link',
            title: 'Link',
            needTitle: false
          }),
          {
            name: 'rotatingText',
            title: 'Rotating Text',
            type: 'object',
            components: { annotation: RotatingTextPreview },
            fields: [
              {
                name: 'items',
                title: 'Items',
                type: 'array',
                of: [
                  {
                    // name: 'item',
                    // title: 'Item',
                    type: 'string'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      name: 'inlineImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      icon: MdImage,
      fields: [
        {
          name: 'caption',
          title: 'Caption (Optional)',
          type: 'string'
        }
      ],
      components: {
        preview: ImagePreview
      },
      preview: {
        select: {
          image: 'asset',
          caption: 'caption',
          title: 'caption'
        }
      }
    },
    // {
    //   type: 'video',
    //   title: 'Video',
    //   icon: MdPlayArrow
    // },
    // {
    //   type: 'youTube',
    //   title: 'YouTube',
    //   icon: FaYoutube
    // },
    // {
    //   type: 'descriptionList',
    //   title: 'Description List',
    //   // icon: FaYoutube
    // },
    // Embed In Progress
    // {
    //   type: 'embed',
    //   title: 'Embed',
    //   icon: MdCode
    // },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
   
  ]
}
