import React from 'react'
import Section from '@components/Section'
import Image from '@components/Image'
import RichText from '@components/RichText'
import Button from '@components/Button'
import ScrollEntrance from '@components/ScrollEntrance'
import { getLinkProps } from '@utils/helpers'

const Columns = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	columnItems,
	imageSize,
	title,
	alignmentHorizontal,
	borders = true,
	actions,
	id
}) => {
	const imageClassnames = {
		'small': 'w-full max-w-[40px]',
		'medium': 'w-full max-w-[80px]',
		'large': 'w-full'
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
			<div className="px-margin">
				<div
					className="mx-auto max-w-site-max-w"
					style={{
						'--col-w-lg': '25%',
						'--col-w-md': '33.333%',
						'--col-w-sm': '50%',
						'--col-w-xs': '50%'
					}}
				>	
					{title && (
						<ScrollEntrance>
							<div className='w-full pb-v-space-md -mb-1'>
								<h3 className="h1">{title}</h3>
							</div>
						</ScrollEntrance>
					)}
					<div delay={1} className={`flex flex-wrap md:-mx-half-gutter gap-y-4 md:gap-y-10 ${alignmentHorizontal === 'center' ? 'justify-center text-center' : ''}`}>
						{columnItems?.map(column => {
							return (
								<ScrollEntrance
									key={column._key}
									className={`flex flex-col shrink-0 gap-gutter md:px-half-gutter w-[var(--col-w-xs)] sm:w-[var(--col-w-sm)] md:w-[var(--col-w-md)] lg:w-[var(--col-w-lg)] lg:max-w-1/2 ${alignmentHorizontal === 'center' ? 'items-center' : ''}`}
								>
									<div className={`flex flex-col shrink-0 pr-gutter md:pr-0 gap-gutter ${borders ? 'border-t pt-3' : ''}`}>
										{column.image && (
											<div className={imageClassnames[imageSize]}>
												<Image image={column.image} alt={column?.image?.alt || column?.title}/>
											</div>
										)}
										{column?.title && (
											<div className="h2">{column.title}</div>
										)}
										{column?.text && (
											<RichText text={column.text} className='max-w-[450px] body-small'/>
										)}
									</div>
								</ScrollEntrance>		
							)
						})}

						<div className="w-full md:hidden"><div className="border-b"></div></div>

						{actions?.length && (
							<div className={'flex flex-wrap gap-gutter pt-8 md:pt-7 items-center justify-start md:px-half-gutter'}>
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
				</div>
			</div>
		</Section>
	)
}

export default Columns
