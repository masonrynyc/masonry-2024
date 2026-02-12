import '@styles/globals.scss'
import AppProvider from '@state/AppState'
import PageTransition from '@components/PageTransition'
import PreviewProvider from '@components/PreviewProvider'
import { ReactLenis } from 'lenis/react'

export default function App({ Component, pageProps, router }) {
  if (router.route !== '/admin/[[...index]]') {
    return (
      <PreviewProvider previewToken={pageProps?.previewToken}>
        <AppProvider>
          {/* <ReactLenis
            root
            options={{
              duration: .25
            }}
          > */}
            <PageTransition location={router?.asPath}>
              <Component
                {...pageProps}
                key={router.route}
              />
            </PageTransition>
          {/* </ReactLenis> */}
        </AppProvider>
      </PreviewProvider>
    )
  }

  return (
    <Component
      {...pageProps}
      key={router.route}
    />
  )
}
