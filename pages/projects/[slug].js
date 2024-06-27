import React from 'react'
import { useRouter } from 'next/router'
import { getClient } from '@lib/sanity'
import groq from 'groq'
import Layout from '@components/Layout'
import PreviewWrapper from '@components/PreviewWrapper'
import ModuleRenderer from '@components/ModuleRenderer'
import projectQuery, { allProjects } from '@queries/project'
// Global Site Data
import settingsQuery from '@queries/settings'
import menusQuery from '@queries/menus'
import NotFoundPage from '@pages/404'
import Modules from '@components/Modules'

export const ProjectContent = ({ data, settings, menus, preview = false }) => {
  const router = useRouter()

  const page = data

  if (!router.isFallback && !data && !page) {
    return <NotFoundPage statusCode={404} />
  }

  if (!data || !page) {
    return false
  }

  const modules = page?.modules
  const refModules = page?.moduleRefs

  return (
    <Layout
      page={page}
      settings={settings}
      menus={menus}
      preview={preview}
    >
      <div className="px-margin py-v-space max-w-site-max-w mx-auto"><h1>{page.title}</h1></div>
      <Modules modules={modules} moduleRefs={refModules} />
    </Layout>
  )
}

const Project = ({
  data,
  settings,
  menus,
  preview,
  queryParams
}) => {
  if (preview) {
    return (
      <PreviewWrapper query={projectQuery} queryParams={queryParams} initialData={data}>
        <ProjectContent data={data} settings={settings} menus={menus} preview />
      </PreviewWrapper>
    )
  }

  return (
    <ProjectContent data={data} settings={settings} menus={menus} />
  )
}

export async function getStaticPaths() {
  // Set Paths and Filter out homepage
  const paths = await getClient().fetch(
    groq`${allProjects}`
  )

  return {
    paths: paths.map(({ slug }) => ({params: {slug}})),
    fallback: true
  }
}

export async function getStaticProps(context) {
  const slug = context?.params?.slug
  const queryParams = { slug: slug || '' }
  const previewToken = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;
  const preview = context?.draftMode ? previewToken : false;
  const sanityClient = getClient(preview)

  const [data, settings, menus] = await Promise.all([
    sanityClient.fetch(projectQuery, queryParams),
    sanityClient.fetch(settingsQuery),
    sanityClient.fetch(menusQuery)
  ])

  return {
    props: {
      data: data,
      settings: settings,
      menus: menus,
      preview: preview,
      previewToken: previewToken,
      queryParams: queryParams
    }
  }
}

export default Project