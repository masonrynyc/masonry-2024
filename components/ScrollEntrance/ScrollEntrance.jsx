import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ScrollEntrance = ({
	className = '',
	children,
	transitionIn = true,
	delay = 0,
	transform
}) => {
	const [inView, setInView] = useState(false)
	const ref = useRef(null)
	const isInView = useInView(ref)

	useEffect(() => {
		if (isInView) {
			setInView(true)
		}
	}, [isInView])
	
	if (!children) {
		return false
	}

	const child = React.cloneElement(children, {
    className: 'transition-all opacity-0 delay-stagger-time'
  })

	return (
		<motion.div
			className={'scroll-entrance ' + className}
			ref={transitionIn ? ref : null}
			delay={delay + 5}
			data-in-view={inView}
			transform={transform}
			style={{ '--delay-value': delay + 3 }}
		>
			{children}
		</motion.div>
	)
}

export default ScrollEntrance
