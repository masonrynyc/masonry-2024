import React from 'react'

const Collapsable = ({
	className = '',
	open = false,
	children,
	speed,
	animateOpacity = false,
	startHeight = false,
	style
}) => {

	let wrapperClassname = `${startHeight ? 'min-h-[var(--start-height)]' : ''} grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--speed)] delay-[var(--delay-out)]`
	let innerClassname = `min-h-[var(--start-height)] ${startHeight ? 'visible' : 'invisible'} opacity-[var(--content-opacity)] transition-[visibility,opacity] duration-[var(--speed)] delay-[var(--delay-out)]`
	if (open) {
		wrapperClassname = `${startHeight ? 'min-h-[var(--start-height)]' : ''} grid grid-rows-[1fr] transition-[grid-template-rows] duration-[var(--speed)] delay-[var(--delay-in)]`
		innerClassname = 'min-h-max visible opacity-[var(--content-opacity)] transition-[visibility,opacity] duration-[var(--speed)] delay-[var(--delay-in)]'
	}

	return (
		<div
			className={'collapsable ' + wrapperClassname + ' ' + className}
			aria-hidden={open ? 'false' : 'true'}
			aria-expanded={open ? 'true' : 'false'}
			style={{
				'--start-height': startHeight || '0px',
				'--speed': speed || 'var(--md-speed)',
				'--delay-in': '0ms',
				'--delay-out': '0ms',
				'--content-opacity': animateOpacity ? (open ? 1 : 0) : 1,
				contain: startHeight ? 'unset' : 'paint',
				overflow: startHeight ? 'hidden' : 'unset',
				...style
			}}
		>
			<div className={innerClassname}>
				{children}
			</div>
		</div>
	)
}

export default Collapsable