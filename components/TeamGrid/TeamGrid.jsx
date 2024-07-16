import React from 'react'
import Section from '@components/Section'
import ScrollEntrance from '@components/ScrollEntrance'
import Image from '@components/Image'
import RichText from '@components/RichText'

const TeamGrid = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	title,
	members,
	id
}) => {
	return (
		<Section
			className={className}
			setTheme={theme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			id={id}
		>
			<div className="px-margin">
				<div className="mx-auto max-w-site-max-w">
					<ScrollEntrance className="grid gap-x-gutter gap-y-4 md:grid-cols-3 lg:grid-cols-12 items-top">
						<div className="z-1 col-span-full border-t"/>
						<div className='lg:col-span-5 mb-5 md:mb-0'>
							<h3 className="h5">{title}</h3>
						</div>
						<div className='md:col-span-2 lg:col-span-7 grid sm:grid-cols-2 gap-x-gutter gap-y-v-space-sm'>
							{members.map(member => {
								return (
									<div key={member._key}>
										<div className='rounded bg-true-black'>
											<Image
												className='rounded'
												image={member?.headshot}
												alt={member.name + (member.title && ', ' + member.title)}
											/>
										</div>
										{member?.bio && (
											<div className='mt-gutter'>
												<RichText text={member.bio}/>
											</div>
										)}
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

export default TeamGrid
