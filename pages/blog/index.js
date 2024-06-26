import React from 'react'
import { useRouter } from 'next/router'
import NotFoundPage from '@pages/404'
import { getClient } from '@lib/sanity'
import Layout from '@components/Layout'
import PreviewWrapper from '@components/PreviewWrapper'
import pageQuery from '@queries/page'
import { allPosts } from '@queries/post'
// Global Site Data
import globalsQuery from '@queries/globals'

import BlogPostGrid from '@components/BlogPostGrid'
import Modules from '@components/Modules'

export const PageContent = ({ data, posts, settings, menus, preview = false }) => {
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
      <BlogPostGrid
        theme='default'
        posts={posts}
        prevTheme={false}
        nextTheme={data?.modules?.length > 0 ? data?.modules[0]?.theme : false}
      />
      <Modules modules={modules} moduleRefs={refModules} />
    </Layout>
  )
}

const Blog = ({
  data,
  posts,
  settings,
  menus,
  preview,
  queryParams
}) => {
  if (preview) {
    return (
      <PreviewWrapper query={pageQuery} queryParams={queryParams} posts={data}>
        <PageContent data={data} posts={posts} settings={settings} menus={menus} preview />
      </PreviewWrapper>
    )
  }

  return (
    <PageContent data={data} posts={posts} settings={settings} menus={menus} />
  )
}

export async function getStaticProps(context) {
  const queryParams = { slug: 'blog' }
  const postQueryParams = {}
  const previewToken = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;
  const preview = context?.draftMode ? previewToken : false;
  const sanityClient = getClient(preview)
  
  const [data, posts, globals] = await Promise.all([
    sanityClient.fetch(pageQuery, queryParams),
    sanityClient.fetch(allPosts, postQueryParams),
    sanityClient.fetch(globalsQuery)
  ]);

  return {
    props: {
      data: data,
      posts: posts,
      settings: globals?.settings,
      menus: globals?.menus,
      preview: preview,
      previewToken: previewToken,
      queryParams: queryParams
    }
  }
}

export default Blog
