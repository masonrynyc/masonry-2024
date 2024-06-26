import { imageBuilder } from '@lib/sanity'

export function buildSrc(image, { width, height, format, quality }) {
  let imgSrc = imageBuilder.image(image)

  if (!imgSrc) {
    return false
  }

  if (width) {
    imgSrc = imgSrc.width(Math.round(width))
  }

  if (height) {
    imgSrc = imgSrc.height(Math.round(height))
  }

  if (format) {
    imgSrc = imgSrc.format(format)
  }

  if (quality) {
    imgSrc = imgSrc.quality(quality)
  }

  return imgSrc.fit('max').auto('format').url()
}