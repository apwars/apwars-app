module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import \'~@/assets/scss/vuetify/variables\''
      },
      scss: {
        prependData: '@import \'~@/assets/scss/vuetify/variables\';'
      }
    }
  },

  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_SERVERLESS,
        pathRewrite: { '^/api': '' },
        ws: true,
        changeOrigin: true,
      },
    },
  },
}