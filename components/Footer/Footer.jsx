import React from 'react'
import Link from '@components/Link'
import Logo from '@components/Logo'
import { getLinkProps } from '@utils/helpers'

const Footer = ({ className = '', menus }) => {
	const navigation = menus?.filter(menu => menu.location === 'footer-navigation')[0]
	const navItems = navigation?.items

	return (
		<footer className={className}>
			<div className='mx-margin py-margin flex items-center justify-between border-t pt-3'>
				<div className='w-[80px] h5 flex items-center justify-start gap-x-[.4em]'>
					© <Logo /> {new Date().getFullYear()}
				</div>

				<div>
					{(navItems && navItems?.length) > 0 && (
						<ul className='flex gap-x-[calc(var(--site-gutters)*2)] leading-none'>
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
											className='inline-block align-top'
										>
											<span className="h5">{link.title}</span>
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
