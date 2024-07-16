import React, { useState } from 'react'
import Button from '@components/Button'
import { useRouter } from 'next/router'
import Link from '@components/Link'
import Collapsable from '@components/Collapsable'
import Logo from '@components/Logo'
import { getLinkProps } from '@utils/helpers'
import { MdKeyboardArrowDown } from 'react-icons/md'

const MenuPanel = ({
	className = '',
	navItems,
	visible,
	menus,
	setMenuPanel
}) => {
	const [expanded, setExpanded] = useState(false)
	const router = useRouter()

	const toggleExpanded = id => {
		if (expanded === id) {
			setExpanded(false)
		} else {
			setExpanded(id)
		}
	}

	return (
		<>
			<div
				style={{
					opacity: visible ? '0' : '0',
					visibility: visible ? 'visible' : 'hidden'
				}}
				className="md:hidden transition-all panel-overlay fixed top-0 left-0 w-full h-full bg-text-color opacity-10 z-1"
				onClick={() => setMenuPanel(false)}
			/>
			<div
				style={{
					opacity: visible ? 1 : 0,
					visibility: visible ? 'visible' : 'hidden'
				}}
				className={`flex md:hidden flex-col transition-all duration-slow menu-panel fixed top-0 pt-header-height bottom-0 right-0 w-full bg-bg z-2 ` + className}
			>
				<div className="grow w-full flex items-center pb-header-height">
					{(navItems && navItems?.length) > 0 && (
						<nav className='w-full'>
							<ul
								className='flex flex-col p-margin scroll-entrance'
								data-in-view={visible}
								style={{ '--delay-value': 6 }}
							>
								{navItems.map((item, index) => {
									const { link, sublinks } = item
									// TODO: Sublinks
									let active = false
									if (!link.title) {
										return false
									}
									if (getLinkProps(link)?.to === router.asPath) {
										active = true
									}
									return (
										<li key={item._key} className={index === navItems.length - 1 ? 'border-t border-b' : 'border-t'}>
											{sublinks?.length > 0 ? (
												<button
													className='cursor-pointer'
													onClick={() => toggleExpanded(item._key)}
													title={'Expand ' + link.title + ' navigation'}
													aria-haspopup='true'
													aria-expanded={expanded === item._key ? 'true' : 'false'}
												>
													<span className="h5 flex items-center gap-x-[.2em]">
														{link.title}
														<MdKeyboardArrowDown
															className='transition-transform'
															style={{
																transform: expanded === item._key ? 'rotate(-180deg)' : 'none'
															}}
															size={24}
														/>
													</span>
												</button>
											) : (
												<Link {...getLinkProps(link)} className='block pb-8 pt-3'>
													<span className="h5 block">{link.title}</span>
												</Link>
											)}
											{sublinks?.length > 0 && 
												<Collapsable open={expanded === item._key} animateOpacity>
													<ul>
														{sublinks.map((sublink) => {
															let sublinkActive = false
															if (!sublink.title) {
																return false
															}
															if (getLinkProps(sublink)?.to.includes(router.query.slug)) {
																sublinkActive = true
															}
															return (
																<li key={sublink._key}>
																	<Link
																		className={active ? 'border-b border-text-color' : 'border-b border-transparent'}
																		{...getLinkProps(sublink)}
																	>
																		<span className="h5">{sublink.title}</span>
																	</Link>
																</li>
															)
														})}
													</ul>
												</Collapsable>
											}
										</li>
									)
								})}
							</ul>
						</nav>
					)}
				</div>
			</div>
		</>
	)
}

export default MenuPanel
