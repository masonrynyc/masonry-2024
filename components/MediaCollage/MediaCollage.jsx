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
			setRatios({...ratios, [key]: ratio})
		}
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
				{rows?.map((row, index) => {
					return (
						<div key={row._key} className="-mx-half-gutter flex">
							{row?.item?.map((mediaItem, index) => {
								let aspect1 = row?.item[0]?.customRatio || row?.item[0]?.aspectRatio
								let aspect2 = row?.item[1]?.customRatio || row?.item[1]?.aspectRatio
								let aspect3 = row?.item[2]?.customRatio || row?.item[2]?.aspectRatio

								if (row?.item[0]?._type === 'video') {
									aspect1 = ratios[row?.item[0]._key]
								}

								if (row?.item[1]?._type === 'video') {
									aspect2 = ratios[row?.item[1]._key]
								}

								if (row?.item[2]?._type === 'video') {
									aspect3 = ratios[row?.item[2]._key]
								}

								let width1 = aspect1 / (aspect1 + aspect2)
								let width2 = aspect2 / (aspect1 + aspect2)
								let width3 = null

								if (aspect3 || row?.item[2]) {
									width1 = aspect1 / (aspect1 + aspect2 + aspect3)
									width2 = aspect2 / (aspect1 + aspect2 + aspect3)
									width3 = aspect3 / (aspect1 + aspect2 + aspect3)
								}

								if (!row?.item[1]) {
									width1 = 1
								}

								const widths = [
									width1,
									width2,
									width3
								]

								return (
									<div
										key={mediaItem._key}
										className="relative px-half-gutter min-w-12"
										style={{
											boxSizing: 'border-box',
											flex: widths[index],
											'--image-bg': mediaItem?.palette?.darkVibrant?.background || 'var(--light-grey)'
										}}
									>
										<ScrollEntrance>
											<div className='bg-[var(--image-bg)] rounded overflow-hidden'>
												<Media
													media={{
														image: mediaItem,
														video: mediaItem,
														mediaType: mediaItem._type
													}}
													className='rounded bg-light-grey w-full'
													setRatioFn={aspect => addRatio(mediaItem._key, aspect)}
													cover={false}
												/>
											</div>
										</ScrollEntrance>
									</div>
								)
							})}
						</div>
					)
				})}
			</div>
		</Section>
	)
}

export default MediaCollage
