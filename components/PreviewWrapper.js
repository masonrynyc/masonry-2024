import React, { useEffect, useState } from 'react'
import { useLiveQuery } from '@sanity/preview-kit'

export const PreviewWrapper = ({ children, query, queryParams, initialData = null }) => {  
  const [data] = useLiveQuery(initialData, query, queryParams);
  const [updatedAt, setUpdatedAt] = useState('now')

  useEffect(() => {
    if (data?._updatedAt) {
      setUpdatedAt(data._updatedAt)
    }
  }, [data])

  let child = React.cloneElement(children, {
    data: data,
    key: updatedAt
  })
    
  return (
    <>
      {child}
    </>
  )
}

export default PreviewWrapper