<template>
  <modal-wood
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading || disabledConfirm"
    :disabledClose="isLoading"
    title="Research for new weapon"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
    :width="width"
    :height="height"
    textConfirm="Create"
  >
    <v-row dense>
      <v-col dense cols="12" md="12">
        <div
          class="d-flex flex-column flex-md-row justify-space-between align-center you-will-need"
        >
          <div class="d-flex align-center font-weight-black text-h6">
            You will need:
          </div>

          <div class="d-flex align-center">
            <v-img class="mx-1" max-width="26px" src="/images/wGOLD.png" />
            <amount
              :amount="info.tokenA.amount"
              decimals="2"
              compact
              :symbol="info.tokenA.name"
            />
          </div>
          <div class="d-flex align-center">
            <v-img
              class="mx-1"
              max-width="26px"
              src="/images/icons/battle-shield.png"
            />
            <amount
              :amount="info.tokenB.amount"
              decimals="2"
              compact
              :symbol="info.tokenB.name"
            />
          </div>
        </div>

        <div
          class="d-flex flex-column flex-md-row justify-center align-center mt-3 mx-3"
        >
          <div class="d-flex align-center">
            <div class="box-token mr-2">
              <v-img src="/images/wGOLD.png" />
            </div>
            <number-field
              class="mt-3"
              v-model="info.tokenA.amountFormatted"
              dense
              disabled
            ></number-field>
          </div>
          <div class="d-flex align-center mx-3">
            <div
              class="d-flex white--text align-center font-weight-black text-h4"
            >
              +
            </div>
          </div>
          <div class="d-flex align-center">
            <div class="box-token mr-2">
              <v-img src="/images/icons/battle-shield.png" />
            </div>
            <number-field
              class="mt-3"
              v-model="info.tokenA.amountFormatted"
              dense
              disabled
            ></number-field>
          </div>
        </div>

        <div class="d-flex justify-center align-center mt-2 mt-md-0">
          <v-img
            class="mr-1"
            max-width="52px"
            src="/images/icons/hourglass.png"
          />
          <div class="primary--text font-weight-black text-h6">Time required: 9,600 blocks</div>
        </div>
      </v-col>
    </v-row>
  </modal-wood>
</template>

<script>
import Amount from "@/lib/components/ui/Utils/Amount";
import ModalWood from "@/lib/components/ui/Modals/Templates/Wood";
import NumberField from "@/lib/components/ui/Utils/NumberField";
import Convert from "@/lib/helpers/Convert";

export default {
  props: [
    "open",
    "isLoading",
    "disabledConfirm",
    "width",
    "height",
    "textClose",
    "info",
  ],

  components: {
    Amount,
    ModalWood,
    NumberField,
  },

  mounted() {
    if (this.info) {
      this.info.tokenA.amountFormatted = Convert.fromWei(
        this.info.tokenA.amount,
        true
      );
      this.info.tokenB.amountFormatted = Convert.fromWei(
        this.info.tokenB.amount,
        true
      );
    }
  },
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
  padding: 16px;
  width: 75px;
  height: 75px;
}
</style>
