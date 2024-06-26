import { Iframe } from 'sanity-plugin-iframe-pane'
import getPreviewUrl from '@studio/src/getPreviewUrl'
import { MdInsertDriveFile } from 'react-icons/md'

const Icon = () => <MdInsertDriveFile size={24} />

export const pageMenuItem = (S) => S.listItem()
  .title('Pages')
  .icon(Icon)
  .child(
    S.documentTypeList('page')
      .title('Pages')
      .menuItems(S.documentTypeList('page').getMenuItems())
      .filter('_type == $type')
      .params({ type: 'page' })
      .child(documentId =>
        S.document()
          .schemaType('page')
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

export default pageMenuItem