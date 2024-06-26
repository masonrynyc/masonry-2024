import React, { useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import components from './components'

const RichText = ({ className = '', text, bodySize = 'body', wrapper = true }) => {
	if (!text) {
		return false
	}

	// Add className to first and last items in rich text array
	text[0].firstItem = true
	text[text?.length - 1].lastItem = true

	if (wrapper) {
		return (
			<div className={'rich-text ' + className + ' ' + bodySize}>
				<PortableText value={text} components={components} />
			</div>
		)
	}

	return (
		<PortableText value={text} components={components} />
	)
}

export default RichText
