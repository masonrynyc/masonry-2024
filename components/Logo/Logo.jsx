import React from 'react'

const Logo = ({ className = '', width = 100 }) => (
  <div className={'logo-wrapper ' + className}>
		<span className='h5 align-center'>Masonry</span>
	</div>
)

export default Logo
