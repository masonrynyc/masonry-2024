import React from 'react'

const ThemeIcon = ({ theme }) => {
	if (!theme) {
		theme = 'default'
	}

	return (
		<div
			className={'h1 theme-' + theme}
			style={{
				width: '40px',
				height: '40px',
				margin: '2px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<span style={{ fontSize: '20px', lineHeight: '1em', letterSpacing: 0 }}>Aa</span>
		</div>)
}

export default ThemeIcon
