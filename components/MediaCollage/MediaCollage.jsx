import React, { useEffect, useState } from 'react'
import Section from '@components/Section'
import Media from '@components/Media'
import ScrollEntrance from '@components/ScrollEntrance'

const MediaCollage = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	rows,
	id
}) => {
	const [ratios, setRatios] = useState({})

	const addRatio = (key, ratio) => {
		if (typeof ratio === 'number') {
			setRatios(prev => ({...prev, [key]: ratio}))
		}
	}

	const getAspect = (item) => {
		if (!item) return 1
		if (item._type === 'video') {
			return ratios[item._key] || 1
		}
		return item.customRatio || item.aspectRatio || 1
	}

	return (
		<Section
			className={className}
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			id={id}
		>
			<div className="flex px-margin flex-col gap-gutter">
				{rows?.map((row) => {
					const items = row?.item || []
					const multipleItems = items.length > 1

					const aspects = items.map(getAspect)
					const totalAspect = aspects.reduce((sum, a) => sum + a, 0)
					const widths = aspects.map(a => a / totalAspect)

					return (
						<div key={row._key} className="-mx-half-gutter grid gap-y-gutter md:flex">
							{items.map((mediaItem, index) => (
								<div
									key={mediaItem._key}
									className="relative px-half-gutter min-w-12"
									style={{
										boxSizing: 'border-box',
										flex: multipleItems ? widths[index] : '1',
										'--image-bg': mediaItem?.palette?.darkVibrant?.background || '#000'
									}}
								>
									<ScrollEntrance>
										<div className='bg-[var(--image-bg)] rounded overflow-hidden relative'>
											<Media
												media={{
													image: mediaItem,
													video: mediaItem,
													mediaType: mediaItem._type
												}}
												className='rounded bg-light-grey w-full'
												setRatioFn={aspect => {
													if (multipleItems) {
														addRatio(mediaItem._key, aspect)
													}
												}}
												cover={false}
											/>
										</div>
									</ScrollEntrance>
								</div>
							))}
						</div>
					)
				})}
			</div>
		</Section>
	)
}

export default MediaCollage
