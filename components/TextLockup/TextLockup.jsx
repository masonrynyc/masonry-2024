import React from 'react'
import RichText from '@components/RichText'
import Link from '@components/Link'
import Button from '@components/Button'
import ScrollEntrance from '@components/ScrollEntrance'
import { getLinkProps } from '@utils/helpers'

const TextLockup = ({
	className = '',
	lockup,
	alignment = 'left',
	headline,
	text,
	eyebrow,
	actions,
	headlineEl = 'h3',
	headlineSize = 'h3',
	bodySize
}) => {
	if (lockup?.headline) {
		headline = lockup?.headline
	}
	if (lockup?.text) {
		text = lockup?.text
	}
	if (lockup?.eyebrow) {
		eyebrow = lockup?.eyebrow
	}
	if (lockup?.actions) {
		actions = lockup?.actions
	}

	const HeadlineEl = headlineEl

	let alignmentClass = 'justify-start'
	if (alignment === 'center') {
		className = className + ' text-center mx-auto'
		alignmentClass = 'justify-center'
	}
	return (
		<ScrollEntrance className={className + ' rich-text'}>
			{eyebrow && (<div className="eyebrow mb-6">{eyebrow}</div>)}
			
			{headline && Array.isArray(headline) ? (
				<RichText text={headline} />
			) : (
				headline && (
					<HeadlineEl className={headlineSize}>{headline}</HeadlineEl>
				)
			)}

			{text && Array.isArray(text) ? (
				<RichText text={text} bodySize={bodySize} wrapper={false} />
			) : (
				<div className={bodySize}>{text}</div>
			)}

			{(actions && actions?.length) > 0 && (
				<div className={'flex flex-wrap gap-gutter mt-8 items-center ' + alignmentClass}>
					{actions.map((action, index) => {
						if (!action.title) {
							return false
						}
						if (action._type === 'button') {
							return (
								<Button
									key={action._key}
									className='!mb-0'
									{...getLinkProps(action)}
								>
									{action.title}
								</Button>
							)
						} else {
							return (
								<Link
									key={action._key}
									{...getLinkProps(action)}
								>
									<span className="body-small animate-underline underlined">{action.title}</span>
								</Link>
							)
						}
					})}
				</div>
			)}
		</ScrollEntrance>
	)
}

export default TextLockup
