import React from 'react'

export const h1Render = props => <div className='sanity-pte h1'>{props.children}</div>
export const h2Render = props => <div className='sanity-pte h2'>{props.children}</div>
export const h3Render = props => <div className='sanity-pte h3'>{props.children}</div>
export const h4Render = props => <div className='sanity-pte h4'>{props.children}</div>
export const h5Render = props => <div className='sanity-pte h5'>{props.children}</div>
export const h6Render = props => <div className='sanity-pte h6'>{props.children}</div>

export const blockquoteRender = props => <div className='sanity-pte blockquote'>{props.children}</div>

export const bodySmallRender = props => (
  <div className='sanity-pte body-small'>{props.children}</div>
)

export const bodyRender = props => (
  <div className='sanity-pte body'>{props.children}</div>
)

export const bodyMediumRender = props => (
  <div className='sanity-pte body-medium'>{props.children}</div>
)

export const bodyLargeRender = props => (
  <div className='sanity-pte body-large'>{props.children}</div>
)