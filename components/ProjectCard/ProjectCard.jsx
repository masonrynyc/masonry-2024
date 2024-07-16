import React from 'react'
import Image from '@components/Image'
import Video from '@components/Video'
import Link from '@components/Link'
import { getDocumentLink } from '@utils/helpers'

const ProjectCard = ({
	className = '',
	project,
	imageWrapperClassname = false,
	openProject = () => {},
}) => {
	let baseClassname = 'project-card flex flex-col'
	let projectTitle = project?.subtitle ? project.title + ' ' + project.subtitle : title
	
	if (project?.featuredImage) {
		return (
			<div className={className ? className + ' ' + baseClassname : baseClassname}>
				<Link
					className='group w-full h-full flex flex-col text-left relative'
					{...getDocumentLink(project)}
					title={'View ' + projectTitle + ' Project'}
				>
					<div
						style={{ '--bg-color': project?.featuredImage?.palette?.darkVibrant?.background || '#000' }}
						className={`${imageWrapperClassname ? imageWrapperClassname : 'aspect-3/4'} rounded bg-[var(--bg-color)] relative`}
					>
						{project?.featuredVideo?.id ? (
							<Video vimeoId={project.featuredVideo.id} className='rounded' cover/>
						) : (
							<Image
								className='rounded'
								transitionIn={true}
								image={project.featuredImage}
								ratio={project.featuredImage?.aspectRatio}
								alt={project?.title}
								sizes='600px'
								cover
							/>
						)}
					</div>
					<div className='group-hover:opacity-100 transition-opacity duration-slow opacity-25 z-3 p-gutter lg:p-6 grow-0 shrink-0 absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,.5)] rounded'>
						<div>
							<h3 className='h3 flex gap-x-[.25em]'><span className='block group-hover:opacity-100 opacity-0 group-hover:translate-y-0 translate-y-3 transition duration-slow'>{project?.title}</span> {project?.subtitle && <span className='block h4 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 translate-y-3 transition-all duration-slow group-hover:delay-[.07s]'>{project.subtitle}</span>}</h3>
						</div>
					</div>
					<div className="group-hover:opacity-40 transition-opacity duration-slow opacity-0 z-2 rounded absolute top-0 left-0 w-full h-full bg-true-black"/>
				</Link>
			</div>
		)
	}
}

export default ProjectCard
