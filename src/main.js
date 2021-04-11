import Vue from "vue";
import App from "./App.vue";
import VueApexCharts from "vue-apexcharts";
import VueCodeHighlight from "vue-code-highlight";

import IPFSHelper from "@/lib/helpers/IPFSHelper";

IPFSHelper.connect();

Vue.use(VueApexCharts);
Vue.use(VueCodeHighlight);

Vue.component("apexchart", VueApexCharts);

import store from "./store";

import router from "./router";

// PLUGINS
import vuetify from "./plugins/vuetify";
import "./plugins/vue-head";
import "./plugins/vue-gtag";

// FILTERS
import "./filters/capitalize";
import "./filters/lowercase";
import "./filters/uppercase";

// STYLES
// Main Theme SCSS
import "./assets/scss/theme.scss";

import currency from "v-currency-field";
Vue.use(currency);

Vue.config.productionTip = false;

export default new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
