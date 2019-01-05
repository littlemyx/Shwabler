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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
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
    { src: "~/plugins/initstore.js", ssr: false }
  ],
  css: ["~/assets/style/app.styl"],
  router: {
    middleware: ["isAuthorized", "storeInit"]
  },
  mode: "spa",
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: "#3B8070",
    height: "5px"
  },
  /*
  ** Build configuration
  */
  build: {
    analize: true,
    babel: {
      presets: ["es2015", "stage-2", "vue"],
      plugins: [
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

    vendor: ["babel-polyfill", "lodash", "~/plugins/vuetify.js"],
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
    }
  }
}
