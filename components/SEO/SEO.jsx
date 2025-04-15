import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { getDocumentLink, getRoute, getShareTags } from '@utils/helpers'
import { buildSrc } from '@lib/imageHelpers'

function SEO ({
		settings,
		shareImage,
		page
	}) {

	if (!settings) {
		return false
	}

	const {
		siteTitle,
		title,
		pagePath,
		metaTitle,
		metaDescription,
		shareTitle,
		shareDescription
	} = getShareTags(process.env.NEXT_PUBLIC_SITE_URL, page, settings)

	const touchIcon = settings?.touchicon?.url || '/touch-icon.png'
	const favicon = settings?.favicon?.url || '/favicon.png'
	
	if (!shareImage) {
		shareImage = page?.seo?.shareGraphic?.asset || page?.featuredImage?.asset || settings?.seo?.shareGraphic?.asset
		if (shareImage) {
			shareImage = buildSrc(shareImage, { width: 1200, height: 630, quality: 90 })
		}
	}

	const joinedKeywords = keywordArray => {
		if (!keywordArray) {
			keywordArray = settings?.seo?.keywords || []
		}
		return keywordArray.join(', ')
	}

	// Keywords
	const metaKeywords = joinedKeywords(page?.seo?.keywords)

	const titleTemplate = metaTitle && pagePath !== 'home' ? (siteTitle + ' | ' + metaTitle) : (siteTitle + ' | Home')

	// Schema
	let schema = false
	let schemaAuthor = null

	if (page?.author) {
		schemaAuthor = {
			"@type": "Person",
			"name": page.author.name,
			"url": process.env.NEXT_PUBLIC_SITE_URL + getDocumentLink(page.author).to
		}
	}
	
	if (page?._type === 'post') {
		schema = [
			{
				"@context": "https://schema.org",
				"@type": "NewsArticle",
				"headline": title,
				"image": [shareImage],
				"datePublished": page._createdAt,
				"dateModified": page._updatedAt,
				"author": [schemaAuthor]
			},
			{
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				"itemListElement": [{
					"@type": "ListItem",
					"position": 1,
					"name": "Blog",
					"item": process.env.NEXT_PUBLIC_SITE_URL + '/' + getRoute.post
				},{
					"@type": "ListItem",
					"position": 2,
					"name": title
				}]
			}
		]
	}

	const pageLink = process.env.NEXT_PUBLIC_SITE_URL + getDocumentLink(page).to
	
	return (
		<>
			<Head>
				<meta charSet="utf-8"/>
				<meta httpEquiv="x-ua-compatible" content="ie=edge"/>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0, shrink-to-fit=no"/>
				<meta name="format-detection" content="telephone=no" />
				
				<title>{titleTemplate}</title>

				{/* Canonical URL */}
				<link rel="canonical" href={pageLink} />

				<meta name="keywords" content={metaKeywords}/>
				<meta name="description" content={metaDescription}/>
				{/* Twitter */}
				<meta name="twitter:title" content={shareTitle}/>
				<meta name="twitter:description" content={shareDescription}/>
				<meta name="twitter:card" content="summary_large_image"/>
				<meta name="twitter:image" content={shareImage}/>
				<meta name="twitter:site" content={siteTitle}/>

				{/* OG */}
				<meta prefix="og: http://ogp.me/ns#" property="og:site_name" content={siteTitle}/>
				<meta prefix="og: http://ogp.me/ns#" property="og:title" content={shareTitle}/>
				<meta prefix="og: http://ogp.me/ns#" property="og:url" content={pageLink}/>
				<meta prefix="og: http://ogp.me/ns#" property="og:type" content="website"/>
				<meta prefix="og: http://ogp.me/ns#" property="og:description" content={shareDescription}/>
				<meta prefix="og: http://ogp.me/ns#" property="og:image" content={shareImage}/>
				<meta prefix="og: http://ogp.me/ns#" property="og:image:width" content="1200"/>
				<meta prefix="og: http://ogp.me/ns#" property="og:image:height" content="630"/>
				<meta prefix="og: http://ogp.me/ns#" property="og:locale" content="en_US" />

				{/* Preconnect Domains */}
				<link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
				<link rel="preconnect" href="https://cdn.sanity.io" crossOrigin=""/>

				{/* Icons */}
				<link rel="icon" type="image/png" sizes="any" href={favicon}/>
				<link rel="apple-touch-icon" type="image/png" sizes="120x120" href={touchIcon}/>
				<link rel="stylesheet" href="https://use.typekit.net/otw8zea.css" />

				{/* Schema data (LD+JSON) */}
				{schema && (
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
					/>
				)}
			</Head>
		</>
	)
}

export default SEO
