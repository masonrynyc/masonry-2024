import React, { useEffect, useState, useCallback } from 'react'
import Section from '@components/Section'
import { allPosts, postsByCategory } from '@queries/post'
import { getClient } from '@lib/sanity'
import PostCard from '@components/PostCard'
import Button from '@components/Button'
import Link from '@components/Link'
import { MdArrowForward, MdArrowBack } from 'react-icons/md'
import { getRoute } from '@utils/helpers'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'
import Autoplay from 'embla-carousel-autoplay'

const BlogPosts = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	category,
	headline,
	listingType,
	viewMoreLink,
	posts,
	id
}) => {
	let emblaPlugins = [ClassNames()]
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		containScroll: 'trimSnaps',
		loop: false
	}, [...emblaPlugins])

	const [postList, setPostList] = useState(posts)
	const [currentSlide, setCurrentSlide] = useState(0)
	const [canScrollNext, setCanScrollNext] = useState(true)
	const [canScrollPrev, setCanScrollPrev] = useState(false)

	let queryParams = {}

	if (listingType === 'by-cat' && category?.slug) {
		queryParams = { slug: category.slug }
	}

	useEffect(() => {
		let query = allPosts

		if (listingType === 'by-cat') {
			query = postsByCategory
		}

		if (listingType !== 'currated') {
			getClient().fetch(query, queryParams).then((res) => { setPostList(res) })
		}
	})

	const sliderLabel = {
		'currated': 'Currated selection of blog posts',
		'by-cat': category?.title ? 'Blog posts in the "' + category.title + '" category' : 'Posts by category',
		'most-recent': 'Most recent blog posts'
	}
	
	const morePostsLink = {
		'currated': '/' + getRoute.post,
		'by-cat': '/' + getRoute.post + '/category/' + category?.slug,
		'most-recent': '/' + getRoute.post
	}

	const updateCurrentSlide = useCallback((emblaApi, eventName) => {
		setCanScrollNext(emblaApi.canScrollNext())
		setCanScrollPrev(emblaApi.canScrollPrev())
		const newSlideIndex = emblaApi.slideNodes().findIndex(node => node?.classList.value?.includes('is-snapped'))
		setCurrentSlide(newSlideIndex)
  }, [])

	useEffect(() => {
    if (emblaApi) emblaApi.on('select', updateCurrentSlide)
  }, [emblaApi, updateCurrentSlide])

	const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

	return (
		<Section
			className={className ? className + ' overflow-hidden' : 'overflow-hidden'}
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			id={id}
		>
			<div className="px-margin">
				<div className="mx-auto max-w-site-max-w">
					{headline && (
						<div className="mb-v-space-sm flex justify-between">
							<h3 className='m-0'>{headline}</h3>
							<div className="flex gap-x-gutter">
								<Button
									as='button'
									icon={<MdArrowBack />}
									shape='circle'
									onClick={scrollPrev}
									className=''
									style={{ '--button-height': '32px' }}
									disabled={!canScrollPrev}
									title="Previous"
								/>
								<Button
									as='button'
									icon={<MdArrowForward />}
									shape='circle'
									onClick={scrollNext}
									className=''
									style={{ '--button-height': '32px' }}
									disabled={!canScrollNext}
									title="Next"
								/>
							</div>
						</div>
					)}

					<div
						className="slider !overflow-visible"
						ref={emblaRef}
						style={{
							'--progress': 0,
							'--slide-count': postList.length,
							'--slides-xs': 1.1,
							'--slides-sm': 1.2,
							'--slides-md': 1.5,
							'--slides-lg': 2.5
						}}
					>
						<div className="slider-container">
							{postList.map((post, index) => {
								return (
									<div className="slider-slide" key={post._id + '-card'}>
										<PostCard post={post} key={post._id} />
									</div>
								)
							})}
							{viewMoreLink && (
								<div>
									<Link
										className='w-full h-full flex h4 theme-dark items-center justify-center hover:bg-main transition-colors'
										to={morePostsLink[listingType]}
										title='View More Articles'
									>More Articles</Link>
								</div>
							)}
						</div>

					</div>
				</div>
			</div>
		</Section>
	)
}

export default BlogPosts
