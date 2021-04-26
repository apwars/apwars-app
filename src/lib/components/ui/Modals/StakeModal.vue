<template>
  <div>
    <v-dialog
      content-class="elevation-0"
      persistent
      :value="open"
      width="600px"
      style="box-shadow: none"
    >
      <v-card>
        <v-card-title class="red--text d-flex text-bold text-h4 justify-center">
          {{ title }}
        </v-card-title>
        <v-card-text style="height: 340px">
          <div class="content">
            <p class="mb-1">
              What will happen when I send my troops: <br />
              You will not be able to withdraw your troops until the war is over
              <br />
              Part or all of your troops will die in the war, even if you win
              the battle! <br />
            </p>
            <v-checkbox
              v-model="checkbox"
              class="stake-modal-input ma-0 pa-0"
              color="secondary"
            >
              <template v-slot:label>
                <div>
                  I read and agree with the rules of the battle
                </div>
              </template>
            </v-checkbox>

            <v-currency-field
              color="secondary"
              class="stake-modal-input my-n1"
              outlined
              label="Amount"
              :disabled="!checkbox"
              :hint="'Available: 123.54547784'"
              persistent-hint
              v-bind="currencyConfig"
            >
              <template v-slot:append>
                <div class="d-flex">
                  <span class="mr-1 align-self-center">wWARRIOR - WAR</span>
                  <v-btn class="align-self-center" rounded small>MAX</v-btn>
                </div>
              </template>
            </v-currency-field>

            <div class="d-flex justify-center mt-2">
              <wButton class="mx-2" size="small" @click="close">Cancel</wButton>
              <wButton class="mx-2" size="small" :actived="true">
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
import wButton from "@/lib/components/ui/Utils/wButton";

export default {
  props: ["open", "title", "hideOk"],

  components: {
    wButton,
  },

  data() {
    return {
      address: "",
      checkbox: false,
      currencyConfig: {
        locale: 'en-US',
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
  },

  methods: {
    close() {
      this.checkbox = false;
      this.$emit("close");
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
  height: 185px;
  color: #201813;
  display: table-cell;
  vertical-align: middle;
}

.btn {
  cursor: pointer;
  width: 150px;
  float: right;
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
</style>
