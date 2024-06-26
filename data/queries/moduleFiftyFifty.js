import media from '@queries/media'
import textLockup from '@queries/textLockup'

export default `
	...,
	media {
		${media}
	},
	text {
		${textLockup}
	}
`