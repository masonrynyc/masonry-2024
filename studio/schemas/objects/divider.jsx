const DividerUI = () => {
  return (
    <div style={{ border: 'none', margin: '20px 0', borderTop: '1px solid var(--card-border-color)' }} />
  )
}

export default {
  title: 'Divider',
  name: 'divider',
  type: 'string',
  components: {
    input: DividerUI,
    field: (props) => <>{props.children}</>
  }
}