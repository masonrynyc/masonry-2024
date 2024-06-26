import React from 'react'
import { useRouter } from 'next/router'
import { getClient } from '@lib/sanity'
import groq from 'groq'
import Layout from '@components/Layout'
import PreviewWrapper from '@components/PreviewWrapper'
import pageQuery, { allPages } from '@queries/page'
// Global Site Data
import globalsQuery from '@queries/globals'

import NotFoundPage from '@pages/404'
import Modules from '@components/Modules'

export const PageContent = ({ data, settings, menus, preview = false }) => {
  const router = useRouter()

  if (!router.isFallback && !data && !data?.page) {
    return <NotFoundPage statusCode={404} />
  }

  if (!data) {
    return false
  }

  const page = data
  const modules = page?.modules
  const refModules = page?.moduleRefs

  return (
    <Layout
      page={page}
      settings={settings}
      menus={menus}
      preview={preview}
    >
      <Modules modules={modules} moduleRefs={refModules} />
    </Layout>
  )
}

const Page = ({
  data,
  settings,
  menus,
  preview,
  queryParams
}) => {
  if (preview) {
    return (
      <PreviewWrapper query={pageQuery} queryParams={queryParams} initialData={data}>
        <PageContent data={data} settings={settings} menus={menus} preview />
      </PreviewWrapper>
    )
  }

  return (
    <PageContent data={data} settings={settings} menus={menus} />
  )
}

export async function getStaticPaths() {
  // Set Paths and Filter out homepage
  const paths = await getClient().fetch(
    groq`${allPages}`
  )

  return {
    paths: paths.map(({ slug }) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const slug = context?.params?.slug
  const queryParams = { slug: slug || '' }
  const previewToken = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;
  const preview = context?.draftMode ? previewToken : false;
  const sanityClient = getClient(preview)

  const [data, globals] = await Promise.all([
    sanityClient.fetch(pageQuery, queryParams),
    sanityClient.fetch(globalsQuery)
  ])

  return {
    props: {
      data: data,
      settings: globals.settings,
      menus: globals.menus,
      preview: preview,
      previewToken: previewToken,
      queryParams: queryParams
    }
  }
}

export default Page