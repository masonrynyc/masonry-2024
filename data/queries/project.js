import image from '@queries/image'

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
  "modules": projectModules[]{
    ...
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