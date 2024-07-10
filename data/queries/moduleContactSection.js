import richText from "@queries/richText"
import link from "@queries/link"

export default `
	...,
	leftColumn[] {
		...,
		title,
		links[] {
			${link}
		}
	},
	rightColumn[] {
		${richText}
	}
`