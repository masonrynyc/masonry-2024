import React from 'react'
import { MdPlayArrow, MdImage } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'

export const MediaThumbnail = ({
	media,
	hidden,
	className,
	alt,
	sizes = '100px'
}) => {
	if (media?.mediaType === 'video') {
		const video = media?.video
		if (video?.id) {
			const imageUrl = 'https://vumbnail.com/' + media.video.id + '.jpg'
			return (
				<div className={'sanity-video-thumbnail relative w-full h-full ' + className}>
					<img
						src={imageUrl}
						alt={alt || video?.title}
						sizes={sizes}
						className='aspect-square absolute top-0 left-0 w-full h-full'
						style={{ objectFit: 'cover' }}
					/>
					<div className="absolute top-0 left-0 w-full h-full z-1 flex items-center justify-center">
						<div
							style={{
								'--icon-bg': video?.id ? 'rgba(0, 0, 0, .2)' : 'var(--card-muted-fg-color)',
								width: '60%',
								background: 'var(--icon-bg)',
								color: '#fff',
							}}
							className="aspect-square max-w-[30px] rounded-full flex items-center justify-center"
						>
							<MdPlayArrow color='currentcolor'/>
						</div>
					</div>
				</div>
			)
		} else {
			return <SectionIcon hidden={hidden}><MdPlayArrow size='24px'/></SectionIcon>
		}
	} else {
		if (media?.photo?.asset?._ref) {
			return media?.photo
		} else {
			return <SectionIcon hidden={hidden}><MdImage size='24px'/></SectionIcon>
		}
	}
}

export default MediaThumbnail
