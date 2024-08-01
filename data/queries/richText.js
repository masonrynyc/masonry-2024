import image from '@queries/image'
import link from '@queries/link'

export default `
	...,
	markDefs[]{
		...,
		_type == "link" => {
			${link}
		},
		_type == "rotatingText" => {
			...
		}
	},
	_type == "inlineImage" => {
		${image}
	},
	_type == "button" => {
		${link}
	}
`