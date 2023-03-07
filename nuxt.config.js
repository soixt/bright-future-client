
export default {
  target: 'server',
  head: {
    title: 'Bright Future',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The BEST place in the world for finding your future career' },
      { hid: 'og:title', name: 'og:title', content: 'Bright Future' },
      { hid: 'og:image', name: 'og:image', content: '/webone.png' },
      { hid: 'og:description', name: 'og:description', content: 'The BEST place in the world for finding your future career' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo-blue.png' }
    ]
  },
  css: ['@/assets/scss/main.scss'],
  plugins: [
    { src: '~plugins/vue-particles', ssr: false },
    { src: '~plugins/vue-cropper', ssr: false }
  ],
  components: true,
  buildModules: [],
  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-vue-multiselect'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/auth/login', method: 'post', propertyName: 'access_token'},
          logout: {url: '/auth/logout', method: 'post', },
          user: {url: '/auth/user', method: 'get', propertyName: ''},
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/',
      callback: '/'
    },
  },
  axios: {
    baseURL: 'https://api.brightfuture.rs/api' //https://api.brightfuture.rs/api
  },
  build: {
    extend(config, { isDev , isClient }) {
      if (isClient && !isDev) {
        config.optimization.splitChunks.maxSize = 250000
      }
    }
  }
}
