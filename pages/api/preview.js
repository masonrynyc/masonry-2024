import { getRoute } from '@utils/helpers'

export default async function preview(req, res) {
  // determine route path. ie: /blog/article-title vs /article-title
  const routePath = getRoute[req?.query?.type]

  res.setDraftMode({ enable: true })

  let redirectPath = `/`
  if (req.query.slug !== 'home' && req?.query?.slug) {
    redirectPath = `/${routePath ? `${routePath}/` : ''}${req.query.slug}`
  }

  // Redirect to the associated page
  // res.redirect(redirectPath)
  res.writeHead(307, { Location: redirectPath })
  res.end()
}
