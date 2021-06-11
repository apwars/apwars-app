<template>
  <modal-wood
    :open="open"
    :isLoading="isLoading"
    :disabledConfirm="isLoading || disabledConfirm || !disabledBuy"
    :disabledClose="isLoading"
    :title="title"
    @close="$emit('close')"
    @confirm="$emit('confirm')"
    :width="width"
    :height="height"
    :textClose="textClose"
  >
    <v-row dense>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" dense cols="12" md="3">
        <div class="text-center">
          <v-img class="d-flex" width="100%" :src="imageUrl"></v-img>
          <small v-if="amount" class="remaining"
            >Your Amount: {{ amount }}</small
          >
        </div>
      </v-col>

      <v-col dense cols="12" md="9">
        <div class="d-flex justify-space-around justify-md-start mb-2">
          <img
            v-if="!$vuetify.breakpoint.mdAndUp"
            width="60px"
            :src="imageUrl"
            class="mr-2"
          />
          <game-text header="h4">{{ gameItemTitle }}</game-text>
        </div>

        <slot></slot>

        <div class="mt-2" v-if="isLoading">
          <v-progress-circular
            :size="24"
            :width="2"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <span class="ml-1" v-if="waitingStage === 1"
            >Waiting for the wallet approval...</span
          >
          <span class="ml-1" v-if="waitingStage === 2"
            >Waiting for the first blockchain confirmation...</span
          >
        </div>
      </v-col>
    </v-row>
  </modal-wood>
</template>

<script>
import GameText from "@/lib/components/ui/Utils/GameText";
import ModalWood from "@/lib/components/ui/Modals/Templates/Wood";

export default {
  props: [
    "open",
    "waitingStage",
    "title",
    "imageUrl",
    "gameItemTitle",
    "isLoading",
    "disabledConfirm",
    "amount",
    "width",
    "height",
    "textClose",
    "disabledBuy"
  ],

  components: {
    GameText,
    ModalWood,
  },
};
</script>
<style scoped>
.remaining {
  color: #f6ff00;
}
</style>
