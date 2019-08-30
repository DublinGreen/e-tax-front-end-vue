const pkg = require('./package');

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
	mode: 'spa',

	/*
  ** Headers of the page
  */

	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
			},
			{
				rel: 'stylesheet',
				href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
			}
		]
	},

	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#2699fb' },

	/*
  ** Global CSS
  */
	css: [ '~/assets/style/app.styl', '~/assets/style/main.scss' ],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		'@/plugins/vuetify',
		'@/plugins/axios',
		'@/plugins/vue-select',
		'@/plugins/filters.js',
		'@/plugins/vee-validate',
		// {
		//   src: '~/plugins/vue-select',
		//   mode: 'client'
		// },
		{
			src: '@/plugins/localStorage.js',
			ssr: false
		}
	],

	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/toast'
	],
	/*
  ** Axios module configuration
  */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
		baseURL: 'http://127.0.0.1:8000/api/v1'
		// baseURL: 'http://localhost:8000/api/v1'
	},

	/*
   ** Toast module configuration
   */
	toast: {
		position: 'top-right',
		duration: 5000
	},

	/*
  ** Build configuration
  */
	build: {
		vendor: [ 'vue-select' ],
		transpile: [ 'vuetify/lib' ],
		plugins: [ new VuetifyLoaderPlugin() ],
		loaders: {
			stylus: {
				import: [ '~assets/style/variables.styl' ]
			}
		},

		/*
    ** You can extend webpack config here
    */
		extend(config, ctx) {}
	}
};
