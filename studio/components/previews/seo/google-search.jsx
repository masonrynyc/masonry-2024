/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
// import { assemblePageUrl, replaceTemplateTags } from '@utils/helpers'
import './seo-preview.css'
import { Card, Heading, Stack, Text, Flex } from '@sanity/ui'

// replace template tags with values
export function replaceTemplateTags(string, templateTags = []) {
  let newString = string

  templateTags.map(v => {
    newString = newString?.replace(new RegExp(v.tag, 'g'), v.value)
  })

  return newString
}

export const assemblePageUrl = ({ document, domain }) => {
  const { slug } = document

  if (!domain) {
    console.warn('Missing domain', { slug, domain })
    return ''
  }

  return domain + (slug ? `/${slug.current}` : '')
}

class GoogleSearchResult extends React.PureComponent {
  static propTypes = {
    default: PropTypes.object,
    document: PropTypes.object,
    width: PropTypes.number
  }

  static defaultProps = {
    default: null,
    document: null,
    width: 580
  }

  render() {
    const { default: defaultSEO, document, width } = this.props
    const { seo } = document

    const templateTags = [
      {
        tag: '{{page_title}}',
        value: document.title
      },
      {
        tag: '{{site_title}}',
        value: defaultSEO?.siteTitle
      }
    ]

    const url = assemblePageUrl({ document, domain: process.env.NEXT_PUBLIC_SITE_URL })
    const websiteUrlWithoutProtocol = url.split('://')[1]

    const metaTitle = replaceTemplateTags(
      seo?.metaTitle || document.title || defaultSEO?.metaTitle,
      templateTags
    )

    const metaDesc = seo?.metaDesc || defaultSEO?.metaDesc

    return (
      <div className='seoItem'>
        <Stack space={3}>
          <Heading className='seoItemTitle' size={1}>Google Search Result</Heading>
          <Card className='seoItemContent' padding={4} radius={2} border={true}>
            {metaTitle ? (
              <Stack space={4} className='seoItemCard'>
                  <div className='googleUrl'>
                    <Flex align='center'>
                      <Flex align='center' justify='center' style={{ borderRadius: '50%', padding: '8px', background: '#f1f3f4', marginRight: '12px' }}>
                        <img width={16} height={16} src={defaultSEO?.favicon?.url} alt={metaTitle + ' Icon'} />
                      </Flex>
                      <Stack space={2}>
                        <Text size={2}>{defaultSEO.title}</Text>
                        <Text size={1}>{websiteUrlWithoutProtocol}</Text>
                      </Stack>
                    </Flex>
                  </div>
                  <div className='googleTitle'><Text size={3} style={{ color: '#1a0dab' }}>{metaTitle}</Text></div>

                  {metaDesc && (
                    <div className='googleDesc'><Text muted size={2}>{metaDesc}</Text></div>
                  )}
              </Stack>
            ) : (
              <p>Please add a title and fill out your SEO fields first.</p>
            )}
          </Card>
        </Stack>
      </div>
    )
  }
}

export default GoogleSearchResult