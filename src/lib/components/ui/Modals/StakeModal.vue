<template>
  <div>
    <v-dialog
      content-class="elevation-0"
      persistent
      :value="open"
      width="630px"
      style="box-shadow: none"
    >
      <v-card>
        <v-card-title class="card-title-modal justify-center">
          <v-img max-width="44" class="mr-2" src="/images/skull.png" />
          <div class="align-self-center">{{ title }}</div>
          <v-img
            max-width="44"
            class="ml-2 skull-flip"
            src="/images/skull.png"
          />
        </v-card-title>
        <v-card-text style="height: 300px">
          <div class="content">
            <p class="mb-1">
              What will happen when you send your troops to the War Contract:<br />
              - You'll not be able to withdraw them from the contract until the
              war is over.
              <br />
              - The majority of them will die in the war, even if you win the
              battle! <br />
            </p>
            <v-checkbox
              v-model="checkbox"
              class="stake-modal-input ma-0 pa-0"
              color="secondary"
            >
              <template v-slot:label>
                <div>
                  I have read and agreed with the battle rules
                </div>
              </template>
            </v-checkbox>

            <v-currency-field
              color="secondary"
              class="stake-modal-input my-n1"
              outlined
              label="Amount"
              :disabled="!checkbox"
              :hint="`Available: ${myAvailable}`"
              persistent-hint
              v-bind="currencyConfig"
              v-model="amount"
            >
              <template v-slot:append>
                <div class="d-flex">
                  <span class="mr-1 align-self-center">{{ label }}</span>
                  <v-btn
                    class="align-self-center"
                    rounded
                    small
                    @click="maxAvailable"
                  >
                    MAX
                  </v-btn>
                </div>
              </template>
            </v-currency-field>

            <div class="d-flex justify-center mt-2">
              <wButton class="mx-2" @click="close">Cancel</wButton>
              <wButton
                class="mx-2"
                @click="confirm"
                :actived="true"
                :disabled="!checkbox || amount === 0"
              >
                Confirm
              </wButton>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import wButton from "@/lib/components/ui/Buttons/wButton";
import ToastSnackbar from "@/plugins/ToastSnackbar";
import BigNumber from "bignumber.js";

export default {
  props: ["open", "title", "available", "label"],

  components: {
    wButton,
  },

  data() {
    return {
      address: "",
      checkbox: false,
      amount: 0,
      currencyConfig: {
        locale: (window.navigator.userLanguage || window.navigator.language),
        prefix: "",
        suffix: "",
        decimalLength: 8,
        autoDecimalMode: true,
        allowNegative: false,
      },
    };
  },

  computed: {
    isConnected() {
      return this.$store.getters["user/isConnected"];
    },

    account() {
      return this.$store.getters["user/account"];
    },

    networkInfo() {
      return this.$store.getters["user/networkInfo"];
    },

    addresses() {
      return this.$store.getters["user/addresses"];
    },

    myAvailable() {
      if (!this.available || typeof this.available !== "string") {
        return 0;
      }
      let value = new BigNumber(this.available);
      return value
        .div("1000000000000000000")
        .toFixed(this.currencyConfig.decimalLength);
    },
  },

  watch: {
    open() {
      if (!this.open) {
        this.amount = 0;
        this.checkbox = false;
      }
    },
  },

  mounted() {
    this.amount = 0;
    this.checkbox = false;
  },

  methods: {
    close() {
      this.checkbox = false;
      this.amount = 0;
      this.$emit("close");
    },
    maxAvailable() {
      let value = new BigNumber(this.available);
      this.amount = value
        .div("1000000000000000000")
        .toFixed(this.currencyConfig.decimalLength);
    },
    confirm() {
      let totalAvailable = new BigNumber(this.available);
      totalAvailable = totalAvailable
        .div("1000000000000000000")
        .toFixed(this.currencyConfig.decimalLength);
      totalAvailable = parseFloat(totalAvailable);
      if (this.amount > totalAvailable) {
        return ToastSnackbar.warning(
          "Quantity cannot be greater than the available value"
        );
      }

      let sendAmountEmit = window.web3.utils.toWei(
        this.amount.toString(),
        "ether"
      );

      if (this.amount === totalAvailable) {
        sendAmountEmit = this.available;
      }

      this.$emit("confirm", sendAmountEmit);
    },
  },
};
</script>

<style scoped>
.theme--dark.v-card {
  background-color: transparent !important;
  background: url("/images/modal-background.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 15px;
}

.v-card__title {
  color: #765e55;
  font-size: 15x !important;
  font-weight: bold !important;
}

.content {
  color: #201813;
}

.content >>> .btn-bg-c > .label {
  color: #FFFFFF !important;
}

.btn {
  cursor: pointer;
  width: 150px;
  float: right;
}

.card-title-modal {
  font-weight: bold !important;
  font-size: 38px !important;
  background: -webkit-linear-gradient(#ff0000, #bd0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stake-modal-input >>> .v-input__control > .v-input__slot fieldset {
  color: #a47a6a !important;
  border-width: 3px !important;
  border-radius: 18px !important;
}

.stake-modal-input >>> .v-label {
  transform-origin: top left !important;
  font-weight: bold !important;
  color: #32211b !important;
}

.stake-modal-input >>> .v-input__append-inner {
  color: #32211b !important;
  font-weight: bold !important;
  font-size: 13px;
}

.stake-modal-input >>> .v-icon {
  color: #32211c !important;
}

.stake-modal-input.v-input--is-disabled {
  opacity: 0.2;
}

.stake-modal-input >>> input {
  color: #32211c;
  font-weight: bold;
}

.stake-modal-input >>> .v-messages__message {
  font-size: 14px;
  color: #32211c;
  font-weight: bold;
}

.skull-flip {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
