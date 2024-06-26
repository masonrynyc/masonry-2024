import richText from '@queries/richText'
import link from '@queries/link'

export default `
  ...,
  "excerpt": pt::text(text[_type == "block"][0...3]),
  text[]{
    ${richText}
  },
  actions[]{
    ${link}
  }
`