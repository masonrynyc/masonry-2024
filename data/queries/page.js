import modules from '@queries/modules'
import image from '@queries/image'

export const pageFragment = `
  ...,
  title,
  "slug": slug.current,
  "modules": modules[]{
    ${modules}
  },
  "moduleRefs": modules[] -> {
    content[] {
      ${modules}
    }
  },
  seo{
    ...,
    shareGraphic {
      ${image}
    }
  }
`

export const allPages = `
  *[_type == "page" && defined(slug.current) && slug.current != 'home' && slug.current != 'blog' && slug.current != 'admin']{
    ${pageFragment}
  }
`

export default `
  *[_type == "page" && slug.current == $slug] | order(_updatedAt desc)[0]{
    ${pageFragment}
  }
`