import image from '@queries/image'

export default `
  ...,
  "image": photo {
    ${image}
  },
  video {
    ...,
    videoFile {
      ...,
      "url": asset->url
    }
  }
`