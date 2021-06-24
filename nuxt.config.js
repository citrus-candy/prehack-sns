module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Prehack-SNS",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    // script: [
    //   {
    //     src: "https://code.jquery.com/jquery-3.5.1.min.js"
    //   },
    //   {
    //     src: "https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.waves.min.js"
    //   },
    //   {
    //     src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
    //   }
    // ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    [
      "@nuxtjs/google-fonts",
      {
        families: { Inter: true },
        display: "block",
        download: true,
        inject: true
      }
    ]
  ],
  components: true,
  modules: ["@nuxtjs/axios"],
  axios: { proxy: false },
  proxy: {},
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
