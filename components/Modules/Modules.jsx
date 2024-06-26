import React from 'react'
import ModuleRenderer from '@components/ModuleRenderer'

const Modules = ({
  modules = false,
  moduleRefs = false,
  prevSection = false, // Manually Set Previous Section
  nextSection = false // Manually Set Next Section
}) => {

	if ((!modules || modules.length < 1) && !moduleRefs) {
		return false
	}

	const getAllIndexes = (arr, key, val) => {
    var indexes = [];
    modules?.forEach((module, index) => {
      if (module[key] === val) {
        indexes.push(index)
      }
    })
    return indexes
  }

  const referenceModuleIndexes = getAllIndexes(modules, '_type', 'reference')

  // Merge reusable modules into module array
  if (referenceModuleIndexes && referenceModuleIndexes.length > 0) {
    referenceModuleIndexes.forEach(refIndex => {
      if (modules[refIndex] && moduleRefs[refIndex]?.content) {
        modules[refIndex] = moduleRefs[refIndex]?.content[0]
      }
    })
  }

	// Remove Hidden Modules
	modules = modules?.filter(module => module.hidden !== true)
	
	return (
		<>
			{modules.map((item, index) => {
				let prevModule = prevSection || false
        let nextModule = nextSection || false
        if (index > 0 && !prevSection) {
          prevModule = modules[index - 1]
        }
        if (index + 1 !== modules.length && !nextSection) {
          nextModule = modules[index + 1]
        }

				return (
					<ModuleRenderer
            key={(item?._key || item?._id) + '_' + index}
            item={item}
            prevModule={prevModule}
            nextModule={nextModule}
            isFirstSection={index === 0 && !prevModule}
						isLastSection={index + 1 === modules.length && !nextModule}
          />
				)
			})}
		</>
	)
}

export default Modules
