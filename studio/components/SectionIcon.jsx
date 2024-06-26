import React from 'react'
import { MdVisibilityOff } from 'react-icons/md'

const SectionIcon = ({ children, hidden, theme }) => {
	if (!theme) {
		theme = 'default'
	}
	return (
		<div
			className={'section-icon theme-' + theme}
			style={{ 
				borderRadius: '3px',
				width: '34px',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: '18px'
			}}
		>
			{hidden ? <MdVisibilityOff size='24px' style={{ color: '#a5b1c4' }}/> : children}
		</div>)
}

export default SectionIcon;
