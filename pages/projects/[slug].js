import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { getClient } from '@lib/sanity'
import groq from 'groq'
import Layout from '@components/Layout'
import PreviewWrapper from '@components/PreviewWrapper'
import Input from '@components/Input'
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
import { MdCheck } from 'react-icons/md'

const PASSWORD_EXPIRY_HOURS = 24

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
            <h3 className='h5 mb-4'>Project Type</h3>
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
          if (!cat?.title) {
            return false
          }
          return (
            <div className='button no-hover' key={cat.slug}>{cat.title}</div>
          )
        })}
      </div>
    </div>
  )
}

export const ProjectContent = ({
  data,
  settings,
  menus,
  projects,
  preview = false
}) => {
  const router = useRouter()
  const [infoOverlay, setInfoOverlay] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordFadeOut, setPasswordFadeOut] = useState(false)

  const toggleInfoPanel = visible => {
    if (!visible) {
      setInfoVisible(visible)
      setTimeout(() => {
        // Delay background fade out
        setInfoOverlay(visible)
      }, 700)
    } else {
      setInfoOverlay(visible)
      setInfoVisible(visible)
    }
  }

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

  const requiresPassword = project.security?.usePassword && project.security?.password

  useEffect(() => {
    if (!requiresPassword) return
    const storageKey = `project_access_${project.slug}`
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const { timestamp } = JSON.parse(stored)
        const hoursElapsed = (Date.now() - timestamp) / (1000 * 60 * 60)
        if (hoursElapsed < PASSWORD_EXPIRY_HOURS) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem(storageKey)
        }
      }
    } catch {
      localStorage.removeItem(storageKey)
    }
  }, [requiresPassword, project.slug])

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordInput === project.security.password) {
      localStorage.setItem(
        `project_access_${project.slug}`,
        JSON.stringify({ timestamp: Date.now() })
      )
      setPasswordError(false)
      setPasswordSuccess(true)
      setTimeout(() => setPasswordFadeOut(true), 1100)
      setTimeout(() => setIsAuthenticated(true), 1500)
    } else {
      setPasswordError(true)
      setShakeKey(prev => prev + 1)
    }
  }

  if (requiresPassword && !isAuthenticated) {
    return (
      <Layout
        page={project}
        settings={settings}
        menus={menus}
        preview={preview}
        hideMobileMenuButton={infoVisible}
      >
        <div className='h-[calc(var(--vh)*100-var(--full-header-height))] pb-full-header-height flex items-center justify-center px-margin'>
          <ScrollEntrance delay={6} className='py-v-space w-full max-w-[325px]'>
            <div>
              <div
                className="border rounded-full w-[70px] h-[70px] flex items-center justify-center mx-auto relative"
                style={{
                  transition: 'opacity 0.4s ease, margin 0.5s ease',
                  marginBottom: passwordSuccess ? 0 : 40,
                  opacity: passwordFadeOut ? 0 : 1,
                }}
              >
                <svg
                  viewBox="0 0 58.12 77.82"
                  className='w-[14px] block h-auto absolute'
                  style={{
                    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                    opacity: passwordSuccess ? 0 : 1,
                    transform: passwordSuccess ? 'translateY(100%)' : 'none',
                  }}
                >
                  <path class="cls-1" d="M54.7,33.93h-7.66v-15.95C47.04,8.06,38.97,0,29.06,0S11.35,7.68,11.09,17.58v16.35H3.42c-1.89,0-3.42,1.53-3.42,3.42v37.04c0,1.89,1.53,3.42,3.42,3.42h51.27c1.89,0,3.42-1.53,3.42-3.42v-37.04c0-1.89-1.53-3.42-3.42-3.42ZM18.08,17.67c.16-5.99,4.98-10.67,10.97-10.67s10.98,4.92,10.98,10.98v15.95h-21.95v-16.26Z"/>
                </svg>
                <MdCheck
                  size='24px'
                  className='absolute'
                  style={{
                    transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                    opacity: passwordSuccess ? 1 : 0,
                    transform: passwordSuccess ? 'none' : 'translateY(-50%)',
                  }}
                />
              </div>
            </div>
            <div>
              <div style={{
                transition: 'transform 0.5s ease, opacity 0.5s ease',
                transform: passwordSuccess ? 'translateY(200%)' : 'none',
                opacity: passwordSuccess ? 0 : 1,
                overflow: 'hidden',
              }}>
                <form onSubmit={handlePasswordSubmit}>
                  <Input
                    key={shakeKey}
                    placeholder='password'
                    className={`solid${passwordError ? ' shake' : ''}`}
                    inputClass='!text-center !h6 !pb-[2px]'
                    type='password'
                    name='password'
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    error={passwordError}
                    style={{
                      '--input-bg': 'rgba(255, 255, 255, .05)',
                      '--input-hover-bg': 'rgba(255, 255, 255, .075)',
                      '--input-focus-bg': 'rgba(255, 255, 255, .05)',
                      '--input-placeholder': 'rgba(255, 255, 255, .2)'
                    }}
                  />
                </form>
              </div>
            </div>
          </ScrollEntrance>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Layout
        page={project}
        settings={settings}
        menus={menus}
        preview={preview}
        hideMobileMenuButton={infoVisible}
        closeFn={infoVisible ? () => toggleInfoPanel(false) : false}
      >
        <ScrollEntrance delay={6}>
          <div className="px-margin pb-v-space-md max-w-site-max-w mx-auto md:hidden"><h1 className='h5 border-t pt-3'>{project.title}</h1></div>
          {(project?.introMedia?.image || project?.introMedia?.video) && (
            <Section
              setTheme='default'
              prevTheme={false}
              nextTheme='default'
              isFirstSection={true}
            >
              <div className="px-margin -mb-4 md:mb-0 md:-mt-[calc(var(--vertical-spacing-small)+10px)]">
                <div
                  style={{ '--bg-color': project?.introMedia.image?.palette?.darkVibrant?.background || '#000' }}
                  className="text-center h3 bg-[var(--bg-color)] relative rounded aspect-[1.135] md:aspect-video xl:aspect-[2.356]"
                >
                  <Media
                    className='rounded w-full absolute top-0 left-0 w-full h-full'
                    cover
                    media={project?.introMedia}
                  />
                </div>
              </div>
            </Section>
          )}
          <Section
            setTheme='default'
            prevTheme='default'
            nextTheme='default'
          >
            <div className='px-margin grid pb-2 md:pb-0'>
              <div className='grid md:grid-cols-12 gap-x-gutter md:-my-8'>
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
                <Button onClick={() => toggleInfoPanel(!infoVisible)}>Information</Button>
              </div>
            </div>
          </Section>
        </ScrollEntrance>

        <Modules modules={modules} nextSection={{ theme: 'default' }} />

        <ProjectGrid
          headline='Related Work.'
          setTheme='default'
          prevTheme='default'
          nextTheme={false}
          gridSize='small'
          projects={project.relatedProjects}
          // exclude={project}
          imageAspectLg='2.25'
          imageWrapperClassname='!h-auto'
        />
      </Layout>
      <div
        style={{
					opacity: infoOverlay ? 1 : 0,
					visibility: infoOverlay ? 'visible' : 'hidden'
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

  // Filter out coming soon projects
  const routes = paths.map(({ slug, comingSoon }) => ({params: {slug, comingSoon} })).filter(value => !value.params.comingSoon)

  return {
    paths: routes,
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