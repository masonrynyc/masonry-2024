export const projectFragment = `
  ...,
  title,
  "slug": slug.current,
  seo {
    ...,
  }
`

export const allProjects = `
  *[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
    ${ projectFragment }
  }
`

export default `
  *[_type == "project" && slug.current == $slug] | order(_updatedAt desc)[0]{
    ${ projectFragment }
  }
`