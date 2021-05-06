import Vue from "vue";

import Vuetify, { VTextField, VSnackbar } from "vuetify/lib";

import * as directives from "vuetify/lib/directives";
import config from "../configs";

Vue.use(Vuetify, {
  directives,
  components: {
    VTextField,
    VSnackbar,
  },
});

export default new Vuetify({
  theme: {
    dark: config.theme.globalTheme === "dark",
    options: {
      customProperties: true,
    },
    themes: {
      dark: config.theme.dark,
      light: config.theme.light,
    },
  },
});
