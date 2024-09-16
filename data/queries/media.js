import image from '@queries/image'

export default `
  ...,
  "image": photo {
    ${image}
  },
  video {
    ...,
    preloadImage {
      ${image}
    },
    videoFile {
      ...,
      "url": asset->url
    }
  }
`