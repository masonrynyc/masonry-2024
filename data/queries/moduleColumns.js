import image from '@queries/image'
import richText from '@queries/richText'

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
	}
`