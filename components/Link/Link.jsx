import React from 'react'
import NextLink from 'next/link'

const Link = ({
	to,
	href,
	external,
	target,
	children,
	label,
	className = '',
	name,
	title,
	setTheme,
	onClick,
	pageTransition = 'fade',
	as,
	...props
}) => {
	let ariaLabel = name || title
	if (target === '_blank') {
		ariaLabel = (name || title) + ' - Open in new tab'
	}

	return (
		<NextLink
			href={href || to || ''}
			className={className + ' cursor-pointer'}
			// title={title || name}
			// name={name || title}
			aria-label={ariaLabel}
			// onClick={() => onClick || setPageTransition(pageTransition)} // TODO: Set page transition from link
			as={as}
			scroll={false}
			target={target}
			{...props}
		>
			{children || label}
		</NextLink>
	)
}

export default Link
