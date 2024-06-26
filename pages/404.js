import React from 'react'
import ScrollEntrance from '@components/ScrollEntrance'
import Button from '@components/Button'

const NotFoundPage = ({ data }) => {
  return (
    <div className='text-center py-v-space-sm'>
      <ScrollEntrance>
        <div><h1 className='m-0'>Oh no!</h1></div>
        <div className='pt-gutter'><Button to='/'>Go Home</Button></div>
      </ScrollEntrance>
    </div>
  )
}

export default NotFoundPage