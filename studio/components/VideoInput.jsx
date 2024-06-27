import React, { useCallback } from 'react'
import { set, unset } from 'sanity'
import { Flex, Card, TextInput } from '@sanity/ui'
import MediaThumbnail from './MediaThumbnail'

export const VideoInput = React.forwardRef((props) => {
	const { value, onChange } = props

	const handleChange = useCallback(
		event => {
			let inputValue = event.currentTarget.value
			onChange(inputValue ? set(inputValue) : unset())
		},
		[onChange]
	)

  if (!value) {
    return (
      <TextInput
        onChange={handleChange}
        value={value}
      />
    )
  }

  return (
  	<Card border>
  		<Flex align='center'>
        {value && (
          <div className="aspect-video relative" style={{ width: '120px' }}>
            <MediaThumbnail
              media={{
                mediaType: 'video',
                video: { id: value }
              }}
            />
          </div>
        )}
        <Card flex={1}>
          <div style={{ padding: '0 14px' }}>
            <TextInput
              onChange={handleChange}
              value={value}
            />
          </div>
        </Card>
  		</Flex>
    </Card>
  )
})

export default VideoInput
