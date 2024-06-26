import {
  MdAlignVerticalTop,
  MdAlignVerticalCenter,
  MdAlignVerticalBottom,
} from "react-icons/md"
import IconUI from '@studio/components/IconUI'

const alignmentVertical = (required = true) => {
  return (
    {
      name: 'alignmentVertical',
      title: 'Vertical Placement',
      type: 'string',
      initialValue: 'center',
      components: { input: IconUI },
      validation: Rule => required ? Rule.required() : null,
      options: {
        list: [
          { title: 'Top', value: 'top', icon: <MdAlignVerticalTop/> },
          { title: 'Center', value: 'center', icon: <MdAlignVerticalCenter/> },
          { title: 'Bottom', value: 'bottom', icon: <MdAlignVerticalBottom/> }
        ]
      }
    }
  )
}

export default alignmentVertical