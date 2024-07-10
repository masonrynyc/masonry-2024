import IconUI from '@studio/components/IconUI'
import MediaThumbnail from '@studio/components/MediaThumbnail'
import { MdPlayArrow } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'
import VideoInput from '@studio/components/VideoInput'

export default ({
  playerSettings = false,
  hidden = false,
  title = 'Video',
  name = 'video',
  useTitle = true,
  group,
  ...props
} = {}) => {
  return {
    title: title,
    name: name,
    type: 'object',
    hidden: hidden,
    group: group,
    options: {
      collapsible: false
    },
    fields: [
      {
        title: 'Vimeo ID',
        name: 'id',
        type: 'string',
        components: { input: VideoInput },
        description: <>Enter only the ID of the video, not the whole video URL.<br/>ie. https://vimeo.com/<code>{'{{ID}}'}</code></>
      },
      {
        title: 'Video',
        name: 'videoFile',
        type: 'file',
        hidden: true, // Only show if using html videos
        options: {
          accept: '.mp4'
        },
        description: 'Upload an .mp4 file. Be mindful of file size.'
      },
      ...(useTitle ? [
        {
          title: 'Video Title',
          name: 'title',
          type: 'string',
          description: 'Short title/description of the video'
        },
      ] : []),
      ...(playerSettings ? [
        {
          title: 'Player Settings',
          name: 'videoPlaySetting',
          type: 'string',
          initialValue: 'autoplay',
          components: { input: IconUI },
          options: {
            list: [
              { value: 'autoplay', title: 'Autoplay' },
              { value: 'clickToPlay', title: 'Click To Play' }
            ]
          }
        }
      ] : [])
    ],
    ...props,
    preview: {
      select: {
        mediaType: 'mediaType',
        image: 'image',
        video: 'id',
        videoTitle: 'title'
      },
      prepare (selection) {
        const { videoTitle, video } = selection
        let title = videoTitle || 'Video'
        let subtitle = videoTitle ? 'Video' : false
        let videoIcon = <SectionIcon><MdPlayArrow size='24px'/></SectionIcon>
        if (video) {
          videoIcon = <MediaThumbnail media={{
            mediaType: 'video',
            video: { id: video }
          }} />
        }
        return Object.assign({}, selection, {
          title: title,
          media: videoIcon,
          subtitle: subtitle
        })
      }
    }
  }
}