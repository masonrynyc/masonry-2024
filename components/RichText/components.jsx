import React from 'react'
import Image from '@components/Image'
import Video from '@components/Video'
import Link from '@components/Link'
import Button from '@components/Button'
import { getLinkProps } from '@utils/helpers'
// import vimeoVideo from '@components/Video/vimeoVideo'
// import { getSlugLink } from 'utils/format'

const getClassName = (className = ' ', first, last) => {
  let classText = className
  if (first) {
    classText = classText + ' first-item'
  }
  if (last) {
    classText = classText + ' last-item'
  }
  return classText
}

export const components = {
  something: 'test',
  block: {
    trueH1: props => <h1 className={getClassName('h1', props.node.firstItem, props.node.lastItem)}>{props.children}</h1>,
    h1: props => <h2 className={getClassName('h1', props.node.firstItem, props.node.lastItem)}>{props.children}</h2>,
    h2: props => <h2 className={getClassName('h2', props.node.firstItem, props.node.lastItem)}>{props.children}</h2>,
    h3: props => <h3 className={getClassName('h3', props.node.firstItem, props.node.lastItem)}>{props.children}</h3>,
    h4: props => <h4 className={getClassName('h4', props.node.firstItem, props.node.lastItem)}>{props.children}</h4>,
    h5: props => <h5 className={getClassName('h5', props.node.firstItem, props.node.lastItem)}>{props.children}</h5>,
    li: props => {
      return <li>{props.children}</li>
    },
    blockquote: props => <blockquote className={getClassName('', props.node.firstItem, props.node.lastItem)}>{props.children}</blockquote>,
    bodyLarge: props => {
      if (props.listItem) return <strong>{props.children}</strong>
      else return <p className={getClassName('large', props.node.firstItem, props.node.lastItem)}>{props.children}</p>
    },
    bodySmall: props => {
      if (props.listItem) return <strong>{props.children}</strong>
      else return <p className={getClassName('small', props.node.firstItem, props.node.lastItem)}>{props.children}</p>
    },
    introText: props => {
      if (props.listItem) return <strong>{props.children}</strong>
      else return <p className={getClassName('intro-text', props.node.firstItem, props.node.lastItem)}>{props.children}</p>
    },
    normal: props => {
      if (props.listItem) return <strong>{props.children}</strong>
      else return <p className={getClassName('', props.node.firstItem, props.node.lastItem)}>{props.children}</p>
    },
    default: props => <p className={getClassName('', props.node.firstItem, props.node.lastItem)}>{props.children}</p>
  },
  types: {
    inlineImage: ({ value }) => {
      if (!value?.asset) {
        return false
      }
      return (
        <div className={getClassName('embeded-content', value.firstItem, value.lastItem)}>
          <Image image={value} alt={value?.caption || ''}/>
          {value.caption && <figcaption style={{ paddingTop: '.75em' }}>{value.caption}</figcaption>}
        </div>
      )
    },
    video: ({ value }) => {
      if (!value?.video?.asset) {
        return false
      }
      return <div className={getClassName('embeded-content', value.firstItem, value.lastItem)}><Video video={value.video.asset}/></div>
    },
    // vimeoVideo: ({ value }) => {
    //   if (!value) { return 'youTube' }
    //   return <div className={getClassName('embeded-content', value.firstItem, value.lastItem)}><YoutubeVideo src={value.url}/></div>
    // },
    descriptionList: ({ value }) => {
      if (!value?.listItems || value?.listItems.length === 0) {
        return false
      }
      return <div className={getClassName('description-list', value.firstItem, value.lastItem)}>
        <dl>
          {value.listItems.map(item => (
            <li key={item._key}>
              <dt>{item?.title}</dt>
              <dd>{item?.text}</dd>
            </li>
          ))}
        </dl>
      </div>
    },
    button: ({ value }) => {
      const action = value
      // let setTheme = 'default'
      return (
        <Button {...getLinkProps(action)} className={'theme-' + action.theme} key={action._key}>
          {action.title}
        </Button>
      )
    }
  },
  marks: {
    tick: props => (
      <span className='tick'>{props.children}</span>
    ),
    italic: props => (
      <em>{props.children}</em>
    ),
    strong: props => (
      <strong>{props.children}</strong>
    ),
    code: props => (
      <code>{props.children}</code>
    ),
    link: props => {
      const action = props.value
      return (
        <Link
          {...getLinkProps(action)}
        >{props.children}</Link>
      )
    }
  },
  list: props => {
    const type = props?.value?.listItem
    if (type === 'bullet') {
      return <ul>{props.children}</ul>
    }
    return <ol>{props.children}</ol>
  },
  listItem: props => {
    let icon = null
    if (props.value.listItem === 'bullet') {
      icon = '•'
    }
    return <li>{icon}<p>{props.children}</p></li>
  }
}

export default components
