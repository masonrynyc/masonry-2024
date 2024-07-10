import image from '@queries/image'

export default `
	...,
	rows[] {
		...,
		item[] {
			...,
			_type == "image" => {
				${image}
			}
		}
	}
`