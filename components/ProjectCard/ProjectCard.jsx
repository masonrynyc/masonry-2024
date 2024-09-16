import React, { useState } from 'react'
import Image from '@components/Image'
import Video from '@components/Video'
import Link from '@components/Link'
import { getDocumentLink } from '@utils/helpers'

const ProjectCard = ({
	className = '',
	project,
	style,
	imageWrapperClassname = false
}) => {
	const [comingSoonActive, setComingSoonActive] = useState(false)
	let baseClassname = 'project-card flex flex-col'
	let projectTitle = project?.subtitle ? project.title + ' ' + project.subtitle : title
	const comingSoon = project.comingSoon

	console.log(project.title, project)

	let LinkEl = Link
	let LinkElProps = getDocumentLink(project)
	if (comingSoon) {
		LinkEl = 'div'
		LinkElProps = {
			onClick: () => setComingSoonActive(true),
			onMouseLeave: () => {
				setTimeout(() => {
					setComingSoonActive(false)
				}, 500)
			}
		}
	}
	
	if (project?.featuredImage) {
		return (
			<div className={className ? className + ' ' + baseClassname : baseClassname} style={style}>
				<LinkEl
					className='cursor-pointer group w-full h-full flex flex-col text-left relative'
					{...LinkElProps}
					// title={'View ' + projectTitle + ' Project'}
					title={false}
				>
					<div
						style={{ '--bg-color': project?.featuredImage?.palette?.darkVibrant?.background || '#000' }}
						className={`${imageWrapperClassname ? imageWrapperClassname : 'aspect-3/4'} overflow-hidden rounded bg-[var(--bg-color)] relative`}
					>
						{project?.featuredVideo ? (
							<Video
								videoFile={project.featuredVideo}
								preloadImage={project.featuredImage}
								className='rounded'
								cover
							/>
						) : (
							<Image
								className='rounded'
								transitionIn={true}
								image={project.featuredImage}
								ratio={project.featuredImage?.aspectRatio}
								alt={project?.title}
								sizes='2000px'
								cover
							/>
						)}
					</div>
					<div className='transition-opacity duration-slow group-hover:opacity-100 opacity-0 z-3 p-gutter lg:p-6 grow-0 shrink-0 absolute top-0 left-0 w-full h-full'>
						<div>
							<h3 className={`h3 flex gap-x-[.25em] flex-wrap transition duration-slow ${comingSoonActive ? '-translate-y-3 opacity-0' : ''}`}>
								<span className='inline whitespace-nowrap group-hover:translate-y-0 translate-y-3 transition duration-slow'>{project?.title}</span> {project?.subtitle && <span className='inline whitespace-nowrap h4 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 translate-y-3 transition-all duration-slow group-hover:delay-[.07s]'>{project.subtitle}</span>}
							</h3>
							{comingSoon && (
								<div className={`absolute top-0 left-0 p-gutter lg:p-6 duration-slow transition ${comingSoonActive ? 'translate-y-0' : 'translate-y-3 opacity-0'}`}>
									<h4>Coming Soon</h4>
								</div>
							)}
						</div>
					</div>
					{/* Move gradient out to own div */}
					<div className="z-2 rounded-b absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[rgba(0,0,0,.5)] to-[rgba(0,0,0,0)]"/>
					<div className="group-hover:opacity-40 transition-opacity duration-slow opacity-0 z-2 rounded absolute top-0 left-0 w-full h-full bg-true-black"/>
				</LinkEl>
			</div>
		)
	}
}

export default ProjectCard
