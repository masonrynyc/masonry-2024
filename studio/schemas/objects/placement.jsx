import PlacementUI from '@studio/components/PlacementUI'

export default {
  name: 'placement',
  title: 'Placement',
  type: 'string',
  initialValue: 'center-middle',
  components: { input: PlacementUI },
  options: {
    list: [
      { title: 'Top Left', value: 'left-top' },
      { title: 'Top Center', value: 'center-top' },
      { title: 'Top Right', value: 'right-top' },
      { title: 'Middle Left', value: 'left-middle' },
      { title: 'Middle Center', value: 'center-middle' },
      { title: 'Middle Right', value: 'right-middle' },
      { title: 'Bottom Left', value: 'left-bottom' },
      { title: 'Bottom Center', value: 'center-bottom' },
      { title: 'Bottom Right', value: 'right-bottom' },
    ]
  }
}
