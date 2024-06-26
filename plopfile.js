module.exports = function (plop) {
	// module generator
	plop.setGenerator('sanity-module', {
		description: 'Module generator with Sanity bindings. For use in modules object in pages.',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'module name please (ie: ComponentName)'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'components/{{componentName}}/{{componentName}}.jsx',
				templateFile: 'plop-templates/module.jsx.hbs'
			},
			{
				type: 'add',
				path: 'components/{{componentName}}/index.js',
				templateFile: 'plop-templates/export.js.hbs'
			},
			{
				type: 'append',
				path: 'data/queries/modules.js',
				pattern: /\/\/ plopAddModules/g,
				template: '	_type == "{{camelCase componentName}}" => { {{curlyBracesWrap componentName}} },'
			},
      // Create Query File
			{
				type: 'add',
				path: 'data/queries/module{{componentName}}.js',
				templateFile: 'plop-templates/moduleQuery.js.hbs'
			},
      // Import Query File
      {
				type: 'append',
				path: 'data/queries/modules.js',
				pattern: /\/\/ plopImportModules/g,
				template: "import module{{componentName}} from '@queries/module{{componentName}}'"
			},
			// Create Schema File
			{
				type: 'add',
				path: 'studio/schemas/modules/{{camelCase componentName}}.jsx',
				templateFile: 'plop-templates/moduleSchema.jsx.hbs'
			},
			// Add to ModuleRenderer
			{
				type: 'append',
				path: 'components/ModuleRenderer/ModuleRenderer.jsx',
				pattern: /\/\/ plopImportModules/g,
				template: "import {{componentName}} from '@components/{{componentName}}'",
			},
			{
				type: 'append',
				path: 'components/ModuleRenderer/ModuleRenderer.jsx',
				pattern: /\/\/ plopAddModules/g,
				template: '	{{camelCase componentName}}: {{componentName}},',
			},
			// Add schema import
			{
				type: 'append',
				path: 'studio/schemas/index.js',
				pattern: /\/\/ plopImportModules/g,
				template: "import {{camelCase componentName}} from './modules/{{camelCase componentName}}'",
			},
			// Add schema to schema list
			{
				type: 'append',
				path: 'studio/schemas/index.js',
				pattern: /\/\/ plopAddModules/g,
				template: "	{{camelCase componentName}},",
			},
      // Add type to moduleContent
			{
				type: 'append',
				path: 'studio/schemas/objects/modules.js',
				pattern: /\/\/ plopAddModules/g,
				template: "				{ type: '{{camelCase componentName}}' },",
			}
		]
	})
	plop.setGenerator('sanity-document', {
		description: 'Document generator with Sanity bindings',
		prompts: [
			{
				type: 'input',
				name: 'documentName',
				message: 'document name please (ie: Project)'
			},
			{
				type: 'input',
				name: 'documentSlug',
				message: 'used for /[document-slug]/doc-title (ie: projects)'
			}
		],
		actions: [
			// Add [slug] file under document slug directory in /pages
			// Add _type slug setup for USE '// plop add document type' hook
			// Add sanity schema file
			{
				type: 'add',
				path: 'pages/{{documentSlug}}/[slug].js',
				templateFile: 'plop-templates/document/document.js.hbs'
			},
      // Create Query File
			{
				type: 'add',
				path: 'data/queries/{{camelCase documentName}}.js',
				templateFile: 'plop-templates/document/documentQuery.js.hbs'
			},
			// Create Schema File
			{
				type: 'add',
				path: 'studio/schemas/documents/{{camelCase documentName}}.jsx',
				templateFile: 'plop-templates/document/documentSchema.jsx.hbs'
			},
			// Add schema import
			{
				type: 'append',
				path: 'studio/schemas/index.js',
				pattern: /\/\/ plopImportDocuments/g,
				template: "import {{camelCase documentName}} from './documents/{{camelCase documentName}}'",
			},
			// ADD SANITY MENU ITEM
			// 1. Create Sanity Menu Item File
			{
				type: 'add',
				path: 'studio/src/{{camelCase documentName}}MenuItem.jsx',
				templateFile: 'plop-templates/document/documentMenuItem.jsx.hbs'
			},
			// 2. Add Sanity Menu Item import
			{
				type: 'append',
				path: 'studio/sanity.config.js',
				pattern: /\/\/ plopImportMenuItem/g,
				template: "import {{camelCase documentName}}MenuItem from '@studio/src/{{camelCase documentName}}MenuItem'",
			},
			// 3. Add Sanity Menu Item import
			{
				type: 'append',
				path: 'studio/sanity.config.js',
				pattern: /\/\/ plopAddMenuItem/g,
				template: "            {{camelCase documentName}}MenuItem(S),"
			},
			//
			// Add schema to schema list
			{
				type: 'append',
				path: 'studio/schemas/index.js',
				pattern: /\/\/ plopAddDocuments/g,
				template: "  {{camelCase documentName}},",
			},
			// Add to Link schema
      {
				type: 'append',
				path: 'studio/schemas/objects/link.jsx',
				pattern: /\/\/ plopAddDocumentLink/g,
				template: "            { type: '{{camelCase documentName}}' },"
			},
			// Add to getRoute function
			{
				type: 'append',
				path: 'utils/helpers.js',
				pattern: /\/\/ plopAddDocumentType/g,
				template: "	{{camelCase documentName}}: '{{documentSlug}}',",
			}
		]
	})
  plop.setGenerator('simple-component', {
		description: 'Creates a simple component',
		prompts: [
			{
				type: 'input',
				name: 'componentName',
				message: 'module name please'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'components/{{componentName}}/{{componentName}}.jsx',
				templateFile: 'plop-templates/component.jsx.hbs'
			},
      {
				type: 'add',
				path: 'components/{{componentName}}/index.js',
				templateFile: 'plop-templates/export.js.hbs'
			}
		]
	})
	plop.setHelper('toLowerCase', str => str.toLowerCase())
  plop.setHelper('curlyBracesWrap', str => '${module' + str + '}')
	plop.setHelper('makeQuery', str => '{' + str + 'Query}')
	plop.setHelper('titleCase', str => {
		if (typeof str === 'undefined') {
			return ''
		}

		return str.replace(
            /\w\S*/g,
            txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
	})
}
