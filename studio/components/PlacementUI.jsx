import React, { useCallback } from 'react'
import { set, unset } from 'sanity'

export const PlacementUI = React.forwardRef((props, ref) => {
	const {
		value,
		onChange
	} = props

	const options = props?.schemaType?.options?.list

	const handleChange = useCallback(
		event => {
			const inputValue = event.currentTarget.value
			onChange(inputValue ? set(inputValue) : unset())
		},
		[onChange]
	)

	const inputId = (length = 6) => { return Math.random().toString(36).substring(2, length+2) }

  return (
  	<div>
  		<div style={{
				width: '60px',
				height: '60px',
				position: 'relative',
				marginLeft: '-4px'
			}}>
	  		{options.map((item, index) => {
	  			const checked = item.value == value
					const itemId = (length = 6) => {
						return Math.random().toString(36).substring(2, length+2)
					}
					
					const positions = {
						left: 0,
						center: 'calc(50% - 10px)',
						right: 'calc(100% - 20px)',
						top: 0,
						middle: 'calc(50% - 10px)',
						bottom: 'calc(100% - 20px)',
					}

					const placementArray = item.value.split('-')
					placementArray[0] // X Position
					placementArray[1] // Y Position

	  			if (!item) {
	  				return false
	  			}
	  			return (
						<label
							key={itemId}
							htmlFor={itemId}
							title={item.title}
							style={{
								width: '20px',
								height: '20px',
								boxSizing: 'border-box',
								padding: '4px',
								display: 'block',
								position: 'absolute',
								top: positions[placementArray[1]],
								left: positions[placementArray[0]]
							}}
						>
							<div
								style={{
									width: '100%',
									height: '100%',
									display: 'block',
									border: checked ? '2px solid var(--card-focus-ring-color)' : '2px solid var(--card-border-color)',
									background: checked ? 'var(--card-focus-ring-color)' : 'transparent'
								}}
							/>
							<input
								type='radio'
								value={item.value}
								id={itemId}
								onChange={handleChange}
								checked={checked}
								name={inputId + 'fieldset'}
								style={{ display: 'none' }}
							/>
						</label>
		  		)
	  		})}
  		</div>
    </div>
  )
})

export default PlacementUI
