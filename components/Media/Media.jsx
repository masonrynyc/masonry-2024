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
  const video = media?.video?.videoFile
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

  console.log(media?.video?.preloadImage)

  if (media.mediaType === 'video' && (vimeoId || video?.url)) {
    return (
      <div
        style={ratio ? { '--ratio': ratio || 'unset' } : {}}
        className={videoWrapperClassname}
      >
        <Video
          className={className}
          vimeoId={vimeoId}
          videoFile={video}
          ratio={ratio}
          cover={ratio || cover}
          clickToPlay={media?.video?.videoPlaySetting === 'clickToPlay'}
          setRatioFn={setRatioFn}
          preloadImage={media?.video?.preloadImage}
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
