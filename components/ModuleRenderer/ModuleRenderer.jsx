import React from 'react'
// plopImportModules
import ProjectGrid from '@components/ProjectGrid'
import Divider from '@components/Divider'
import TeamGrid from '@components/TeamGrid'
import TwoColumnText from '@components/TwoColumnText'
import Columns from '@components/Columns'
import TextSection from '@components/TextSection'
import BlogPosts from '@components/BlogPosts'
import FiftyFifty from '@components/FiftyFifty'
import WideMedia from '@components/WideMedia'
import { slugify } from '@utils/helpers'

const moduleMap = {
  // plopAddModules
	projectGrid: ProjectGrid,
	divider: Divider,
	teamGrid: TeamGrid,
	twoColumnText: TwoColumnText,
	columns: Columns,
	textSection: TextSection,
	blogPosts: BlogPosts,
	fiftyFifty: FiftyFifty,
	wideMedia: WideMedia
}

const ModuleRenderer = ({
  item,
  prevModule,
  nextModule,
  index,
  isLastSection,
  isFirstSection,
  id,
}) => {

  if (!item || !item?._type) {
    return false
  }

  const Module = moduleMap[item._type]

  if (!Module) {
    return false
  }

  return Module ? (
    <Module
      {...item}
      prevTheme={prevModule?.width !== 'fullWidth' ? prevModule?.theme : false}
      nextTheme={nextModule?.width !== 'fullWidth' ? nextModule?.theme : false}
      id={id || slugify(item.internalName)}
      isLastSection={isLastSection}
      isFirstSection={isFirstSection}
      index={index}
    />
  ) : null
}

export default ModuleRenderer
