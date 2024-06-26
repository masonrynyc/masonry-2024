import { Badge, Flex, Box, Text } from '@sanity/ui'
import Button from '@components/Button'

const ButtonPreview = props => {
  const { title, subtitle, theme } = props

  // TODO Button Theme Preview

  if (!title) {
    return (
      <header style={{ padding: '1rem' }}>
        <h2 style={{
          fontSize: '16px',
          fontSize: '1rem',
          lineHeight: '1.25',
          padding: '4px 0',
          padding: '0.25rem 0',
          margin: '-2px 0 -1px',
          opacity: .5
        }}>Create a button.</h2>
      </header>
    )
  }
  return (
    <Flex
      align='center'
    >
      <div
        style={{ marginRight: '12px' }}
      >
        <Button as='div' className='align-top'>{title}</Button>
      </div>
      <Text size={1} weight="medium" muted>{subtitle}</Text>
    </Flex>
  )
}

export default ButtonPreview