import React from 'react'
import Section from '@components/Section'
import TextLockup from '@components/TextLockup'

const TextSection = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	text,
	alignment = 'center',
	extraSpacing,
	id
}) => {
	const alignmentClassnames = {
		'center': 'md:col-span-8 md:col-start-3',
		'left': 'md:col-span-8',
		'right': 'md:col-span-8'
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
			<div className="px-margin">
				<div className={`w-full max-w-site-max-w mx-auto ${extraSpacing ? 'py-v-space lg:py-v-space-md' : 'py-v-space-sm md:py-0'}`}>
					<div className="grid md:grid-cols-12 gap-x-gutter">
						<div className={alignmentClassnames[alignment]}>
							<TextLockup lockup={text} alignment={alignment} className='max-w-[750px]'/>
						</div>
					</div>
				</div>
			</div>
		</Section>
	)
}

export default TextSection
