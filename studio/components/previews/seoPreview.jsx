/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import GoogleSearchResult from './seo/google-search'
// import TwitterCard from './twitter-card'
// import FacebookShare from './facebook-share'
import { Stack, Text, Card, Heading } from '@sanity/ui'

import { createClient } from '@sanity/client'
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
})

class SeoPreviews extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object
  }

  static defaultProps = {
    document: null
  }

  state = {
    defaultSEO: {}
  }

  constructor() {
    super()
    this.loadData()
  }

  loadData = () => {
    sanityClient
      .fetch(
        `
        *[_type == "siteSettings"][0]{
          ...,
          favicon {
            "url": asset->url,
          },
          touchIcon {
            "url": asset->url,
          },
          seo {
            ...,
            shareGraphic {
              "url": asset->url,
            }
          }
        }
      `
        )
      .then(seo => {
        this.setState({
          defaultSEO: seo || {}
        })
      })
  }

  render() {
    const { options } = this.props
    const { displayed } = this.props.document
    const { defaultSEO } = this.state

    return (
      <Stack
        padding={[5, 5, 5, 6]}
        space={[5, 5, 5, 6]}
        style={{ paddingLeft: '20px', paddingRight: '20px', margin: '0 auto', maxWidth: '600px' }}
      >
        <Heading size={4}>SEO Preview</Heading>
        <Card tone='caution' padding={4} border radius={2}>
          <Text>
            It looks like there is no default site title, or description. Go to <a href={'/desk/siteSettings;' + defaultSEO._id}>Site Settings</a> to enter these details.
          </Text>
        </Card>
        <GoogleSearchResult
          default={defaultSEO}
          document={displayed}
          options={options}
        />
        {/*<TwitterCard
          default={defaultSEO}
          document={displayed}
          options={options}
        />
        <FacebookShare
          default={defaultSEO}
          document={displayed}
          options={options}
        />*/}
      </Stack>
    )
  }
}

export default SeoPreviews