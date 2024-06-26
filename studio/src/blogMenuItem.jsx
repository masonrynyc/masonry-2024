import { MdDescription, MdPeople, MdFolder, MdRssFeed } from 'react-icons/md'
import { Iframe } from 'sanity-plugin-iframe-pane'
import getPreviewUrl from '@studio/src/getPreviewUrl'

const Icon = () => <MdRssFeed size='24px' />
const PostsIcon = () => <MdDescription size='24px'/>
const CategoriesIcon = () => <MdFolder size='24px'/>
const AuthorsIcon = () => <MdPeople size='24px'/>

export const blogMenuItem = (S) => S.listItem()
  .title('Blog')
  .icon(Icon)
  .child(
    S.list()
      .title('Blog')
      .items([
        S.listItem()
          .title('Posts')
          .icon(PostsIcon)
          .child(
            S.documentTypeList('post')
              .title('Posts')
              .menuItems(S.documentTypeList('post').getMenuItems())
              .filter('_type == $type')
              .params({ type: 'post' })
              .child(documentId =>
                S.document()
                  .schemaType('post')
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
          ),
        S.listItem()
          .title('Categories')
          .icon(CategoriesIcon)
          .child(
            S.documentTypeList('category')
              .title('Categories')
              .menuItems(S.documentTypeList('category').getMenuItems())
              .filter('_type == $type')
              .params({ type: 'category' })
              .child(documentId =>
                S.document()
                  .schemaType('category')
                  .documentId(documentId)
                )
          ),
        S.listItem()
          .title('Authors')
          .icon(AuthorsIcon)
          .child(
            S.documentTypeList('author')
              .title('Authors')
              .menuItems(S.documentTypeList('author').getMenuItems())
              .filter('_type == $type')
              .params({ type: 'author' })
              .child(documentId =>
                S.document()
                  .schemaType('author')
                  .documentId(documentId)
                )
          )
      ])
  )

export default blogMenuItem