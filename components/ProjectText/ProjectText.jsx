import React from 'react'
import Section from '@components/Section'
import RichText from '@components/RichText'
import ScrollEntrance from '@components/ScrollEntrance'

const ProjectText = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	text,
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
			<div className="px-margin py-6 md:py-3">
				<div className="mx-auto max-w-site-max-w">
					<ScrollEntrance className="grid gap-x-gutter gap-y-4 md:grid-cols-3 lg:grid-cols-12 items-top">
						<div className='md:col-span-2 lg:col-span-7 md:col-start-2 lg:col-start-6'><RichText className="md:-mt-1" text={text}/></div>
					</ScrollEntrance>
				</div>
			</div>
		</Section>
	)
}

export default ProjectText
