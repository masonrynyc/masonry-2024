// plopImportModules
import moduleContactSection from '@queries/moduleContactSection'
import moduleProjectGrid from '@queries/moduleProjectGrid'
import moduleDivider from '@queries/moduleDivider'
import moduleTeamGrid from '@queries/moduleTeamGrid'
import moduleTwoColumnText from '@queries/moduleTwoColumnText'
import moduleColumns from '@queries/moduleColumns'
import moduleTextSection from '@queries/moduleTextSection'
import moduleBlogPosts from '@queries/moduleBlogPosts'
import moduleFiftyFifty from '@queries/moduleFiftyFifty'
import moduleWideMedia from '@queries/moduleWideMedia'

export default `
  // plopAddModules
	_type == "contactSection" => { ${moduleContactSection} },
	_type == "projectGrid" => { ${moduleProjectGrid} },
	_type == "divider" => { ${moduleDivider} },
	_type == "teamGrid" => { ${moduleTeamGrid} },
	_type == "twoColumnText" => { ${moduleTwoColumnText} },
	_type == "columns" => { ${moduleColumns} },
	_type == "textSection" => { ${moduleTextSection} },
	_type == "blogPosts" => { ${moduleBlogPosts} },
	_type == "wideMedia" => { ${moduleWideMedia} },
  _type == "fiftyFifty" => { ${moduleFiftyFifty} },
  _type == "reference" => { ... }
`

export const projectModules = `
	...
`