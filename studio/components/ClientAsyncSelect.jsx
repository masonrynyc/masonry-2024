import React, { useState, useEffect } from 'react'
import { Card, Stack, Select } from '@sanity/ui'
import { set, unset, useClient, useFormValue } from 'sanity'
import { slugify } from '@utils/helpers'

const ClientAsyncSelect = React.forwardRef((props, ref) => {

  const [listItems, setListItems] = useState([])

  const client = useClient({ apiVersion: '2023-05-03' })

  const parentArray = props.path.slice(0, -1)
  const parent = useFormValue(parentArray);

  const { 
    value,        // Current field value
    readOnly,     // Boolean if field is not editable
    onFocus,      // Method to handle focus state
    onBlur,       // Method to handle blur state  
    onChange,      // Method to handle patch events,
  } = props

  if (!parent?.link) {
    return false
  }

  // Creates a change handler for patching data
  const handleChange = React.useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value // get current value
      // if the value exists, set the data, if not, unset the data
      onChange(inputValue ? set(inputValue) : unset())
    },
    [onChange]
  )

  const inputId = (length = 6) => {
    return Math.random().toString(36).substring(2, length+2)
  }

  useEffect(() => {
    const getSections = async () => {
      const items = await client.fetch(`*[_id == $id][0].modules[]`, {id: parent?.link?._ref})
      setListItems(items)
    }

    getSections()
  }, [parent?.link])

  if (!listItems || listItems?.length < 1) {
    return false
  }

	return (
    <Card padding={0}>
      <Stack>
        <Select
          id={inputId}
          value={value}
          readOnly={readOnly}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
          onChange={handleChange}
          disabled={!listItems || listItems.length < 1}
        >
          <option value='---'>{listItems ? '— Select Page Section —' : 'This page has no sections'}</option>
          {listItems?.map(item => (
            <option 
              key={item._key} 
              value={item?.internalName ? slugify(item.internalName) : 'This page has no sections'}
            >
              {item.internalName}
            </option>
          ))}
        </Select>
      </Stack>
    </Card>
	)
})

export default ClientAsyncSelect