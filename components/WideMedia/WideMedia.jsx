import React from 'react'
import Section from '@components/Section'
import Media from '@components/Media'
import TextLockup from '@components/TextLockup'
import ScrollEntrance from '@components/ScrollEntrance'

const hPlacementClass = {
	left: 'lg:col-span-6',
	right: 'lg:col-span-6 lg:col-start-7',
	center: 'lg:col-span-8 lg:col-start-3'
}

const vPlacementClass = {
	top: 'items-start',
	bottom: 'items-end',
	middle: 'items-center'
}

const hClass = {
	auto: 'h-auto',
	autoVideo: 'h-[56.25vw]',
	fullHeight: 'h-screen-height',
	mediumHeight: 'h-[75vh]',
	shortHeight: 'h-[60vh]'
}

const WideMedia = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	media,
	placement = 'center-middle',
	alignment,
	height,
	text,
	width,
	hasOverlayText = false,
	overlayOpacity = 0,
	textColor = 'light',
	paddingBottom,
	paddingTop,
	id
}) => {
	const fullWidth = width === 'fullWidth'
	const placementValues = placement?.split('-')
	if (isFirstSection) {
		className = className + ' -mt-full-header-height'
	}

	let hasText = hasOverlayText

	if (height === 'auto' && media.mediaType === 'video' && media?.video?.id) {
		height = 'autoVideo'
	}

	let WrapperComponent = 'div'
	if (!fullWidth) {
		WrapperComponent = ScrollEntrance
	}

	return (
		<Section
			className={className}
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			padded={!fullWidth}
			paddingBottom={paddingBottom}
			paddingTop={paddingTop}
			id={id}
		>
			<WrapperComponent>
				<div className={fullWidth ? "relative" : "mx-margin relative bg-true-black"}>
					<div>
						<div className={'relative z-1 overflow-hidden ' + (hClass[height] || 'h-screen-height')}>
							{hasText && (
								<div style={{ opacity: overlayOpacity / 100 }} className="absolute top-0 left-0 w-full h-full bg-true-black z-2"/>
							)}
							<Media media={media} cover={height !== 'auto'} className='w-full rounded' />
						</div>
						{hasText && (
							<div className={`flex absolute z-2 top-0 left-0 w-full h-full p-margin ${vPlacementClass[placementValues[1]]} ${textColor === 'dark' ? 'text-true-black' : '-text-white'}`}>
								<div className={fullWidth ? "pt-header-height w-full" : "w-full"}>
									<div className="grid lg:grid-cols-12 gap-x-gutter">
										<div className={hPlacementClass[placementValues[0]]}>
											<TextLockup
												lockup={text}
												alignment={alignment}
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</WrapperComponent>
		</Section>
	)
}

export default WideMedia
