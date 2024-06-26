export default {
  name: 'address',
  title: 'Address',
  type: 'object',
  fields: [
    {
      title: 'Street Address',
      name: 'streetAddress',
      type: 'string'
    },
    {
      title: 'City',
      name: 'city',
      type: 'string'
    },
    {
      title: 'State',
      name: 'state',
      type: 'string'
    },
    {
      title: 'Zip',
      name: 'zip',
      type: 'string'
    },
    {
      title: 'mapLink',
      name: 'mapLink',
      description: 'Optional Google Maps link',
      type: 'url'
    }
  ]
}