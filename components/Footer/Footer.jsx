import React from 'react'
import Link from '@components/Link'
import Logo from '@components/Logo'
import { getLinkProps } from '@utils/helpers'

const Footer = ({ className = '', menus }) => {
	const navigation = menus?.filter(menu => menu.location === 'footer-navigation')[0]
	const navItems = navigation?.items

	return (
		<footer className={className}>
			<div className='px-margin py-margin grid grid-cols-3'>
				<div className='w-[80px]'>
					<Logo />
				</div>

				<div>
					{(navItems && navItems?.length) > 0 && (
						<ul>
							{navItems.map((item, index) => {
								const { link, sublinks } = item
								// TODO: Sublinks
								if (!link.title) {
									return false
								}
								return (
									<li key={item._key}>
										<Link
											{...getLinkProps(link)}
										>
											<span className="body-small">{link.title}</span>
										</Link>
									</li>
								)
							})}
						</ul>
					)}
				</div>
			</div>
		</footer>
	)
}

export default Footer
