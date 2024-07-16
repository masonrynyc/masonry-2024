export const categoryFragment = `
  ...,
  "slug": slug.current,
  title,
  _id
`

export default `
  *[_type == "category" && slug.current == $slug] | order(_updatedAt desc)[0]{
    ${ categoryFragment }
  }
`

export const allCategories = `
  *[_type == "category"] | order(order asc) {
    ${ categoryFragment }
  }
`