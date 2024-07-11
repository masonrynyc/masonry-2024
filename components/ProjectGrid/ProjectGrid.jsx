import React, { useEffect, useState } from 'react'
import Section from '@components/Section'
import ProjectCard from '@components/ProjectCard'
import Button from '@components/Button'
import { getLinkProps } from '@utils/helpers'
import { client } from '@lib/sanity'
import { allCategories } from '@queries/category'
import ScrollEntrance from '@components/ScrollEntrance'
import { slugify } from '@utils/helpers'

const ProjectGrid = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	projects,
	actions,
	showFilters,
	id
}) => {
	const [categories, setCategories] = useState([])
	const [projectList, setProjectList] = useState(projects)
	const [view, setView] = useState('large')
	const [filters, setFilters] = useState([])

	useEffect(() => {
		if (showFilters) {
			let query = allCategories
			client.fetch(query).then((res) => {
				setCategories(res)
			})
		}
	}, [showFilters])

	const setFilterItems = id => {
		if (!id) {
			setFilters([])
		} else if (filters.includes(id)) {
			const itemIndex = filters.indexOf(id)
			const newFilterArray = [...filters.slice(0, itemIndex), ...filters.slice(itemIndex + 1)];
			setFilters(newFilterArray)
		} else {
			setFilters([...filters, id])
		}
	}

	useEffect(() => {
		if (filters.length < 1) {
			setProjectList(projects)
		} else {
			const filteredProjects = []
			projects.forEach(projectItem => {
				const { project } = projectItem
				let projectCats = []
				project?.categories?.forEach(cat => projectCats.push(cat.slug))

				const includesAny = (arr, values) => values.some(v => arr.includes(v))
				if (includesAny(projectCats, filters)) {
					filteredProjects.push(projectItem)
				}
			})
			setProjectList(filteredProjects)
		}

	}, [filters, projects])

	return (
		<Section
			className={className ? className + ' overflow-hidden' : 'overflow-hidden'}
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			id={id}
		>
			{showFilters && (
				<ScrollEntrance className='px-margin pb-gutter'>
					<div className="max-w-site-max-w mx-auto w-full flex justify-between items-center">
						<div className="flex flex-wrap gap-[15px] pb-gutter">
							<Button
								onClick={() => setFilterItems(false)}
							>View All</Button>
							{categories.map(cat => {
								return (
									<Button
										key={cat.slug}
										onClick={() => setFilterItems(cat.slug)}
										className={filters.includes(cat.slug) ? 'solid no-hover' : ''}
									>{cat.title}</Button>
								)
							})}
						</div>

						<div className="flex flex-wrap gap-[15px] pb-gutter">
							<Button
								onClick={() => setView('large')}
								title='Large View'
								icon={
									<svg width="16" height="16" viewBox="0 0 16 16" >
										<path fillRule="evenodd" clipRule="evenodd" d="M16 0H0V2H16V0ZM16 14H0V16H16V14Z"/>
									</svg>
								}
								className={`square ${view === 'large' ? 'no-hover' : 'transparent'}`}
							/>
							<Button
								onClick={() => setView('small')}
								title='Small View'
								icon={
									<svg width="16" height="16" viewBox="0 0 16 16" >
										<path fillRule="evenodd" clipRule="evenodd" d="M4 0H0V4H4V0ZM16 0H12V4H16V0ZM12 12H16V16H12V12ZM4 12H0V16H4V12Z"/>
									</svg>
								}
								className={`square ${view === 'small' ? 'no-hover' : 'transparent'}`}
							/>
						</div>
					</div>
				</ScrollEntrance>
			)}
			<div className="px-margin">
				<div className="flex gap-y-gutter justify-start flex-wrap -mx-half-gutter">
					{projectList?.map((item, index) => {
						const { project } = item
						if (!project?.featuredImage) {
							return false
						}
						let prevProject = projectList[index - 1]
						let nextProject = projectList[index + 1]
						if (index + 1 === projectList.length) {
							nextProject = projectList[0]
						}
						if (index === 0) {
							prevProject = projectList[projectList.length - 1]
						}

						let cardClassname = {
							small: 'w-full md:w-[41.666%] md:max-w-1/2',
							medium: 'w-full md:w-1/2 md:grow md:max-w-full',
							large: 'w-full md:grow md:w-full'
						}

						if (view === 'small') {
							cardClassname = {
								small: 'w-full md:w-[20%] md:max-w-[20%]',
								medium: 'w-full md:w-1/3 md:grow md:max-w-1/2',
								large: 'w-full md:grow md:w-1/3 md:max-w-1/2'
							}
						}

						const filtersSlug = (filters.join('-'))
						console.log(filtersSlug)

						return (
							<ScrollEntrance
								delay={showFilters ? 1 : 0}
								key={item?._key + filtersSlug}
								className={`px-half-gutter ${cardClassname[item?.size] || cardClassname.medium}`}
								// className={`${!item.featured ? 'w-full md:w-1/3 md:grow md:max-w-1/2' : 'w-full md:w-[66.666%]'} px-half-gutter`}
							>
								<ProjectCard
									project={project}
									className='h-full'
									imageWrapperClassname={`aspect-video md:aspect-auto md:h-[20vw] w-full`}
								/>
							</ScrollEntrance>
						)
					})}
				</div>

				{actions?.length && (
					<ScrollEntrance>
						<div className={'flex flex-wrap gap-gutter pt-v-space-sm items-center justify-start'}>
							{actions.map((action, index) => {
								if (!action.title || !getLinkProps(action)?.to) {
									return false
								}
								return (
									<Button
										key={action._key}
										className='!mb-0'
										{...getLinkProps(action)}
									>
										{action.title}
									</Button>
								)
							})}
						</div>
					</ScrollEntrance>
				)}
			</div>
		</Section>
	)
}

export default ProjectGrid
