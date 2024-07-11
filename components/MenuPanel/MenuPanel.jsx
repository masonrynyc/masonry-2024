import React, { useState } from 'react'
import Button from '@components/Button'
import { useRouter } from 'next/router'
import Link from '@components/Link'
import Collapsable from '@components/Collapsable'
import Logo from '@components/Logo'
import Footer from '@components/Footer'
import { getLinkProps } from '@utils/helpers'
import { MdClose, MdKeyboardArrowDown } from 'react-icons/md'

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
				className="md:hidden transition-all panel-overlay fixed top-0 left-0 w-full h-full bg-text-color opacity-10 z-10"
				onClick={() => setMenuPanel(false)}
			/>
			<div
				style={{
					opacity: visible ? 1 : 0,
					visibility: visible ? 'visible' : 'hidden'
				}}
				className={`flex flex-col transition-all duration-slow ease-[cubic-bezier(0.44,0.24,0.16,1.00)] menu-panel fixed top-0 bottom-0 right-0 max-w-[600px] w-full bg-bg z-20 ` + className}
			>
				<div className="grow-0 shrink-0 flex justify-between items-center h-header-height px-margin">
					<Link to='/' title='Go to homepage'><Logo role="presentation" /></Link>
					<Button
						className={`transparent unpadd no-hover ${visible ? '' : 'translate-y-4'}`}
						onClick={() => setMenuPanel(false)}
					><span className="h5">Close</span></Button>
				</div>
				<div className="grow w-full">
					{(navItems && navItems?.length) > 0 && (
						<nav>
							<ul className='flex flex-col gap-margin p-margin'>
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
										<li key={item._key}>
											{sublinks?.length > 0 ? (
												<button
													className='cursor-pointer'
													onClick={() => toggleExpanded(item._key)}
													title={'Expand ' + link.title + ' navigation'}
													aria-haspopup='true'
													aria-expanded={expanded === item._key ? 'true' : 'false'}
												>
													<span className="h1 flex items-center gap-x-[.2em]">
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
												<Link {...getLinkProps(link)}>
													<span className="h1">{link.title}</span>
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
																		<span className="h1">{sublink.title}</span>
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
				<div className="grow-0 shrink-0">
					<Footer menus={menus}/>
				</div>
			</div>
		</>
	)
}

export default MenuPanel
