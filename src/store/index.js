import Vue from "vue";
import Vuex from "vuex";

import AppModule from "./app";
import UserModule from "./user";
import EnlistmentModule from "./enlistment";
import WarModule from "./war";
import MusicModule from "./music";
import WalletModule from "./wallet";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app: AppModule,
    user: UserModule,
    enlistment: EnlistmentModule,
    war: WarModule,
    music: MusicModule,
    wallet: WalletModule,
  },

  state: {
    packageVersion: process.env.PACKAGE_VERSION || "1.0.0",
  },

  mutations: {},

  actions: {},

  getters: {
    appVersion: (state) => {
      return state.packageVersion;
    },
  },
});
