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
  }
}
