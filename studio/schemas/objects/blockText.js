// Minimal Rich Text
import link from '@studio/schemas/objects/link'
import {
  h1Render,
  h2Render,
  h3Render,
  bodyRender,
} from '@studio/components/textRenderer'

export default {
  title: 'Block Text',
  name: 'blockText',
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
        { title: 'Normal', value: 'normal', component: bodyRender }
      ],
      lists: [],
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
          })
        ]
      }
    }
  ]
}

export const blockHeadline = {
  title: 'Block Headlines',
  name: 'blockHeadline',
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
        { title: 'Normal', value: 'normal', component: h3Render },
        { title: 'H1', value: 'h1', component: h1Render },
        { title: 'H1 (1 per page)', value: 'trueH1', component: h1Render },
        { title: 'H2', value: 'h2', component: h2Render },
        { title: 'H3', value: 'h3', component: h3Render },
      ],
      lists: [],
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
          })
        ]
      }
    }
  ]
}
