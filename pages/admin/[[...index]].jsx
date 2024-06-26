import React from 'react'
import Head from 'next/head'
import { NextStudio, metadata } from 'next-sanity/studio'
import config from '@studio/sanity.config'

const StudioPage = () => {
  return (
    <div>
      <Head>
        {Object.entries(metadata).map(([key, value]) => (
          <meta key={key} name={key} content={value} />
        ))}
        <link rel="icon" type="image/png" sizes="any" href='/favicon.png' />
      </Head>
      <NextStudio config={config} />
    </div>
  )
}

export default StudioPage
