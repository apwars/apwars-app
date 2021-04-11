import Vue from 'vue'
import Vuex from 'vuex'

import AppModule from './app'
import UserModule from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app: AppModule,
    user: UserModule
  }
})

export default store
