import { MdList, MdSettings } from 'react-icons/md'
const MenusIcon = () => <MdList size='24px'/>
const SettingsIcon = () => <MdSettings size='24px'/>

export const pageMenuItem = (S) => S.listItem()
  .title('Settings')
  .icon(SettingsIcon)
  .child(
    S.list()
      .title('Settings')
      .items([
        S.listItem()
          .title('Settings')
          .icon(SettingsIcon)
          .child(
            S.document()
              .documentId('siteSettings')
              .schemaType('siteSettings')
          ),
        S.listItem()
          .title('Menus')
          .icon(MenusIcon)
          .child(
            S.documentTypeList('menu')
              .title('Menus')
              .filter('_type == $type')
              .params({ type: 'menu' })
          )
      ])
  )

export default pageMenuItem