import IconUI from '@studio/components/IconUI'
import VideoThumbnail from '@components/VideoThumbnail'
import { MdPlayArrow } from 'react-icons/md'
import SectionIcon from '@studio/components/SectionIcon'

export default ({
  playerSettings = false,
  hidden = false,
  title = 'Video',
  name = 'video',
  ...props
} = {}) => {
  return {
    title: title,
    name: name,
    type: 'object',
    hidden: hidden,
    options: {
      collapsible: false
    },
    fields: [
      {
        title: 'Video',
        name: 'id',
        type: 'string',
        description: 'Enter a vimeo ID. ie. https://vimeo.com/{{ID}}'
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
      {
        title: 'Video Title',
        name: 'title',
        type: 'string',
        description: 'Short title/description of the video'
      },
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
          videoIcon = <VideoThumbnail vimeoId={video} />
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