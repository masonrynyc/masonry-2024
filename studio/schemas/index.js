// Document Imports
import siteSettings from './documents/siteSettings'
import page from './documents/page'
import menu from './documents/menu'
import post from './documents/post'
import category from './documents/category'
import author from './documents/author'
import section from './documents/section'
// plopImportDocuments
import project from './documents/project'

// Object Imports
import seo from './objects/seo'
import textLockup from './objects/textLockup'
import link from './objects/link' // Used for Button also
import navLink from './objects/navLink'
import blockContent from './objects/blockContent'
import blockText, { blockHeadline } from './objects/blockText'
import photo from './objects/photo' // type: 'photo'
import video from './objects/video'
import media from './objects/media'
import placement from './objects/placement'
import social, { socialLink } from './objects/social'
import theme from './objects/theme'
import modules from './objects/modules'
import actions from './objects/actions'
import address from './objects/address'
import alignmentHorizontal from './objects/alignmentHorizontal'
import alignmentVertical from './objects/alignmentVertical'

// Module Imports
import wideMedia from './modules/wideMedia'
// plopImportModules
import divider from './modules/divider'
import teamGrid from './modules/teamGrid'
import twoColumnText from './modules/twoColumnText'
import columns from './modules/columns'
import textSection from './modules/textSection'
import blogPosts from './modules/blogPosts'
import fiftyFifty from './modules/fiftyFifty'

export const schemaTypes = [
  // Documents
  siteSettings,
  menu,
  page,
  post,
  category,
  author,
  // plopAddDocuments
  project,
  section, // Reusable Section
  // Objects
  seo,
  textLockup,
  link(),
  link({
    name: 'button',
    title: 'Button',
  }),
  social,
  theme,
  socialLink,
  navLink,
  blockContent,
  blockText,
  blockHeadline,
  actions,
  address,
  alignmentHorizontal(),
  alignmentVertical(),
  photo(),
  video(),
  media(),
  placement,
  modules(),
  // Modules
  // plopAddModules
	divider,
	teamGrid,
	twoColumnText,
	columns,
	textSection,
	blogPosts,
	fiftyFifty,
  wideMedia()
]
