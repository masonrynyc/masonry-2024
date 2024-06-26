import settings from '@queries/settings'
import menus from '@queries/menus'

export default `
  {
    "settings": ${settings},
    "menus": ${menus}
  }
`
