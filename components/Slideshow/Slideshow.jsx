import React, { Children, useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import ThumbnailSlider from './ThumbnailSlider'
import Button from '@components/Button'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'

const arrowPositions = {
	center: {
		wrapper: 'justify-between items-center',
		prev: '',
		next: ''
	},
	bottom: {
		wrapper: 'justify-between items-end',
		prev: '',
		next: ''
	},
	'bottom-right': {
		wrapper: 'justify-end items-end',
		prev: '',
		next: ''
	}
}

const Slideshow = ({
	className = '',
	thumbnails = false,
	loop = false,
	autoplay = false,
	slideGap,
	children = [],
	pager = true,
	slideClassname = '',
	// pager options
	pagerPosition = 'bottom',
	pagerStretch = false,
	pagerClassname = '',
	// arrow options
	arrows = true,
	arrowsPosition = 'center',
	arrowsClassname = '',
	autoplaySpeed = 4000,
	slidesAutoWidth = false,
	slidesToScroll = 1,
	slidesXs = 1,
	slidesSm = 1,
	slidesMd = 1,
	slidesLg = 1,
	getSlideshow = () => {},
	getCurrentSlide = () => {},
	style
}) => {
	const slides = Children.toArray(children)

	const [currentSlide, setCurrentSlide] = useState(0)
	const [canScrollNext, setCanScrollNext] = useState(true)
	const [canScrollPrev, setCanScrollPrev] = useState(false)

	const autoplayOptions = {
		stopOnInteraction: false,
		delay: autoplaySpeed
	}

	let plugins = [ClassNames()]
	if (autoplay) {
		plugins = [Autoplay(autoplayOptions), ClassNames()]
	}

	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		containScroll: 'trimSnaps',
		loop: loop,
		slidesToScroll: slidesToScroll || 1
	}, [...plugins])

	const updateCurrentSlide = useCallback((emblaApi, eventName) => {
		setCanScrollNext(emblaApi.canScrollNext())
		setCanScrollPrev(emblaApi.canScrollPrev())
		const newSlideIndex = emblaApi.slideNodes().findIndex(node => node?.classList.value?.includes('is-snapped'))
		setCurrentSlide(newSlideIndex)
		getCurrentSlide(newSlideIndex)
  }, [setCurrentSlide, getCurrentSlide])
	
	useEffect(() => {
    if (emblaApi) emblaApi.on('select', updateCurrentSlide)
  }, [emblaApi, updateCurrentSlide])

	const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

	useEffect(() => {
		getSlideshow(emblaApi)
	}, [emblaApi, getSlideshow])

	if (slides.length < 1) {
		return false
	}

	if (slides.length < 2) {
		return <div className={className}>{children}</div>
	}

	return (
		<div
			className={loop ? (className + " slider relative loop") : (className + " slider relative")}
			ref={emblaRef}
			style={{
				...style,
				'--progress': currentSlide,
				'--slide-count': slides.length,
				'--slide-gap': slideGap || 'var(--site-gutters)',
				'--slides-xs': slidesXs || 1,
				'--slides-sm': slidesSm || 1,
				'--slides-md': slidesMd || 1,
				'--slides-lg': slidesLg || 1
			}}
		>
			<div className="slider-container">
				{slides.map((slide, index) => {
					return (
						<div className={`slider-slide overflow-hidden ${slidesAutoWidth ? 'auto-width' : ''} ${slideClassname}`} key={'slide-' + index}>
							{slide}
						</div>
					)
				})}
			</div>

			{arrows && (
				<div className={`z-6 slide-navigation absolute top-0 left-0 w-full h-full pointer-events-none flex gap-3 ${arrowsClassname} ${arrowPositions[arrowsPosition].wrapper} p-gutter`}>
					<div className={`pointer-events-auto ${arrowPositions[arrowsPosition].prev}`}>
						<Button
							as='button'
							icon={<MdArrowBack size={24} />}
							shape='circle'
							onClick={scrollPrev}
							className={canScrollPrev ? 'light' : 'light !opacity-0'}
							disabled={!canScrollPrev}
							title="Previous"
						/>
					</div>
					<div className={`pointer-events-auto ${arrowPositions[arrowsPosition].next}`}>
						<Button
							as='button'
							icon={<MdArrowForward size={24} />}
							shape='circle'
							onClick={scrollNext}
							className={canScrollNext ? 'light' : 'light !opacity-0'}
							disabled={!canScrollNext}
							title="Next"
						/>
					</div>
				</div>
			)}

			{pager && (
				<div className={`pager lg:absolute ${pagerPosition || 'lg:bottom'}-0 lg:left-0 lg:right-0 z-3 ${thumbnails ? 'lg:p-gutter' : ''} ${pagerClassname || ''}`}>
					<div className={`flex gap-x-[10px] items-center justify-center ${thumbnails ? 'lg:px-gutter' : 'px-gutter'}`}>
						{!thumbnails ? slides.map((slide, index) => {
							return (
								<div className={`${!pagerStretch && 'max-w-[84px]'} grow`} key={'slide-timer-' + index}>
									<div className="h-[4px] bg-[rgba(255,255,255,.3)] rounded">
										{autoplay ? (
											<div className={`${'slide-progress h-full rounded bg-white ' + (currentSlide === index ? 'animating' : 'ended')}`}/>
										) : (
											<div className={`${'h-full rounded bg-white transition-opacity ' + (currentSlide === index ? '' : 'opacity-0')}`}></div>
										)}
										{/* <div className="slide-progress h-full bg-white ended rounded"></div> */}
									</div>
								</div>
							)
						}) : (
							<div className="w-full lg:max-w-[900px] flex items-center justify-center lg:p-gutter">
								<ThumbnailSlider
									loop={loop}
									autoplay={autoplay}
									autoplaySpeed={autoplaySpeed}
									slides={slides}
									goToSlide={index => {
										emblaApi?.scrollTo(index)
										setCurrentSlide(index)
									}}
									currentSlide={currentSlide}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Slideshow
