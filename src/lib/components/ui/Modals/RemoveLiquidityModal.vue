<template>
  <modal-wood
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading || disabledConfirm || !checkbox || !amount"
    :disabledClose="isLoading"
    title="Remove Liquidity"
    @close="$emit('close')"
    @confirm="$emit('confirm', amount)"
    :width="width"
    :height="height"
  >
    <v-row dense>
      <v-col dense cols="12" md="12">

        <div>
          <div class="mb-1">
            <span class=" font-weight-bold">You balance LP: </span>
            <span class="primary--text font-weight-bold ">
              16.836 wLAND/BUSD Pool Tokens
            </span>
          </div>
        </div>

        <span class=" font-weight-bold">You will receive: </span>
        <div
          class="d-flex flex-column flex-md-row justify-center align-center mt-3 mx-3"
        >
          <div class="d-flex justify-center align-center mr-3">
            <div class="box-token mr-2">
              <v-img src="/images/icons/wLAND.png" />
            </div>
            <number-field
              class="mt-3"
              v-model="amount"
              dense
              :min="min"
              disabled
            ></number-field>
          </div>

          <div class="d-flex justify-center align-center">
            <div class="box-token mr-2">
              <v-img src="/images/icons/BUSD.png" />
            </div>
            <number-field
              class="mt-3"
              v-model="amountTokenB"
              dense
              disabled
            ></number-field>
          </div>
        </div>

        <div class="d-flex justify-center align-center mt-2">
          <v-checkbox
            v-model="checkbox"
            class="checkbox-modal-input ma-0 pa-0"
            color="secondary"
          >
            <template v-slot:label>
              <div class="my-1">
                I understand that removing liquidity will not receive my reward.
              </div>
            </template>
          </v-checkbox>
        </div>
      </v-col>
    </v-row>
  </modal-wood>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import TimeBlock from "@/lib/components/ui/Utils/TimeBlock";
import ModalWood from "@/lib/components/ui/Modals/Templates/Wood";
import NumberField from "@/lib/components/ui/Utils/NumberField";

export default {
  props: [
    "open",
    "isLoading",
    "disabledConfirm",
    "width",
    "height",
    "textClose",
    "min",
  ],

  data() {
    return {
      checkbox: false,
      amount: 0,
      amountTokenB: 15,
    };
  },

  components: {
    Amount,
    ModalWood,
    NumberField,
    TimeBlock,
  },

  computed: {},
};
</script>
<style scoped>
.you-will-need {
  background: url("/images/modal-background.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 120%;
  padding: 20px;
  border-radius: 8px;
  color: #000;
}

.box-token {
  background: url("/images/modal-background.png");
  background-size: 200%;
  background-position: center;
  border-radius: 8px;
  padding: 6px;
  width: 85px;
  height: 85px;
}

.checkbox-modal-input >>> .v-input__control > .v-input__slot fieldset {
  color: #fff !important;
  border-width: 3px !important;
  border-radius: 18px !important;
}

.checkbox-modal-input >>> .v-label {
  transform-origin: top left !important;
  font-weight: bold !important;
  color: #fff !important;
}

.checkbox-modal-input >>> .v-input__append-inner {
  color: #fff !important;
  font-weight: bold !important;
  font-size: 13px;
}

.checkbox-modal-input >>> .v-icon {
  color: #fff !important;
}

.checkbox-modal-input.v-input--is-disabled {
  opacity: 0.2;
}

.checkbox-modal-input >>> input {
  color: #fff;
  font-weight: bold;
}

.checkbox-modal-input >>> .v-messages__message {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .you-will-need {
    background-size: 180%;
  }
}
</style>
