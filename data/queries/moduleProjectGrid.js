import { projectFragment } from '@queries/project'
import link from '@queries/link'

export default `
	...,
  projects[] {
    ...,
    project -> {
      ...,
      ${projectFragment}
    }
  },
  actions[] {
    ${link}
  }
`