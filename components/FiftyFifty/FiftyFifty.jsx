import React from 'react'
import Section from '@components/Section'
import Media from '@components/Media'
import TextLockup from '@components/TextLockup'
import ScrollEntrance from '@components/ScrollEntrance'

const vAlignClasses = {
	'top': 'items-start',
	'center': 'items-center',
	'bottom': 'items-end',
	'sticky': 'items-start',
	'stretch': 'stretch'
}

const hAlignClasses = {
	'left': 'reverse',
	'right': ''
}

const gridSetup = {
	medium: {
		media: 'lg:col-span-6',
		text: 'lg:col-span-6',
		sizes: '(max-width: 768px) 50vw, 100vw'
	},
	large: {
		media: 'lg:col-span-7',
		text: 'lg:col-span-5',
		sizes: '(max-width: 768px) 58vw, 100vw'
	}
}

const FiftyFifty = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	media,
	text,
	alignment,
	textPosition = 'right',
	vAlignment = 'top',
	mediaSize = 'medium',
	id
}) => {
	let colClass = ''

	// Adjust grid for media size options
	let mediaColSpan = gridSetup[mediaSize]?.media || 'lg:col-span-6'
	let textColSpan = gridSetup[mediaSize]?.text || 'lg:col-span-6'

	if (vAlignment === 'sticky') {
		colClass = colClass + ' lg:sticky lg:top-sticky-top transition-top'
	}

	if (alignment === 'center') {
		colClass = colClass + ' flex justify-center'
	}

	if (media?.video?.asset) {
		media.video.clickToPlay = media.video.videoPlaySetting === 'clickToPlay'
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
			<div className="mx-margin">
				<div className="max-w-site-max-w mx-auto">
					<div className={'grid grid-cols-1 lg:grid-cols-12 gap-x-gutter gap-y-margin ' + vAlignClasses[vAlignment] + ' ' + hAlignClasses[textPosition]}>
						<div className={mediaColSpan + ' ' + colClass}>
							<ScrollEntrance className={vAlignment === 'stretch' ? 'h-full relative' : 'relative'}>
								<Media
									media={media}
									className={'aspect-[var(--ratio)]'}
									cover={vAlignment === 'stretch' ? true : false}
									stretch={vAlignment === 'stretch'}
									sizes={gridSetup[mediaSize]?.sizes || '100vw'}
								/>
							</ScrollEntrance>
						</div>
						<div className={textColSpan + ' ' + colClass}>
							<TextLockup lockup={text} alignment={alignment} />
						</div>
					</div>
				</div>
			</div>
		</Section>
	)
}

export default FiftyFifty
