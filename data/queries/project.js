import image from '@queries/image'
import moduleWideMedia from '@queries/moduleWideMedia'
import moduleFiftyFifty from '@queries/moduleFiftyFifty'
import moduleTextSection from '@queries/moduleTextSection'
import moduleColumns from '@queries/moduleColumns'
import moduleTwoColumnText from '@queries/moduleTwoColumnText'
import richText from '@queries/richText'

export const projectFragmentMin = `
  ...,
  title,
  "slug": slug.current,
  featuredImage {
    ${ image }
  },
  seo {
    ...
  }
`

export const projectFragment = `
  ...,
  ${projectFragmentMin},
  body[] {
    ${ richText }
  },
  "modules": projectModules[]{
    ...,
    _type == "fiftyFifty" => { ${moduleFiftyFifty} },
    _type == "wideMedia" => { ${moduleWideMedia} },
    _type == "textSection" => { ${moduleTextSection} },
    _type == "columns" => { ${moduleColumns} },
    _type == "twoColumnText" => { ${moduleTwoColumnText} },
  }
`

export const allProjects = `
  *[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
    ${ projectFragmentMin }
  }
`

export default `
  *[_type == "project" && slug.current == $slug] | order(_updatedAt desc)[0]{
    ${ projectFragmentMin }
  }
`