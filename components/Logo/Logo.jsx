import React from 'react'
import LogoSvg from '@assets/images/logo.svg'

const Logo = ({ className = '', width = 100 }) => (
  <div className={'logo-wrapper ' + className}>
		<LogoSvg className={'inline-block align-top w-[' + width + 'px] h-auto'} />
	</div>
)

export default Logo
