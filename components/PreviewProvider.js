import React, { useMemo } from 'react'
import { getClient } from '@lib/sanity'
import { LiveQueryProvider } from '@sanity/preview-kit'

export default function PreviewProvider({
  children,
  previewToken
}) {
  const client = useMemo(() => getClient(previewToken), [previewToken])
  return <LiveQueryProvider
    client={client}
    token={previewToken}
    logger={console}
    refreshInterval={100}
  >{children}</LiveQueryProvider>
}