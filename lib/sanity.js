import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const options = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'
}

export const client = createClient(options)
export const imageBuilder = imageUrlBuilder(client)

//
export const getClient = (preview) => {
  const client = createClient({
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
    // studioUrl: process.env.NEXT_PUBLIC_STUDIO_URL,
    // encodeSourceMap: preview ? true : 'auto'
    perspective: preview ? 'previewDrafts' : 'published'
  })

  if (preview) {
    return client.withConfig({
      token: preview,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      cache: undefined
    })
  }

  return client
}