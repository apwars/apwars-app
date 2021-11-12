<template>
  <modal-wood
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading || disabledConfirm || !checkbox"
    :disabledClose="isLoading"
    title="Renew Reward"
    @close="$emit('close')"
    @confirm="$emit('confirm', infoLP.id)"
    :width="width"
    :height="height"
  >
    <v-row dense>
      <v-col v-if="!isLoading" dense cols="12" md="12">
        <div class="mb-1">
          <span class="white--text font-weight-bold">My Pool Tokens: </span>
          <span class="primary--text font-weight-bold ">
            <amount :amount="infoLP.balanceLP" decimals="2" />
            {{ infoLP.symbolLp }} Pool Tokens
          </span>
        </div>
        <div class="mb-1">
          <span class="white--text font-weight-bold">Fee renew reward: </span>
          <span class="primary--text font-weight-bold ">
            <amount :amount="infoLP.balanceLP" decimals="2" />
            {{ infoLP.symbolLp }} Pool Tokens (0.5%)
          </span>
        </div>

        <div class="mb-1">
          <span class="white--text font-weight-bold">Amount in stake:</span>
          <span class="primary--text font-weight-bold ">
            <amount :amount="infoLP.balanceLP" decimals="2" />
            {{ infoLP.symbolLp }} Pool Tokens
          </span>
        </div>

        <div class="mb-1">
          <span class="white--text font-weight-bold"
            >Loyalty points to receive:
          </span>
          <span class="primary--text font-weight-bold ">
            <amount
              :amount="infoLP.getGeneralConfig.points * 1.1"
              formatted
              decimals="0"
            />
            (10% increase for renewal)
          </span>
        </div>

        <div class="d-flex justify-center align-center mt-2">
          <v-checkbox
            v-model="checkbox"
            class="checkbox-modal-input ma-0 pa-0"
            color="secondary"
          >
            <template v-slot:label>
              <div class="my-1">
                I understand that the reward renewal will have a period of
                {{ infoLP.getGeneralConfig.blocks }} blocks and that the amount
                of
                <amount :amount="infoLP.balanceLP" decimals="2" />
                {{ infoLP.symbolLp }} Pool Token will be on stake until the
                deadline.
              </div>
            </template>
          </v-checkbox>
        </div>
      </v-col>
      <v-col v-else cols="12" md="12">
        <div class="d-flex align-center justify-center">
          <v-progress-circular
            class="mr-1"
            :size="36"
            :width="2"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <h3>Loading...</h3>
        </div>
      </v-col>
    </v-row>
  </modal-wood>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import TimeBlock from "@/lib/components/ui/Utils/TimeBlock";
import ModalWood from "@/lib/components/ui/Modals/Templates/Wood";

export default {
  props: [
    "open",
    "isLoading",
    "disabledConfirm",
    "width",
    "height",
    "textClose",
    "infoLP",
  ],

  data() {
    return {
      checkbox: false,
    };
  },

  components: {
    Amount,
    ModalWood,
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
