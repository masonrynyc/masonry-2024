import {
  MdAlignHorizontalLeft,
  MdAlignHorizontalCenter,
  MdAlignHorizontalRight
} from "react-icons/md"
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from "react-icons/fi"
import IconUI from '@studio/components/IconUI'

const alignmentHorizontal = ({
  name = 'alignmentHorizontal',
  required = true,
  showRight = true,
  group = false,
  title = 'Horizontal Placement',
  initial = 'left',
  hidden = false,
} = {}) => {
  return (
    {
      name: name || 'alignmentHorizontal',
      title: title || 'Horizontal Placement',
      type: 'string',
      initialValue: initial,
      components: { input: IconUI },
      group: group,
      hidden: hidden,
      validation: Rule => required ? Rule.required() : null,
      options: {
        list: [
          { title: 'Left', value: 'left', icon: <FiAlignLeft/> },
          { title: 'Center', value: 'center', icon: <FiAlignCenter/> },
          showRight && { title: 'Right', value: 'right', icon: <FiAlignRight/> }
        ]
      }
    }
  )
}

export default alignmentHorizontal