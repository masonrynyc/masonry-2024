import React from 'react'

const Section = ({
	children,
	className = '',
	setTheme,
	prevTheme,
	nextTheme,
	isFirstSection,
	padded = true,
	id
}) => {
	let paddingClassTop = 'pt-half-v-space'
	let paddingClassBottom = 'pb-half-v-space'

	// Adjust padding based on section background color
	if (setTheme !== prevTheme) {
		paddingClassTop = 'pt-v-space'
	}

	if (setTheme !== nextTheme) {
		paddingClassBottom = 'pb-v-space'
	}

	if (isFirstSection) {
		// paddingClassTop = 'pt-[calc(var(--full-header-height)+var(--vertical-spacing)-30px)] -mt-full-header-height'
		paddingClassTop = 'pt-[calc(var(--vertical-spacing)+60px)] -mt-full-header-height'
	}

	let paddingClass = paddingClassTop + ' ' + paddingClassBottom
	if (!padded) {
		paddingClass = ''
	}

	return (
		<section
			className={paddingClass + ' ' + (className || '') + ' theme-' + setTheme}
			id={id}
		>
			{children}
		</section>
	)
}

export default Section
