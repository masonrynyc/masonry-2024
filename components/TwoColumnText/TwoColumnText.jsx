import React from 'react'
import Section from '@components/Section'
import RichText from '@components/RichText'

const TwoColumnText = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	leftColumn,
	rightColumn,
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
					<div className="grid gap-x-gutter gap-y-v-space-sm md:grid-cols-2">
						<div><RichText text={leftColumn}/></div>
						<div><RichText text={rightColumn}/></div>
					</div>
				</div>
			</div>
		</Section>
	)
}

export default TwoColumnText
