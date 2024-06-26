import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import VideoThumbnail from '@components/VideoThumbnail'

const Slideshow = ({
	className = '',
	autoplay = false,
	slideGap,
  currentSlide,
  goToSlide,
  loop = false,
	autoplaySpeed = 4000,
	slides = []
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
    loop: loop,
		containScroll: 'trimSnaps'
	}, [ClassNames()])

  useEffect(() => {
    emblaApi?.scrollTo(currentSlide)
  }, [currentSlide, emblaApi])

	if (slides.length < 1) {
		return false
	}

	if (slides.length < 2) {
		return children
	}

	return (
		<div
			ref={emblaRef}
			style={{
				'--progress': currentSlide,
				'--slide-count': slides.length,
				'--slide-gap': slideGap || '8px',
				'--slides-xs': slides.length > 3 ? 3.5 : slides.length,
				'--slides-sm': slides.length > 4 ? 4.5 : slides.length,
				'--slides-md': slides.length > 6 ? 6.5 : slides.length,
				'--slides-lg': slides.length > 8 ? 8.5 : slides.length,
        // '--slides-lg': 2
        // width: `calc(${slides.length} * 95px + var(--slide-gap) * 2)`
			}}
			className={`slider lg:max-w-[calc(var(--slides-lg)*95px)] relative lg:rounded lg:bg-[rgba(0,0,0,.5)] -mx-margin lg:mx-0 pl-margin lg:pl-[var(--slide-gap)] ${loop ? 'loop' : ''}`}
		>
			<div className="slider-container">
				{slides.map((slide, index) => {
					const slideObject = slide?.props?.children?.props
					const slideContent = slideObject?.children?.props
					if (slideObject?.className?.includes('media-video')) {
						slide = <VideoThumbnail video={slideContent?.media?.video} />
					}
					return (
						<div
              onClick={(event) => {
								goToSlide(index)
							}}
							data-index={index}
              className="group slider-slide pt-margin lg:py-[var(--slide-gap)] relative overflow-hidden rounded cursor-pointer" key={'slide-' + index}
            >
							<div className="relative aspect-video z-1 pointer-events-none rounded overflow-hidden">
								{slide}
                {currentSlide !== index && (
                  <div className="group-hover:opacity-100 transition-opacity border opacity-0 rounded absolute top-0 left-0 w-full h-full border-[rgba(255,255,255,.5)]"></div>
                )}
              </div>
              <div className={`${'z-2 pointer-events-none absolute bottom-[4px] lg:bottom-[calc(var(--slide-gap)+4px)] right-[calc(4px+var(--slide-gap))] left-[4px] h-[2px] bg-[rgba(255,255,255,.3)] rounded transition-opacity ' + (currentSlide === index ? '' : 'opacity-0')}`}>
                {autoplay ? (
                  <div
										style={{ '--speed': autoplaySpeed + 'ms' }}
										className={`${'slide-progress h-full rounded bg-white ' + (currentSlide === index ? 'animating' : 'ended')}`}
									/>
                ) : (
                  <div className={`${'h-full rounded bg-white transition-opacity ' + (currentSlide === index ? '' : 'opacity-0')}`}></div>
                )}
                {/* <div className="slide-progress h-full bg-white ended rounded"></div> */}
              </div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Slideshow
