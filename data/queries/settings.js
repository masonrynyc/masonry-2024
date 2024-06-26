import link from '@queries/link'
import image from '@queries/image'

export default `
	*[_type == "siteSettings"][0]{
		...,
		seo {
			...,
			shareGraphic {
				${image}
			}
		},
		title,
		description,
		topBanner{
			bannerLink{
				...,
				${link}
			}
		},
		footerSettings{
			...,
			footerImage{
			${image}
			}
		},
		favicon{
			${image}
		},
		touchicon{
			${image}
		},
	}
`
