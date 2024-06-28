import { projectFragment } from '@queries/project'

export default `
	...,
  projects[] {
    ...,
    project -> {
      ...,
      ${projectFragment}
    }
  }
`