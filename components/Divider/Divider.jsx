import React from 'react'
import Section from '@components/Section'
import ScrollEntrance from '@components/ScrollEntrance'

const Divider = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	mobileHide,
	mobileShow,
	id
}) => {
	let visibleClassName = ''

	if (mobileHide) {
		visibleClassName = 'hidden md:block'
	}

	if (mobileShow) {
		visibleClassName = 'md:hidden'
	}

	return (
		<Section
			className={className + ' ' + visibleClassName}
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			id={id}
		>
			<ScrollEntrance className="px-margin">
				<hr className='m-0 text-current'/>
			</ScrollEntrance>
		</Section>
	)
}

export default Divider
