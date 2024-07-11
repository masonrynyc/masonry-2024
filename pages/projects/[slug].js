import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getClient } from '@lib/sanity'
import groq from 'groq'
import Layout from '@components/Layout'
import PreviewWrapper from '@components/PreviewWrapper'
import projectQuery, { allProjects } from '@queries/project'
// Global Site Data
import settingsQuery from '@queries/settings'
import menusQuery from '@queries/menus'
import NotFoundPage from '@pages/404'
import Section from '@components/Section'
import ScrollEntrance from '@components/ScrollEntrance'
import Modules from '@components/Modules'
import RichText from '@components/RichText'
import Button from '@components/Button'
import ProjectGridSmall from '@components/ProjectGrid/ProjectGridSmall'
import Divider from '@components/Divider'
import TextSection from '@components/TextSection'

export const ProjectContent = ({ data, settings, menus, preview = false }) => {
  const router = useRouter()
  const [infoVisible, setInfoVisible] = useState(false)

  const project = data

  if (!router.isFallback && !data && !project) {
    return <NotFoundPage statusCode={404} />
  }

  if (!data || !project) {
    return false
  }

  const modules = project?.projectModules

  let wrapperClassname = `md:block grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--speed)] delay-[var(--delay-out)]`
	let innerClassname = `min-h-[var(--start-height)] invisible md:visible opacity-[var(--content-opacity)] md:opacity-100 transition-[visibility,opacity] duration-[var(--speed)] delay-[var(--delay-out)]`
	if (infoVisible) {
		wrapperClassname = `md:block grid grid-rows-[1fr] transition-[grid-template-rows] duration-[var(--speed)] delay-[var(--delay-in)]`
		innerClassname = 'min-h-max visible opacity-[var(--content-opacity)] md:opacity-100 transition-[visibility,opacity] duration-[var(--speed)] delay-[var(--delay-in)]'
	}

  return (
    <Layout
      page={project}
      settings={settings}
      menus={menus}
      preview={preview}
    >
      <ScrollEntrance delay={6}>
        <Section
          setTheme='default'
          prevTheme={false}
          nextTheme='default'
          isFirstSection={true}
        >
          <div className="px-margin py-v-space max-w-site-max-w mx-auto md:hidden"><h1 className='h5 border-t pt-3'>{project.title}</h1></div>
          <div className="px-margin">
            <div className="text-center h3 rounded bg-[#777] px-margin py-v-space">
              Intro Media
            </div>
          </div>
        </Section>
        <Section
          setTheme='default'
          prevTheme='default'
          nextTheme='default'
        >
          <div className='px-margin grid'>
            <div className='grid md:grid-cols-12 gap-x-gutter'>
              <div className="md:col-span-6 md:pb-v-space">
                <h2 className='h1'>{project.pageTitle}</h2>
              </div>
              <div className='hidden md:col-span-6 md:flex gap-[15px] md:justify-end items-start flex-wrap'>
                {project.categories.map(cat => {
                  return (
                    <div className='button no-hover' key={cat.slug}>{cat.title}</div>
                  )
                })}
              </div>
            </div>
            <div
              className={wrapperClassname}
              style={{
                '--start-height': '0px',
                '--speed': 'var(--slow-speed)',
                '--delay-in': '0ms',
                '--delay-out': '0ms',
                '--content-opacity': infoVisible ? 1 : 0,
                contain: 'paint'
              }}
            >
              <div className={innerClassname}>
                <div className='grid md:grid-cols-12 gap-x-gutter gap-y-v-space-sm pt-7 md:pt-0'>

                  <div className='md:hidden flex gap-[15px] md:justify-end items-start flex-wrap'>
                    {project.categories.map(cat => {
                      return (
                        <div className='button no-hover' key={cat.slug}>{cat.title}</div>
                      )
                    })}
                  </div>

                  <div className='grid gap-y-6 md:col-span-5'>
                    {project?.projectMeta?.client && (
                      <div className='border-t pt-3'>
                        <h3 className='h5 mb-4'>Client</h3>
                        {project.projectMeta.client}
                      </div>
                    )}

                    {project?.projectMeta?.project && (
                      <div className='border-t pt-3'>
                        <h3 className='h5 mb-4'>Project</h3>
                        {project.projectMeta.project}
                      </div>
                    )}
                    
                    {project?.services && project?.services?.length > 0 && (
                      <div className='border-t pt-3'>
                        <h3 className='h5 mb-4'>Services</h3>
                        {project.services.join(', ')}
                      </div>
                    )}
                  </div>

                  <div className='border-t pt-3 md:col-span-7'>
                    <RichText text={project.body}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden pt-7">
              <Button onClick={() => setInfoVisible(!infoVisible)}>Information</Button>
            </div>
          </div>
        </Section>
      </ScrollEntrance>
      <Modules modules={modules} nextSection={{ theme: 'default' }} />
      <Divider
        setTheme='default'
        prevTheme='default'
        nextTheme='default'
      />
      <ProjectGridSmall
        headline='Related Work.'
        setTheme='default'
        prevTheme='default'
        nextTheme={false}
      />
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