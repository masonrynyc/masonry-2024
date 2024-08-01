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
	if (mobileHide) {
		className = 'hidden md:block'
	}
	if (mobileShow) {
		className = 'md:hidden'
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
			<ScrollEntrance className="px-margin">
				<hr className='m-0 text-current'/>
			</ScrollEntrance>
		</Section>
	)
}

export default Divider
