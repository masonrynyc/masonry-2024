import image from '@queries/image'
import richText from '@queries/richText'
import { categoryFragment } from '@queries/category'
import { authorFragment } from '@queries/author'

export const postFragmentMin = `
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
	...,
	"category": category -> {
    "slug": slug.current,
    title,
    _id
  },
  posts[] -> {
    ${postFragmentMin}
  }
`