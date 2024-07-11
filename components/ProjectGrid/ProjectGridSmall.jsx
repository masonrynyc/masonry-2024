import React, { useEffect, useState } from 'react'
import Section from '@components/Section'
import ProjectCard from '@components/ProjectCard'
import Button from '@components/Button'
import { getLinkProps } from '@utils/helpers'
import ScrollEntrance from '@components/ScrollEntrance'
import { allProjects } from '@queries/project'
import { getClient } from '@lib/sanity'

const ProjectGridSmall = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	projects = false,
	actions,
	headline,
	id
}) => {
	const [projectList, setProjectList] = useState(projects)

	useEffect(() => {
		if (!projectList) {
			let query = allProjects

			getClient().fetch(query, {}).then((res) => { setProjectList(res) })
		}
	}, [])

	console.log(projectList)

	if (!projectList) {
		return false
	}

	return (
		<Section
			className={className ? className + ' overflow-hidden' : 'overflow-hidden'}
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			id={id}
		>
			<ScrollEntrance className="px-margin">
				{headline && (
					<div className='pb-v-space'>
						<h3 className="h1">{headline}</h3>
					</div>
				)}
				<div className="flex gap-y-gutter justify-start flex-wrap -mx-half-gutter">
					{projectList?.slice(0, 3)?.map((project, index) => {
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

						return (
							<div
								key={project?._key}
								className={`px-half-gutter w-full md:w-1/3`}
								// className={`${!item.featured ? 'w-full md:w-1/3 md:grow md:max-w-1/2' : 'w-full md:w-[66.666%]'} px-half-gutter`}
							>
								<ProjectCard
									project={project}
									className='h-full'
									imageWrapperClassname={`aspect-video md:aspect-auto md:h-[20vw] w-full`}
								/>
							</div>
						)
					})}
				</div>

				{actions?.length && (
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
				)}
			</ScrollEntrance>
		</Section>
	)
}

export default ProjectGridSmall
