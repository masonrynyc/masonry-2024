import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'
import Autoplay from 'embla-carousel-autoplay'

const RotatingText = ({ className = '', items }) => {
	const [slideshowWidth, setSlideshowWidth] = useState(null)
	const [currentSlide, setCurrentSlide] = useState(0)
	
	const autoplayOptions = {
		stopOnInteraction: false,
		delay: 2000
	}

	let emblaPlugins = [ClassNames(), Autoplay(autoplayOptions)]
	const [emblaRef, emblaApi] = useEmblaCarousel({
		// align: 'start',
		// containScroll: 'trimSnaps',
		loop: true,
		axis: 'y',
		duration: 30,
		watchDrag: false,
	}, [...emblaPlugins])

	const updateCurrentSlide = useCallback((emblaApi, eventName) => {
		const newSlideIndex = emblaApi.slideNodes().findIndex(node => node?.classList.value?.includes('is-snapped', 'is-in-view'))
		const newSlide = emblaApi.slideNodes().find(node => node?.classList.value?.includes('is-snapped', 'is-in-view'))
		setSlideshowWidth(newSlide.getBoundingClientRect().width)
		setCurrentSlide(newSlideIndex)
  }, [])

	useEffect(() => {
    if (emblaApi) emblaApi.on('init', updateCurrentSlide)
		if (emblaApi) emblaApi.on('scroll', updateCurrentSlide)
		if (emblaApi) emblaApi.on('resize', updateCurrentSlide)
  }, [emblaApi])

	return (
		<div
			className={'inline-flex align-baseline overflow-hidden ' + className}
			style={{ '--slideshow-width': slideshowWidth + 'px' }}
		>
			<div
				className="slider vertical duration-slow transition-[width] w-[var(--slideshow-width)] pb-[.1em]"
				style={{
					'--slide-gap': '0px',
					'--slides-xs': 1,
					'--slides-sm': 1,
					'--slides-md': 1,
					'--slides-lg': 1
				}}
				ref={emblaRef}
			>
				<div className="slider-container -mt-[.1em]">
					{items.map((item, index) => {
						return (
							<div
								className="slider-slide auto-width"
								key={'rotating-item-' + index}
							><span>{item}</span></div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default RotatingText
