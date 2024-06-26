import React from 'react'
import groq from 'groq'
import { getClient } from '@lib/sanity'
import Layout from '@components/Layout'
import PreviewWrapper from '@components/PreviewWrapper'
import authorQuery from '@queries/author'
// Global Site Data
import globalsQuery from '@queries/globals'

import { postsByAuthor } from '@queries/post'
import BlogPostGrid from '@components/BlogPostGrid'

const AuthorContent = ({ page, settings, menus, posts, preview = false }) => {
  return (
    <Layout
      page={page}
      settings={settings}
      menus={menus}
      preview={preview}
    >
      <BlogPostGrid
        theme='default'
        title={'Articles by ' + page?.name}
        posts={posts}
        prevTheme={false}
        nextTheme={false}
      />
    </Layout>
  )
}

const Author = ({
  data,
  settings,
  menus,
  posts,
  preview,
  queryParams
}) => {
  const page = data

  if (!page) {
    return false
  }

  if (preview) {
    return (
      <PreviewWrapper query={authorQuery} queryParams={queryParams} initialData={data}>
        <AuthorContent page={page} settings={settings} menus={menus} posts={posts} preview />
      </PreviewWrapper>
    )
  }

  return (
    <AuthorContent page={page} settings={settings} menus={menus} posts={posts} />
  )
}

export async function getStaticPaths() {
  // Set Paths and Filter out homepage
  const paths = await getClient().fetch(
    groq`*[_type == "author" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const slug = context?.params?.slug
  const queryParams = { slug: slug || '' }
  const previewToken = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;
  const preview = context?.draftMode ? previewToken : false;
  const sanityClient = getClient(preview)
  
  const [data, posts, globals] = await Promise.all([
    sanityClient.fetch(authorQuery, queryParams),
    sanityClient.fetch(postsByAuthor, queryParams),
    sanityClient.fetch(globalsQuery)
  ])

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

export default Author
