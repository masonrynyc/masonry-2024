import link from '@queries/link'

export default `
	*[_type == "menu"]{
		title,
		"slug": slug.current,
		location,
		items[]{
			_key,
			_type,
			"link": itemLink{
				${link}
			},
			sublinks[]{
				${link}
			}
		}
	}
`
