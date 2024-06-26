# The Base Setup
- [NextJS](https://nextjs.org/)
- [Sanity](https://www.sanity.io/) (CMS)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

## Get Started
Update with project details
- /studio/.env.local and .env.production
- /web/.env.local

## Set Up Site Theme
- Change hard coded favicon, touch icon, share images in `/web/public/...`
- Update font imports in `/web/styles/fonts.css`
  - Add the font files in `/web/assets/fonts/...`
- Edit grid, color and global variable settings in `/web/styles/themes.css` and update `/web/tailwind.config.js` where necessary.
- Sanity pulls from here as well for the `ThemeIcon.jsx` UI component using the .theme-[variable] class names.
- Edit typography styles in `/web/styles/typography.css`
- Upon updating these, the `/web/tailwind.config.js` file should be updated to use the site's font names.
- Sanity also need to know about the theme options for each section. Edit the `theme` array located in `/studio/schemas/objects/theme.jsx` to add a theme to the CMS options.

`/web/tailwind.config.js`
- See the [Tailwind Documentation](https://tailwindcss.com/docs/installation) to extend the configuration to the site's needs.

## Modules
Pages have basic Title, Slug and SEO set up and the page content is made up of modules.

Out of the box, the base setup includes the modules below:
- **Wide Media**
  Supports Images and Vimeo videos
- **Text Section**
  A rich text section
- **Fifty Fifty**
  A 2 column layout for Media and text content
- **Two Column Text**
  A 2 column layout with a headline on the left and text content on the right
- **Grid**
  A configurable multicolumn grid of flexible content in each column

### Create a module using [Plop](https://plopjs.com/)
Modules need to have a few files and be imported in a bunch of places to work correctly. Plop has been set up to quickly generate all that is needed for a new module.
1. run `npx plop` in `/web`
2. select `module-sanity`
3. type the camelcased name of the component (ie: **ComponentName**)

Upon running this command plop will
- Create a component in a new directory at `components/ComponentName`
- Create and connect a new groq query file at `data/queries/moduleComponentName`
- Create and import a new module schema file in `/studio/schemas/modules/componentName.js`
- Among a few other actions that will result in a completely hooked up module that is ready to use and render on a page.

## Shared Functions
Between the NextJS frontend and Sanity backend, some functions or formatting has been consolidated into a `/Shared` directory at the root of the project. These exports include:
- A `slugify()` function turning "The Title" into "the-title"
- A function to get the link path that decides the path based on the document type. For example Article documents may need a `/blog` prefix, turning `post-slug` into `/blog/post-slug`

These should be updated with the site structure. For example, when working on a portfolio site we may want case study pages to live at `/projects/case-study-slug`

## Theme the Studio
Go to /sanity/sanity.config and update the colors in the `props` variable
- Updated the Studio Logo. Switch out the logo svg located at `/studio/components/StudioLogo.jsx`

## Changing the blog route
Changing the blog route required updating the word in a few files
- `/shared/helpers.js` in the `getRoute` object
- Change the `/web/blog` directory to the new route (ie: `/web/stories`)