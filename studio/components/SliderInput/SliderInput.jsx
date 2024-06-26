import React, { useCallback } from 'react'
import { set, unset } from 'sanity'
import { Label } from '@sanity/ui'
// import './slider-input.css'

export const SliderInput = React.forwardRef((props, ref) => {
	const { value, onChange } = props

	const handleChange = useCallback(
		event => {
			let inputValue = event.currentTarget.value
			if (props?.schemaType?.jsonType === 'number') {
				inputValue = Number.parseFloat(event.currentTarget.value || 0)
			}
			onChange(inputValue ? set(inputValue) : unset())
		},
		[onChange]
	)

	const createId = (length = 6) => {
    return Math.random().toString(36).substring(2, length+2)
  }

	const inputId = createId()

  return (
  	<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-start',
			columnGap: '10px'
		}}>
			<input
				type="range"
				min="0"
				max="100"
				value={value}
				className="slider-input"
				id={inputId}
				onChange={handleChange}
			/>
			<Label>{value}</Label>
    </div>
  )
})

export default SliderInput
