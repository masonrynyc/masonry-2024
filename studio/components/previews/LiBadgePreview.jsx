import { Badge, Flex, Box, Text } from '@sanity/ui'

const LiBadgePreview = (props) => {
  const { label, badge } = props
  return (
    <Flex align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      {label && (
        badge ? (
          <Badge tone="primary">{label}</Badge>
        ) : (
          <Text size={1} weight="regular" muted>{label}</Text>
        )
      )}
    </Flex>
  )
}

export default LiBadgePreview