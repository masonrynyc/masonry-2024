import { useState } from 'react'
import { default as NextImage } from 'next/image'
import { buildSrc } from '@lib/imageHelpers'

const Image = ({
  className = '',
  alt = '',
  src,
  image,
  width,
  height,
  ratio,
  layout = 'responsive',
  lazyBoundary = '0px',
  quality = 90,
  transitionIn = true,
  cover,
  sizes,
  ...props
}) => {
  // state of our image load (used for animation purposes)
  const [isLoaded, setIsLoaded] = useState(!transitionIn)

  if ((!src && !image) || !image.asset) return null

  const hotspotX = image?.hotspot?.x
  const hotspotY = image?.hotspot?.y

  if (image && !src) {
    src = image
    if (ratio) {
      src.customRatio = ratio
    }
  }

  const isStatic = typeof src === 'string' ? true : false

  // calculate our image aspect ratio
  const imgAspectRatio =
    typeof width === 'number' && typeof height === 'number'
      ? (height / width) * 100
      : !isStatic
      ? 100 / (src?.customRatio || src?.aspectRatio)
      : null

  // calculate our image dimensions (if not "fill" layout)
  let imgWidth = layout !== 'fill' ? width ?? 2000 : null
  let imgHeight =
    layout !== 'fill'
      ? height ?? imgAspectRatio
        ? Math.round(imgWidth * imgAspectRatio) / 100
        : null
      : null

  if (image.crop) {
    imgWidth *= 1 - (image.crop.left + image.crop.right)
    imgHeight *= 1 - (image.crop.top + image.crop.bottom)
  }

  // build our image URL
  const imgUrl = isStatic
    ? src
    : buildSrc(src, { width: imgWidth, height: imgHeight, quality })

  // calculate our image alt text
  const imgAlt = alt || src?.alt || image?.alt
  if (!imgAlt) {
    // warn if there's no alt text provided
    console.warn('Image missing alt text: ', src)
  }

  return (
		<NextImage
			alt={imgAlt}
			src={imgUrl}
			width={imgWidth}
			height={imgHeight}
			sizes={sizes}
      style={{
        '--hotspot-x': hotspotX ? hotspotX * 100 + '%' : '50%',
        '--hotspot-y': hotspotY ? hotspotY * 100 + '%' : '50%'
      }}
      className={`${className} ${cover ? 'object-cover absolute top-0 left-0 w-full h-full' : ''} transition-all ${!isLoaded ? 'opacity-0' : ''} object-[var(--hotspot-x)_var(--hotspot-y)]`}
			onLoad={() => setIsLoaded(true)}
			{...props}
		/>
  )
}

export default Image
