import React, { useCallback } from 'react'
import { set, unset } from 'sanity'
import { Label } from '@sanity/ui'

export const IconUI = React.forwardRef((props, ref) => {

	const { value, onChange } = props
	const options = props?.schemaType?.options?.list

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
  	<div>
  		<div style={{ display: 'flex', flexWrap: 'wrap', width: '75%', paddingRight: '11px' }}>
	  		{options.map((item, index) => {
	  			let checked = item.value == value

					if (item.value === 0 && value == undefined) {
						checked = true
					}

	  			const itemId = createId()
	  			if (!item) {
	  				return false
	  			}
	  			return (
		  			<div key={itemId}>
		  				<label
		  					htmlFor={itemId}
		  					title={item.title}
		  					style={{
		  						display: 'flex',
		  						alignItems: 'center',
		  						justifyContent: 'center',
			  					minWidth: '42px',
			  					minHeight: '36px',
			  					fontSize: item.icon ? '24px' : '13px',
			  					fontWeight: item.icon ? 'normal' : '600',
			  					boxSizing: 'border-box',
			  					marginRight: options.length !== index + 1 ? '-1px' : '0',
									marginBottom: options.length !== index + 1 ? '-1px' : '0',
			  					position: 'relative',
			  					padding: item.icon && !item.showLabel ? '0' : '0 10px',
			  					border: '1px solid var(--card-border-color)',
			  					zIndex: checked ? '2' : '1',
			  					cursor: 'pointer',
			  					whiteSpace: 'nowrap',
									columnGap: '6px'
			  				}}
		  				>
		  					{item.icon || item.title}
								{item.showLabel && <Label size={1}>{item.title}</Label>}
		  					<div
			  					style={{
			  						display: checked ? 'block' : 'none',
			  						position: 'absolute',
			  						top: '-1px',
			  						left: '-1px',
			  						bottom: '-1px',
			  						right: '-1px',
			  						border: '2px solid var(--card-focus-ring-color)',
			  					}}
			  				/>
		  				</label>
			  			<input
			  				type='radio'
			  				value={item.value}
			  				id={itemId}
			  				onChange={handleChange}
			  				checked={checked}
			  				name={inputId + 'fieldset'}
			  				style={{ display: 'none' }}
			  			/>
		  			</div>
		  		)
	  		})}
  		</div>
    </div>
  )
})

export default IconUI
