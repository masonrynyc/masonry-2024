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
import Media from '@components/Media'
import ScrollEntrance from '@components/ScrollEntrance'
import Modules from '@components/Modules'
import RichText from '@components/RichText'
import Button from '@components/Button'
import ProjectGrid from '@components/ProjectGrid'
import Divider from '@components/Divider'
import TextSection from '@components/TextSection'

const ProjectInfo = ({ project, className = '', ...rest }) => {
  return (
    <div
      className={`${className} grid md:grid-cols-12 gap-x-gutter gap-y-v-space-sm pt-7 md:pt-0`}
      {...rest}
    >
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

      <div className='border-t pt-v-space-sm md:pt-3 md:col-span-7'>
        <RichText text={project.body}/>
      </div>

      <div className='md:hidden flex gap-[15px] md:justify-end items-start flex-wrap'>
        {project?.categories?.map(cat => {
          return (
            <div className='button no-hover' key={cat.slug}>{cat.title}</div>
          )
        })}
      </div>
    </div>
  )
}

export const ProjectContent = ({ data, settings, menus, projects, preview = false }) => {
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

  let projectCats = []
  project?.categories?.forEach(cat => projectCats?.push(cat?.slug))


  // console.log(projectCats)

  return (
    <>
      <Layout
        page={project}
        settings={settings}
        menus={menus}
        preview={preview}
        hideMobileMenuButton={infoVisible}
        closeFn={infoVisible ? () => setInfoVisible(false) : false}
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
              <div
                style={{ '--bg-color': project?.featuredImage?.palette?.darkVibrant?.background || '#000' }}
                className="text-center h3 bg-[var(--bg-color)] rounded"
              >
                <Media
                  className='rounded w-full'
                  ratio={2}
                  media={{
                    image: project?.featuredImage,
                    video: project?.featuredVideo,
                    mediaType: project?.featuredVideo ? 'video' : 'image'
                  }}
                />
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
                  <h2 className='h1'>{project?.pageTitle}</h2>
                </div>
                <div className='hidden md:col-span-6 md:flex gap-[15px] md:justify-end items-start flex-wrap'>
                  {project?.categories?.map(cat => {
                    return (
                      <div className='button no-hover' key={cat.slug}>{cat.title}</div>
                    )
                  })}
                </div>
              </div>
              <div className='hidden md:block'>
                <ProjectInfo project={project}/>
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
        <ProjectGrid
          headline='Related Work.'
          setTheme='default'
          prevTheme='default'
          nextTheme={false}
          filterCats={projectCats}
          gridSize='small'
          projects={projects}
          exclude={project}
          limit={3}
        />
      </Layout>
      <div
        style={{
					opacity: infoVisible ? 1 : 0,
					visibility: infoVisible ? 'visible' : 'hidden'
				}}
        className={`overflow-auto transition-all duration-slow md:hidden px-margin py-header-height fixed top-0 left-0 w-full h-full bg-bg z-2`}
      >
        <ProjectInfo
          project={project}
          className='scroll-entrance'
          data-in-view={infoVisible}
          style={{ '--delay-value': 6 }}
        />
      </div>
    </>
  )
}

const Project = ({
  data,
  projects,
  settings,
  menus,
  preview,
  queryParams
}) => {

  console.log(projects)

  if (preview) {
    return (
      <PreviewWrapper query={projectQuery} queryParams={queryParams} initialData={data}>
        <ProjectContent data={data} projects={projects} settings={settings} menus={menus} preview />
      </PreviewWrapper>
    )
  }

  return (
    <ProjectContent data={data} projects={projects} settings={settings} menus={menus} />
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

  const [data, projects, settings, menus] = await Promise.all([
    sanityClient.fetch(projectQuery, queryParams),
    sanityClient.fetch(allProjects),
    sanityClient.fetch(settingsQuery),
    sanityClient.fetch(menusQuery)
  ])

  return {
    props: {
      data: data,
      projects: projects,
      settings: settings,
      menus: menus,
      preview: preview,
      previewToken: previewToken,
      queryParams: queryParams
    }
  }
}

export default Project