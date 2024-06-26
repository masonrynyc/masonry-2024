import React, { useEffect, useState } from 'react'
import Section from '@components/Section'
import PostCard from '@components/PostCard'
import ScrollEntrance from '@components/ScrollEntrance'
import TextLockup from '@components/TextLockup'
import { client } from '@lib/sanity'
import { allCategories } from '@queries/category'
import CategorySwitcher from '@components/CategorySwitcher'

const BlogPostGrid = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	posts,
	title,
	text,
	id
}) => {
	const [categories, setCategories] = useState([])

	useEffect(() => {
		let query = allCategories
		client.fetch(query).then((res) => {
			setCategories(res)
		})
	}, [])

	if (!posts || posts?.length < 1) {
		return false
	}

	return (
		<Section
			className={className}
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			id={id}
		>
			<div className="mx-margin">
				<div className="max-w-site-max-w mx-auto">
					<div className="mb-v-space">
						<TextLockup
							headline={title || 'All Posts'}
							headlineSize='h1'
							headlineEl='h1'
							text={text}
							bodySize='body-large'
						/>
						<CategorySwitcher/>
						
					</div>
					<ScrollEntrance delay={2}>
						<div className='flex flex-wrap md:-mx-half-gutter gap-y-v-space-sm'>
							{posts.map((post, index) => {
								let columnClass = `md:px-half-gutter grow w-full md:w-1/2 md:max-w-[50%] lg:w-1/3 lg:max-w-[66.666%] xl:w-1/4 xl:max-w-1/2`
								if (post.featured) {
									columnClass = `md:px-half-gutter grow w-full md:w-1/2 md:max-w-full md:mx-0 lg:w-[66.666%] md:max-w-[66.666%] xl:w-1/2 xl:max-w-1/2`
								}

								return (
									<div className={columnClass} key={post._id}>
										<PostCard post={post} key={post._id} />
									</div>
								)
							})}
						</div>
					</ScrollEntrance>
				</div>
			</div>
		</Section>
	)
}

export default BlogPostGrid
