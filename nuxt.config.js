const nodeExternals = require("webpack-node-externals")
// const resolve = dir => require("path").join(__dirname, dir)

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "Shwabler",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, height=device-height, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Free secret discussion"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },
  plugins: [
    "~/plugins/vuetify.js",
    "~plugins/filters.js",
    { src: "~/plugins/fireauth.js", ssr: false },
    { src: "~/plugins/initstore.js", ssr: false },
    "~/plugins/i18n.js"
  ],
  css: ["~/assets/style/app.styl"],
  router: {
    middleware: ["isAuthorized", "storeInit", "i18n"]
  },
  mode: "spa",
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: "#e94191",
    height: "5px"
  },
  loadingIndicator: {
    name: "rectangle-bounce",
    color: "#e94191",
    background: "#fafafa"
  },
  modules: ["@nuxtjs/router-extras"],
  /*
  ** Build configuration
  */
  build: {
    analize: true,
    babel: {
      presets: ["vue"],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        [
          "transform-imports",
          {
            vuetify: {
              transform: "vuetify/es5/components/${member}",
              preventFullImport: true
            }
          }
        ]
      ]
    },

    vendor: [
      "babel-polyfill",
      "lodash",
      "~/plugins/vuetify.js",
      "arr-diff",
      "vue-i18n"
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }

      if (ctx.isClient) {
        config.devtool = "eval-source-map"
      }
    }
  }
}
