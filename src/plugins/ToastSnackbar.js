import Vue from "vue";
import VuetifyToast from "vuetify-toast-snackbar-ng";

Vue.use(VuetifyToast, {
  multiLine: true,
  y: "top",
});

const _vueContext = new Vue();

export default {
  info(msg) {
    _vueContext.$toast(msg, {
      color: "blue",
    });
  },
  warning(msg) {
    _vueContext.$toast(msg, {
      color: "orange",
    });
  },
  error(msg) {
    _vueContext.$toast(msg, {
      color: "red",
    });
  },
  success(msg) {
    _vueContext.$toast(msg, {
      color: "green",
    });
  },
  successTransaction(msg, transactionHash) {
    _vueContext.$toast(msg, {
      color: "green",
      slot: [
        _vueContext.$createElement(
          "button",
          {
            class: {
              "btn-snack-transaction": true,
            },
            on: {
              click: () => {
                var a = document.createElement("a");
                a.target = "_blank";
                a.href = "http://bscscan.com/tx/" + transactionHash;
                a.click();
              },
            },
          },
          "Transaction"
        ),
      ],
    });
  },
};
