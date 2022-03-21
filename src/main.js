import Vue from "vue";
import App from "./App.vue";
import VueApexCharts from "vue-apexcharts";
import VueCodeHighlight from "vue-code-highlight";
import VueCountdown from '@chenfengyuan/vue-countdown';
import VueTour from 'vue-tour'
import LogRocket from 'logrocket';
import VueMeta from 'vue-meta';

Vue.component(VueCountdown.name, VueCountdown);

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

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour);
Vue.use(currency);
Vue.use(VueMeta);

Vue.config.productionTip = false;

if (process.env.VUE_APP_LOGROCKET) {
  LogRocket.init(process.env.VUE_APP_LOGROCKET);
}

export default new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
