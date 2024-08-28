import React from 'react'
import Link from '@components/Link'
import Logo from '@components/Logo'
import { getLinkProps } from '@utils/helpers'
import ScrollEntrance from '@components/ScrollEntrance'

const Footer = ({ className = '', menus, site }) => {
	const navigation = menus?.filter(menu => menu.location === 'footer-navigation')[0]
	const navItems = navigation?.items

	return (
		<ScrollEntrance className='grow-0 shrink-0 w-full'>
			<footer className={className}>
				<div className='mx-margin pb-[45px] flex items-baseline justify-between border-t pt-3 md:pt-7'>
					<div className='w-[80px] h6 flex items-center justify-start gap-x-[.4em]'>
						<span className='h6'>©</span> {site.title} <span className='!text-[1.135em]'>{new Date().getFullYear()}</span>
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
										<li key={item._key} className='hidden md:block'>
											<Link
												{...getLinkProps(link)}
												className='inline-block align-top animate-underline'
											>
												<span className="h6">{link.title}</span>
											</Link>
										</li>
									)
								})}
								<li className='md:hidden'>
									<Link
										to='/contact'
										className='inline-block align-top animate-underline'
									>
										<span className="h6">Contact</span>
									</Link>
								</li>
							</ul>
						)}
					</div>
				</div>
			</footer>
		</ScrollEntrance>
	)
}

export default Footer
