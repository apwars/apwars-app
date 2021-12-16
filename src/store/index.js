import Vue from 'vue'
import Vuex from 'vuex'

import AppModule from './app'
import UserModule from './user'

Vue.use(Vuex)


export default new Vuex.Store({

  modules: {
    app: AppModule,
    user: UserModule
  },

  state: {
    packageVersion: process.env.PACKAGE_VERSION || '1.0.0',
  },

  mutations: {
  },

  actions: {
  },

  getters: {
    appVersion: (state) => {
      return state.packageVersion
    },
  }
})
