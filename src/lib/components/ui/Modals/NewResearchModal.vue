<template>
  <modal-wood
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading || disabledConfirm || !checkbox"
    :disabledClose="isLoading"
    title="Research for new weapon"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
    :width="width"
    :height="height"
    textConfirm="Research"
  >
    <v-row dense>
      <v-col dense cols="12" md="12">
        <div
          class="d-flex flex-column flex-md-row justify-space-between align-center you-will-need"
        >
          <div>
            <img width="70px" src="/images/weapon-research/arimedes.png" />
          </div>

          <div class="d-flex align-center px-1 font-weight-black">
            You'll pay me in wCOURAGE to work with a small group of brave soldiers, and
            unfortunately they'll all perish in the process.
          </div>

          <div>
            <img width="45px" :src="getInfo.infoWeapon.imageNft" />
          </div>
        </div>

        <div
          class="d-flex flex-column flex-md-row justify-center align-center mt-3 mx-3"
        >
          <div class="d-flex align-center">
            <div class="box-token mr-2">
              <v-img src="/images/wcourage.png" />
            </div>
            <number-field
              no-icons
              class="mt-3"
              v-model="getInfo.getTokenAConfig.amountFormatted"
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
          <div class="d-flex justify-center align-center">
            <div class="box-token mr-2">
              <v-img :src="`/images/icons/coins/${info.getTokenBConfig.name}.png`" />
            </div>
            <number-field
              no-icons
              class="mt-3"
              v-model="getInfo.getTokenBConfig.amountFormatted"
              dense
              disabled
            ></number-field>
          </div>
        </div>

        <div class="d-flex justify-center align-center mt-2 mt-md-1">
          <v-img
            class="mr-1"
            max-width="52px"
            src="/images/icons/hourglass.png"
          />
          <div class="primary--text font-weight-black text-h6">
            <div class="d-flex flex-column">
              <div>
                Time required:
                <amount
                  :amount="getInfo.getGeneralConfig.blocks"
                  formatted
                  fo
                  decimals="0"
                  compact
                /> blocks
              </div>
              <div>
                <time-block :blocks="getInfo.getGeneralConfig.blocks" />
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-center align-center">
          <v-checkbox
            v-model="checkbox"
            class="checkbox-modal-input ma-0 pa-0"
            color="secondary"
          >
            <template v-slot:label>
              <div>
                I understand that I will pay
                <amount
                  :amount="getInfo.getTokenAConfig.amount"
                  decimals="2"
                  symbol="wCOURAGE"
                />
                and
                <amount
                  :amount="getInfo.getTokenBConfig.amount"
                  decimals="2"
                  :symbol="getInfo.getTokenBConfig.name"
                />
                to this research.
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

  data() {
    return {
      checkbox: false,
    };
  },

  components: {
    Amount,
    ModalWood,
    NumberField,
    TimeBlock,
  },

  computed: {
    getInfo() {
      let data = { ...this.info };
      data.getTokenAConfig.amountFormatted = Convert.fromWei(
        data.getTokenAConfig.amount,
        true
      );
      data.getTokenBConfig.amountFormatted = Convert.fromWei(
        data.getTokenBConfig.amount,
        true
      );
      return data;
    },
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
