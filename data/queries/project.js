import image from '@queries/image'
import moduleProjectText from '@queries/moduleProjectText'
import moduleMediaCollage from '@queries/moduleMediaCollage'
import richText from '@queries/richText'
import media from '@queries/media'
import { categoryFragment } from '@queries/category'

export const projectFragmentMin = `
  ...,
  title,
  "slug": slug.current,
  comingSoon,
  categories[] -> {
    ${categoryFragment}
  },
  featuredImage {
    ${ image }
  },
  featuredVideo {
    ...,
    preloadImage {
      ${image}
    },
    "url": asset->url
  },
  seo {
    ...
  }
`

export const projectFragment = `
  ...,
  ${projectFragmentMin},
  introMedia {
    ${media}
  },
  body[] {
    ${ richText }
  },
  projectModules[] {
    _type == "mediaCollage" => { ${moduleMediaCollage} },
    _type == "projectText" => { ${moduleProjectText} },
  },
  relatedProjects[] -> {
    ${projectFragmentMin}
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