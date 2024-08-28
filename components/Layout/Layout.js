import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from '@components/Link'
import SEO from '@components/SEO'
import AppProvider from '@state/AppState'
import { useWindowSize } from '@uidotdev/usehooks'
import { isMobileSafari, isBrowser } from '@utils/helpers'

const Layout = ({ children, page, settings, menus, hideMobileMenuButton, closeFn }) => {
  const router = useRouter()

  // set window height var (w/ safari/iOS hack)
  const { height: windowHeight } = useWindowSize()
  const [lockHeight, setLockHeight] = useState(false)
  const hasChin = isMobileSafari()

  // set header height
  const [headerHeight, setHeaderHeight] = useState(null)

  let hasAtf = false
  if (page?.modules && page?.modules[0]?.width === 'fullWidth') {
    hasAtf = true
  }

  useEffect(() => {
    if ((isBrowser && !lockHeight) || !hasChin) {
      document?.body?.style.setProperty('--vh', `${windowHeight * 0.01}px`)
      setLockHeight(hasChin)
    }
  }, [windowHeight, hasChin, lockHeight])

  let firstTheme = false
  if (page?.modules && page?.modules[0]?.theme) {
    firstTheme = page?.modules[0]?.theme
  }

  return (
    <>
      <SEO
        page={page}
        settings={settings}
        // description={pageMeta?.metaDescription}
        // keywords={pageMeta?.keywords}
        // shareImage={pageMeta?.shareImage?.url || getBackupShareImage(modules)}
      />
      <Link to="#content" className='hidden'>Skip to content</Link>
      <div id="Layout" className='flex flex-col min-h-full min-h-screen'>
        <Header
          menus={menus}
          settings={settings}
          hasAtf={hasAtf}
          firstTheme={firstTheme}
          hideMobileMenuButton={hideMobileMenuButton}
          closeFn={closeFn}
        />
        <main id="content" className='grow'>{children}</main>
        <Footer menus={menus} site={settings} />
      </div>
    </>
  )
}

export default Layout