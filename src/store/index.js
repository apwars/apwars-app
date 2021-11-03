import Vue from 'vue'
import Vuex from 'vuex'

import AppModule from './app'
import UserModule from './user'
import EnlistmentModule from './enlistment'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    app: AppModule,
    user: UserModule,
    enlistment: EnlistmentModule,
  },

  state: {
    packageVersion: process.env.PACKAGE_VERSION || '1.0.0'
  },

  getters: {
    appVersion: (state) => {
      return state.packageVersion
    }
  },

})
