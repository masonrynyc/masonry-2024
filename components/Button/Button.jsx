import React from 'react'
import Link from '@components/Link'

const Button = ({
	className = '',
	children,
	to,
	onClick,
	icon,
	iconPosition = 'left',
	label,
	style = {},
	size = false,
	shape = false,
	disabled = false,
	name,
	type,
	title,
	as = Link,
	...props
}) => {
	let As = as
	let buttonClassname = 'button'
	
	const hideLabel = shape === 'square' || shape === 'circle'

	if (shape === 'square') {
		buttonClassname = buttonClassname + ' square'
	}
	if (shape === 'circle') {
		buttonClassname = buttonClassname + ' circle'
	}
	if (size) {
		buttonClassname = buttonClassname + ' ' + size
	}

	if (onClick || type === 'submit') {
		As = 'button'
	}

	return (
		<As
			className={className ? buttonClassname + ' ' + className : buttonClassname}
			to={to}
			onClick={onClick}
			disabled={disabled}
			style={style}
			// title={title || name}
			name={name || title}
			aria-label={name || title}
		>
			<div className="button-content flex gap-x-[.75em] items-center justify-between">
				{icon && iconPosition !== 'right' && <div className='icon-wrapper'>{icon}</div>}
				{(children || label) && !hideLabel && (
					<div className="button-label">
						{children || label}
					</div>
				)}
				{icon && iconPosition === 'right' && <div className='icon-wrapper'>{icon}</div>}
			</div>
		</As>
	)
}

export default Button
