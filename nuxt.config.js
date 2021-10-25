export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  ssr: true,
  target: 'server',

  head: {
    title: 'insamee',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: ['relative bg-white-dark text-black'],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/getProfile.server.js',
    '~/plugins/vuelidate.js',
    '~/plugins/axios',
    '~/plugins/vue-scroll-lock.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/atoms/graphics',
    '~/components/atoms/icons',
    '~/components/atoms',
    '~/components/molecules',
    '~/components/organisms',
    '~/components/templates',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/insamee-app/components
    '@insamee-app/components/nuxt',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://www.npmjs.com/package/vue-screen
    'vue-screen/nuxt',
    // https://image.nuxtjs.org/
    '@nuxt/image',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/api/**': process.env.API_URL,
    '/auth/**': process.env.API_URL,
  },

  publicRuntimeConfig: {
    tutoratURL: process.env.TUTORAT_URL,
    associationsURL: process.env.ASSOCIATIONS_URL,
    evenementsURL: process.env.EVENEMENTS_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
