import React from 'react'
import Section from '@components/Section'
import Image from '@components/Image'
import RichText from '@components/RichText'
import ScrollEntrance from '@components/ScrollEntrance'

const Columns = ({
	className = '',
	theme = 'default',
	prevTheme,
	nextTheme,
	isFirstSection,
	columnItems,
	imageSize,
	alignmentHorizontal,
	borders = true,
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
						'--col-w-lg': columnItems?.length < 6 ? 100 / columnItems?.length + '%' : '25%',
						'--col-w-md': '50%',
						'--col-w-sm': '100%'
					}}
				>
					<ScrollEntrance className={`flex flex-wrap -mx-half-gutter gap-y-12 ${alignmentHorizontal === 'center' ? 'justify-center text-center' : ''}`}>
						{columnItems?.map(column => {
							return (
								<div
									key={column._key}
									className={`flex flex-col shrink-0 gap-gutter px-half-gutter w-[var(--col-w-sm)] md:w-[var(--col-w-md)] lg:w-[var(--col-w-lg)] lg:max-w-1/2 ${alignmentHorizontal === 'center' ? 'items-center' : ''}`}
								>
									<div className={`flex flex-col shrink-0 gap-gutter ${borders ? 'border-t pt-3' : ''}`}>
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
								</div>		
							)
						})}
					</ScrollEntrance>
				</div>
			</div>
		</Section>
	)
}

export default Columns
