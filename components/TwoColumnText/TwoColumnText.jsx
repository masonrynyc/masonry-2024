import React from 'react'
import Section from '@components/Section'
import RichText from '@components/RichText'
import ScrollEntrance from '@components/ScrollEntrance'

const TwoColumnText = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	leftColumn,
	leftColumnString,
	rightColumn,
	border = true,
	id
}) => {
	return (
		<Section
			className={className}
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			id={id}
		>
			<div className="px-margin">
				<div className="mx-auto max-w-site-max-w">
					<ScrollEntrance className="grid gap-x-gutter gap-y-v-space-sm md:gap-y-4 md:grid-cols-3 lg:grid-cols-12 items-baseline">
						{border && (<div className="col-span-full border-t"/>)}
						<div className='lg:col-span-5'>{leftColumnString ? <h3 className='h5'>{leftColumnString}</h3> : <RichText text={leftColumn}/>}</div>
						<div className='md:col-span-2 lg:col-span-7'><RichText text={rightColumn}/></div>
					</ScrollEntrance>
				</div>
			</div>
		</Section>
	)
}

export default TwoColumnText
