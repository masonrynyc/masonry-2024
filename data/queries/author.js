import image from '@queries/image'

export const authorFragment = `
  ...,
  _id,
  "slug": slug.current,
  name,
  headshot {
    ${ image }
  }
`

export default `
  *[_type == "author" && slug.current == $slug] | order(_updatedAt desc)[0]{
    ${ authorFragment }
  }
`

export const allAuthors = `
  *[_type == "author"] | order(publishedAt desc) {
    ${ authorFragment }
  }
`