import React from 'react'
import Image from '@components/Image'
import Video from '@components/Video'

const Media = ({
  className = '',
  media,
  altText,
  loading,
  ratio,
  sizes,
  debug,
  cover,
  stretch,
  setRatioFn,
  ...props
}) => {

  const image = media?.image
  const video = media?.video?.asset
  const vimeoId = media?.video?.id
  if (media?.customRatio) {
    ratio = media?.customRatio
  }

  if (!image && !video && !vimeoId) {
    return false
  }

  let videoWrapperClassname = 'relative'
  if (ratio && !stretch) {
    videoWrapperClassname = 'aspect-[var(--ratio)] relative'
  } else if (stretch) {
    videoWrapperClassname = 'aspect-[var(--ratio)] md:aspect-auto md:h-full relative'
  } else if (cover) {
    videoWrapperClassname = 'h-full relative'
  }

  if (media.mediaType === 'video' && vimeoId) {
    return (
      <div
        style={ratio ? { '--ratio': ratio || 'unset' } : {}}
        className={videoWrapperClassname}
      >
        <Video
          className={className}
          vimeoId={vimeoId}
          ratio={ratio}
          cover={ratio || cover}
          clickToPlay={media?.video?.clickToPlay}
          setRatioFn={setRatioFn}
        />
      </div>
    )
  } else if (media.mediaType === 'image') {
    return (
      <Image
        className={className}
        image={image}
        loading={loading || 'lazy'}
        alt={altText}
        sizes={sizes}
        ratio={ratio}
        cover={cover}
        format={['auto', 'avif', 'webp']}
        {...props}
      />
    )
  } else {
    return false
  }
}

export default Media
