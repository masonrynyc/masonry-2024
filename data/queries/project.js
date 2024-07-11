import image from '@queries/image'
import moduleProjectText from '@queries/moduleProjectText'
import moduleMediaCollage from '@queries/moduleMediaCollage'
import richText from '@queries/richText'
import { categoryFragment } from '@queries/category'

export const projectFragmentMin = `
  ...,
  title,
  "slug": slug.current,
  categories[] -> {
    ${categoryFragment}
  },
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
  projectModules[]{
    _type == "mediaCollage" => { ${moduleMediaCollage} },
    _type == "projectText" => { ${moduleProjectText} },
  }
`

export const allProjects = `
  *[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
    ${ projectFragmentMin }
  }
`

export default `
  *[_type == "project" && slug.current == $slug] | order(_updatedAt desc)[0]{
    ${ projectFragment }
  }
`