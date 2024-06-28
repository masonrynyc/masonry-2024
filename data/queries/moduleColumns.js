import image from '@queries/image'
import richText from '@queries/richText'
import link from '@queries/link'

export default `
	...,
	columnItems[] {
		...,
		"image": photo {
			${image}
		},
		text[] {
			${richText}
		}
	},
	actions[] {
		${link}
	}
`