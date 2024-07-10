import React from 'react'
import { MdPlayArrow } from 'react-icons/md'
import Image from 'next/image'

const VideoThumbnail = ({ video, className = '', sizes = '600px', alt }) => {
	// Thumbnail render for vimeo videos
	if (!video?.id && !video) {
		return false
	}

	const imageUrl = 'https://vumbnail.com/' + (video?.id || video) + '.jpg'

	return (
		<div className={'video-thumbnail relative ' + className}>
			<Image
				src={imageUrl}
				width="640"
				height="360"
				alt={alt || video.title}
				sizes={sizes}
			/>
			<div className="absolute top-0 left-0 w-full h-full z-1 flex items-center justify-center">
				<div className="w-[50%] aspect-square max-w-[30px] rounded-full bg-[rgba(0,0,0,.6)] text-white flex items-center justify-center">
					<MdPlayArrow/>
				</div>
			</div>
		</div>
	)
}

export default VideoThumbnail
