import React from 'react'
import { getClient } from '@lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

const MediaStackIcon = ({ items, debug }) => {
	if (items?.length < 1) {
		theme = 'default'
	}

	const client = getClient()
	const builder = imageUrlBuilder(client)
	const urlFor = source => {
		return builder.image(source)
	}

	const mediaArray = []

	items?.forEach(item => {
		if ((item?.mediaType === 'video' || item?._type === 'video') && (item?.video?.id || item?.id)) {
			const itemUrl = 'https://vumbnail.com/' + (item?.video?.id || item?.id )+ '.jpg'
			mediaArray.push(itemUrl)
		}

		if (item.image) {
			item = item.image
		}

		if (item?.asset?._ref) {
			const itemUrl = urlFor(item)?.width(60)?.height(60)?.url()
			if (itemUrl) {
				mediaArray.push(itemUrl)
			}
		}
	})

	return (
		<div
			className='media-stack-icon'
			style={{ 
				position: 'relative',
				width: '34px',
				height: '100%',
			}}
		>
			{mediaArray.length > 1 ? (
				mediaArray.map((item, index) => {
					if (index < 3) {
						return (
							<div className="image-item">
								<img
									src={item}
									width='30'
									height='30'
								/>
								<div className="overlay"/>
							</div>
						)
					}
				})
			) : (
				<div className="image-item-full">
					<img
						src={mediaArray[0]}
						width='30'
						height='30'
					/>
				</div>
			)}
		</div>)
}

export default MediaStackIcon;
