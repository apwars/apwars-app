<template>
  <modal-wood
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading || disabledConfirm || !checkbox"
    :disabledClose="isLoading"
    :title="title"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
    :width="width"
    :height="height"
    :textConfirm="getTextConfirm"
  >
    <v-row dense>
      <v-col dense cols="12" md="12">
        <div
          class="d-flex flex-column flex-md-row justify-space-between align-center you-will-need"
        >
          <div>
            <img width="70px" :src="`${getInfo.personage.image}`" />
          </div>

          <div class="d-flex align-center px-1 font-weight-black">
            {{ getInfo.personage.description }}
          </div>

          <div>
            <img width="50px" :src="getInfo.infoTraining.image" />
          </div>
        </div>

        <div
          class="d-flex flex-column flex-md-row justify-center align-center mt-3 mx-3"
        >
          <div class="d-flex align-center">
            <div class="box-token mr-2">
              <v-img :src="`/images/${info.getTokenAConfig.name}.png`" />
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
              <v-img :src="`/images/icons/${info.getTokenBConfig.name}.png`" />
            </div>
            <number-field
              no-icons
              class="mt-3"
              v-model="getInfo.getTokenBConfig.amountFormatted"
              dense
              disabled
            ></number-field>
          </div>
          <div class="d-flex align-center mx-3">
            <div
              class="d-flex white--text align-center font-weight-black text-h4"
            >
              <v-img max-width="25px" src="/images/icons/arrow.png" />
            </div>
          </div>
          <div class="d-flex justify-center align-center">
            <div class="box-token mr-2">
              <v-img  :src="getInfo.infoTraining.image" height="75px"/>
            </div>
            <number-field
              no-icons
              class="mt-3"
              v-model="getInfo.getTokenCConfig.amountFormatted"
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
                  decimals="0"
                />blocks
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
                {{ getInfo.textCheckbox }}
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
    "title",
    "textConfirm",
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
      data.getTokenCConfig.amountFormatted = Convert.fromWei(
        data.getTokenCConfig.amount,
        true
      );
      return data;
    },
    getTextConfirm() {
      if (this.textConfirm === undefined || this.textConfirm === null) {
        return "Confirm";
      }
      return this.textConfirm;
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
