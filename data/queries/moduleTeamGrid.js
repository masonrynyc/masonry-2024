import richText from "@queries/richText"
import link from "@queries/link";
import image from "@queries/image"

export default `
	...,
	members[] {
		...,
		bio[] {
			${ richText }
		},
		links[] {
			${ link }
		},
		headshot {
			${ image }
		}
	}
`