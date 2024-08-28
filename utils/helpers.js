import project from "@queries/project"

export const slugify = (text, separator = '-') => {
	if (!text) {
		return ''
	}
	return text
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, separator)
}

export const formatPhone = phoneNumberString => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}

export const capitalize = string => {
  if (string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1)
  } else {
    return false
  }
}

const distillModuleText = modules => {
	let text = false
	if (modules && modules?.length > 0) {
		modules.forEach(module => {
			if (module?.text?.excerpt && !text) {
				text = module.text.excerpt
			}
		})
	}
	return text
}

export const getShareTags = (host, page, settings) => {
	let metaDescription = page?.seo?.metaDesc || distillModuleText(page?.modules) || settings?.seo?.metaDesc
	let shareDescription = page?.seo?.shareDesc || distillModuleText(page?.modules) || settings?.seo?.shareDesc

	let pageTitleOverride = false
	if (page?._type === 'project') {
		pageTitleOverride = page.subtitle
	}

	if (page?._type === 'post') {
		if (page?.excerpt) {
			metaDescription = portableToPlainText(page.excerpt)
			shareDescription = portableToPlainText(page.excerpt)
		} else if (page?.body) {
			metaDescription = portableToPlainText(page.body)
			shareDescription = portableToPlainText(page.body)
		}
	}

	return {
		host: host,
		siteTitle: settings?.title || process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
		title: pageTitleOverride || page?.title,
		pagePath: page?.slug,
		metaTitle: page?.seo?.metaTitle || pageTitleOverride || page?.title,
		metaDescription: metaDescription,
		shareTitle: page?.seo?.shareTitle || pageTitleOverride || page?.title,
		shareDescription: shareDescription
	}
}

export const getSlugLink = (link, prefix, hash = '', urlParams = '') => {
	const currentLink = link
	if (!hash || hash === '---') {
		hash = ''
	}
	if (hash) {
		hash = '#' + hash
	}
	if (urlParams && urlParams !== null) {
		urlParams = '?' + urlParams
	} else {
		urlParams = ''
	}
	if (currentLink && prefix) {
		return '/' + prefix + '/' + currentLink + urlParams + hash
	} else if (currentLink === 'home') {
		return '/' + urlParams + hash
	} else if (currentLink) {
		return '/' + currentLink + urlParams + hash
	}
	return '/' + urlParams + hash
}

export const getRoute = {
	page: false,
	// plopAddDocumentType
	project: 'projects',
	post: 'blog',
	category: 'blog/category',
	author: 'blog/author',
}

export const getDocumentLink = (document, section, urlParams, newTab, title) => {
	let slug = document?.slug
	const docTitle = document?.title || document?.name
	if (!slug) {
		slug = slugify(docTitle)
	}
	const type = document?._type
	let renderedLink = {
  	to: getSlugLink(slug, getRoute[type], section, urlParams),
  	external: false,
  	target: newTab ? '_blank' : '',
  	title: title || 'Go to ' + docTitle,
		name: title || 'Go to ' + docTitle
 	}
	return renderedLink
}

export const getLinkProps = item => {
  const linkSlug = item?.link?.slug
  const urlParams = item?.url_parameters
  const section = item?.linkSection || ''

  const {
    title,
    newTab,
    externalLink,
    file,
    phoneLink,
    emailLink,
    type
  } = item

  let renderedLink = {
  	to: getSlugLink(linkSlug, getRoute[item?.link?._type], section, urlParams),
  	external: false,
  	target: newTab ? '_blank' : '',
  	title: title,
		name: title
 	}
  if (type === 'externalLink') {
    renderedLink.to = externalLink
    renderedLink.external = true

  } else if (type === 'fileLink') {
  	const fileUrl = getFile(file?.asset)?.url
    renderedLink.to = fileUrl
    renderedLink.external = true

  } else if (type === 'phoneLink') {
    renderedLink.to = 'tel:' + phoneLink
    renderedLink.external = true

  } else if (type === 'emailLink') {
    renderedLink.to = 'mailto:' + emailLink
    renderedLink.external = true
  }
  return renderedLink
}

export const portableToPlainText = (blocks = []) => {
  return blocks
    // loop through each block
    .map(block => {
      // if it's not a text block with children, 
      // return nothing
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      // loop through the children spans, and join the
      // text strings
      return block.children.map(child => child.text).join('')
    })
    // join the paragraphs leaving split by two linebreaks
    .join('\n\n')
}

export const getPluralLabel = (base, array) => {
	const count = array ? array?.length : 0
	let label = base
	if (count !== 1) {
		label = base + 's'
	}
	const phrase = count + ' ' + label
	return phrase
}

export const isBrowser = typeof window !== 'undefined'

export const isMobileSafari = () => {
  if (!isBrowser) return

  return navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/)
    ? true
    : false
}