import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Logo from '@components/Logo'
import Link from '@components/Link'
import Button from '@components/Button'
import MenuPanel from '@components/MenuPanel'
import { getLinkProps, isBrowser } from '@utils/helpers'
import ScrollEntrance from '@components/ScrollEntrance'
import { useLenis } from 'lenis/react'

const showHideEffect = true

const Header = ({ className = '', menus, settings, hasAtf, firstTheme, hideMobileMenuButton, closeFn }) => {
	const [menuPanel, setMenuPanel] = useState(false)
	const [scrollDirection, setScrollDirection] = useState(false)
	const [atTop, setAtTop] = useState(false)
	const navigation = menus?.filter(menu => menu.location === 'main-navigation')[0]
	const navItems = navigation?.items
	const router = useRouter()
	
	const topBanner = settings?.topBanner

	let scrollThreshold = 40
	if (!topBanner?.bannerLink?.title) {
		scrollThreshold = 10
	}

	const lenis = useLenis(({scroll, direction}) => {
		if (scroll >= scrollThreshold) {
			setAtTop(false)
		} else {
			setAtTop(true)
		}

		if (direction === 1) {
			setScrollDirection('down')
		}

		if (direction === -1) {
			setScrollDirection('up')
		}
  })

	useEffect(() => {
		if (!atTop) {
			// Collapsed header style
			// For show/hide effect on scroll up/down
			if (showHideEffect) {
				if (scrollDirection === 'down') {
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
		}
	}, [atTop, scrollDirection])

	let headerHeight = ''

	let headerClassname = `main-header h-header-height-expanded sticky top-0 !bg-transparent transition-all z-10 ${firstTheme ? 'theme-' + firstTheme : ''}`

	if (atTop && hasAtf) {
		// Inverted header style
		headerClassname = `main-header h-header-height sticky top-0 !bg-transparent text-bg transition-all z-10 ${firstTheme ? 'theme-' + firstTheme : ''}`
	}

	if (!atTop) {
		// Collapsed header style
		headerClassname = 'main-header h-header-height sticky top-0 bg-bg transition-all z-10'
		headerHeight = ''
		// For show/hide effect on scroll up/down
		if (showHideEffect && !hideMobileMenuButton) {
			if (scrollDirection === 'down') {
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
				<div className="grow-0 shrink-0 w-full relative z-10 px-margin theme-dark text-center h-[var(--header-banner-height)]">
					<Link
						className="h5 text-center flex items-center justify-center h-full"
						{...getLinkProps(topBanner.bannerLink)}
					>{topBanner.bannerLink.title}
					</Link>
				</div>
			)}
			<div className="grow-0 shrink-0 w-full sticky top-0 z-10 h-0 pb-header-height-expanded">
				<header className={headerClassname}>
					<ScrollEntrance className={`mx-margin flex justify-between items-center h-full border-b transition-border border-transparent`}>
						<div>
							<Link to='/' title='Go to homepage' className='block'><Logo role="presentation" /></Link>
						</div>
						<div>
							<Button
								title={menuPanel || hideMobileMenuButton ? 'Close' : 'Open Menu'}
								onClick={() => {
									if (closeFn) {
										closeFn()
									} else {
										setMenuPanel(!menuPanel)
									}
								}}
								className={`transparent md:hidden unpadd align-middle no-hover`}
							>
								<div className="relative">
									<span className={`transition duration-slow h5 block pt-[1px] ${menuPanel || hideMobileMenuButton ? '-translate-y-4 opacity-0' : ''}`}>Menu</span>
									<span className={`transition duration-slow h5 block pt-[1px] absolute top-4 right-0 ${menuPanel || hideMobileMenuButton ? '-translate-y-4' : 'opacity-0'}`}>Close</span>
								</div>
							</Button>
							{(navItems && navItems?.length) > 0 && (
								<nav className='hidden md:block'>
									<ul className='flex gap-[38px]'>
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
															className={`inline-flex animate-underline ${active ? '' : ''}`}
														>
															<span className="h5">{link.title}</span>
														</div>
													) : (
														<Link
															className={`inline-flex animate-underline ${active ? '' : ''}`}
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
			</div>
			<MenuPanel
				menus={menus}
				visible={menuPanel}
				navItems={navItems}
				setMenuPanel={setMenuPanel}
			/>
		</>
	)
}

export default Header
