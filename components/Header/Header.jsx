import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Logo from '@components/Logo'
import Link from '@components/Link'
import Button from '@components/Button'
import MenuPanel from '@components/MenuPanel'
import { getLinkProps, isBrowser } from '@utils/helpers'
import ScrollEntrance from '@components/ScrollEntrance'

const showHideEffect = true

const Header = ({ className = '', menus, settings, hasAtf, firstTheme }) => {
	const [menuPanel, setMenuPanel] = useState(false)
	const navigation = menus?.filter(menu => menu.location === 'main-navigation')[0]
	const navItems = navigation?.items
	const router = useRouter()
	
	const topBanner = settings?.topBanner

	let scrollThreshold = 40
	if (!topBanner?.bannerLink?.title) {
		scrollThreshold = 10
	}

	function useScrollDirection() {
		const [scrollDirection, setScrollDirection] = useState(null);
		const [scrolled, setScrolled] = useState(null);
	
		useEffect(() => {
			let lastScrollY = window.pageYOffset;
	
			const updateScrollDirection = () => {
				const scrollY = window.pageYOffset;
				const direction = scrollY > lastScrollY ? "down" : "up";
				if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
					setScrollDirection(direction);
				}
				lastScrollY = scrollY > 0 ? scrollY : 0;

				if (scrollY >= scrollThreshold && !scrolled) {
					setScrolled(true)
				}

				if (scrollY < scrollThreshold && scrolled) {
					setScrolled(false)
				}

			};
			window.addEventListener("scroll", updateScrollDirection); // add event listener
			return () => {
				window.removeEventListener("scroll", updateScrollDirection); // clean up
			}
		}, [scrollDirection, scrolled]);
	
		return { direction: scrollDirection, atTop: !scrolled };
	};

	const { direction, atTop } = useScrollDirection()

	let headerHeight = ''

	let headerClassname = `main-header h-header-height sticky top-0 !bg-transparent transition-all z-10 ${firstTheme ? 'theme-' + firstTheme : ''}`

	if (atTop && hasAtf) {
		// Inverted header style
		headerClassname = `main-header h-header-height sticky top-0 !bg-transparent text-bg transition-all z-10 ${firstTheme ? 'theme-' + firstTheme : ''}`
	}

	if (!atTop) {
		// Collapsed header style
		headerClassname = 'main-header h-header-height sticky top-0 bg-bg transition-all z-10'
		headerHeight = ''
		// For show/hide effect on scroll up/down
		if (showHideEffect) {
			if (direction === 'down') {
				headerClassname = headerClassname + ' -translate-y-full'
				if (isBrowser) {
					// Change sticky top
					document?.body?.style?.setProperty('--sticky-top', `var(--site-margins)`)
				}
			} else {
				if (isBrowser) {
					// Change sticky top
					document?.body?.style?.setProperty('--sticky-top', `calc(var(--site-margins) + var(--header-height))`)
				}
			}
		}
	} else {
		headerHeight = ':root { --header-height: var(--header-height-expanded) !important; }'
	}

	let bannerHeight = ':root { --header-banner-height: 0px; }'
	if (topBanner?.bannerLink?.title) {
		bannerHeight = `:root { --header-banner-height: ${scrollThreshold}px !important; }`
	}

	const headerStyles = `
		${bannerHeight}
		${headerHeight}
	`

	return (
		<>
			<Head>
				<style>
					{headerStyles}
				</style>
			</Head>
			{topBanner?.bannerLink?.title && (
				<div className="relative z-10 px-margin theme-dark text-center h-[var(--header-banner-height)]">
					<Link
						className="h5 text-center flex items-center justify-center h-full"
						{...getLinkProps(topBanner.bannerLink)}
					>{topBanner.bannerLink.title}
					</Link>
				</div>
			)}
			<header className={headerClassname}>
				<ScrollEntrance className={`mx-margin flex justify-between items-center h-full border-b transition-border ${!atTop ? 'border-current' : 'border-transparent'}`}>
					<div className='w-[80px]'>
						<Link to='/' title='Go to homepage'><Logo role="presentation" /></Link>
					</div>
					<div>
						<Button
							title={menuPanel ? 'Close Menu' : 'Open Menu'}
							onClick={() => setMenuPanel(!menuPanel)}
							className='transparent md:hidden unpadd transition-none align-middle'
						><span className="h5">Menu</span></Button>
						{(navItems && navItems?.length) > 0 && (
							<nav className='hidden md:block'>
								<ul className='flex gap-[calc(var(--site-gutters)*2)]'>
									{navItems.map((item, index) => {
										const { link, sublinks } = item
										let active = false
										if (!link.title) {
											return false
										}
										if (getLinkProps(link)?.to === router.asPath) {
											active = true
										}
										return (
											<li key={item._key} className='group relative cursor-pointer'>
												{sublinks?.length > 0 ? (
													<div
														className={`inline-flex animate-underline ${active ? 'active' : ''}`}
													>
														<span className="h5">{link.title}</span>
													</div>
												) : (
													<Link
														className={`inline-flex animate-underline ${active ? 'active' : ''}`}
														{...getLinkProps(link)}
													>
														<span className="h5">{link.title}</span>
													</Link>
												)}
												{sublinks?.length > 0 && 
													<ul className='absolute top-full left-0 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all'>
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
												}
												
											</li>
										)
									})}
								</ul>
							</nav>
						)}
					</div>
				</ScrollEntrance>
			</header>
			<MenuPanel
				visible={menuPanel}
				navItems={navItems}
				setMenuPanel={setMenuPanel}
			/>
		</>
	)
}

export default Header
