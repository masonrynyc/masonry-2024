import image from '@queries/image'
import { categoryFragment } from '@queries/category'
import { authorFragment } from '@queries/author'
import richText from '@queries/richText'

export const postFragment = `
  ...,
  _id,
  title,
  "slug": slug.current,
  "category": category -> {
    ${ categoryFragment }
  },
  author -> {
    ${ authorFragment }
  },
  publishedAt,
  featuredImage {
    ${ image }
  },
  excerpt[] {
    ${ richText }
  },
  body[] {
    ${ richText }
  },
  seo {
    ...,
  }
`

export default `
  *[_type == "post" && defined(slug.current) && slug.current == $slug] | order(_updatedAt desc)[0]{
    ${ postFragment }
  }
`

export const allPosts = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${ postFragment }
  }
`

export const postsByCategory = `
  *[_type == "post" && defined(slug.current) && category -> slug.current == $slug] | order(publishedAt desc) {
    ${ postFragment }
  }
`

export const postsByAuthor = `
  *[_type == "post" && defined(slug.current) && author -> slug.current == $slug] | order(publishedAt desc) {
    ${ postFragment }
  }
`