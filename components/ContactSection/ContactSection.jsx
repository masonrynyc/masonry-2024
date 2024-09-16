import React from 'react'
import Section from '@components/Section'
import RichText from '@components/RichText'
import ScrollEntrance from '@components/ScrollEntrance'
import Link from '@components/Link'
import { getLinkProps } from '@utils/helpers'

const ContactSection = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	leftColumn,
	rightColumn,
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
						<div className='lg:col-span-5 mb-5 md:mb-0 grid gap-y-8'>
							{leftColumn.map(section => {
								return (
									<div className='border-t pt-3' key={section._key}>
										<h2 className="h5 mb-4">{section.title}</h2>
										<ul>
											{section?.links?.map(link => {
												return (
													<li key={link._key}>
														<Link
															{...getLinkProps(link)}
															className='animate-underline'
														>
															{link.title}
														</Link>
													</li>
												)
											})}
										</ul>
									</div>
								)
							})}
						</div>
						<div className='border-t pt-4 md:col-span-2 lg:col-span-7'><RichText className="md:-mt-1" text={rightColumn}/></div>
					</ScrollEntrance>
				</div>
			</div>
		</Section>
	)
}

export default ContactSection
