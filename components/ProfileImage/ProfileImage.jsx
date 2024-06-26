import React from 'react'
import Image from '@components/Image'

const ProfileImage = ({ className = '', image, title }) => (
  <div className={className}>
		<div className='w-8 h-8 flex items-center justify-center theme-dark rounded-full overflow-hidden'>
		{image ? (
			<Image image={image} ratio={1} className="rounded-full" alt={title}/>
		) : (
			<div>{title[0]}</div>
		)}
		</div>
	</div>
)

export default ProfileImage
