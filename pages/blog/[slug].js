import React from 'react'
import { useRouter } from 'next/router'
import { getClient } from '@lib/sanity'
import groq from 'groq'
import Layout from '@components/Layout'
import PreviewWrapper from '@components/PreviewWrapper'
import postQuery, { allPosts } from '@queries/post'
// Global Site Data
import globalsQuery from '@queries/globals'

import NotFoundPage from '@pages/404'
import RichText from '@components/RichText'
import Link from '@components/Link'
import ProfileImage from '@components/ProfileImage'
import Image from '@components/Image'
import dayjs from 'dayjs'
import { getDocumentLink } from '@utils/helpers'

export const PostContent = ({ data, settings, menus, preview = false }) => {
  const router = useRouter()

  const page = data

  if (!router.isFallback && !data && !page) {
    return <NotFoundPage statusCode={404} />
  }

  if (!data || !page) {
    return false
  }

  return (
    <Layout
      page={page}
      settings={settings}
      menus={menus}
      preview={preview}
    >
      <div className="px-margin py-v-space max-w-narrow mx-auto text-center">
        {page?.category && page?.category?.title && (
          <div className='mb-gutter'>
            <Link
              {...getDocumentLink(page?.category, false, false, false, 'View articles in category ' + page.category.title)}
              className="h6 inline-flex gap-x-2 items-center justify-start relative z-1 align-top"
            >
              {page?.category?.title}
            </Link>
          </div>
        )}

        <h1>{page.title}</h1>
        
        <div className="mt-4 flex items-center justify-center gap-x-gutter">
          {page.author && (
            <div>
              <Link
                {...getDocumentLink(page?.author, false, false, false, 'View articles by ' + page.author.name)}
                className="inline-flex gap-x-2 items-center justify-start relative z-1 align-top"
              >
                <ProfileImage
                  image={page?.author?.headshot}
                  title={page?.author?.name}
                />
                <p className='body-small'>by {page?.author?.name}</p>
              </Link>
            </div>
          )}
          <div className='body-small'>
            {dayjs(page?.publishedAt).format('MMMM D, YYYY')}
          </div>
        </div>
      </div>

      {page.featuredImage && (
        <div className="px-margin pb-v-space-sm max-w-narrow mx-auto">
          <Image
            transitionIn={false}
            image={page?.featuredImage}
            alt={page?.title + ' featured image'}
          />
        </div>
      )}
      
      {page?.body?.length && (
        <div className="px-margin pb-v-space max-w-narrow mx-auto">
          <RichText text={page?.body} />
        </div>
      )}
    </Layout>
  )
}

const Post = ({
  data,
  settings,
  menus,
  preview,
  queryParams
}) => {
  if (preview) {
    return (
      <PreviewWrapper query={postQuery} queryParams={queryParams} initialData={data}>
        <PostContent data={data} settings={settings} menus={menus} preview />
      </PreviewWrapper>
    )
  }

  return (
    <PostContent data={data} settings={settings} menus={menus} />
  )
}

export async function getStaticPaths() {
  // Set Paths and Filter out homepage
  const paths = await getClient().fetch(
    groq`${allPosts}`
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
    sanityClient.fetch(postQuery, queryParams),
    sanityClient.fetch(globalsQuery)
  ])

  return {
    props: {
      data: data,
      settings: globals?.settings,
      menus: globals?.menus,
      preview: preview,
      previewToken: previewToken,
      queryParams: queryParams
    }
  }
}

export default Post