import { Iframe } from 'sanity-plugin-iframe-pane'
import getPreviewUrl from '@studio/src/getPreviewUrl'
import { MdDashboard } from 'react-icons/md'

const Icon = () => <MdDashboard size='24px' style={{ transform: 'rotate(-90deg)' }} />

export const projectMenuItem = (S) => S.listItem()
  .title('Projects')
  .icon(Icon)
  .child(
    S.documentTypeList('project')
      .title('Projects')
      .menuItems(S.documentTypeList('project').getMenuItems())
      .filter('_type == $type')
      .params({ type: 'project' })
      .child(documentId =>
        S.document()
          .schemaType('project')
          .documentId(documentId)
          .views([
            S.view.form(),
            S.view
              .component(Iframe)
              .options({
                url: doc => getPreviewUrl(doc)
              })
              .title('Preview')
          ])
        )
  )

export default projectMenuItem