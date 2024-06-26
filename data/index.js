export const pageQuery = `
  {
    "page": *[_type == "page" && slug.current == $slug] | order(_updatedAt desc)[0]{
      "id": _id,
      title
    }
  }
`