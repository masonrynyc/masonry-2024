import React from 'react'
import Section from '@components/Section'
import ProjectCard from '@components/ProjectCard'
import Button from '@components/Button'
import { getLinkProps } from '@utils/helpers'
import ScrollEntrance from '@components/ScrollEntrance'

const ProjectGrid = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	projects,
	actions,
	id
}) => {
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
				<div className="flex gap-y-gutter justify-start flex-wrap -mx-half-gutter">
					{projects?.map((item, index) => {
						const { project } = item
						if (!project.featuredImage) {
							return false
						}
						let prevProject = projects[index - 1]
						let nextProject = projects[index + 1]
						if (index + 1 === projects.length) {
							nextProject = projects[0]
						}
						if (index === 0) {
							prevProject = projects[projects.length - 1]
						}

						let cardClassname = {
							small: 'w-full md:w-[41.666%] md:max-w-1/2',
							medium: 'w-full md:w-1/2 md:grow md:max-w-full',
							large: 'w-full md:grow md:w-full'
						}

						return (
							<ScrollEntrance
								key={item?._key}
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
			</div>
		</Section>
	)
}

export default ProjectGrid
