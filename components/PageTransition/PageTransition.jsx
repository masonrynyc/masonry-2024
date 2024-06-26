import React, { useEffect, useState }  from 'react'
import { useRouter } from 'next/router'
import { TransitionGroup, Transition } from 'react-transition-group'

const timeout = 500
const hang = 0

const PageTransition = ({ className = '', children, location }) => {
	const router = useRouter()
	const [overlay, setOverlay] = useState(false)
	const [path, setPath] = useState(location)

	// Built in effect types: fade, wipeUp, wipeDown, wipeRight, wipeLeft
	const effect = 'fade'
	
	const handleEntered = (node, isAppearing) => {
		let scrollTo = 0
		if (path.includes('#')) {
			const sectionId = path.split('#')[1]
			const sectionItem = document.querySelector('#' + sectionId)
			scrollTo = sectionItem.offsetTop - 60
		}
		
    setTimeout(() => {
      setOverlay(false)
			window.scrollTo(0, scrollTo, 'instant')
    }, hang + timeout)
  }

	useEffect(() => {
		if (path !== location) {
			setOverlay(true)
			setPath(location)
		}
	}, [location, path])

	return (
		<>
			<TransitionGroup style={{ position: "relative" }}>
				<Transition
					key={location}
					unmountOnExit={true}
					appear={false}
					timeout={{
						enter: timeout,
						exit: timeout,
					}}
				>
					{status => (
						<>
						{/* <h1>status: {status}</h1> */}
						<div className='page-transition-content' data-transition-status={status}>
							{children}
						</div>
						</>
					)}
				</Transition>
			</TransitionGroup>

			<Transition
				in={overlay}
				appear={false} // true If you want to transition on page load
				unmountOnExit={true}
				timeout={{
					enter: 0,
					exit: timeout,
					appear: timeout * 2
				}}
				onEntered={handleEntered}
			>
				{status => (
					<div
						className={'page-transition-overlay ' + effect}
						style={{ '--speed': timeout + 'ms' }}
						// effect={transitionEffect}
						overlay={overlay}
						data-transition-status={status}
						// bgColor={overlayColor}
					/>
				)}
			</Transition>
		</>
	)
}

export default PageTransition
